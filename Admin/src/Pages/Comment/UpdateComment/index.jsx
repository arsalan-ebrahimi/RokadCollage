import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../Utils/axiosInstance";
import Notify from "../../../Utils/notify";
import Loading from "../../../Components/Loading";
import { DEFAULT_AVATARS } from "../../../Constants/defaultAvatars";
import { getImageUrl } from "../../../Utils/getImageUrl";
import {
  Button,
  Input,
  Textarea,
  Select,
  PageHeader,
  Card,
} from "../../../Components/UI";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const commentUpdateSchema = Yup.object({
  course: Yup.string()
    .matches(objectIdRegex, "انتخاب دوره معتبر الزامی است")
    .required("انتخاب دوره مرتبط الزامی است"),
  name: Yup.string()
    .matches(safeTextRegex, "نام نباید شامل کاراکترهای خاص باشد")
    .required("وارد کردن نام نویسنده نظر الزامی است"),
  role: Yup.string()
    .matches(safeTextRegex, "نقش نباید شامل کاراکترهای خاص باشد")
    .required("وارد کردن نقش فرد الزامی است"),
  job: Yup.string()
    .matches(safeTextRegex, "شغل نباید شامل کاراکترهای خاص باشد")
    .nullable()
    .notRequired(),
  comment: Yup.string()
    .min(3, "متن نظر باید حداقل ۳ کاراکتر باشد")
    .required("وارد کردن متن نظر الزامی است"),
  img: Yup.mixed().nullable().notRequired(),
});

export default function UpdateComment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [initialValues, setInitialValues] = useState({
    course: "",
    name: "",
    role: "",
    job: "",
    comment: "",
    img: "default-BoyStudent.png",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseRes, commentRes] = await Promise.all([
          axiosInstance.get("course?limit=100&fields=title,category"),
          axiosInstance.get(`comment/${id}`),
        ]);

        if (courseRes && courseRes.success !== false) {
          const cList = Array.isArray(courseRes) ? courseRes : courseRes.data || [];
          setCourses(cList);
        }

        let cData = null;
        if (commentRes && commentRes.data) {
          cData = Array.isArray(commentRes.data) ? commentRes.data[0] : commentRes.data;
        } else if (Array.isArray(commentRes)) {
          cData = commentRes[0];
        }

        if (cData) {
          const courseId = typeof cData.course === "object" ? cData.course?._id : cData.course;
          const currentImg = cData.img || "default-BoyStudent.png";
          setInitialValues({
            course: courseId || "",
            name: cData.name || "",
            role: cData.role || "",
            job: cData.job || "",
            comment: cData.comment || "",
            img: currentImg,
          });

          if (currentImg) {
            setImagePreview(getImageUrl(currentImg));
          }
        }
      } catch (error) {
        Notify.error(error.message || "خطا در بارگذاری اطلاعات نظر");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: commentUpdateSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        let finalImageName = values.img || "default-BoyStudent.png";

        if (values.img instanceof File) {
          const formData = new FormData();
          formData.append("file", values.img);

          const uploadData = await axiosInstance.post("upload", formData);

          if (!uploadData || !uploadData.success) {
            throw new Error(uploadData?.message || "آپلود تصویر با خطا مواجه شد");
          }
          finalImageName = uploadData.data;
        }

        const payload = {
          course: values.course,
          name: values.name,
          role: values.role,
          job: values.job ? values.job.trim() : "",
          comment: values.comment,
          img: finalImageName,
        };

        const response = await axiosInstance.patch(`comment/${id}`, payload);

        if (response && response.success !== false) {
          Notify.success("نظر با موفقیت بروزرسانی شد.");
          navigate("/comment");
        } else {
          throw new Error(response?.message || "ویرایش با خطا مواجه شد");
        }
      } catch (error) {
        Notify.error(error.message || "خطا در ویرایش نظر");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleCustomImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        Notify.error("فرمت فایل غیرمجاز است. فقط JPG, JPEG, PNG, SVG, WEBP مجاز است.");
        e.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        Notify.error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
        e.target.value = "";
        return;
      }
      if (file.name.toLowerCase().startsWith("default-") || file.name.toLowerCase().startsWith("default")) {
        Notify.error("نام فایل مجاز نیست. لطفاً نام فایل را تغییر دهید.");
        e.target.value = "";
        return;
      }
      formik.setFieldValue("img", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSelectDefaultAvatar = (filename) => {
    formik.setFieldValue("img", filename);
    setImagePreview(`/default-avatars/${filename}`);
  };

  const courseOptions = courses.map((c) => ({
    label: `${c.title} (${c.category})`,
    value: c._id,
  }));

  if (loading) {
    return (
      <div dir="rtl" className="flex justify-center items-center min-h-[70vh]">
        <Loading size={12} />
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-6 md:p-8 w-full bg-background min-h-screen">
      <PageHeader
        title="ویرایش نظر"
        subtitle="ویرایش محتوا و مشخصات نظر ثبت‌شده"
        backTo="/comment"
      />

      <Card className="p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div>
            <Select
              label="دوره آموزشی مرتبط"
              options={courseOptions}
              error={formik.touched.course && formik.errors.course}
              {...formik.getFieldProps("course")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="نام و نام خانوادگی فرد"
              error={formik.touched.name && formik.errors.name}
              {...formik.getFieldProps("name")}
            />

            <Input
              label="نقش فرد (متن آزاد)"
              error={formik.touched.role && formik.errors.role}
              {...formik.getFieldProps("role")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="شغل یا حرفه (اختیاری)"
              helperText="تکمیل این فیلد اختیاری است."
              error={formik.touched.job && formik.errors.job}
              {...formik.getFieldProps("job")}
            />
          </div>

          <Textarea
            label="متن نظر یا بازخورد"
            rows={4}
            error={formik.touched.comment && formik.errors.comment}
            {...formik.getFieldProps("comment")}
          />

          {/* Avatar / Image Selection Area (OPTIONAL) */}
          <div className="flex flex-col gap-3 border-t border-border/80 pt-5">
            <label className="text-xs md:text-sm font-semibold text-text-primary select-none">
              تصویر یا آواتار (اختیاری)
            </label>
            <p className="text-xs text-text-muted">
              می‌توانید یکی از آواتارهای پیش‌فرض زیر را انتخاب کرده یا عکس جدیدی آپلود کنید.
            </p>

            {/* Default Avatars List */}
            <div className="flex gap-3 flex-wrap items-center mt-1">
              {DEFAULT_AVATARS.map((avatar) => {
                const isSelected = formik.values.img === avatar.filename;
                return (
                  <div
                    key={`avatar-${avatar.id}`}
                    onClick={() => handleSelectDefaultAvatar(avatar.filename)}
                    title={avatar.alt}
                    className={`w-14 h-14 rounded-full cursor-pointer transition-all hover:scale-105 p-0.5 border-2 ${
                      isSelected
                        ? "border-primary shadow-sm ring-4 ring-primary/20 scale-105"
                        : "border-border hover:border-border-hover"
                    }`}
                  >
                    <img
                      src={`/default-avatars/${avatar.filename}`}
                      alt={avatar.alt}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                );
              })}
            </div>

            <span className="text-xs text-text-muted font-bold my-1">یا</span>

            {/* Custom Image Upload Input */}
            <div className="w-full md:w-1/2 h-32 border-2 border-dashed border-border hover:border-primary rounded-xl flex flex-col items-center justify-center gap-2 bg-bg-light/60 hover:bg-primary-light/30 transition-colors cursor-pointer relative overflow-hidden group">
              <input
                id="custom-img"
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/svg+xml, image/webp"
                onChange={handleCustomImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {imagePreview &&
              (formik.values.img instanceof File ||
                (typeof formik.values.img === "string" &&
                  !formik.values.img.startsWith("default-") &&
                  !formik.values.img.startsWith("default"))) ? (
                <>
                  <img
                    src={imagePreview}
                    alt="پیش‌نمایش تصویر انتخابی"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                    تغییر عکس اختصاصی
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                  <CloudUploadIcon className="text-primary" />
                  <p className="text-xs font-semibold text-text-secondary">
                    آپلود عکس جدید
                  </p>
                  <span className="text-[11px] text-text-muted">
                    فرمت‌های JPG، PNG، SVG یا WEBP (حداکثر ۵ مگابایت)
                  </span>
                </div>
              )}
            </div>

            {formik.touched.img && formik.errors.img && (
              <span className="text-xs text-error font-medium animate-fadeIn">
                {formik.errors.img}
              </span>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-border/80">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
            >
              ذخیره تغییرات نظر
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
