import React from "react";
import { SectionHead, ChevronIcon } from "./DepartmentIcons.jsx";
import DepartmentCourseCard from "./DepartmentCourseCard.jsx";

export default function DepartmentSuggestedRow({
  dept,
  tab,
  setTab,
  suggestNav,
  persona,
  store,
}) {
  const tabList = tab === "popular" ? dept.popular : dept.newest;

  return (
    <section className="dp-block" id="dp-suggest">
      <SectionHead pre="دوره‌های پیشنهادی برای شروع" accent={dept.name} />
      <div className="dp-suggest-ctrl">
        <div className="dp-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "popular"}
            className={`dp-tab${tab === "popular" ? " active" : ""}`}
            onClick={() => setTab("popular")}
          >
            محبوب‌ترین
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "newest"}
            className={`dp-tab${tab === "newest" ? " active" : ""}`}
            onClick={() => setTab("newest")}
          >
            جدیدترین
          </button>
        </div>
        <div className="dp-row-nav">
          <button
            type="button"
            className="dp-nav"
            onClick={() => suggestNav.scroll(false)}
            disabled={!suggestNav.nav.prev}
            aria-label="دوره‌های قبلی"
          >
            <ChevronIcon dir="right" />
          </button>
          <button
            type="button"
            className="dp-nav"
            onClick={() => suggestNav.scroll(true)}
            disabled={!suggestNav.nav.next}
            aria-label="دوره‌های بعدی"
          >
            <ChevronIcon dir="left" />
          </button>
        </div>
      </div>
      <div className="dp-row" ref={suggestNav.rowRef} aria-label={`دوره‌های پیشنهادی ${dept.name}`}>
        {tabList.length === 0 ? (
          <div className="dp-empty" style={{ width: "100%", padding: "2rem", textAlign: "center", color: "var(--ink-soft)" }}>
            دوره‌ای برای این بخش یافت نشد.
          </div>
        ) : (
          tabList.map((c, i) => (
            <DepartmentCourseCard
              c={c}
              rot={[-1, 1, -0.5, 0.5][i % 4]}
              persona={persona}
              store={store}
              key={c._id || c.id || c.slug || i}
            />
          ))
        )}
      </div>
    </section>
  );
}
