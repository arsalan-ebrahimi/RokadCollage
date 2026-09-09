import Joi from "joi";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;

const blogCategoryEnum = ["گرافیک", "مسیر شغلی", "MBA", "زبان", "فرانتاند", "بکاند"];

export const createBlogValidator = Joi.object({
  category: Joi.string()
    .valid(...blogCategoryEnum)
    .required()
    .messages({
      "any.only": "دسته‌بندی باید یکی از موارد: گرافیک، مسیر شغلی، MBA، زبان، فرانتاند یا بکاند باشد",
      "string.empty": "دسته‌بندی بلاگ نمی‌تواند خالی باشد",
      "any.required": "انتخاب دسته‌بندی بلاگ الزامی است",
    }),
  title: Joi.string()
    .pattern(safeTextRegex)
    .required()
    .messages({
      "string.base": "عنوان باید یک متن باشد",
      "string.empty": "عنوان بلاگ نمی‌تواند خالی باشد",
      "string.pattern.base": "عنوان بلاگ نباید شامل کاراکترهای خاص باشد",
      "any.required": "وارد کردن عنوان بلاگ الزامی است",
    }),
  description: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.base": "توضیحات باید یک متن باشد",
      "string.empty": "توضیحات بلاگ نمی‌تواند خالی باشد",
      "string.min": "توضیحات باید حداقل ۱۰ کاراکتر باشد",
      "any.required": "وارد کردن توضیحات بلاگ الزامی است",
    }),
  img: Joi.string()
    .pattern(/\.(jpe?g|png|svg|webp)$/i)
    .required()
    .messages({
      "string.base": "تصویر باید یک آدرس معتبر باشد",
      "string.empty": "تصویر نمی‌تواند خالی باشد",
      "string.pattern.base": "پسوند فایل باید یکی از موارد JPG, JPEG, PNG, SVG, WEBP باشد",
      "any.required": "ارسال تصویر شاخص بلاگ الزامی است",
    }),
});

export const updateBlogValidator = Joi.object({
  category: Joi.string()
    .valid(...blogCategoryEnum)
    .messages({
      "any.only": "دسته‌بندی باید یکی از موارد: گرافیک، مسیر شغلی، MBA، زبان، فرانتاند یا بکاند باشد",
      "string.empty": "دسته‌بندی بلاگ نمی‌تواند خالی باشد",
    }),
  title: Joi.string()
    .pattern(safeTextRegex)
    .messages({
      "string.base": "عنوان باید یک متن باشد",
      "string.empty": "عنوان بلاگ نمی‌تواند خالی باشد",
      "string.pattern.base": "عنوان بلاگ نباید شامل کاراکترهای خاص باشد",
    }),
  description: Joi.string()
    .min(10)
    .messages({
      "string.base": "توضیحات باید یک متن باشد",
      "string.empty": "توضیحات بلاگ نمی‌تواند خالی باشد",
      "string.min": "توضیحات باید حداقل ۱۰ کاراکتر باشد",
    }),
  img: Joi.string()
    .pattern(/\.(jpe?g|png|svg|webp)$/i)
    .messages({
      "string.base": "تصویر باید یک آدرس معتبر باشد",
      "string.empty": "تصویر نمی‌تواند خالی باشد",
      "string.pattern.base": "پسوند فایل باید یکی از موارد JPG, JPEG, PNG, SVG, WEBP باشد",
    }),
});
