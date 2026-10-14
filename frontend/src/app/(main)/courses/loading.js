import React from "react";
import "@/legacy-pages/CoursesPage/courses-hub.css";

export default function CoursesLoading() {
  return (
    <div className="ch-page">
      {/* 1. دقیقا مثل CoursesHubHero */}
      <header className="ch-hero animate-pulse">
        <div className="ch-hero-inner">
          <div className="ch-crumb">
            <div className="h-4 w-12 bg-amber-300/40 rounded border border-[#292827]" />
            <span className="ch-crumb-sep">›</span>
            <div className="h-4 w-28 bg-amber-300/50 rounded border border-[#292827]" />
          </div>

          <div className="ch-hero-badge" style={{ opacity: 0.6 }}>
            <div className="h-4 w-4 bg-amber-400 rounded-full" />
            <div className="h-3 w-44 bg-amber-300/70 rounded" />
          </div>

          <div className="h-10 w-96 max-w-full bg-amber-400/50 rounded-xl my-4" />
          <div className="h-4 w-[520px] max-w-full bg-amber-300/40 rounded-md mb-8" />

          <div className="ch-stats">
            {[1, 2, 3].map((n) => (
              <div key={n} className="ch-stat-pill" style={{ opacity: 0.7 }}>
                <div className="w-4 h-4 bg-amber-400 rounded-full" />
                <div className="h-3.5 w-28 bg-amber-300/60 rounded" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. کانتینر اصلی شامل FlagshipSection و SuggestedGroupSection */}
      <div className="ch-container">
        {/* Flagship Section Skeleton */}
        <section className="ch-sec">
          <div className="ch-sec-head">
            <div className="ch-sec-title-wrap">
              <span className="ch-sec-tag">
                <span className="inline-block w-3 h-3 bg-amber-400 rounded-full" />
                <span>دوره‌های پرچم‌دار</span>
              </span>
              <h2 className="ch-sec-title">مسیرهای جامع اشتغال و ورود به بازار کار</h2>
              <p className="ch-sec-desc">دوره‌های تخصصی با مدرک معتبر و تضمین معرفی به کار</p>
            </div>
          </div>

          <div className="ch-flagships">
            {[1, 2].map((n) => (
              <article key={n} className="ch-flag-card animate-pulse" style={{ opacity: 0.85 }}>
                <div className="ch-flag-visual" style={{ background: "var(--bg-college-tint, #fff8ea)" }}>
                  <div className="ch-flag-icon-wrap">
                    <div className="w-12 h-12 bg-amber-200/80 rounded-xl" />
                  </div>
                  <div className="h-5 w-24 bg-red-200 border border-[#292827] rounded-full" />
                </div>

                <div className="ch-flag-content">
                  <div className="ch-flag-top">
                    <div className="ch-flag-meta-row">
                      <div className="h-4 w-40 bg-stone-200 rounded" />
                      <div className="h-5 w-20 bg-amber-200 rounded-full" />
                    </div>

                    <div className="h-7 w-3/4 bg-stone-300 rounded-lg mt-2" />
                    <div className="h-4 w-full bg-stone-200 rounded mt-2" />
                    <div className="h-4 w-4/5 bg-stone-200 rounded mt-1" />

                    <div className="ch-flag-stats-row mt-4">
                      <div className="h-7 w-28 bg-stone-100 border border-[#292827] rounded-lg" />
                      <div className="h-7 w-28 bg-stone-100 border border-[#292827] rounded-lg" />
                      <div className="h-7 w-28 bg-stone-100 border border-[#292827] rounded-lg" />
                    </div>
                  </div>

                  <div className="ch-flag-actions">
                    <div className="h-8 w-28 bg-stone-200 rounded" />
                    <div className="h-10 w-44 bg-amber-400/70 border-2 border-[#292827] rounded-xl shadow-[2px_2px_0px_#292827]" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Suggested Section Skeleton */}
        <section className="ch-sec">
          <div className="ch-sec-head">
            <div className="ch-sec-title-wrap">
              <span className="ch-sec-tag">دوره‌های پیشنهادی</span>
              <h2 className="ch-sec-title">مهارت‌های منتخب برای شما</h2>
            </div>
          </div>

          <div className="ch-grid-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="ch-card animate-pulse" style={{ opacity: 0.9 }}>
                <div className="ch-card-cover" style={{ background: "var(--bg-college-tint, #fff8ea)" }}>
                  <div className="w-12 h-12 bg-amber-300/60 rounded-xl border border-[#292827]" />
                </div>
                <div className="ch-card-body">
                  <div className="h-5 w-20 bg-amber-100 rounded border border-[#292827]" />
                  <div className="h-5 w-full bg-stone-300 rounded mt-2" />
                  <div className="h-4 w-3/4 bg-stone-200 rounded mt-1" />
                  <div className="ch-card-meta">
                    <div className="h-3.5 w-24 bg-stone-200 rounded" />
                    <div className="h-3.5 w-12 bg-stone-200 rounded" />
                  </div>
                  <div className="ch-card-foot">
                    <div className="h-5 w-16 bg-stone-200 rounded" />
                    <div className="h-8 w-24 bg-[#292827] rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
