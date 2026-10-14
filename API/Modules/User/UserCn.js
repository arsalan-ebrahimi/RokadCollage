import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "./UserMd.js";
import Wallet from "../Wallet/WalletMd.js";
import bcryptjs from "bcryptjs";
import { normalizeBirthDate, normalizePersianDigits } from "../../Utils/validateRequest.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .filter()
    .search(["fullName", "phoneNumber"])
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const targetId = (req.role === "user" ? req.userId : (req.params.id || req.userId));

  const doc = await User.findById(targetId).select("-password").lean();

  if (!doc) {
    return next(new HandleERROR("کاربر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    data: doc,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { fullName, phoneNumber, password, role, birthDate } = req.body;

  if (!phoneNumber) {
    return next(new HandleERROR("وارد کردن شماره موبایل الزامی است", 400));
  }

  const cleanPhone = normalizePersianDigits(phoneNumber).trim();
  const existingUser = await User.findOne({ phoneNumber: cleanPhone });
  if (existingUser) {
    return next(new HandleERROR("کاربری با این شماره موبایل از قبل وجود دارد", 400));
  }

  const userData = {
    fullName: fullName ? fullName.trim() : "",
    phoneNumber: cleanPhone,
    birthDate: birthDate ? normalizeBirthDate(birthDate) : "",
    role: role || "user",
  };

  if (password && password.trim()) {
    userData.password = await bcryptjs.hash(password.trim(), 12);
  }

  const newUser = await User.create(userData);
  const userObj = newUser.toObject();
  delete userObj.password;

  return res.status(201).json({
    success: true,
    message: "کاربر جدید با موفقیت ایجاد شد",
    data: userObj,
  });
});

export const update = catchAsync(async (req, res, next) => {
  if (req.role === "user" && String(req.userId) !== String(req.params.id)) {
    return next(new HandleERROR("شما مجاز به ویرایش اطلاعات این کاربر نیستید", 403));
  }

  const { fullName, phoneNumber, password, role, birthDate } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new HandleERROR("کاربر یافت نشد", 404));
  }

  if (phoneNumber) {
    const cleanPhone = normalizePersianDigits(phoneNumber).trim();
    if (cleanPhone !== user.phoneNumber) {
      const existing = await User.findOne({
        phoneNumber: cleanPhone,
        _id: { $ne: req.params.id },
      });
      if (existing) {
        return next(new HandleERROR("این شماره موبایل توسط کاربر دیگری استفاده شده است", 400));
      }
      user.phoneNumber = cleanPhone;
    }
  }

  if (fullName !== undefined) user.fullName = fullName ? fullName.trim() : "";
  if (birthDate !== undefined) user.birthDate = birthDate ? normalizeBirthDate(birthDate) : "";
  if (password && password.trim()) {
    user.password = await bcryptjs.hash(password.trim(), 12);
  }
  if ((req.role === "admin" || req.role === "superAdmin") && role) {
    user.role = role;
  }

  const updatedUser = await user.save();
  const userObj = updatedUser.toObject();
  delete userObj.password;

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت بروزرسانی شد",
    data: userObj,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  if (req.params.id === req.userId?.toString()) {
    return next(new HandleERROR("شما نمی‌توانید حساب کاربری جاری خود را حذف کنید", 400));
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new HandleERROR("کاربر یافت نشد", 404));
  }

  // Clean up user wallet upon account deletion to prevent orphaned records
  await Wallet.findOneAndDelete({ ownerId: req.params.id });

  return res.status(200).json({
    success: true,
    message: "کاربر با موفقیت حذف شد",
    data: null,
  });
});
