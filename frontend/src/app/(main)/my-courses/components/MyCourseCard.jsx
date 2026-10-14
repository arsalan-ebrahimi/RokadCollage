"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code,
  Briefcase,
  Globe,
  Sparkles,
  Monitor,
  MapPin,
  Clock,
  Key,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Bookmark,
} from "lucide-react";
import { toggleWishlist } from "@/data/panelStore.js";
import { isWishlisted } from "@/data/selectors.js";

/**
 * دپارتمان‌ها و کانفیگ آیکون و تم
 */
const DEPT_CONFIG = {
  it: {
    name: "فناوری اطلاعات",
    icon: Code,
    pattern: "/assets/StatCard/yellow.png",
    themeClass: "mc-theme-college",
  },
  business: {
    name: "کسب‌وکار",
    icon: Briefcase,
    pattern: "/assets/StatCard/yellow.png",
    themeClass: "mc-theme-college",
  },
  languages: {
    name: "زبان‌های خارجی",
    icon: Globe,
    pattern: "/assets/StatCard/yellow.png",
    themeClass: "mc-theme-college",
  },
  default: {
    name: "کالج رکاد",
    icon: Sparkles,
    pattern: "/assets/StatCard/yellow.png",
    themeClass: "mc-theme-college",
  },
};

/**
 * تشخیص دپارتمان بر اساس مشخصات دوره
 */
function resolveDept(course = {}) {
  const cat = (course.category || course.dept || course.department || "").toLowerCase();
  const title = (course.title || "").toLowerCase();

  if (
    cat.includes("it") ||
    cat.includes("فناوری") ||
    cat.includes("وب") ||
    title.includes("وردپرس") ||
    title.includes("سئو") ||
    title.includes("ui/ux") ||
    title.includes("پایتون") ||
    title.includes("فرانت") ||
    title.includes("فیگما")
  ) {
    return DEPT_CONFIG.it;
  }

  if (
    cat.includes("business") ||
    cat.includes("کسب") ||
    cat.includes("مارکتینگ") ||
    cat.includes("مدیریت") ||
    title.includes("دیجیتال مارکتینگ") ||
    title.includes("فروش")
  ) {
    return DEPT_CONFIG.business;
  }

  if (cat.includes("lang") || cat.includes("زبان") || title.includes("انگلیسی")) {
    return DEPT_CONFIG.languages;
  }

  return DEPT_CONFIG.default;
}

export default function MyCourseCard({ item, onOpenLicense, store }) {
  const course = item.course || {};
  const isPurchased = item.isPurchased !== false;
  const isVirtual =
    item.courseModel === "VirtualCourse" ||
    course.type === "مجازی" ||
    course.type === "غیر حضوری" ||
    Boolean(item.spotplayer?.key) ||
    !item.session;

  const isCompleted = isPurchased && (item.status === "completed" || item.progress === 100);
  const dept = resolveDept(course);
  const DeptIcon = dept.icon;

  const courseSlug = course.slug || course._id || course.id;
  const courseHref = courseSlug ? `/courses/${courseSlug}` : "/courses";
  const isSaved = isWishlisted(courseSlug, store) || item.purchaseStatus === "saved";

  const instructorName =
    Array.isArray(course.teachers) && course.teachers.length > 0
      ? course.teachers
          .map((t) => (typeof t === "object" ? t.name || t.fullName : t))
          .filter(Boolean)
          .join("، ")
      : course.instructor || "اساتید کالج رکاد";

  return (
    <article className="mc-card">
      {/* بخش ویژوال با پترن و آیکون دپارتمان */}
      <div className={`mc-card-visual ${dept.themeClass}`}>
        <img src={course.img || dept.pattern} alt="" className="mc-card-pattern" aria-hidden="true" />

        {/* دکمه نشان کردن در گوشه بالا */}
        <button
          type="button"
          className={`mc-card-save-btn ${isSaved ? "is-saved" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(courseSlug);
          }}
          aria-label={isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره"}
          title={isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره"}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} strokeWidth={2.4} />
        </button>

        {/* برچسب دسته‌بندی پویا */}
        <span className="mc-dept-chip">{course.category || dept.name}</span>

        {/* باکس آیکون نئوبروتالیست مرکزی */}
        <div className="mc-icon-wrap">
          <DeptIcon size={42} style={{ color: "var(--ink, #1F1E1D)" }} strokeWidth={2.2} />
        </div>

        {/* بج نوع برگزاری / وضعیت */}
        <span
          className={`mc-badge-pill ${
            !isPurchased
              ? "mc-badge-saved"
              : isCompleted
              ? "mc-badge-completed"
              : isVirtual
              ? "mc-badge-virtual"
              : "mc-badge-inperson"
          }`}
        >
          {!isPurchased ? (
            <>
              <Bookmark size={12} strokeWidth={2.5} fill="currentColor" />
              <span>نشان‌شده</span>
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle2 size={12} strokeWidth={2.5} />
              <span>تکمیل‌شده</span>
            </>
          ) : isVirtual ? (
            <>
              <Monitor size={12} strokeWidth={2.5} />
              <span>غیر حضوری</span>
            </>
          ) : (
            <>
              <MapPin size={12} strokeWidth={2.5} />
              <span>کارگاه حضوری</span>
            </>
          )}
        </span>
      </div>

      {/* بدنه و مشخصات دوره */}
      <div className="mc-card-body">
        {/* ردیف متادیتا */}
        <div className="mc-card-meta-row">
          <span>
            مدرس: <strong>{instructorName}</strong>
          </span>
          {item.createdAt && (
            <span>
              {new Date(item.createdAt).toLocaleDateString("fa-IR", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        {/* عنوان دوره */}
        <h3 className="mc-card-title">
          <Link href={courseHref}>{course.title || "عنوان دوره تخصصی"}</Link>
        </h3>

        {/* اگر دوره هنوز خریداری نشده است، نمایش ردیف قیمت */}
        {!isPurchased && (
          <div className="mc-card-price-row">
            <span className="mc-price-label">شهریه دوره:</span>
            <b className="mc-price-val">
              {course.price ? `${Number(course.price).toLocaleString("fa-IR")} تومان` : "رایگان"}
            </b>
          </div>
        )}

        {/* پیل‌های مشخصات */}
        <div className="mc-pills-row">
          {course.duration && (
            <span className="mc-pill">
              <Clock size={12} />
              <span>{course.duration}</span>
            </span>
          )}

          {!isVirtual && item.session && (
            <span className="mc-pill">
              <Calendar size={12} />
              <span>{item.session.scheduleDays || "جلسات کلاسی"}</span>
            </span>
          )}

          {isVirtual && (
            <span className="mc-pill">
              <Sparkles size={12} />
              <span>دسترسی دائم</span>
            </span>
          )}
        </div>

        {/* اکشن‌های فوتر کارت (حداکثر ۱ تا ۲ کلمه، فعل اول) */}
        <div className="mc-card-actions">
          {isPurchased ? (
            <>
              <Link href={courseHref} className="mc-btn-primary">
                <span>ورود به دوره</span>
                <ExternalLink size={14} />
              </Link>

              {isVirtual && Boolean(item.spotplayer?.key || item.spotplayer?.licenseId) && (
                <button
                  type="button"
                  className="mc-btn-license"
                  onClick={() => onOpenLicense(course._id || course.slug, course.title)}
                >
                  <Key size={14} />
                  <span>لایسنس</span>
                </button>
              )}
            </>
          ) : (
            <Link href={courseHref} className="mc-btn-primary mc-btn-enroll">
              <span>مشاهده و ثبت‌نام</span>
              <ExternalLink size={14} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
