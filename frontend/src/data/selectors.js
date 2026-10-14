/* ============================================================
   کالج رکاد: ماژول سلکتورهای مشترک (Single Source of Truth Selectors)
   همه کامپوننت‌ها وضعیت ثبت‌نام، نشان‌شده‌ها و کاربر را از اینجا می‌خوانند.
   ============================================================ */
import { getPanelStore } from "./panelStore.js";

/** بررسی ثبت‌نام کاربر در دوره بر اساس slug یا id */
export function isEnrolledIn(slug, customStore) {
  if (!slug) return false;
  const store = customStore || getPanelStore();
  const cleanSlug = String(slug).toLowerCase().replace(/^#course\/?/, "").replace(/\//g, "").trim();

  return (store.myCourses || []).some((c) => {
    const cSlug = String(c.slug || "").toLowerCase().trim();
    const cId = String(c.id || "").toLowerCase().trim();
    const cMongoId = String(c._id || "").toLowerCase().trim();
    return cSlug === cleanSlug || cId === cleanSlug || cMongoId === cleanSlug;
  });
}

/** بررسی نشان شدن دوره در Wishlist */
export function isWishlisted(slug, customStore) {
  if (!slug) return false;
  const store = customStore || getPanelStore();
  const cleanSlug = String(slug).toLowerCase().replace(/^#course\/?/, "").replace(/\//g, "").trim();

  return (store.wishlist || []).some((w) => {
    const wSlug = String(w).toLowerCase().trim();
    return wSlug === cleanSlug;
  });
}

/** دریافت شیء ثبت‌نام دوره در پنل هنرجو */
export function getCourseEnrollment(slug, customStore) {
  if (!slug) return null;
  const store = customStore || getPanelStore();
  const cleanSlug = String(slug).toLowerCase().replace(/^#course\/?/, "").replace(/\//g, "").trim();

  return (store.myCourses || []).find((c) => {
    const cSlug = String(c.slug || "").toLowerCase().trim();
    const cId = String(c.id || "").toLowerCase().trim();
    const cMongoId = String(c._id || "").toLowerCase().trim();
    return cSlug === cleanSlug || cId === cleanSlug || cMongoId === cleanSlug;
  }) || null;
}

/** محاسبه تعداد اعلانات خوانده‌نشده (تکالیف فوری، تیکت‌های در حال پاسخ، رویدادها) */
export function getUnreadNotificationsCount(customStore) {
  const store = customStore || getPanelStore();
  let count = 0;

  // تکالیف باز یا دارای مهلت نزدیک
  const urgentAssignments = (store.assignments || []).filter((a) => a.status === "late" || a.status === "open").length;
  count += urgentAssignments;

  // تیکت‌های پشتیبانی در حال پاسخ
  const activeTickets = (store.supportTickets || []).filter((t) => t.status === "answering" || t.status === "open").length;
  count += activeTickets;

  return count;
}

/** دریافت اطلاعات کاربر لاگین‌شده */
export function getUserProfile(customStore) {
  const store = customStore || getPanelStore();
  return store.user || null;
}

/** دریافت لیست دوره‌های فعال من */
export function getMyCourses(customStore) {
  const store = customStore || getPanelStore();
  return store.myCourses || [];
}

/** دریافت سوابق سفارش‌ها و پرداخت‌ها */
export function getRecentOrders(customStore) {
  const store = customStore || getPanelStore();
  return store.orders || [];
}
