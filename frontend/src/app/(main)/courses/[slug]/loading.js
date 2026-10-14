import React from "react";
import "@/legacy-pages/CourseSingle/course.css";

export default function SingleCourseLoading() {
  return (
    <div className="cs-page">
      <div className="container">
        {/* 1. دقیقا مثل cs-topbar */}
        <div className="cs-topbar animate-pulse">
          <div className="h-4 w-24 bg-stone-200 rounded" />
          <div className="cs-crumbs">
            <div className="h-3.5 w-12 bg-stone-200 rounded" />
            <span className="sep">/</span>
            <div className="h-3.5 w-16 bg-stone-200 rounded" />
            <span className="sep">/</span>
            <div className="h-3.5 w-32 bg-stone-300 rounded" />
          </div>
          <div className="cs-students">
            <div className="h-3.5 w-24 bg-stone-200 rounded" />
            <div className="cs-avs">
              <div className="cs-av bg-stone-200" />
              <div className="cs-av bg-stone-200" />
            </div>
          </div>
        </div>

        {/* 2. گرید اصلی: cs-main + cs-side */}
        <div className="cs-grid">
          {/* ستون اصلی */}
          <main className="cs-main animate-pulse">
            <div className="cs-hero" style={{ background: "linear-gradient(135deg, var(--college-light) 0%, var(--college-light-active) 100%)" }}>
              <div className="h-6 w-32 bg-amber-200 border border-[#292827] rounded-full mb-3" />
              <div className="h-10 w-4/5 bg-stone-300 rounded-xl my-4" />
              <div className="h-4 w-full bg-stone-200 rounded mb-2" />
              <div className="h-4 w-3/4 bg-stone-200 rounded mb-5" />
              <div className="cs-meta">
                <div className="h-8 w-28 bg-white border border-[#292827] rounded-full" />
                <div className="h-8 w-28 bg-white border border-[#292827] rounded-full" />
                <div className="h-8 w-28 bg-white border border-[#292827] rounded-full" />
              </div>
            </div>

            {/* تب‌ها */}
            <div className="cs-tabs">
              <div className="h-12 w-28 border-b-2 border-amber-400 bg-amber-50" />
              <div className="h-12 w-28 bg-transparent" />
              <div className="h-12 w-28 bg-transparent" />
            </div>

            {/* محتوای تب سرفصل‌ها */}
            <div className="cs-curriculum">
              <div className="cs-progress">
                <div className="h-4 w-28 bg-stone-200 rounded" />
                <div className="bar"><span style={{ width: "20%" }} /></div>
              </div>
              <div className="cs-chapters">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="cs-ch" style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div className="w-9 h-9 bg-amber-100 border border-[#292827] rounded-lg" />
                      <div style={{ flex: 1 }}>
                        <div className="h-4 w-48 bg-stone-300 rounded mb-1.5" />
                        <div className="h-3 w-28 bg-stone-200 rounded" />
                      </div>
                      <div className="h-4 w-12 bg-stone-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* سایدبار ثبت‌نام */}
          <aside className="cs-side animate-pulse">
            <div className="cs-card">
              <div className="cs-thumb" style={{ background: "linear-gradient(135deg, var(--college) 0%, var(--college-dark) 100%)" }}>
                <div className="play">
                  <span style={{ width: 72, height: 72, background: "#fff", borderRadius: "50%", border: "2px solid #292827" }} />
                </div>
              </div>

              <div className="cs-price">
                <div className="h-8 w-32 bg-stone-300 rounded" />
                <div className="h-4 w-12 bg-stone-200 rounded" />
              </div>

              <div className="h-12 w-full bg-amber-400 border border-[#292827] rounded-full mt-4 shadow-[2px_2px_0px_#292827]" />

              <div className="mt-6 space-y-3 pt-4 border-t border-dashed border-stone-200">
                <div className="h-4 w-full bg-stone-200 rounded" />
                <div className="h-4 w-5/6 bg-stone-200 rounded" />
                <div className="h-4 w-4/6 bg-stone-200 rounded" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
