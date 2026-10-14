import React, { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";

export default function ResourcesPanel({ course, isEnrolled, onEnrollClick }) {
  const [downloadMsg, setDownloadMsg] = useState(false);

  const handleDownloadClick = (res) => {
    if (!isEnrolled) {
      onEnrollClick();
      return;
    }
    setDownloadMsg(res.title);
    setTimeout(() => setDownloadMsg(false), 3500);

    const content = `کالج رکاد - مرجع مهارت‌آموزی و ورود به بازار کار
نام دوره: ${course.title}
عنوان منبع دانلودی: ${res.title}
نوع فایل: ${res.type || "ZIP/PDF"}
حجم: ${res.size || "۱۰ مگابایت"}
تاریخ دریافت: ${new Date().toLocaleDateString("fa-IR")}

توضیحات: این بسته شامل جزوات دوره، قطعه‌کدهای نمونه و فایل‌های تمرینی است.`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${course.slug || "rokad"}_${res.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const Icon = ({ type }) => {
    if (type === "ZIP")
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    if (type === "لینک")
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  };

  return (
    <div className="cs-panel-body">
      {downloadMsg && (
        <div style={{ background: "var(--teal-light)", border: "1.5px solid var(--ink)", padding: "8px 12px", borderRadius: "6px 0 6px 0", fontSize: "12.5px", fontWeight: 800, color: "var(--teal-dark)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <CheckCircle2 size={16} />
          <span>دانلود فایل «{downloadMsg}» آغاز شد</span>
        </div>
      )}
      {!isEnrolled && (
        <div style={{ background: "#fff8e6", border: "1.5px solid var(--ink)", padding: "10px 14px", borderRadius: "8px 0 8px 0", fontSize: "13px", fontWeight: 700, color: "#8a5b00", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <Lock size={15} style={{ flexShrink: 0 }} />
          <span>فایل‌های دانلودی و سورس پروژه مخصوص دانشجویان دوره است. برای دسترسی به فایل‌ها در دوره ثبت‌نام کنید.</span>
        </div>
      )}
      <div className="cs-resources">
        {course.resources.map((res) => (
          <div
            className={`cs-resource${!isEnrolled ? " locked-res" : ""}`}
            key={res.title}
            onClick={() => handleDownloadClick(res)}
            style={{ cursor: "pointer" }}
          >
            <span className="cs-resource-ic"><Icon type={res.type} /></span>
            <span className="cs-resource-info">
              <b>{res.title}</b>
              <small>{res.type === "لینک" ? "مجموعه لینک آنلاین" : `${res.type} · ${res.size}`}</small>
            </span>
            <span className="cs-resource-dl">
              {isEnrolled ? (
                res.type === "لینک" ? "مشاهده" : "دانلود"
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <span>قفل</span>
                  <Lock size={12} />
                </span>
              )}
              {isEnrolled && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                  {res.type === "لینک" ? <path d="M7 17L17 7M17 7H9M17 7v8" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
                </svg>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
