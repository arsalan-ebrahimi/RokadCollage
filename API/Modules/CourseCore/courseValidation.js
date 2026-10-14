import Joi from "joi";
import {
    safeTextRegex,
    objectIdRegex,
    hex24Regex,
    VALID_IMAGE_EXT_REGEX,
} from "../../Utils/validateRequest.js";

export { safeTextRegex, objectIdRegex, hex24Regex };

export const categoryEnum = ["فناوری اطلاعات", "گرافیک", "زبان", "MBA"];

export const timedDiscountSchema = Joi.object({
    percentage: Joi.number().min(0).max(100).optional().default(0).messages({
        "number.base": "درصد تخفیف باید عدد باشد",
        "number.min": "درصد تخفیف نمی‌تواند منفی باشد",
        "number.max": "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد",
    }),
    startDate: Joi.alternatives().try(Joi.date(), Joi.string().allow("", null)).optional(),
    endDate: Joi.alternatives().try(Joi.date(), Joi.string().allow("", null)).optional(),
});

export const discountCodeItemSchema = Joi.object({
    _id: Joi.string().optional(),
    code: Joi.string().trim().required().messages({
        "string.empty": "وارد کردن کد تخفیف الزامی است",
        "any.required": "وارد کردن کد تخفیف الزامی است",
    }),
    title: Joi.string().trim().allow("").optional(),
    percentage: Joi.number().min(0).max(100).required().messages({
        "number.base": "درصد تخفیف باید عدد باشد",
        "number.min": "درصد تخفیف نمی‌تواند منفی باشد",
        "number.max": "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد",
        "any.required": "وارد کردن درصد تخفیف الزامی است",
    }),
    startDate: Joi.alternatives().try(Joi.date(), Joi.string().allow("", null)).optional(),
    endDate: Joi.alternatives().try(Joi.date(), Joi.string().allow("", null)).optional(),
    isActive: Joi.boolean().default(true).optional(),
});

export const sprintItemSchema = Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().trim().required().messages({
        "string.empty": "عنوان اسپرینت نمی‌تواند خالی باشد",
        "any.required": "وارد کردن عنوان اسپرینت الزامی است",
    }),
    description: Joi.string().trim().required().messages({
        "string.empty": "توضیحات اسپرینت نمی‌تواند خالی باشد",
        "any.required": "وارد کردن توضیحات اسپرینت الزامی است",
    }),
});

export const resourceItemSchema = Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().trim().required().messages({
        "string.empty": "عنوان منبع نمی‌تواند خالی باشد",
        "any.required": "وارد کردن عنوان منبع الزامی است",
    }),
    type: Joi.string().trim().allow("").optional().default("ZIP"),
    size: Joi.string().trim().allow("").optional().default(""),
    url: Joi.string().trim().allow("").optional().default(""),
});


/**
 * Common Joi fields for course creation.
 */
export const baseCourseCreateFields = {
    category: Joi.string()
        .valid(...categoryEnum)
        .required()
        .messages({
            "any.only": "دسته‌بندی باید یکی از موارد: فناوری اطلاعات، گرافیک، زبان یا MBA باشد",
            "string.empty": "دسته‌بندی دوره نمی‌تواند خالی باشد",
            "any.required": "انتخاب دسته‌بندی دوره الزامی است",
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
    img: Joi.string()
        .pattern(VALID_IMAGE_EXT_REGEX)
        .required()
        .messages({
            "string.base": "تصویر دوره باید یک آدرس معتبر باشد",
            "string.empty": "تصویر دوره نمی‌تواند خالی باشد",
            "string.pattern.base": "پسوند فایل تصویر باید یکی از موارد JPG, JPEG, PNG, SVG, WEBP باشد",
            "any.required": "ارسال تصویر دوره الزامی است",
        }),
    price: Joi.number().min(0).optional().default(0),
    timedDiscount: timedDiscountSchema.optional(),
    discountCodes: Joi.array().items(discountCodeItemSchema).optional().default([]),
    teachers: Joi.array().items(Joi.string().pattern(objectIdRegex)).optional().default([]),
    sprints: Joi.array().items(sprintItemSchema).optional().default([]),
    resources: Joi.array().items(resourceItemSchema).optional().default([]),
};

/**
 * Common Joi fields for course update.
 */
export const baseCourseUpdateFields = {
    category: Joi.string()
        .valid(...categoryEnum)
        .messages({
            "any.only": "دسته‌بندی باید یکی از موارد: فناوری اطلاعات، گرافیک، زبان یا MBA باشد",
            "string.empty": "دسته‌بندی دوره نمی‌تواند خالی باشد",
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
    img: Joi.string()
        .pattern(VALID_IMAGE_EXT_REGEX)
        .messages({
            "string.base": "تصویر دوره باید یک آدرس معتبر باشد",
            "string.empty": "تصویر دوره نمی‌تواند خالی باشد",
            "string.pattern.base": "پسوند فایل تصویر باید یکی از موارد JPG, JPEG, PNG, SVG, WEBP باشد",
        }),
    price: Joi.number().min(0).optional(),
    timedDiscount: timedDiscountSchema.optional(),
    discountCodes: Joi.array().items(discountCodeItemSchema).optional(),
    teachers: Joi.array().items(Joi.string().pattern(objectIdRegex)).optional(),
    sprints: Joi.array().items(sprintItemSchema).optional(),
    resources: Joi.array().items(resourceItemSchema).optional(),
};
