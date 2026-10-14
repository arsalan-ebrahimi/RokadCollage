import React from "react";
import { Bookmark, MapPin, Monitor } from "lucide-react";
import { DEPT_PERSONA } from "@/data/departments.js";
import { toggleWishlist } from "@/data/panelStore.js";
import { isWishlisted } from "@/data/selectors.js";
import { CourseIcon, StarIcon, ClockIcon, UsersIcon } from "./DepartmentIcons.jsx";

export const getSlugForDeptCourse = (c) => {
  const t = `${c?.title || ""} ${c?.cat || ""}`.toLowerCase();
  const isInPerson = c?.mode === "in-person" || c?.mode === "حضوری";

  if (isInPerson) {
    if (t.includes("react") || t.includes("next.js") || t.includes("فرانت") || t.includes("html") || t.includes("کدنویسی")) return "react-bootcamp";
    if (t.includes("ux") || t.includes("ui") || t.includes("فیگما")) return "ux-bootcamp";
    if (t.includes("فتوشاپ") || t.includes("گرافیک") || t.includes("illustrator")) return "graphic-bootcamp";
    if (t.includes("mba") || t.includes("کارآفرینی") || t.includes("کسب‌وکار") || t.includes("استارتاپ")) return "mba-bootcamp";
    if (t.includes("رهبری") || t.includes("مدیریت تیم") || t.includes("برندینگ")) return "leadership-bootcamp";
    if (t.includes("فروش") || t.includes("مذاکره")) return "sales-bootcamp";
    if (t.includes("ielts") || t.includes("آیلتس") || t.includes("speaking") || t.includes("مکالمه") || t.includes("پزشکان")) return "ielts-bootcamp";
    if (t.includes("فرانسه")) return "french-bootcamp";
    if (t.includes("آلمانی") || t.includes("اسپانیایی") || t.includes("زبان دوم")) return "french-bootcamp";
    if (t.includes("devops") || t.includes("docker") || t.includes("داکر") || t.includes("ci/cd")) return "devops-bootcamp";
    if (t.includes("laravel") || t.includes("php") || t.includes("flutter") || t.includes("موبایل")) return "react-bootcamp";
    return "react-bootcamp";
  }

  // دوره‌های آنلاین
  if (t.includes("ielts") || t.includes("آیلتس") || t.includes("مکالمه") || t.includes("انگلیسی") || t.includes("فرانسه") || t.includes("آلمانی")) return "ielts-mastery";
  if (t.includes("react") || t.includes("next.js") || t.includes("فرانت‌") || t.includes("html") || t.includes("typescript")) return "frontend-react";
  if (t.includes("python") || t.includes("ai") || t.includes("ماشین") || t.includes("داده") || t.includes("sql")) return "python-ai";
  if (t.includes("mba") || t.includes("کارآفرینی") || t.includes("کسب‌وکار") || t.includes("رهبری") || t.includes("فروش") || t.includes("مالی") || t.includes("حسابداری") || t.includes("مدیریت") || t.includes("مذاکره") || t.includes("okr") || t.includes("استارتاپ")) return "mba-business";
  if (t.includes("مارکتینگ") || t.includes("سئو") || t.includes("برندینگ") || t.includes("بازاریابی") || t.includes("تبلیغات")) return "seo-pro";
  if (t.includes("ui") || t.includes("ux") || t.includes("فیگما")) return "ui-ux";
  if (t.includes("فتوشاپ") || t.includes("گرافیک") || t.includes("illustrator") || t.includes("عکاسی")) return "graphic-photoshop";
  if (t.includes("موشن") || t.includes("تدوین") || t.includes("premiere") || t.includes("after effects")) return "video-motion";
  if (t.includes("وردپرس") || t.includes("وب")) return "wordpress-pro";
  return "mba-business";
};

export default function DepartmentCourseCard({ c, rot, persona: cardPersona, store }) {
  const cardTheme = cardPersona || DEPT_PERSONA[c.department] || DEPT_PERSONA.languages;
  const slug = getSlugForDeptCourse(c);
  const isLoggedIn = Boolean(store?.auth?.isLoggedIn);
  const isSaved = isLoggedIn && isWishlisted(slug, store);
  const isOnline = c.mode === "online" || c.mode === "غیرحضوری" || c.mode === "غیر حضوری";

  const goToCourse = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    window.location.hash = `course/${slug}`;
  };

  return (
    <a
      className="dp-card"
      data-dept={cardTheme.id}
      href={`#course/${slug}`}
      style={{
        "--rot": `rotate(${rot}deg)`,
        "--dp": cardTheme.colorVar,
        "--dp-light": cardTheme.lightVar,
        "--dp-dark": cardTheme.darkVar,
        "--dp-text": cardTheme.id === "it" ? "var(--white)" : "var(--ink)",
      }}
      onClick={(e) => {
        if (e.defaultPrevented) return;
      }}
    >
      <div className="dp-card-cover">
        <img className="dp-cover-pattern" src={cardTheme.pattern} alt="" aria-hidden="true" />
        {c.tag && <span className="dp-card-tag">{c.tag}</span>}
        <button
          type="button"
          className={`course-card-save-btn${isSaved ? " is-saved" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isLoggedIn) {
              try {
                sessionStorage.setItem("rokad_auth_redirect", `course/${slug}`);
              } catch (_) {}
              window.dispatchEvent(
                new CustomEvent("rokad_auth_required", {
                  detail: {
                    message: `برای ذخیره «${c.title}»، لطفاً ابتدا در کالج ثبت‌نام کنید.`,
                    action: "register",
                  },
                })
              );
              return;
            }
            toggleWishlist(slug);
          }}
          aria-label={isLoggedIn ? (isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره") : "برای ذخیره دوره، ثبت‌نام کنید"}
          title={isLoggedIn ? (isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره") : "برای ذخیره دوره، ابتدا ثبت‌نام کنید"}
        >
          <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.2} />
        </button>
        <CourseIcon id={c.ic} size={34} />
      </div>
      <div className="dp-card-body">
        <div className="dp-card-top-row">
          <div className="dp-card-cat">{c.cat}</div>
          <span className={`course-mode-badge ${isOnline ? "online" : "in-person"}`}>
            {isOnline ? <Monitor size={12} strokeWidth={2.4} /> : <MapPin size={12} strokeWidth={2.4} />}
            <span>{isOnline ? "غیر حضوری" : "حضوری"}</span>
          </span>
        </div>
        <div className="dp-card-title">{c.title}</div>
        <div className="dp-card-inst">
          <span className="dp-av">{c.inst.charAt(0)}</span>
          <span>{c.inst}</span>
        </div>
        <div className="dp-card-meta">
          <span className="dp-rate"><StarIcon /> {c.rating}</span>
          <span><ClockIcon /> {c.hours}</span>
          <span><UsersIcon /> {c.students}</span>
        </div>
        <div className="dp-card-foot">
          {c.free ? (
            <span className="dp-free">رایگان</span>
          ) : (
            <span className="dp-price">
              {c.old && <s>{c.old}</s>}
              <b>{c.price}</b>
            </span>
          )}
          <span
            className="dp-card-btn"
            role="button"
            tabIndex={0}
            onClick={goToCourse}
          >
            مشاهده
          </span>
        </div>
      </div>
    </a>
  );
}
