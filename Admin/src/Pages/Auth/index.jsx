import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../Store/Slices/authSlice";
import axiosInstance from "../../Utils/axiosInstance";
import Notify from "../../Utils/notify";
import { Button } from "../../Components/UI";

const loginValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست (مثال: 09123456789)")
    .required("وارد کردن شماره همراه الزامی است"),
  password: Yup.string()
    .required("وارد کردن رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { phoneNumber: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formattedPhone = values.phoneNumber.replace(/^0/, "+98");

        const response = await axiosInstance.post("auth/login-password", {
          phoneNumber: formattedPhone,
          password: values.password,
        });

        if (response && response.success) {
          const userRole = response.data?.user?.role;

          if (userRole === "admin" || userRole === "superAdmin") {
            dispatch(login(response.data.token));
            Notify.success(`خوش آمدید ${response.data.user?.fullName || "مدیر گرامی"}`);
            navigate("/");
          } else {
            Notify.error("شما اجازه دسترسی به پنل مدیریت را ندارید.");
          }
        } else {
          Notify.error(response?.message || "اطلاعات ورود نامعتبر است");
        }
      } catch (error) {
        Notify.error(error.message || "خطا در برقراری ارتباط با سرور");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light p-4" dir="rtl">
      <div className="max-w-md w-full bg-surface rounded-3xl shadow-xl border border-border/80 p-8 md:p-10 transition-all">
        {/* College Icon / Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 mb-3 p-2.5">
            <img
              src="/Logo-Type-white.png"
              alt="لوگو کالج رکاد"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-secondary">کالج آموزشی رکاد</h1>
          <p className="text-xs text-text-secondary mt-1">سامانه جامع مدیریت دوره‌ها و محتوا</p>
        </div>

        <h2 className="text-lg font-bold text-center text-secondary mb-2">
          ورود به حساب مدیریت
        </h2>
        <p className="text-center text-text-secondary mb-8 text-xs">
          لطفاً شماره همراه و رمز عبور خود را وارد نمایید
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary select-none">
              شماره همراه
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="09123456789"
              dir="ltr"
              className={`w-full px-4 py-3 rounded-xl bg-bg-light/60 outline-none transition-all duration-200 text-left font-sans border text-sm focus:bg-white ${
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "border-error focus:border-error focus:ring-4 focus:ring-error/10"
                  : "border-border hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary/15"
              }`}
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="text-error text-xs font-medium pr-1 animate-fadeIn">
                {formik.errors.phoneNumber}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold text-text-primary select-none">
              رمز عبور
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                dir="ltr"
                className={`w-full pl-4 pr-11 py-3 rounded-xl bg-bg-light/60 outline-none transition-all duration-200 text-left font-sans tracking-widest border text-sm focus:bg-white ${
                  formik.touched.password && formik.errors.password
                    ? "border-error focus:border-error focus:ring-4 focus:ring-error/10"
                    : "border-border hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary/15"
                }`}
                {...formik.getFieldProps("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-text-muted hover:text-primary transition-colors focus:outline-none cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <span className="text-error text-xs font-medium pr-1 animate-fadeIn">
                {formik.errors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="tall"
              isLoading={formik.isSubmitting}
              className="w-full text-base font-bold shadow-md hover:shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            >
              ورود به داشبورد کالج
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-border-light">
          <p className="text-xs text-text-muted">
            حساب مدیر پیش‌فرض: 09123456789 / adminPassword123
          </p>
        </div>
      </div>
    </div>
  );
}
