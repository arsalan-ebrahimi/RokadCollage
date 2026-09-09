import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "انتخاب دسته‌بندی دوره الزامی است"],
      enum: {
        values: ["فناوری اطلاعات", "گرافیک", "زبان", "MBA"],
        message: "دسته‌بندی دوره نامعتبر است (مجاز: فناوری اطلاعات، گرافیک، زبان، MBA)",
      },
    },
    type: {
      type: String,
      required: [true, "انتخاب نوع برگزاری دوره الزامی است"],
      enum: {
        values: ["حضوری", "مجازی"],
        message: "نوع برگزاری دوره نامعتبر است (مجاز: حضوری، مجازی)",
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
    icon: {
      type: String,
      required: [true, "آپلود فایل آیکون (SVG) دوره الزامی است"],
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
