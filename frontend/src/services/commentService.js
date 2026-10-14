import { apiRequest } from "@/lib/api";

/**
 * دریافت لیست نظرات و تجربیات هنرجویان از پایگاه‌داده
 */
export async function getComments() {
  const res = await apiRequest("/comments");
  return res?.data || res || [];
}
