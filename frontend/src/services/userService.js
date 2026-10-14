import { apiRequest } from "@/lib/api";

/**
 * دریافت اطلاعات پروفایل کاربر جاری
 */
export async function getMyProfile() {
  const res = await apiRequest("/user/me");
  return res?.data || res;
}

/**
 * ویرایش اطلاعات پروفایل کاربر جاری (نام، شماره، رمز عبور، تاریخ تولد)
 * @param {Object} payload { fullName, phoneNumber, password, birthDate }
 */
export async function updateMyProfile(payload) {
  const res = await apiRequest("/user/me", {
    method: "PATCH",
    body: payload,
  });
  return res?.data || res;
}
