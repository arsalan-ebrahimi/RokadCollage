import React from "react";
import { Search, ArrowLeft } from "lucide-react";

export default function CourseSingleNotFound() {
  return (
    <main className="cs-page" id="course" style={{ padding: "80px 20px", textAlign: "center", minHeight: "60vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", background: "#fff", border: "3px solid var(--ink)", borderRadius: "16px 0 16px 0", padding: "40px 24px", boxShadow: "6px 6px 0 var(--college)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
          <Search size={44} style={{ color: "var(--navy)" }} />
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 950, color: "var(--navy)", margin: "0 0 12px" }}>دوره مورد نظر یافت نشد</h2>
        <p style={{ fontSize: "14px", color: "var(--ink-subtle)", lineHeight: 1.8, margin: "0 0 24px" }}>
          متأسفانه دوره‌ای با این آدرس وجود ندارد یا ممکن است حذف شده باشد.
        </p>
        <a
          href="#courses-index"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--college)",
            color: "var(--ink)",
            border: "2px solid var(--ink)",
            borderRadius: "8px 0 8px 0",
            padding: "10px 24px",
            fontWeight: 900,
            textDecoration: "none",
            boxShadow: "3px 3px 0 var(--ink)",
          }}
        >
          <span>مشاهده لیست دوره‌ها</span>
          <ArrowLeft size={16} />
        </a>
      </div>
    </main>
  );
}
