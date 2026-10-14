import React from "react";

export default function BlogLoading() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* 1. دقیقا مثل bi-hero */}
      <section className="bi-hero animate-pulse">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="bi-back" style={{ opacity: 0.6 }}>
            <span>بازگشت به خانه</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <div className="bi-pill">
              <span className="w-4 h-4 bg-amber-400 rounded-full inline-block" />
              <span>مجلهٔ رکاد</span>
              <span style={{ color: "var(--ink-subtle)" }}>·</span>
              <span style={{ color: "var(--college-dark)", fontWeight: 900 }}>شماره ۱۴۰۵</span>
            </div>
          </div>

          <div className="text-center my-6">
            <div className="h-12 w-96 max-w-full bg-stone-300 rounded-2xl mx-auto mb-4" />
            <div className="h-4 w-[500px] max-w-full bg-stone-200 rounded-md mx-auto" />
          </div>

          <div className="bi-search">
            <div className="bi-search-sh" />
            <div className="bi-search-box">
              <div className="h-12 w-full bg-white rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. مقاله ویژه: bi-featured */}
      <section className="bi-featured">
        <div className="container">
          <div className="bi-sec-head">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="bi-dot-ring" />
              <h2 className="bi-h2">
                <span>مقاله</span> <span className="mk">ویژه</span> <span>این هفته</span>
              </h2>
            </div>
          </div>

          <div className="bi-featured-card animate-pulse">
            <div className="bi-featured-sh" />
            <div className="bi-featured-grid">
              <div className="bi-featured-media" style={{ background: "var(--bg-college-tint, #fff8ea)" }}>
                <div className="w-16 h-16 bg-amber-200 rounded-2xl border-2 border-[#292827]" />
              </div>

              <div className="bi-featured-body">
                <div className="bi-feat-meta">
                  <div className="h-3.5 w-24 bg-stone-200 rounded" />
                  <span className="sep" />
                  <div className="h-3.5 w-20 bg-stone-200 rounded" />
                </div>
                <div className="h-8 w-4/5 bg-stone-300 rounded-xl my-4" />
                <div className="h-4 w-full bg-stone-200 rounded mb-2" />
                <div className="h-4 w-3/4 bg-stone-200 rounded mb-6" />
                <div className="bi-feat-foot">
                  <div className="h-10 w-36 bg-amber-400 border border-[#292827] rounded-xl shadow-[2px_2px_0px_#292827]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. گرید مقالات: bi-grid */}
      <section className="container" style={{ padding: "40px 20px 80px" }}>
        <div className="bi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bi-card animate-pulse" style={{ opacity: 0.9 }}>
              <div className="bi-card-sh" />
              <div className="bi-card-body">
                <div className="bi-card-media" style={{ background: "var(--bg-college-tint, #fff8ea)", height: 160 }}>
                  <div className="w-10 h-10 bg-amber-200 rounded-lg border border-[#292827]" />
                </div>
                <div className="bi-card-info">
                  <div className="bi-card-meta">
                    <div className="h-3 w-16 bg-stone-200 rounded" />
                    <span className="dot" />
                    <div className="h-3 w-20 bg-stone-200 rounded" />
                  </div>
                  <div className="h-5 w-full bg-stone-300 rounded my-2" />
                  <div className="h-3.5 w-4/5 bg-stone-200 rounded mb-4" />
                  <div className="bi-card-foot">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-stone-200 border border-[#292827]" />
                      <div className="h-3 w-20 bg-stone-200 rounded" />
                    </div>
                    <div className="w-7 h-7 rounded bg-amber-400 border border-[#292827]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
