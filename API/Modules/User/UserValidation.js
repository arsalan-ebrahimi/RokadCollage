import Joi from "joi";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;

export const updateUserValidator = Joi.object({
  fullName: Joi.string()
    .pattern(safeTextRegex)
    .messages({ "string.pattern.base": "این فیلد نباید شامل کاراکترهای خاص و غیرمجاز باشد" })
    .allow("")
    .messages({
      "string.base": "نام و نام خانوادگی باید یک متن باشد",
    }),
  password: Joi.string().min(6).messages({
    "string.min": "رمز عبور باید حداقل ۶ کاراکتر باشد",
  }),
  birthDate: Joi.string()
    .pattern(safeTextRegex)
    .messages({ "string.pattern.base": "این فیلد نباید شامل کاراکترهای خاص و غیرمجاز باشد" })
    .allow("")
    .messages({
      "string.base": "تاریخ تولد باید یک متن باشد",
    }),
  role: Joi.string()
    .valid("user", "admin", "superAdmin")
    .messages({
      "any.only": "نقش کاربر نامعتبر است",
    }),
});
