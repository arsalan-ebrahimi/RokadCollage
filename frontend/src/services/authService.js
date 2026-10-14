import { apiRequest } from "@/lib/api";

/**
 * گام اول احراز هویت: ارسال شماره موبایل برای چک کردن وضعیت و ارسال پیامک OTP (در صورت نیاز)
 */
export async function sendOtp(phoneNumber) {
  return await apiRequest("/auth", {
    method: "POST",
    body: { phoneNumber },
  });
}

/**
 * ورود مستقیم با رمز عبور
 */
export async function loginWithPassword(phoneNumber, password) {
  return await apiRequest("/auth/login-password", {
    method: "POST",
    body: { phoneNumber, password },
  });
}

/**
 * ورود یا تکمیل ثبت‌نام با کد تایید پیامک‌شده OTP
 */
export async function loginWithOtp(phoneNumber, code, password, fullName) {
  const payload = { phoneNumber, code };
  if (password) payload.password = password;
  if (fullName) payload.fullName = fullName;
  return await apiRequest("/auth/login-otp", {
    method: "POST",
    body: payload,
  });
}

/**
 * ارسال مجدد کد پیامکی
 */
export async function resendOtp(phoneNumber) {
  return await apiRequest("/auth/resend-code", {
    method: "POST",
    body: { phoneNumber },
  });
}

/**
 * فراموشی و بازیابی رمز عبور
 */
export async function forgetPassword(phoneNumber, code, newPassword) {
  return await apiRequest("/auth/forget-password", {
    method: "POST",
    body: { phoneNumber, code, newPassword },
  });
}
