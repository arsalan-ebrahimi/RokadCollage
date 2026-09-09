import Joi from "joi";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCommentValidator = Joi.object({
  course: Joi.string()
    .pattern(objectIdRegex)
    .required()
    .messages({
      "string.base": "شناسه دوره باید یک شناسه معتبر باشد",
      "string.pattern.base": "شناسه دوره ارسال‌شده نامعتبر است",
      "any.required": "انتخاب دوره مرتبط الزامی است",
    }),
  comment: Joi.string()
    .min(3)
    .pattern(safeTextRegex)
    .required()
    .messages({
      "string.base": "متن کامنت باید یک متن باشد",
      "string.empty": "متن کامنت نمی‌تواند خالی باشد",
      "string.min": "متن کامنت باید حداقل ۳ کاراکتر باشد",
      "string.pattern.base": "متن کامنت نباید شامل کاراکترهای غیرمجاز باشد",
      "any.required": "وارد کردن متن نظر الزامی است",
    }),
  name: Joi.string()
    .pattern(safeTextRegex)
    .required()
    .messages({
      "string.base": "نام باید یک متن باشد",
      "string.empty": "نام فرد نمی‌تواند خالی باشد",
      "string.pattern.base": "نام نباید شامل کاراکترهای خاص باشد",
      "any.required": "وارد کردن نام نویسنده الزامی است",
    }),
  role: Joi.string()
    .pattern(safeTextRegex)
    .required()
    .messages({
      "string.base": "نقش باید یک متن باشد",
      "string.empty": "نقش فرد نمی‌تواند خالی باشد",
      "string.pattern.base": "نقش نباید شامل کاراکترهای خاص باشد",
      "any.required": "وارد کردن نقش فرد کامنت‌گذار الزامی است",
    }),
  job: Joi.string()
    .pattern(safeTextRegex)
    .allow("", null)
    .optional()
    .messages({
      "string.base": "شغل باید یک متن باشد",
      "string.pattern.base": "شغل نباید شامل کاراکترهای خاص باشد",
    }),
  img: Joi.string()
    .pattern(/\.(jpe?g|png|svg|webp)$/i)
    .messages({ "string.pattern.base": "پسوند فایل باید یکی از موارد JPG, JPEG, PNG, SVG, WEBP باشد" })
    .allow("", null)
    .optional()
    .messages({
      "string.base": "تصویر باید یک متن (نام فایل) باشد",
    }),
});

export const updateCommentValidator = Joi.object({
  course: Joi.string()
    .pattern(objectIdRegex)
    .messages({
      "string.base": "شناسه دوره باید یک شناسه معتبر باشد",
      "string.pattern.base": "شناسه دوره ارسال‌شده نامعتبر است",
    }),
  comment: Joi.string()
    .min(3)
    .pattern(safeTextRegex)
    .messages({
      "string.base": "متن کامنت باید یک متن باشد",
      "string.empty": "متن کامنت نمی‌تواند خالی باشد",
      "string.min": "متن کامنت باید حداقل ۳ کاراکتر باشد",
      "string.pattern.base": "متن کامنت نباید شامل کاراکترهای غیرمجاز باشد",
    }),
  name: Joi.string()
    .pattern(safeTextRegex)
    .messages({
      "string.base": "نام باید یک متن باشد",
      "string.empty": "نام فرد نمی‌تواند خالی باشد",
      "string.pattern.base": "نام نباید شامل کاراکترهای خاص باشد",
    }),
  role: Joi.string()
    .pattern(safeTextRegex)
    .messages({
      "string.base": "نقش باید یک متن باشد",
      "string.empty": "نقش فرد نمی‌تواند خالی باشد",
      "string.pattern.base": "نقش نباید شامل کاراکترهای خاص باشد",
    }),
  job: Joi.string()
    .pattern(safeTextRegex)
    .allow("", null)
    .optional()
    .messages({
      "string.base": "شغل باید یک متن باشد",
      "string.pattern.base": "شغل نباید شامل کاراکترهای خاص باشد",
    }),
  img: Joi.string()
    .pattern(/\.(jpe?g|png|svg|webp)$/i)
    .messages({ "string.pattern.base": "پسوند فایل باید یکی از موارد JPG, JPEG, PNG, SVG, WEBP باشد" })
    .allow("", null)
    .optional()
    .messages({
      "string.base": "تصویر باید یک متن (نام فایل) باشد",
    }),
});
