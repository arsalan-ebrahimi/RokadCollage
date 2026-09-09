import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "انتخاب دسته‌بندی بلاگ الزامی است"],
      enum: {
        values: ["گرافیک", "مسیر شغلی", "MBA", "زبان", "فرانتاند", "بکاند"],
        message: "دسته‌بندی بلاگ نامعتبر است (مجاز: گرافیک، مسیر شغلی، MBA، زبان، فرانتاند، بکاند)",
      },
    },
    title: {
      type: String,
      unique: true,
      required: [true, "وارد کردن عنوان بلاگ الزامی است"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "وارد کردن توضیحات بلاگ الزامی است"],
    },
    img: {
      type: String,
      required: [true, "ارسال تصویر شاخص بلاگ الزامی است"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
