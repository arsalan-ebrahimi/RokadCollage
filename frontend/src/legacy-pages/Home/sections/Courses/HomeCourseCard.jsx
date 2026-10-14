import React from "react";
import Link from "next/link";
import { ArrowIcon } from "@/common/Icons";
import { toggleWishlist } from "@/data/panelStore.js";
import { isWishlisted } from "@/data/selectors.js";
import {
  catColors,
  COLOR_PALETTE,
  courseIcons,
  toPersianNum,
  MODE_LABEL,
  MODE_ICON,
} from "./coursesSectionData.jsx";

export function CourseCard({ course, index, store }) {
  const cat = COLOR_PALETTE[index % COLOR_PALETTE.length];
  const icon = courseIcons[index % courseIcons.length];
  const num = toPersianNum(index + 1);
  const mode = course.mode === "in-person" || course.isInPerson ? "onsite" : "online";
  const slug = course.slug || course.id || course._id;
  const isSaved = isWishlisted(slug, store);

  const durationText = course.duration || (course.hours ? `${toPersianNum(course.hours)} ساعت` : "۱۲ هفته");
  const priceFormatted = course.price ? `${toPersianNum(Number(course.price).toLocaleString("fa-IR"))} تومان` : "رایگان";
  const tags = Array.isArray(course.tags) && course.tags.length > 0 ? course.tags : [course.category || "مهارت"];

  return (
    <div
      className={"v2-stack mode-" + mode}
      data-mode={mode}
      style={{
        "--cat": cat.accent,
        "--catBg": cat.bg,
        "--catFg": cat.fg,
        "--catBorder": cat.border,
      }}
    >
      <article className="v2-item" style={{ position: "relative" }}>
        <button
          type="button"
          className={"course-card-save-btn" + (isSaved ? " is-saved" : "")}
          onClick={function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(slug);
          }}
          aria-label={isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره"}
          title={isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره"}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        <div className="v2-cover">
          <span className="v2-num">
            {num.slice(0, 1)}
            <span>{num.slice(1)}</span>
          </span>
          <div className="v2-icon">{icon}</div>
        </div>
        <div className="v2-content">
          <div className="v2-body">
            <div className="v2-meta">
              <span className="v2-cat-pill">{course.category}</span>
              <span
                className={
                  "course-mode-badge " +
                  (mode === "onsite" ? "in-person" : "online")
                }
              >
                {MODE_ICON[mode]}
                <span>{MODE_LABEL[mode]}</span>
              </span>
            </div>
            <h3 className="t-card">{course.title}</h3>
            <div className="v2-tags">
              {tags.map(function (t) {
                return <span key={t}>{t}</span>;
              })}
            </div>
          </div>
          <div className="v2-action">
            <div className="v2-price">
              <div className="v2-price-lbl">{course.price ? "شهریه" : "مدت"}</div>
              <div className="v2-price-val">
                {priceFormatted !== "رایگان" ? priceFormatted : durationText}
              </div>
            </div>
            <Link href={`/courses/${slug}`} className="v2-btn">
              {"مشاهده "} <ArrowIcon width={14} height={14} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export function CtaRow() {
  return (
    <Link href="/courses" className="v2-cta-row">
      <div className="v2-cta-row-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
      <div className="v2-cta-row-text">
        <span className="v2-cta-row-title">{"مشاهده همه دوره‌ها"}</span>
        <span className="v2-cta-row-sub">{"آرشیو کامل آموزش‌های تخصصی"}</span>
      </div>
      <span className="v2-cta-row-arrow" aria-hidden="true">
        <ArrowIcon width={18} height={18} />
      </span>
    </Link>
  );
}
