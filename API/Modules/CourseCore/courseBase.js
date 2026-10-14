import mongoose from "mongoose";

/**
 * Shared fields definition for both InPersonCourse and VirtualCourse models.
 */
export const commonCourseFields = {
    slug: {
        type: String,
        trim: true,
        index: true,
    },
    category: {
        type: String,
        required: [true, "انتخاب دسته‌بندی دوره الزامی است"],
        enum: {
            values: ["فناوری اطلاعات", "گرافیک", "زبان", "MBA"],
            message: "دسته‌بندی دوره نامعتبر است (مجاز: فناوری اطلاعات، گرافیک، زبان، MBA)",
        },
    },
    tags: {
        type: [String],
        default: [],
    },
    title: {
        type: String,
        required: [true, "وارد کردن عنوان دوره الزامی است"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "وارد کردن توضیحات دوره الزامی است"],
    },
    duration: {
        type: String,
        required: [true, "وارد کردن مدت دوره الزامی است"],
        trim: true,
    },
    img: {
        type: String,
        required: [true, "آپلود تصویر دوره الزامی است"],
    },
    price: {
        type: Number,
        default: 0,
        min: [0, "قیمت دوره نمی‌تواند منفی باشد"],
    },
    timedDiscount: {
        percentage: {
            type: Number,
            default: 0,
            min: [0, "درصد تخفیف نمی‌تواند منفی باشد"],
            max: [100, "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد"],
        },
        startDate: {
            type: Date,
            default: null,
        },
        endDate: {
            type: Date,
            default: null,
        },
    },
    discountCodes: [
        {
            code: {
                type: String,
                required: [true, "وارد کردن کد تخفیف الزامی است"],
                trim: true,
            },
            title: {
                type: String,
                trim: true,
                default: "",
            },
            percentage: {
                type: Number,
                required: [true, "وارد کردن درصد تخفیف الزامی است"],
                min: [0, "درصد تخفیف نمی‌تواند منفی باشد"],
                max: [100, "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد"],
            },
            startDate: {
                type: Date,
                default: null,
            },
            endDate: {
                type: Date,
                default: null,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        },
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    sprints: [
        {
            title: {
                type: String,
                required: [true, "عنوان اسپرینت الزامی است"],
                trim: true,
            },
            description: {
                type: String,
                required: [true, "توضیحات اسپرینت الزامی است"],
                trim: true,
            },
        },
    ],
    resources: [
        {
            title: {
                type: String,
                required: [true, "عنوان منبع الزامی است"],
                trim: true,
            },
            type: {
                type: String,
                default: "ZIP",
            },
            size: {
                type: String,
                default: "",
            },
            url: {
                type: String,
                default: "",
            },
        },
    ],
};

/**
 * Creates a Mongoose schema by combining shared course fields with model-specific fields.
 *
 * @param {Object} specificFields - Additional fields unique to InPerson or Virtual course.
 * @param {String} fixedType - Constant type ("حضوری" or "مجازی")
 * @returns {mongoose.Schema}
 */
export function createCourseSchema(specificFields = {}, fixedType) {
    const schema = new mongoose.Schema(
        {
            ...commonCourseFields,
            type: {
                type: String,
                required: true,
                default: fixedType,
                enum: [fixedType],
                immutable: true,
            },
            ...specificFields,
        },
        {
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        }
    );

    // Common indexes for high-frequency queries
    schema.index({ category: 1, createdAt: -1 });
    schema.index({ price: 1 });

    return schema;
}

