import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../Utils/axiosInstance";
import Notify from "../../../Utils/notify";
import { getImageUrl } from "../../../Utils/getImageUrl";
import Loading from "../../../Components/Loading";
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

const blogUpdateSchema = Yup.object({
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
});

export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [initialValues, setInitialValues] = useState({
    category: "",
    title: "",
    description: "",
    img: null,
  });

  const categoryOptions = [
    { label: "گرافیک", value: "گرافیک" },
    { label: "مسیر شغلی", value: "مسیر شغلی" },
    { label: "MBA", value: "MBA" },
    { label: "زبان", value: "زبان" },
    { label: "فرانتاند", value: "فرانتاند" },
    { label: "بکاند", value: "بکاند" },
  ];

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`blog/${id}`);

        let data = null;
        if (response && response.data) {
          data = Array.isArray(response.data) ? response.data[0] : response.data;
        } else if (Array.isArray(response)) {
          data = response[0];
        }

        if (data) {
          setInitialValues({
            category: data.category || "",
            title: data.title || "",
            description: data.description || "",
            img: data.img || null,
          });

          if (data.img) {
            setImagePreview(getImageUrl(data.img));
          }
        }
      } catch (error) {
        Notify.error(error.message || "خطا در دریافت اطلاعات مقاله");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: blogUpdateSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        let finalImageName = values.img;

        if (values.img instanceof File) {
          const formData = new FormData();
          formData.append("file", values.img);

          const uploadData = await axiosInstance.post("upload", formData);

          if (!uploadData || !uploadData.success) {
            throw new Error(uploadData?.message || "آپلود تصویر با خطا مواجه شد");
          }
          finalImageName = uploadData.data;
        }

        const blogPayload = {
          category: values.category,
          title: values.title,
          description: values.description,
          img: finalImageName,
        };

        const response = await axiosInstance.patch(`blog/${id}`, blogPayload);

        if (response && response.success !== false) {
          Notify.success("مقاله بلاگ با موفقیت ویرایش شد.");
          navigate("/blog");
        } else {
          throw new Error(response?.message || "ویرایش با خطا مواجه شد");
        }
      } catch (error) {
        Notify.error(error.message || "خطا در ویرایش مقاله");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageSelect = (file) => {
    formik.setFieldValue("img", file);
    setImagePreview(URL.createObjectURL(file));
  };

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
        title="ویرایش بلاگ"
        subtitle="ویرایش محتوا، دسته‌بندی موضوعی و تصویر شاخص"
        backTo="/blog"
      />

      <Card className="p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="دسته‌بندی مرتبط با دوره"
              options={categoryOptions}
              error={formik.touched.category && formik.errors.category}
              {...formik.getFieldProps("category")}
            />

            <Input
              label="عنوان مقاله"
              error={formik.touched.title && formik.errors.title}
              {...formik.getFieldProps("title")}
            />
          </div>

          <Textarea
            label="توضیحات و محتوای مقاله"
            rows={6}
            error={formik.touched.description && formik.errors.description}
            {...formik.getFieldProps("description")}
          />

          <div className="border-t border-border/80 pt-5">
            <ImageUpload
              label="تغییر تصویر شاخص و کاور"
              imagePreview={imagePreview}
              onChange={handleImageSelect}
              error={formik.touched.img && formik.errors.img}
              placeholder="برای تغییر تصویر شاخص کلیک کنید"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-border/80">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
            >
              ذخیره تغییرات مقاله
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
