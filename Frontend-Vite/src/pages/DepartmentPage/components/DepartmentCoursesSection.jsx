import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionHead, FilterIcon, faNum } from "./DepartmentIcons.jsx";
import DepartmentCourseCard from "./DepartmentCourseCard.jsx";
import { SORTS } from "./DepartmentFilterModal.jsx";

export default function DepartmentCoursesSection({
  allCourses,
  displayedCourses,
  showAll,
  setShowAll,
  initialCount,
  selectedTopic,
  setSelectedTopic,
  activeFilterCount,
  setFilterOpen,
  sort,
  setSort,
  sortOpen,
  setSortOpen,
  sortRef,
  resetFilters,
  persona,
  store,
}) {
  return (
    <section className="dp-block" id="dp-all">
      <SectionHead pre="همهٔ" accent="دوره‌ها" />

      <div className="dp-toolbar">
        <div className="dp-toolbar-start">
          <div className="dp-count">
            <b>{faNum(allCourses.length)}</b> دوره
          </div>
          {selectedTopic && (
            <div className="dp-active-topic-badge">
              <span>موضوع: <b>{selectedTopic}</b></span>
              <button
                type="button"
                className="dp-active-topic-clear"
                onClick={() => setSelectedTopic(null)}
                aria-label="حذف فیلتر موضوع"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div className="dp-tools">
          <button type="button" className="dp-filter-btn" onClick={() => setFilterOpen(true)} aria-haspopup="dialog">
            <FilterIcon />
            <span>فیلترها</span>
            {activeFilterCount > 0 && <span className="dp-filter-count">{faNum(activeFilterCount)}</span>}
          </button>
          <div className="dp-sort" ref={sortRef}>
            <span className="dp-sort-lab">ترتیب:</span>
            <button type="button" className="dp-sort-btn" onClick={() => setSortOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={sortOpen}>
              {SORTS.find((s) => s.id === sort)?.label} <span className="caret">▼</span>
            </button>
            {sortOpen && (
              <ul className="dp-sort-menu" role="listbox">
                {SORTS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sort === s.id}
                      className={sort === s.id ? "active" : ""}
                      onClick={() => {
                        setSort(s.id);
                        setSortOpen(false);
                      }}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {allCourses.length === 0 ? (
        <div className="dp-empty">
          <p>دوره‌ای با این فیلترها پیدا نشد.</p>
          <button type="button" className="dp-btn dp-btn-ghost" onClick={resetFilters} style={{ marginTop: 12 }}>
            پاک کردن همهٔ فیلترها
          </button>
        </div>
      ) : (
        <>
          <div className="dp-grid">
            {displayedCourses.map((c, i) => (
              <DepartmentCourseCard
                c={c}
                rot={[-0.5, 0.5, -0.25, 0.25][i % 4]}
                persona={persona}
                store={store}
                key={i}
              />
            ))}
          </div>

          {allCourses.length > initialCount && (
            <div className="dp-view-all-wrap">
              {!showAll ? (
                <button
                  type="button"
                  className="dp-view-all-btn primary"
                  onClick={() => setShowAll(true)}
                >
                  <span>مشاهده همه دوره‌ها ({faNum(allCourses.length)})</span>
                  <ChevronDown size={17} strokeWidth={2.5} />
                </button>
              ) : (
                <button
                  type="button"
                  className="dp-view-all-btn ghost"
                  onClick={() => {
                    setShowAll(false);
                    document.getElementById("dp-all")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <span>نمایش کمتر</span>
                  <ChevronUp size={17} strokeWidth={2.5} />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
