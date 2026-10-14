import mongoose from "mongoose";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Enrollment from "./EnrollmentMd.js";
import User from "../User/UserMd.js";
import InPersonCourse from "../InPersonCourse/InPersonCourseMd.js";
import VirtualCourse from "../VirtualCourse/VirtualCourseMd.js";
import CourseSession from "../InPersonCourse/CourseSession/CourseSessionMd.js";
import Wallet from "../Wallet/WalletMd.js";
import Transaction from "../Wallet/TransactionMd.js";
import { purchaseCourseService } from "../CourseCore/purchaseCore.js";
import { issueEnrollmentLicense, buildDownloadUrl } from "../../Utils/spotplayer.js";

/**
 * Purchases a course (supports both InPerson and Virtual courses).
 * Backward-compatible endpoint for POST /api/enrollment/purchase.
 */
export const purchaseCourse = catchAsync(async (req, res, next) => {
  const { courseId, sessionId, couponCode } = req.body;
  const userId = req.userId;

  if (!courseId) {
    return next(new HandleERROR("شناسه دوره الزامی است", 400));
  }

  const result = await purchaseCourseService({
    userId,
    courseId,
    sessionId,
    couponCode,
  });

  const isVirtual = result.enrollment?.courseModel === "VirtualCourse";
  return res.status(201).json({
    success: true,
    message: isVirtual
      ? "خرید و ثبت‌نام در دوره مجازی با موفقیت انجام شد"
      : "خرید و ثبت‌نام در دوره حضوری با موفقیت انجام شد",
    data: result,
  });
});

/**
 * Retries issuing a SpotPlayer license for a virtual course enrollment.
 * POST /api/enrollment/:id/retry-license
 * POST /enrollments/:id/retry-license
 */
export const retryLicense = catchAsync(async (req, res, next) => {
  const enrollmentId = req.params.id;
  const userId = req.userId;
  const userRole = req.role;
  const isAdmin = userRole === "admin" || userRole === "superAdmin";

  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    return next(new HandleERROR("ثبت‌نام مورد نظر یافت نشد", 404));
  }

  if (enrollment.courseModel !== "VirtualCourse") {
    return next(
      new HandleERROR("صدور لایسنس اسپات‌پلیر فقط برای دوره‌های مجازی امکان‌پذیر است", 400)
    );
  }

  // Strict ownership check: only enrollment owner or admin
  const isOwner = enrollment.user.toString() === userId.toString();
  if (!isOwner && !isAdmin) {
    return next(new HandleERROR("شما دسترسی لازم برای این عملیات را ندارید", 403));
  }

  const currentStatus = enrollment.spotplayer?.status || "pending";

  if (currentStatus === "issued") {
    return next(new HandleERROR("لایسنس این دوره قبلاً با موفقیت صادر شده است", 400));
  }

  if (currentStatus === "processing" && !isAdmin) {
    return next(
      new HandleERROR("درخواست صدور لایسنس شما در حال پردازش است. لطفاً کمی صبر کنید", 400)
    );
  }

  // Attempt license issuance
  const issueResult = await issueEnrollmentLicense(enrollmentId, isAdmin);

  const updatedEnrollment = await Enrollment.findById(enrollmentId)
    .select("+spotplayer.key")
    .populate("course", "title type category price img duration spotplayerCourseId")
    .populate("user", "fullName phoneNumber role")
    .lean();

  if (updatedEnrollment?.spotplayer?.url) {
    updatedEnrollment.spotplayer.downloadUrl = buildDownloadUrl(updatedEnrollment.spotplayer.url);
  }

  return res.status(200).json({
    success: issueResult.success,
    message: issueResult.success
      ? "لایسنس اسپات‌پلیر با موفقیت صادر شد"
      : "صدور لایسنس با خطا مواجه شد. لطفاً مجدداً تلاش کنید یا با پشتیبانی تماس بگیرید",
    data: updatedEnrollment,
  });
});

/**
 * Fetch all enrollment records for Admin.
 * spotplayer.key is excluded by default for security.
 */
export const getAllEnrollments = catchAsync(async (req, res, next) => {
  const manualFilters = {};
  const queryCopy = { ...req.query };

  const idFilters = [
    { key: "session", aliases: ["session", "sessionId"] },
    { key: "course", aliases: ["course", "courseId"] },
    { key: "user", aliases: ["user", "userId"] },
  ];

  for (const { key, aliases } of idFilters) {
    const rawVal = aliases.map((alias) => queryCopy[alias]).find(Boolean);
    if (rawVal && mongoose.Types.ObjectId.isValid(rawVal)) {
      manualFilters[key] = new mongoose.Types.ObjectId(rawVal);
    }
    aliases.forEach((alias) => delete queryCopy[alias]);
  }

  if (queryCopy.courseModel) {
    manualFilters.courseModel = queryCopy.courseModel;
    delete queryCopy.courseModel;
  }

  const features = new ApiFeatures(Enrollment, queryCopy, req.role)
    .addManualFilters(manualFilters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      {
        path: "user",
        select: "fullName phoneNumber role",
      },
      {
        path: "session",
        select: "code scheduleDays scheduleHours capacity enrolledCount",
      },
    ]);

  const result = await features.execute();
  const docs = Array.isArray(result) ? result : result?.data ? result.data : [];

  for (const doc of docs) {
    if (!doc.courseModel && doc.course) {
      doc.courseModel = "InPersonCourse";
    }
  }

  await Enrollment.populate(docs, {
    path: "course",
    select: "title type category price img duration spotplayerCourseId",
  });

  const enrichEnrollment = (doc) => {
    if (!doc) return doc;
    const obj = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };
    if (obj.spotplayer?.url) {
      obj.spotplayer.downloadUrl = buildDownloadUrl(obj.spotplayer.url);
    }
    return obj;
  };

  if (Array.isArray(result)) {
    return res.status(200).json(result.map(enrichEnrollment));
  } else if (result?.data && Array.isArray(result.data)) {
    result.data = result.data.map(enrichEnrollment);
    return res.status(200).json(result);
  }

  return res.status(200).json(result);
});

/**
 * Fetch single enrollment details (Admin or owner only; includes spotplayer.key).
 */
export const getOneEnrollment = catchAsync(async (req, res, next) => {
  const enrollment = await Enrollment.findById(req.params.id)
    .select("+spotplayer.key")
    .populate("user", "fullName phoneNumber role")
    .populate("course", "title type category price img duration spotplayerCourseId")
    .populate("session", "code scheduleDays scheduleHours capacity enrolledCount")
    .lean();

  if (!enrollment) {
    return next(new HandleERROR("ثبت‌نام مورد نظر یافت نشد", 404));
  }

  const isOwner = enrollment.user?._id?.toString() === req.userId?.toString();
  const isAdmin = req.role === "admin" || req.role === "superAdmin";
  if (!isOwner && !isAdmin) {
    return next(new HandleERROR("شما دسترسی لازم برای این عملیات را ندارید", 403));
  }

  if (enrollment.spotplayer?.url) {
    enrollment.spotplayer.downloadUrl = buildDownloadUrl(enrollment.spotplayer.url);
  }

  return res.status(200).json({
    success: true,
    data: enrollment,
  });
});

/**
 * Fetch all courses enrolled by the currently authenticated user.
 * Includes spotplayer.key and buildDownloadUrl for the user's own courses.
 */
export const getMyEnrollments = catchAsync(async (req, res, next) => {
  const enrollments = await Enrollment.find({
    user: req.userId,
    "spotplayer.status": { $ne: "failed" },
  })
    .select("+spotplayer.key")
    .sort({ createdAt: -1 })
    .populate({
      path: "course",
      select: "title type category price duration img sprints location spotplayerCourseId slug teachers",
      populate: {
        path: "teachers",
        select: "name title avatar role",
      },
    })
    .populate("session", "code scheduleDays scheduleHours capacity")
    .populate("transactionId", "status")
    .lean();

  const filtered = enrollments.filter((enr) => {
    // Exclude if transaction explicitly failed
    if (enr.transactionId && enr.transactionId.status === "failed") {
      return false;
    }
    // Only courses with an active license should appear in my-courses
    const hasActiveLicense = Boolean(
      enr.spotplayer?.key || (enr.spotplayer?.licenseId && enr.spotplayer?.status === "issued")
    );
    if (!hasActiveLicense || enr.spotplayer?.status === "failed") {
      return false;
    }
    return true;
  });

  const enriched = filtered.map((enr) => {
    if (enr.spotplayer?.url) {
      enr.spotplayer.downloadUrl = buildDownloadUrl(enr.spotplayer.url);
    }
    return enr;
  });

  return res.status(200).json({
    success: true,
    count: enriched.length,
    data: enriched,
  });
});

/**
 * Check enrollment status of current user for a specific course.
 */
export const checkEnrollmentStatus = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const enrollment = await Enrollment.findOne({
    user: req.userId,
    course: courseId,
  })
    .select("+spotplayer.key")
    .populate("course", "title type category price img duration spotplayerCourseId slug")
    .populate("session", "code scheduleDays scheduleHours")
    .lean();

  if (enrollment?.spotplayer?.url) {
    enrollment.spotplayer.downloadUrl = buildDownloadUrl(enrollment.spotplayer.url);
  }

  return res.status(200).json({
    success: true,
    data: {
      isEnrolled: Boolean(enrollment),
      enrollment: enrollment || null,
    },
  });
});

/**
 * Manual enrollment by Admin without financial transactions.
 * POST /in-person-courses/:courseId/sessions/:sessionId/enrollments
 * POST /api/enrollment/manual
 */
export const adminManualEnroll = catchAsync(async (req, res, next) => {
  const courseId = req.params.courseId || req.params.id || req.body.courseId;
  const sessionId = req.params.sessionId || req.body.sessionId;
  const { userId } = req.body;

  if (!userId) {
    return next(new HandleERROR("شناسه کاربر الزامی است", 400));
  }
  if (!courseId) {
    return next(new HandleERROR("شناسه دوره الزامی است", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new HandleERROR("کاربر مورد نظر یافت نشد", 404));
  }

  // Check if InPersonCourse or VirtualCourse
  let inPersonCourse = await InPersonCourse.findById(courseId);
  let virtualCourse = null;
  if (!inPersonCourse) {
    virtualCourse = await VirtualCourse.findById(courseId);
  }

  if (!inPersonCourse && !virtualCourse) {
    return next(new HandleERROR("دوره مورد نظر یافت نشد", 404));
  }

  // If Virtual Course
  if (virtualCourse) {
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });
    if (existingEnrollment) {
      return next(new HandleERROR("این کاربر قبلاً در این دوره مجازی ثبت‌نام کرده است", 400));
    }

    const [enrollment] = await Enrollment.create([
      {
        user: userId,
        course: courseId,
        courseModel: "VirtualCourse",
        session: null,
        pricePaid: 0,
        discountAmount: 0,
        couponCode: "ثبت‌نام دستی ادمین",
        transactionId: null,
        spotplayer: {
          status: "pending",
        },
      },
    ]);

    await issueEnrollmentLicense(enrollment._id);

    const populated = await Enrollment.findById(enrollment._id)
      .populate("user", "fullName phoneNumber role")
      .populate("course", "title type category price img duration spotplayerCourseId");

    return res.status(201).json({
      success: true,
      message: "کاربر با موفقیت در این دوره مجازی ثبت‌نام شد",
      data: populated,
    });
  }

  // InPerson Course
  if (!sessionId) {
    return next(new HandleERROR("شناسه کد کلاس الزامی است", 400));
  }

  const targetSession = await CourseSession.findById(sessionId);
  if (!targetSession) {
    return next(new HandleERROR("کد کلاس مورد نظر یافت نشد", 404));
  }
  if (targetSession.course.toString() !== courseId.toString()) {
    return next(new HandleERROR("کد کلاس انتخاب‌شده متعلق به این دوره نیست", 400));
  }

  const existingEnrollment = await Enrollment.findOne({
    user: userId,
    course: courseId,
  });
  if (existingEnrollment) {
    return next(new HandleERROR("این کاربر قبلاً در این دوره ثبت‌نام کرده است", 400));
  }

  // Atomic seat reservation to prevent race conditions & overbooking
  const sessionQuery = { _id: sessionId };
  if (targetSession.capacity != null && targetSession.capacity > 0) {
    sessionQuery.enrolledCount = { $lt: targetSession.capacity };
  }

  const updatedSession = await CourseSession.findOneAndUpdate(
    sessionQuery,
    { $inc: { enrolledCount: 1 } },
    { new: true }
  );

  if (!updatedSession) {
    return next(new HandleERROR("ظرفیت این کد کلاس تکمیل شده است", 400));
  }

  let enrollment;
  try {
    const createdList = await Enrollment.create([
      {
        user: userId,
        course: courseId,
        courseModel: "InPersonCourse",
        session: sessionId,
        pricePaid: 0,
        discountAmount: 0,
        couponCode: "ثبت‌نام دستی ادمین",
        transactionId: null,
      },
    ]);
    enrollment = createdList[0];
  } catch (err) {
    // Compensating rollback if creation fails
    await CourseSession.findByIdAndUpdate(sessionId, {
      $inc: { enrolledCount: -1 },
    });
    throw err;
  }

  const populatedEnrollment = await Enrollment.findById(enrollment._id)
    .populate("user", "fullName phoneNumber role")
    .populate("course", "title type category price img duration")
    .populate("session", "code scheduleDays scheduleHours capacity enrolledCount");

  return res.status(201).json({
    success: true,
    message: "کاربر با موفقیت در این کد کلاس ثبت‌نام شد",
    data: populatedEnrollment,
  });
});

/**
 * Cancel and delete an enrollment (Admin only).
 * If the enrollment was purchased by the user (pricePaid > 0),
 * refunds the paid amount back to the user's wallet and records a refund transaction.
 * If in-person session exists, decrements session enrolledCount.
 * DELETE /api/enrollment/:id
 * POST /api/enrollment/:id/cancel
 */
export const cancelEnrollment = catchAsync(async (req, res, next) => {
  const enrollmentId = req.params.id || req.params.enrollmentId;

  const enrollment = await Enrollment.findById(enrollmentId)
    .populate("course", "title")
    .populate("session", "code enrolledCount");

  if (!enrollment) {
    return next(new HandleERROR("ثبت‌نام مورد نظر یافت نشد", 404));
  }

  const userId = enrollment.user;
  const refundAmount = Number(enrollment.pricePaid) || 0;
  const sessionId = enrollment.session?._id || enrollment.session;
  const isVirtual = enrollment.courseModel === "VirtualCourse";
  const courseTitle = enrollment.course?.title || (isVirtual ? "دوره مجازی" : "دوره حضوری");
  const sessionCode = enrollment.session?.code ? ` (کلاس ${enrollment.session.code})` : "";

  // 1. Decrement enrolledCount if in-person course with a session
  if (sessionId) {
    await CourseSession.findOneAndUpdate(
      { _id: sessionId, enrolledCount: { $gt: 0 } },
      { $inc: { enrolledCount: -1 } }
    );
  }

  // 2. Refund wallet if user purchased with a non-zero price (not manual/free)
  let updatedWallet = null;
  let refundTransaction = null;

  if (refundAmount > 0) {
    let wallet = await Wallet.findOne({ ownerId: userId });
    if (!wallet) {
      wallet = await Wallet.create({ ownerId: userId, balance: 0 });
    }

    updatedWallet = await Wallet.findByIdAndUpdate(
      wallet._id,
      { $inc: { balance: refundAmount } },
      { new: true }
    );

    refundTransaction = await Transaction.create({
      walletId: wallet._id,
      userId,
      type: "refund",
      amount: refundAmount,
      status: "success",
      description: `استرداد وجه لغو ثبت‌نام دوره «${courseTitle}»${sessionCode} توسط مدیر سیستم`,
    });
  }

  // 3. Delete the enrollment record completely from database
  await Enrollment.findByIdAndDelete(enrollment._id);

  return res.status(200).json({
    success: true,
    message:
      refundAmount > 0
        ? `ثبت‌نام با موفقیت لغو شد و مبلغ ${refundAmount.toLocaleString("fa-IR")} تومان به کیف پول کاربر بازگردانده شد`
        : "ثبت‌نام کاربر با موفقیت لغو و از دوره حذف شد",
    data: {
      enrollmentId: enrollment._id,
      refundAmount,
      walletBalance: updatedWallet ? updatedWallet.balance : undefined,
      transactionId: refundTransaction ? refundTransaction._id : null,
    },
  });
});
