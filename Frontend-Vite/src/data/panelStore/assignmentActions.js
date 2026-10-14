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
  const state = getPanelStore();
  if (!state.auth || !state.auth.isLoggedIn) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("rokad_auth_required", {
          detail: {
            message: "برای ذخیره دوره‌ها، لطفاً ابتدا در کالج ثبت‌نام کنید.",
            action: "register",
          },
        })
      );
    }
    return false;
  }
  const exists = state.wishlist.includes(slug);
  const updatedWishlist = exists
    ? state.wishlist.filter((s) => s !== slug)
    : [...state.wishlist, slug];
  const updatedState = { ...state, wishlist: updatedWishlist };
  savePanelStore(updatedState);
  return updatedWishlist;
}
