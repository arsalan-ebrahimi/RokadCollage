import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Blog from "./BlogMd.js";
import { removePublicFile } from "../../Utils/fileHelper.js";
import { sanitizeBlogHtml } from "../../Utils/htmlSanitizer.js";

/**
 * Preview sanitized HTML before publishing or updating.
 */
export const preview = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const cleanHtml = sanitizeBlogHtml(content || "");

  return res.status(200).json({
    success: true,
    data: {
      html: cleanHtml,
    },
  });
});

/**
 * Create a new blog post with sanitized HTML content.
 */
export const create = catchAsync(async (req, res, next) => {
  const { category, title, description, content, img } = req.body;

  const trimmedTitle = typeof title === "string" ? title.trim() : "";
  const existingBlog = await Blog.findOne({ title: trimmedTitle });
  if (existingBlog) {
    return next(new HandleERROR("مقاله‌ای با این عنوان قبلاً ثبت شده است", 400));
  }

  const cleanContent = sanitizeBlogHtml(content);

  const newBlog = await Blog.create({
    category,
    title: trimmedTitle,
    description,
    content: cleanContent,
    img,
  });

  return res.status(201).json({
    success: true,
    message: "مقاله با موفقیت ایجاد شد",
    data: newBlog,
  });
});

/**
 * Retrieve paginated list of blog articles (content field excluded by default).
 */
export const getAll = catchAsync(async (req, res, next) => {
  // Exclude heavy content field by default in list view unless explicitly requested
  if (!req.query.fields) {
    req.query.fields = "-content";
  }

  // Remove empty category filter to prevent matching nothing
  if (req.query.category === "" || req.query.category === null) {
    delete req.query.category;
  }

  // Escape regex special characters in search query to prevent NoSQL regex injection
  if (req.query.q && typeof req.query.q === "string") {
    const trimmed = req.query.q.trim();
    if (trimmed) {
      req.query.q = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    } else {
      delete req.query.q;
    }
  } else if (req.query.q === "") {
    delete req.query.q;
  }

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

/**
 * Retrieve full blog post details including full sanitized content.
 */
export const getOne = catchAsync(async (req, res, next) => {
  const doc = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!doc) {
    return next(new HandleERROR("مقاله مورد نظر یافت نشد", 404));
  }

  return res.status(200).json({
    success: true,
    data: doc,
  });
});

/**
 * Update an existing blog post and re-sanitize content if provided.
 */
export const update = catchAsync(async (req, res, next) => {
  const allowedUpdates = ["category", "title", "description", "content", "img"];
  const updates = {};

  allowedUpdates.forEach((key) => {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  });

  const oldBlog = await Blog.findById(req.params.id);
  if (!oldBlog) {
    return next(new HandleERROR("مقاله مورد نظر یافت نشد", 404));
  }

  if (updates.title && typeof updates.title === "string") {
    updates.title = updates.title.trim();
    if (updates.title !== oldBlog.title) {
      const duplicate = await Blog.findOne({
        title: updates.title,
        _id: { $ne: req.params.id },
      });
      if (duplicate) {
        return next(new HandleERROR("مقاله‌ای با این عنوان قبلاً ثبت شده است", 400));
      }
    }
  }

  if (updates.content !== undefined) {
    updates.content = sanitizeBlogHtml(updates.content);
  }

  // If image changed, safely unlink previous image file from Public
  if (updates.img && updates.img !== oldBlog.img) {
    removePublicFile(oldBlog.img);
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

/**
 * Delete a blog post and remove its associated cover image file.
 */
export const remove = catchAsync(async (req, res, next) => {
  const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
  if (!deleteBlog) {
    return next(new HandleERROR("مقاله مورد نظر یافت نشد", 404));
  }

  if (deleteBlog.img) {
    removePublicFile(deleteBlog.img);
  }

  return res.status(200).json({
    success: true,
    message: "مقاله با موفقیت حذف شد",
    data: null,
  });
});
