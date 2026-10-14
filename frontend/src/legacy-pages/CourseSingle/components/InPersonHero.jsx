import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Bookmark, Calendar, Clock, CheckCircle2, Phone, ShieldCheck } from "lucide-react";

const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (n) => String(n ?? "").replace(/\d/g, (d) => FA[d]);

export default function InPersonHero({
  course,
  schedule,
  capacity,
  isLoggedIn,
  isEnrolled,
  isWished,
  onBookmarkClick,
  onCheckoutOpen,
  onOpenEnrollmentInfo,
}) {
  const numPrice = course.finalPrice !== undefined ? course.finalPrice : course.price;
  const isFree = !numPrice || numPrice === 0 || numPrice === "رایگان";
  const displayPrice = isFree
    ? "رایگان"
    : (typeof numPrice === "number"
      ? Number(numPrice).toLocaleString("fa-IR")
      : String(numPrice).replace(/تومان/g, "").trim());

  const hasDiscount = Boolean(course.isDiscountActive && course.price && course.finalPrice && course.finalPrice < course.price);
  const oldPriceDisplay = hasDiscount
    ? Number(course.price).toLocaleString("fa-IR")
    : (course.oldPrice ? String(course.oldPrice).replace(/تومان/g, "").trim() : null);
  const discountTag = hasDiscount
    ? `%${toFa(course.activeDiscountPercentage || course.timedDiscount?.percentage)} تخفیف`
    : course.discount;

  return (
    <>
      <div className="cs-topbar container">
        <Link href="/courses" className="cs-back">
          <ArrowLeft size={14} style={{ transform: "rotate(180deg)" }} />
          <span>همهٔ دوره‌ها</span>
        </Link>

        <nav className="cs-crumbs" aria-label="مسیر دوره">
          <Link href="/courses">دوره‌ها</Link>
          <span className="sep">›</span>
          <Link href="/courses">{course.category || "حضوری"}</Link>
          <span className="sep">›</span>
          <b>{course.title}</b>
        </nav>

        <div className="cs-inperson-top-actions">
          <div className="cs-inperson-top-badge">
            <MapPin size={12} strokeWidth={2.5} />
            <span>کارگاه حضوری</span>
          </div>

          <button
            type="button"
            className={`cs-inperson-top-save-btn ${isWished ? "is-saved" : ""}`}
            onClick={onBookmarkClick}
            aria-label={isLoggedIn ? (isWished ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره") : "برای ذخیره دوره، ابتدا ثبت‌نام کنید"}
            title={isLoggedIn ? (isWished ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره") : "برای ذخیره دوره، ابتدا ثبت‌نام کنید"}
          >
            <Bookmark size={15} fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="container">
        <div className="cs-ip-hero-card">
          <div className="cs-ip-hero-grid">
            <div className="cs-ip-hero-media">
              <img
                src={course.pattern || "/assets/StatCard/blue.png"}
                alt={course.title}
                className="cs-ip-hero-img"
              />
              <span className="cs-ip-hero-tag">
                <MapPin size={12} strokeWidth={2.5} />
                <span>کمپوس آزادی</span>
              </span>
            </div>

            <div className="cs-ip-hero-content">
              <div className="cs-ip-hero-header-info">
                <div className="cs-ip-hero-topline">
                  <span className="cs-ip-dept-tag">{course.departmentFa || "دوره حضوری"}</span>
                </div>

                <h1 className="cs-ip-hero-title">{course.title}</h1>

                <div className="cs-ip-hero-pills">
                  <span className="ip-pill">
                    <Calendar size={13} strokeWidth={2.2} />
                    <span>شروع: {schedule.startDate}</span>
                  </span>
                  <span className="ip-pill">
                    <Clock size={13} strokeWidth={2.2} />
                    <span>طول دوره: {schedule.totalWeeks}</span>
                  </span>
                </div>
              </div>

              <div className="cs-ip-hero-actions-bar">
                <div className="cs-ip-price-col">
                  <div className="cs-ip-price-row">
                    {oldPriceDisplay && <span className="old-price">{oldPriceDisplay}</span>}
                    <b className="main-price">{displayPrice}</b>
                    {!isFree && <span className="cur">تومان</span>}
                    {discountTag && <span className="cs-discount-tag">{discountTag}</span>}
                  </div>

                  <div className="cs-ip-seat-alert">
                    <span className="seat-dot" />
                    <span>ظرفیت باقیمانده: فقط {toFa(capacity.remaining)} صندلی</span>
                  </div>
                </div>

                <div className="cs-ip-btns-row">
                  {isEnrolled ? (
                    <button
                      type="button"
                      className="cs-ip-btn-main enrolled"
                      onClick={onOpenEnrollmentInfo}
                    >
                      <CheckCircle2 size={16} />
                      <span>ثبت‌نام شده</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cs-ip-btn-main"
                      onClick={onCheckoutOpen}
                    >
                      <span>ثبت‌نام دوره</span>
                      <ArrowLeft size={16} />
                    </button>
                  )}

                  <button
                    type="button"
                    className="cs-ip-btn-sub"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("rokad_open_consultation"));
                    }}
                  >
                    <Phone size={14} />
                    <span>درخواست مشاوره</span>
                  </button>
                </div>
              </div>

              <div className="cs-ip-guarantee-strip">
                <ShieldCheck size={14} strokeWidth={2.4} />
                <span>گارانتی بازگشت ۱۰۰٪ شهریه تا پایان جلسه اول بدون قید و شرط</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
