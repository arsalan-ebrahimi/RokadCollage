import { getPanelStore, savePanelStore } from "./storeCore.js";

/** ارسال پاسخ تکلیف */
export function submitAssignment(assignmentId, submissionData) {
  const state = getPanelStore();
  const updatedAssignments = state.assignments.map((a) => {
    if (a.id !== assignmentId) return a;
    return {
      ...a,
      status: "done",
      submission: {
        text: submissionData.text || "پاسخ تکلیف با موفقیت ثبت شد.",
        fileName: submissionData.fileName || "homework_submission.zip",
        date: "امروز - همین حالا",
      },
      feedback:
        "تکلیف شما با موفقیت تحویل داده شد و در نوبت بررسی منتور قرار گرفت.",
    };
  });

  const updatedState = {
    ...state,
    assignments: updatedAssignments,
  };
  savePanelStore(updatedState);
  return updatedAssignments;
}

/** افزودن / حذف از علاقه‌مندی‌ها (Wishlist) */
export function toggleWishlist(slug) {
  if (!slug) return [];
  const state = getPanelStore();
  const currentWishlist = Array.isArray(state.wishlist) ? state.wishlist : [];
  const cleanSlug = String(slug).toLowerCase().replace(/^#course\/?/, "").replace(/\//g, "").trim();

  const exists = currentWishlist.some((s) => {
    return String(s).toLowerCase().replace(/^#course\/?/, "").replace(/\//g, "").trim() === cleanSlug;
  });

  const updatedWishlist = exists
    ? currentWishlist.filter((s) => String(s).toLowerCase().replace(/^#course\/?/, "").replace(/\//g, "").trim() !== cleanSlug)
    : [...currentWishlist, cleanSlug];

  const updatedState = { ...state, wishlist: updatedWishlist };
  savePanelStore(updatedState);
  return updatedWishlist;
}
