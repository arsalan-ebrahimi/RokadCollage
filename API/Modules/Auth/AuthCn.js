import { catchAsync, HandleERROR } from "vanta-api";
import User from "../User/UserMd.js";
import {
  sendAuthCode,
  verifyCode as verifySmsCode,
} from "../../Utils/SmsHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { normalizePersianDigits } from "../../Utils/validateRequest.js";

const signToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const formatAuthUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  phoneNumber: user.phoneNumber,
  role: user.role,
  birthDate: user.birthDate,
});

export const phoneFilter = (phone) => {
  const normalized = normalizePersianDigits(phone).trim().replace(/\s+/g, "");
  const variations = [normalized];
  if (normalized.startsWith("+98")) {
    variations.push("0" + normalized.slice(3));
    variations.push(normalized.slice(3));
  } else if (normalized.startsWith("09")) {
    variations.push("+98" + normalized.slice(1));
    variations.push(normalized.slice(1));
  } else if (normalized.startsWith("9")) {
    variations.push("0" + normalized);
    variations.push("+98" + normalized);
  }
  return { phoneNumber: { $in: Array.from(new Set(variations)) } };
};

export const auth = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const cleanPhone = normalizePersianDigits(phoneNumber).trim();
  const user = await User.findOne(phoneFilter(cleanPhone)).select("+password");

  if (!user || !user.password) {
    const resultSms = await sendAuthCode(cleanPhone);

    if (!resultSms.success) {
      return res.status(500).json({
        success: false,
        message: resultSms.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
      data: {
        isNewUser: !user,
        havePassword: false,
      },
    });
  }

  return res.status(200).json({
    success: true,
    message: "شما از قبل ثبت‌نام کرده‌اید، لطفاً با رمز عبور وارد شوید",
    data: {
      isNewUser: false,
      havePassword: true,
    },
  });
});

export const loginWithPassword = catchAsync(async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  const cleanPhone = normalizePersianDigits(phoneNumber).trim();

  const user = await User.findOne(phoneFilter(cleanPhone)).select("+password");

  if (!user) {
    return next(new HandleERROR("شماره موبایل یا رمز عبور اشتباه است", 401));
  }

  if (!user.password) {
    return next(new HandleERROR("برای این حساب کاربری رمز عبوری تنظیم نشده است", 400));
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return next(new HandleERROR("شماره موبایل یا رمز عبور اشتباه است", 401));
  }

  const token = signToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: "با موفقیت وارد شدید",
    data: {
      token,
      user: formatAuthUser(user),
    },
  });
});

export const loginWithOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber, code, password, fullName } = req.body;
  const cleanPhone = normalizePersianDigits(phoneNumber).trim();
  const cleanCode = normalizePersianDigits(code).trim();

  const verification = await verifySmsCode(cleanPhone, cleanCode);

  if (!verification.success) {
    return next(new HandleERROR("کد تایید اشتباه یا منقضی شده است", 400));
  }

  let user = await User.findOne(phoneFilter(cleanPhone));

  if (!user) {
    let canonical = cleanPhone;
    if (canonical.startsWith("+98")) canonical = "0" + canonical.slice(3);
    else if (canonical.startsWith("9") && canonical.length === 10) canonical = "0" + canonical;
    let userData = { phoneNumber: canonical };
    if (fullName) userData.fullName = fullName.trim();
    if (password) {
      userData.password = await bcryptjs.hash(password, 12);
    }
    user = await User.create(userData);
  } else {
    let modified = false;
    if (fullName && !user.fullName) {
      user.fullName = fullName.trim();
      modified = true;
    }
    if (password) {
      user.password = await bcryptjs.hash(password, 12);
      modified = true;
    }
    if (modified) {
      await user.save();
    }
  }

  const token = signToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: "با موفقیت وارد شدید",
    data: {
      token,
      user: formatAuthUser(user),
    },
  });
});

export const resendCode = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const cleanPhone = normalizePersianDigits(phoneNumber).trim();

  const resultSms = await sendAuthCode(cleanPhone);

  if (!resultSms.success) {
    return res.status(500).json({
      success: false,
      message: resultSms.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: "کد تایید مجدداً ارسال شد",
  });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { code, phoneNumber, newPassword } = req.body;
  const cleanPhone = normalizePersianDigits(phoneNumber).trim();
  const cleanCode = normalizePersianDigits(code).trim();

  const verification = await verifySmsCode(cleanPhone, cleanCode);

  if (!verification.success) {
    return next(new HandleERROR("کد تایید اشتباه است", 400));
  }

  const user = await User.findOne(phoneFilter(cleanPhone));

  if (!user) return next(new HandleERROR("کاربری با این شماره یافت نشد", 404));

  user.password = await bcryptjs.hash(newPassword, 12);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "رمز عبور با موفقیت تغییر کرد",
  });
});
