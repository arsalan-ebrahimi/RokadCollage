import { apiRequest } from "@/lib/api";

/**
 * خرید و ثبت‌نام در دوره با موجودی کیف پول یا ثبت‌نام مستقیم
 * @param {Object} payload { courseId, sessionId, couponCode }
 */
export async function purchaseCourse({ courseId, sessionId, couponCode }) {
  const res = await apiRequest("/enrollment/purchase", {
    method: "POST",
    body: JSON.stringify({ courseId, sessionId, couponCode }),
  });
  return res?.data || res;
}

/**
 * دریافت دوره‌های ثبت‌نام شده کاربر جاری (همراه با لایسنس اسپات پلیر)
 */
export async function getMyEnrollments() {
  const res = await apiRequest("/enrollment/my");
  return res?.data || res || [];
}

/**
 * تلاش مجدد برای صدور لایسنس اسپات پلیر
 * @param {string} enrollmentId شناسه ثبت‌نام
 */
export async function retrySpotPlayerLicense(enrollmentId) {
  const res = await apiRequest(`/enrollment/${enrollmentId}/retry-license`, {
    method: "POST",
  });
  return res?.data || res;
}

/**
 * درخواست خرید دوره از طریق درگاه پرداخت آنلاین زرین‌پال یا ثبت‌نام مستقیم
 * @param {Object} payload { courseId, sessionId, couponCode }
 */
export async function checkoutCourse({ courseId, sessionId, couponCode, callbackUrl }) {
  const res = await apiRequest("/payment/checkout-request", {
    method: "POST",
    body: { courseId, sessionId, couponCode, callbackUrl },
  });
  return res;
}

/**
 * اعتبارسنجی تراکنش بازگشتی از زرین‌پال و صدور لایسنس اسپات‌پلیر
 * @param {Object} payload { authority, status, courseId }
 */
export async function verifyCheckout({ authority, status, courseId }) {
  const res = await apiRequest("/payment/checkout-verify", {
    method: "POST",
    body: { authority, status, courseId },
  });
  return res;
}

export async function getCourseLicense(courseId) {
  try {
    const res = await apiRequest(`/payment/license/${courseId}`);
    const isEnrolled = Boolean(
      res?.isEnrolled === true ||
      res?.data?.isEnrolled === true ||
      Boolean(res?.data && res?.data?._id)
    );
    const enrollmentData = res?.data?._id ? res.data : (res?.data || res);
    const spotplayerData = res?.spotplayer || res?.data?.spotplayer || null;

    return {
      success: res?.success ?? true,
      isEnrolled,
      data: enrollmentData,
      spotplayer: spotplayerData,
    };
  } catch (err) {
    return {
      success: false,
      isEnrolled: false,
      error: err?.message,
    };
  }
}
