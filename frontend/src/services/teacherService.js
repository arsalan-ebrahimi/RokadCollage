import { apiRequest } from "@/lib/api";

/**
 * دریافت لیست اساتید و مربیان کالج رکاد
 */
export async function getTeachers() {
  try {
    const res = await apiRequest("/teacher");
    return Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
  } catch (err) {
    console.error("Failed to fetch teachers:", err);
    return [];
  }
}
