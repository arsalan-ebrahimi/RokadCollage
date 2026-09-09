import React, { useState } from "react";
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../../Utils/axiosInstance";
import Notify from "../../../Utils/notify";
import {
  Button,
  Input,
  Textarea,
  Select,
  PageHeader,
  Card,
  SvgIconInput,
} from "../../../Components/UI";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;

const courseValidationSchema = Yup.object({
  category: Yup.string()
    .oneOf(["فناوری اطلاعات", "گرافیک", "زبان", "MBA"], "انتخاب دسته‌بندی معتبر الزامی است")
    .required("انتخاب دسته‌بندی دوره الزامی است"),
  type: Yup.string()
    .oneOf(["حضوری", "مجازی"], "انتخاب نوع برگزاری الزامی است")
    .required("انتخاب نوع برگزاری الزامی است"),
  title: Yup.string()
    .matches(safeTextRegex, "عنوان نباید شامل کاراکترهای خاص باشد")
    .required("وارد کردن عنوان دوره الزامی است"),
  duration: Yup.string()
    .matches(safeTextRegex, "مدت دوره نباید شامل کاراکترهای غیرمجاز باشد")
    .required("وارد کردن مدت دوره الزامی است"),
  description: Yup.string()
    .min(5, "توضیحات باید حداقل ۵ کاراکتر باشد")
    .required("وارد کردن توضیحات دوره الزامی است"),
  tags: Yup.array().of(Yup.string()),
  icon: Yup.mixed().required("ارسال کد SVG یا فایل آیکون دوره الزامی است"),
});

export default function CreateCourse() {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      category: "",
      type: "",
      title: "",
      duration: "",
      description: "",
      tags: [],
      icon: "",
    },
    validationSchema: courseValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        let finalIcon = values.icon;

        if (values.icon instanceof File) {
          const formData = new FormData();
          formData.append("file", values.icon);

          const uploadData = await axiosInstance.post("upload", formData);

          if (!uploadData || !uploadData.success) {
            throw new Error(uploadData?.message || "آپلود فایل آیکون با خطا مواجه شد");
          }

          finalIcon = uploadData.data;
        }

        const coursePayload = {
          category: values.category,
          type: values.type,
          title: values.title,
          duration: values.duration,
          description: values.description,
          tags: values.tags,
          icon: finalIcon,
        };

        const courseData = await axiosInstance.post("course", coursePayload);

        if (courseData && courseData.success) {
          Notify.success("دوره با موفقیت ثبت و ایجاد شد.");
          navigate("/course");
        } else {
          throw new Error(courseData?.message || "ثبت دوره با خطا مواجه شد");
        }
      } catch (error) {
        Notify.error(error.message || "خطا در ثبت دوره");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const categoryOptions = [
    { label: "فناوری اطلاعات", value: "فناوری اطلاعات" },
    { label: "گرافیک", value: "گرافیک" },
    { label: "زبان", value: "زبان" },
    { label: "MBA", value: "MBA" },
  ];

  const typeOptions = [
    { label: "حضوری", value: "حضوری" },
    { label: "مجازی", value: "مجازی" },
  ];

  return (
    <div dir="rtl" className="p-6 md:p-8 w-full bg-background min-h-screen">
      <PageHeader
        title="افزودن دوره آموزشی جدید"
        subtitle="تعریف مشخصات، دسته‌بندی، مدت و آیکون دوره"
        backTo="/course"
      />

      <Card className="p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            {/* Category & Type Selects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Select
                label="دسته‌بندی دوره"
                placeholder="انتخاب دسته‌بندی"
                options={categoryOptions}
                error={formik.touched.category && formik.errors.category}
                {...formik.getFieldProps("category")}
              />

              <Select
                label="نوع برگزاری"
                placeholder="انتخاب نوع برگزاری"
                options={typeOptions}
                error={formik.touched.type && formik.errors.type}
                {...formik.getFieldProps("type")}
              />
            </div>

            {/* Title & Duration Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="عنوان دوره"
                placeholder="مثال: آموزش جامع ری‌اکت و نکست‌جی‌اس"
                error={formik.touched.title && formik.errors.title}
                {...formik.getFieldProps("title")}
              />

              <Input
                label="مدت دوره"
                placeholder="مثال: ۱۲ هفته (یا ۳ ماه)"
                error={formik.touched.duration && formik.errors.duration}
                {...formik.getFieldProps("duration")}
              />
            </div>

            {/* Tags FieldArray Implementation */}
            <FieldArray name="tags">
              {({ push, remove }) => {
                const handleAddTag = (e) => {
                  e.preventDefault();
                  const trimmed = tagInput.trim();
                  if (trimmed && !formik.values.tags.includes(trimmed)) {
                    push(trimmed);
                    setTagInput("");
                  }
                };

                return (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-sm font-semibold text-text-primary select-none">
                      تگ‌ها و کلیدواژه‌های دوره
                    </label>

                    <div className="flex items-center gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="یک تگ بنویسید (مثال: React, JS, فرانت‌اند) و افزودن را بزنید"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag(e);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="primary-subtle"
                        size="md"
                        icon={<AddIcon fontSize="small" />}
                        onClick={handleAddTag}
                      >
                        افزودن تگ
                      </Button>
                    </div>

                    {/* Render active tags as removable pills */}
                    <div className="flex flex-wrap gap-2 mt-2 min-h-[36px] p-2.5 bg-bg-light/60 rounded-xl border border-border/60">
                      {formik.values.tags.length > 0 ? (
                        formik.values.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1.5 bg-surface text-secondary px-3 py-1 rounded-xl text-xs font-semibold border border-border shadow-2xs"
                          >
                            <span>#{tag}</span>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-text-muted hover:text-error transition-colors cursor-pointer"
                              title="حذف تگ"
                            >
                              <CloseIcon style={{ fontSize: "0.9rem" }} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-text-muted self-center">
                          هنوز تگی اضافه نشده است. تگ‌های دوره به جستجوی بهتر کمک می‌کنند.
                        </span>
                      )}
                    </div>
                  </div>
                );
              }}
            </FieldArray>

            {/* Description Textarea */}
            <Textarea
              label="توضیحات دوره"
              rows={4}
              placeholder="توضیحات جامع درباره سرفصل‌ها و مباحث آموزشی این دوره..."
              error={formik.touched.description && formik.errors.description}
              {...formik.getFieldProps("description")}
            />

            {/* Dedicated SVG Icon Section (Direct Code with live preview & references or file upload) */}
            <div className="border-t border-border/80 pt-5">
              <SvgIconInput
                value={formik.values.icon}
                onChange={(val) => formik.setFieldValue("icon", val)}
                error={formik.touched.icon && formik.errors.icon}
              />
            </div>

            {/* Submit Action */}
            <div className="flex justify-end pt-4 border-t border-border/80">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                ثبت و ایجاد دوره
              </Button>
            </div>
          </form>
        </FormikProvider>
      </Card>
    </div>
  );
}
