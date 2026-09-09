import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Course from "./CourseMd.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const create = catchAsync(async (req, res, next) => {
  const { category, type, tags, title, description, duration, icon } = req.body;

  const newCourse = await Course.create({
    category,
    type,
    tags,
    title,
    description,
    duration,
    icon,
  });

  return res.status(201).json({
    success: true,
    message: "دوره با موفقیت ایجاد شد",
    data: newCourse,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Course, req.query, req.role)
    .filter()
    .search(["title", "description", "category", "duration", "type", "tags"])
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Course, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .limitFields()
    .populate();

  const result = await features.execute();

  const doc = Array.isArray(result) ? result[0] : result?.data ? result.data[0] : result;

  if (!doc) {
    return next(new HandleERROR("دوره مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    data: doc,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const allowedUpdates = [
    "category",
    "type",
    "tags",
    "title",
    "description",
    "duration",
    "icon",
  ];
  const updates = {};

  Object.keys(req.body).forEach((el) => {
    if (allowedUpdates.includes(el)) updates[el] = req.body[el];
  });

  const oldCourse = await Course.findById(req.params.id);
  if (!oldCourse) {
    return next(new HandleERROR("دوره مورد نظر یافت نشد", 404));
  }

  // If icon changed and was a file, unlink previous icon file from Public
  if (
    updates.icon &&
    updates.icon !== oldCourse.icon &&
    !oldCourse.icon.startsWith("<") &&
    !oldCourse.icon.startsWith("default-")
  ) {
    const filePath = path.join(__dirname, "../../Public", oldCourse.icon);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error("Error unlinking old course icon:", err);
      }
    }
  }

  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "دوره با موفقیت بروزرسانی شد",
    data: updatedCourse,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id);

  if (!deletedCourse) {
    return next(new HandleERROR("دوره مورد نظر یافت نشد", 404));
  }

  // Clean up icon file if it was a file
  if (
    deletedCourse.icon &&
    !deletedCourse.icon.startsWith("<") &&
    !deletedCourse.icon.startsWith("default-")
  ) {
    const filePath = path.join(__dirname, "../../Public", deletedCourse.icon);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error("Error unlinking course icon:", err);
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: "دوره با موفقیت حذف شد",
    data: null,
  });
});
