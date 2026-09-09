import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Blog from "./BlogMd.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const create = catchAsync(async (req, res, next) => {
  const { category, title, description, img } = req.body;

  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    return next(new HandleERROR("مقاله‌ای با این عنوان قبلاً ثبت شده است", 400));
  }

  const newBlog = await Blog.create({ category, title, description, img });

  return res.status(201).json({
    success: true,
    message: "مقاله با موفقیت ایجاد شد",
    data: newBlog,
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Blog, req.query, req.role)
    .filter()
    .search(["title", "description", "category"])
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Blog, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .limitFields()
    .populate();

  const result = await features.execute();

  const doc = Array.isArray(result) ? result[0] : result?.data ? result.data[0] : result;

  if (!doc) {
    return next(new HandleERROR("مقاله مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    data: doc,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const allowedUpdates = ["category", "title", "description", "img"];
  const updates = {};

  Object.keys(req.body).forEach((el) => {
    if (allowedUpdates.includes(el)) updates[el] = req.body[el];
  });

  const oldBlog = await Blog.findById(req.params.id);
  if (!oldBlog) {
    return next(new HandleERROR("مقاله مورد نظر یافت نشد", 404));
  }

  // If image changed, unlink previous image file from Public
  if (updates.img && updates.img !== oldBlog.img && !oldBlog.img.startsWith("default-")) {
    const filePath = path.join(__dirname, "../../Public", oldBlog.img);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "مقاله با موفقیت بروزرسانی شد",
    data: updatedBlog,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const deleteBlog = await Blog.findByIdAndDelete(req.params.id);

  if (!deleteBlog) {
    return next(new HandleERROR("مقاله مورد نظر یافت نشد", 404));
  }

  // Clean up image file
  if (deleteBlog.img && !deleteBlog.img.startsWith("default-")) {
    const filePath = path.join(__dirname, "../../Public", deleteBlog.img);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  return res.status(200).json({
    success: true,
    message: "مقاله با موفقیت حذف شد",
    data: null,
  });
});
