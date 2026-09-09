import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Utils/axiosInstance";
import Notify from "../../../Utils/notify";
import {
  Button,
  Input,
  Textarea,
  Select,
  PageHeader,
  Card,
  ImageUpload,
} from "../../../Components/UI";

const safeTextRegex = /^[\u0600-\u06FF\sA-Za-z0-9\-\_،؛؟!.:«»",;?()\u200c\u200d]+$/;

const blogValidationSchema = Yup.object({
  category: Yup.string()
    .oneOf(
      ["گرافیک", "مسیر شغلی", "MBA", "زبان", "فرانتاند", "بکاند"],
      "انتخاب دسته‌بندی معتبر الزامی است"
    )
    .required("انتخاب دسته‌بندی مرتبط با دوره الزامی است"),
  title: Yup.string()
    .matches(safeTextRegex, "عنوان نباید شامل کاراکترهای خاص باشد")
    .required("وارد کردن عنوان بلاگ الزامی است"),
  description: Yup.string()
    .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد")
    .required("وارد کردن توضیحات بلاگ الزامی است"),
  img: Yup.mixed().required("انتخاب تصویر شاخص بلاگ الزامی است"),
});

export default function CreateBlog() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { label: "گرافیک", value: "گرافیک" },
    { label: "مسیر شغلی", value: "مسیر شغلی" },
    { label: "MBA", value: "MBA" },
    { label: "زبان", value: "زبان" },
    { label: "فرانتاند", value: "فرانتاند" },
    { label: "بکاند", value: "بکاند" },
  ];

  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      description: "",
      img: null,
    },
    validationSchema: blogValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("file", values.img);

        const uploadData = await axiosInstance.post("upload", formData);

        if (!uploadData || !uploadData.success) {
          throw new Error(uploadData?.message || "آپلود تصویر با خطا مواجه شد");
        }

        const uploadedFilename = uploadData.data;

        const blogPayload = {
          category: values.category,
          title: values.title,
          description: values.description,
          img: uploadedFilename,
        };

        const blogData = await axiosInstance.post("blog", blogPayload);

        if (blogData && blogData.success) {
          Notify.success("مقاله بلاگ با موفقیت ثبت و منتشر شد.");
          navigate("/blog");
        } else {
          throw new Error(blogData?.message || "ثبت بلاگ با خطا مواجه شد");
        }
      } catch (error) {
        Notify.error(error.message || "خطا در ثبت بلاگ");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageSelect = (file) => {
    formik.setFieldValue("img", file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div dir="rtl" className="p-6 md:p-8 w-full bg-background min-h-screen">
      <PageHeader
        title="افزودن بلاگ جدید"
        subtitle="نگارش و انتشار مقاله آموزشی در وبلاگ کالج"
        backTo="/blog"
      />

      <Card className="p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="دسته‌بندی مرتبط با دوره"
              placeholder="انتخاب حوزه موضوعی"
              options={categoryOptions}
              error={formik.touched.category && formik.errors.category}
              {...formik.getFieldProps("category")}
            />

            <Input
              label="عنوان مقاله"
              placeholder="مثال: راهنمای ورود به بازار کار طراحی گرافیک"
              error={formik.touched.title && formik.errors.title}
              {...formik.getFieldProps("title")}
            />
          </div>

          <Textarea
            label="توضیحات و محتوای بلاگ"
            rows={6}
            placeholder="متن کامل یا خلاصه توضیحات مقاله را اینجا بنویسید..."
            error={formik.touched.description && formik.errors.description}
            {...formik.getFieldProps("description")}
          />

          <div className="border-t border-border/80 pt-5">
            <ImageUpload
              label="تصویر شاخص و کاور مقاله"
              imagePreview={imagePreview}
              onChange={handleImageSelect}
              error={formik.touched.img && formik.errors.img}
              placeholder="برای آپلود تصویر شاخص کلیک کنید"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-border/80">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
            >
              ثبت و انتشار مقاله
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
