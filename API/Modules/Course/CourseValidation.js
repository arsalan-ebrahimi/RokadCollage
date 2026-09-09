import Joi from "joi";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;

const categoryEnum = ["فناوری اطلاعات", "گرافیک", "زبان", "MBA"];
const typeEnum = ["حضوری", "مجازی"];

export const createCourseValidator = Joi.object({
  category: Joi.string()
    .valid(...categoryEnum)
    .required()
    .messages({
      "any.only": "دسته‌بندی باید یکی از موارد: فناوری اطلاعات، گرافیک، زبان یا MBA باشد",
      "string.empty": "دسته‌بندی دوره نمی‌تواند خالی باشد",
      "any.required": "انتخاب دسته‌بندی دوره الزامی است",
    }),
  type: Joi.string()
    .valid(...typeEnum)
    .required()
    .messages({
      "any.only": "نوع برگزاری باید «حضوری» یا «مجازی» باشد",
      "string.empty": "نوع برگزاری دوره نمی‌تواند خالی باشد",
      "any.required": "انتخاب نوع برگزاری دوره الزامی است",
    }),
  tags: Joi.array()
    .items(Joi.string().pattern(safeTextRegex).messages({ "string.pattern.base": "تگ نباید شامل کاراکترهای خاص باشد" }))
    .default([])
    .messages({
      "array.base": "تگ‌ها باید به صورت آرایه ارسال شوند",
    }),
  title: Joi.string()
    .pattern(safeTextRegex)
    .required()
    .messages({
      "string.base": "عنوان باید یک متن باشد",
      "string.empty": "عنوان دوره نمی‌تواند خالی باشد",
      "string.pattern.base": "عنوان دوره نباید شامل کاراکترهای خاص باشد",
      "any.required": "وارد کردن عنوان دوره الزامی است",
    }),
  description: Joi.string()
    .min(5)
    .required()
    .messages({
      "string.base": "توضیحات باید یک متن باشد",
      "string.empty": "توضیحات دوره نمی‌تواند خالی باشد",
      "string.min": "توضیحات دوره باید حداقل ۵ کاراکتر باشد",
      "any.required": "وارد کردن توضیحات دوره الزامی است",
    }),
  duration: Joi.string()
    .pattern(safeTextRegex)
    .required()
    .messages({
      "string.base": "مدت دوره باید یک متن باشد (مثال: ۱۲ هفته)",
      "string.empty": "مدت دوره نمی‌تواند خالی باشد",
      "string.pattern.base": "مدت دوره نباید شامل کاراکترهای غیرمجاز باشد",
      "any.required": "وارد کردن مدت دوره الزامی است",
    }),
  icon: Joi.string()
    .custom((value, helpers) => {
      if (typeof value !== "string" || !value.trim()) {
        return helpers.message("آیکون دوره الزامی است");
      }
      const val = value.trim();
      const isSvgFile = /\.svg$/i.test(val);
      const isSvgCode = val.startsWith("<svg") || /<svg[\s\S]*<\/svg>/i.test(val);
      if (!isSvgFile && !isSvgCode) {
        return helpers.message("آیکون باید فایل با پسوند SVG (.svg) یا کُد معتبر تگ <svg> باشد");
      }
      return value;
    })
    .required()
    .messages({
      "string.base": "آیکون باید یک متن یا کُد SVG معتبر باشد",
      "string.empty": "آیکون نمی‌تواند خالی باشد",
      "any.required": "ارسال آیکون SVG الزامی است",
    }),
});

export const updateCourseValidator = Joi.object({
  category: Joi.string()
    .valid(...categoryEnum)
    .messages({
      "any.only": "دسته‌بندی باید یکی از موارد: فناوری اطلاعات، گرافیک، زبان یا MBA باشد",
      "string.empty": "دسته‌بندی دوره نمی‌تواند خالی باشد",
    }),
  type: Joi.string()
    .valid(...typeEnum)
    .messages({
      "any.only": "نوع برگزاری باید «حضوری» یا «مجازی» باشد",
      "string.empty": "نوع برگزاری دوره نمی‌تواند خالی باشد",
    }),
  tags: Joi.array()
    .items(Joi.string().pattern(safeTextRegex).messages({ "string.pattern.base": "تگ نباید شامل کاراکترهای خاص باشد" }))
    .messages({
      "array.base": "تگ‌ها باید به صورت آرایه ارسال شوند",
    }),
  title: Joi.string()
    .pattern(safeTextRegex)
    .messages({
      "string.base": "عنوان باید یک متن باشد",
      "string.empty": "عنوان دوره نمی‌تواند خالی باشد",
      "string.pattern.base": "عنوان دوره نباید شامل کاراکترهای خاص باشد",
    }),
  description: Joi.string()
    .min(5)
    .messages({
      "string.base": "توضیحات باید یک متن باشد",
      "string.empty": "توضیحات دوره نمی‌تواند خالی باشد",
      "string.min": "توضیحات دوره باید حداقل ۵ کاراکتر باشد",
    }),
  duration: Joi.string()
    .pattern(safeTextRegex)
    .messages({
      "string.base": "مدت دوره باید یک متن باشد (مثال: ۱۲ هفته)",
      "string.empty": "مدت دوره نمی‌تواند خالی باشد",
      "string.pattern.base": "مدت دوره نباید شامل کاراکترهای غیرمجاز باشد",
    }),
  icon: Joi.string()
    .custom((value, helpers) => {
      if (typeof value !== "string" || !value.trim()) {
        return helpers.message("آیکون دوره نمی‌تواند خالی باشد");
      }
      const val = value.trim();
      const isSvgFile = /\.svg$/i.test(val);
      const isSvgCode = val.startsWith("<svg") || /<svg[\s\S]*<\/svg>/i.test(val);
      if (!isSvgFile && !isSvgCode) {
        return helpers.message("آیکون باید فایل با پسوند SVG (.svg) یا کُد معتبر تگ <svg> باشد");
      }
      return value;
    })
    .messages({
      "string.base": "آیکون باید یک متن یا کُد SVG معتبر باشد",
      "string.empty": "آیکون نمی‌تواند خالی باشد",
    }),
});
