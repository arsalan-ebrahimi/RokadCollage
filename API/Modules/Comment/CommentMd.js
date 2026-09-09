import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "انتخاب دوره مرتبط الزامی است"],
    },
    comment: {
      type: String,
      required: [true, "وارد کردن متن نظر الزامی است"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "وارد کردن نام نویسنده الزامی است"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "وارد کردن نقش فرد کامنت‌گذار الزامی است"],
      trim: true,
    },
    job: {
      type: String,
      trim: true,
      default: "",
    },
    img: {
      type: String,
      default: "default-BoyStudent.png",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
