import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Wallet from "./WalletMd.js";
import Transaction from "./TransactionMd.js";
import User from "../User/UserMd.js";

/**
 * Retrieves Zarinpal payment gateway configurations from environment variables.
 */
const getZarinpalConfig = () => {
  const isSandbox = String(process.env.ZARINPAL_SANDBOX || "true").toLowerCase() === "true";
  const merchantId = process.env.ZARINPAL_MERCHANT_ID || "00000000-0000-0000-0000-000000000000";
  let callbackUrl = process.env.ZARINPAL_CALLBACK_URL || "http://localhost:3000/payment/callback";
  if (!callbackUrl || callbackUrl.includes("5173") || callbackUrl.includes("/wallet/verify")) {
    callbackUrl = "http://localhost:3000/payment/callback";
  }

  const requestUrl =
    process.env.ZARINPAL_REQUEST_URL ||
    (isSandbox
      ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
      : "https://payment.zarinpal.com/pg/v4/payment/request.json");

  const verifyUrl =
    process.env.ZARINPAL_VERIFY_URL ||
    (isSandbox
      ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
      : "https://payment.zarinpal.com/pg/v4/payment/verify.json");

  const startPayUrl =
    process.env.ZARINPAL_START_PAY_URL ||
    (isSandbox
      ? "https://sandbox.zarinpal.com/pg/StartPay/"
      : "https://payment.zarinpal.com/pg/StartPay/");

  return {
    isSandbox,
    merchantId,
    callbackUrl,
    requestUrl,
    verifyUrl,
    startPayUrl,
  };
};

/**
 * Get wallet details of currently authenticated user.
 * If wallet doesn't exist, create a new one with 0 balance.
 */
export const getMyWallet = catchAsync(async (req, res, next) => {
  let wallet = await Wallet.findOne({ ownerId: req.userId });

  if (!wallet) {
    wallet = await Wallet.create({
      ownerId: req.userId,
      balance: 0,
    });
  }

  return res.status(200).json({
    success: true,
    data: wallet,
  });
});

/**
 * Initiate an online wallet charge request via Zarinpal payment gateway.
 * 1. Log a pending Transaction record.
 * 2. Request Authority token from Zarinpal API.
 * 3. Store Authority in Transaction and return payment redirect URL.
 */
export const requestCharge = catchAsync(async (req, res, next) => {
  const { amount } = req.body;

  let wallet = await Wallet.findOne({ ownerId: req.userId });
  if (!wallet) {
    wallet = await Wallet.create({
      ownerId: req.userId,
      balance: 0,
    });
  }

  // Create pending transaction for audit tracking
  const transaction = await Transaction.create({
    walletId: wallet._id,
    userId: req.userId,
    type: "charge",
    amount,
    status: "pending",
    description: "درخواست شارژ آنلاین کیف پول",
  });

  const { merchantId, callbackUrl, requestUrl, startPayUrl } = getZarinpalConfig();

  try {
    // Send request to Zarinpal (amount is in Tomans, convert to Rials by multiplying by 10)
    const zarinpalResponse = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: amount * 10,
        description: `شارژ کیف پول کاربر ${req.userId}`,
        callback_url: callbackUrl,
      }),
      signal: AbortSignal.timeout(15000),
    });

    const result = await zarinpalResponse.json();

    if (result?.data?.code === 100 && result?.data?.authority) {
      const authority = result.data.authority;

      transaction.authority = authority;
      await transaction.save();

      return res.status(200).json({
        success: true,
        message: "درخواست پرداخت با موفقیت ثبت شد",
        paymentUrl: `${startPayUrl}${authority}`,
        authority,
        transactionId: transaction._id,
      });
    }

    transaction.status = "failed";
    await transaction.save();

    const errorMessage =
      result?.errors?.message ||
      (result?.data?.message ? result.data.message : "خطا در اتصال به درگاه پرداخت زرین‌پال");

    return next(new HandleERROR(errorMessage, 500));
  } catch (err) {
    transaction.status = "failed";
    await transaction.save();
    return next(new HandleERROR(`خطا در برقراری ارتباط با درگاه بانکی: ${err.message}`, 500));
  }
});

/**
 * Verify wallet charge transaction callback from Zarinpal.
 * - Read amount from database record (preventing client-side tampering).
 * - Idempotency protection: do not credit twice if already processed.
 * - Atomically credit wallet balance upon success.
 */
export const verifyCharge = catchAsync(async (req, res, next) => {
  const { Authority } = req.body;

  const transaction = await Transaction.findOne({
    authority: Authority,
    userId: req.userId,
    type: "charge",
  });

  if (!transaction) {
    return next(new HandleERROR("تراکنش معتبری برای این شناسه پرداخت یافت نشد", 404));
  }

  // Idempotency: verify if already completed
  if (transaction.status === "success") {
    const wallet = await Wallet.findById(transaction.walletId);
    return res.status(200).json({
      success: true,
      message: "این تراکنش قبلاً با موفقیت تایید و اعمال شده است",
      data: {
        wallet,
        transaction,
      },
    });
  }

  if (transaction.status !== "pending") {
    return next(new HandleERROR("این تراکنش قبلاً منقضی یا ناموفق ثبت شده است", 400));
  }

  const { merchantId, verifyUrl } = getZarinpalConfig();

  try {
    const verifyResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: transaction.amount * 10,
        authority: Authority,
      }),
      signal: AbortSignal.timeout(15000),
    });

    const verifyResult = await verifyResponse.json();
    const zarinpalCode = verifyResult?.data?.code;
    const refId = verifyResult?.data?.ref_id ? String(verifyResult.data.ref_id) : "";

    // Code 100 indicates successful initial verification
    if (zarinpalCode === 100 || zarinpalCode === 101) {
      // Atomic guard: only transition if status is still pending to prevent double-crediting
      const claimedTransaction = await Transaction.findOneAndUpdate(
        { _id: transaction._id, status: "pending" },
        { $set: { status: "success", refId } },
        { new: true }
      );

      if (claimedTransaction) {
        const wallet = await Wallet.findOneAndUpdate(
          { _id: transaction.walletId },
          { $inc: { balance: transaction.amount } },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "کیف پول شما با موفقیت شارژ شد",
          data: {
            wallet,
            transaction: claimedTransaction,
          },
        });
      }

      // Already handled concurrently
      const wallet = await Wallet.findById(transaction.walletId);
      const currentTx = await Transaction.findById(transaction._id);
      return res.status(200).json({
        success: true,
        message: "این تراکنش قبلاً با موفقیت تایید و اعمال شده است",
        data: {
          wallet,
          transaction: currentTx,
        },
      });
    }

    transaction.status = "failed";
    await transaction.save();

    return next(new HandleERROR("تأیید تراکنش از سوی درگاه پرداخت رد شد", 400));
  } catch (err) {
    return next(new HandleERROR(`خطا در فرآیند تأیید تراکنش با درگاه: ${err.message}`, 500));
  }
});

/**
 * Payout (withdrawal) request from wallet balance.
 * - Uses atomic findOneAndUpdate with balance >= amount guard.
 * - Prevents negative balances under concurrency conditions.
 * - Logs a payout transaction record.
 */
export const requestPayout = catchAsync(async (req, res, next) => {
  const { amount, description } = req.body;

  const wallet = await Wallet.findOneAndUpdate(
    {
      ownerId: req.userId,
      balance: { $gte: amount },
    },
    {
      $inc: { balance: -amount },
    },
    { new: true }
  );

  if (!wallet) {
    const existingWallet = await Wallet.findOne({ ownerId: req.userId });
    if (!existingWallet) {
      return next(new HandleERROR("کیف پول برای این کاربر یافت نشد", 404));
    }
    return next(new HandleERROR("موجودی کیف پول برای این درخواست تسویه کافی نیست", 400));
  }

  const transaction = await Transaction.create({
    walletId: wallet._id,
    userId: req.userId,
    type: "payout",
    amount,
    status: "pending",
    description: description || "درخواست تسویه حساب کیف پول",
  });

  return res.status(200).json({
    success: true,
    message: "درخواست تسویه با موفقیت ثبت شد و در صف بررسی قرار گرفت",
    data: {
      wallet,
      transaction,
    },
  });
});

/**
 * Fetch all user wallets with pagination, filter, and user population (Admin only).
 */
export const getAllWallets = catchAsync(async (req, res, next) => {
  const queryCopy = { ...req.query };
  const manualFilters = {};
  const rawOwner = queryCopy.ownerId || queryCopy.owner || queryCopy.userId;
  if (rawOwner) {
    manualFilters.ownerId = rawOwner;
    delete queryCopy.ownerId;
    delete queryCopy.owner;
    delete queryCopy.userId;
  }

  const features = new ApiFeatures(Wallet, queryCopy, req.role)
    .addManualFilters(manualFilters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      {
        path: "ownerId",
        select: "fullName phoneNumber role birthDate",
      },
    ]);

  const result = await features.execute();
  return res.status(200).json(result);
});

/**
 * Fetch wallet of a specific user by userId (Admin only).
 * If wallet does not exist, returns a virtual 0 balance object.
 */
export const getUserWallet = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  let wallet = await Wallet.findOne({ ownerId: userId }).populate([
    {
      path: "ownerId",
      select: "fullName phoneNumber role birthDate",
    },
  ]);

  if (!wallet) {
    const user = await User.findById(userId);
    if (!user) {
      return next(new HandleERROR("کاربر مورد نظر یافت نشد", 404));
    }
    wallet = await Wallet.create({ ownerId: userId, balance: 0 });
    wallet = await wallet.populate({
      path: "ownerId",
      select: "fullName phoneNumber role birthDate",
    });
  }

  return res.status(200).json({
    success: true,
    data: wallet,
  });
});

/**
 * Fetch transaction history for currently authenticated user.
 */
export const getMyTransactions = catchAsync(async (req, res, next) => {
  const query = { sort: "-createdAt,-_id", ...req.query };
  const features = new ApiFeatures(Transaction, query, req.role)
    .addManualFilters({ userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const result = await features.execute();
  return res.status(200).json(result);
});

/**
 * Fetch all transaction records across system (Admin only).
 */
export const getAllTransactions = catchAsync(async (req, res, next) => {
  const query = { sort: "-createdAt,-_id", ...req.query };
  const features = new ApiFeatures(Transaction, query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      {
        path: "userId",
        select: "fullName phoneNumber role",
      },
      {
        path: "walletId",
        select: "balance",
      },
    ]);

  const result = await features.execute();
  return res.status(200).json(result);
});
