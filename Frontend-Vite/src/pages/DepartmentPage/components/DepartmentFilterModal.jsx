import React from "react";
import { FilterIcon, faNum } from "./DepartmentIcons.jsx";

export const MODE_OPTIONS = [
  { id: "all", label: "همه" },
  { id: "in-person", label: "حضوری" },
  { id: "online", label: "غیر حضوری" },
];
export const TYPE_OPTIONS = [
  { id: "all", label: "همه" },
  { id: "free", label: "رایگان" },
  { id: "off", label: "تخفیف‌دار" },
];
export const RATING_OPTIONS = [
  { id: 4.8, label: "۴.۸ به بالا" },
  { id: 4.5, label: "۴.۵ به بالا" },
];
export const DUR_OPTIONS = [
  { id: "short", label: "زیر ۲۰ ساعت" },
  { id: "long", label: "۲۰ ساعت به بالا" },
];
export const SORTS = [
  { id: "default", label: "پیشفرض" },
  { id: "popular", label: "محبوب‌ترین" },
  { id: "rating", label: "بالاترین امتیاز" },
  { id: "cheap", label: "ارزان‌ترین" },
];

export default function DepartmentFilterModal({
  filterRef,
  filterOpen,
  setFilterOpen,
  activeFilterCount,
  resetFilters,
  selectedTopic,
  setSelectedTopic,
  modeF,
  setModeF,
  typeF,
  setTypeF,
  ratingSet,
  toggleRating,
  durSet,
  toggleDur,
  countByRating,
  countByDur,
}) {
  if (!filterOpen) return null;

  return (
    <div
      className="dp-filter-scrim"
      onClick={() => setFilterOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="فیلترها"
    >
      <div className="dp-filter-modal" ref={filterRef} onClick={(e) => e.stopPropagation()}>
        <div className="dp-sheet-handle" aria-hidden="true" />
        <div className="dp-filter-head">
          <div className="dp-filter-head-title">
            <FilterIcon />
            <span>فیلترهای دوره‌ها</span>
            {activeFilterCount > 0 && <span className="dp-filter-count">{faNum(activeFilterCount)}</span>}
          </div>
          <div className="dp-filter-actions">
            {activeFilterCount > 0 && (
              <button type="button" className="dp-reset" onClick={resetFilters}>
                پاک کردن همه
              </button>
            )}
            <button type="button" className="dp-filter-close" onClick={() => setFilterOpen(false)} aria-label="بستن">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="dp-filter-body">
          {selectedTopic && (
            <div className="dp-fgroup">
              <div className="dp-fgroup-title">
                <span>موضوع انتخابی</span>
                <button type="button" className="dp-active-topic-clear" onClick={() => setSelectedTopic(null)} aria-label="حذف فیلتر موضوع">
                  ×
                </button>
              </div>
              <div className="dp-filter-topic-tag">
                <span>{selectedTopic}</span>
                <button type="button" onClick={() => setSelectedTopic(null)} aria-label="حذف موضوع">
                  حذف ×
                </button>
              </div>
            </div>
          )}
          <div className="dp-fgroup">
            <div className="dp-fgroup-title">نحوه برگزاری</div>
            <div className="dp-segment">
              {MODE_OPTIONS.map((m) => (
                <button key={m.id} type="button" className={modeF === m.id ? "on" : ""} onClick={() => setModeF(m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="dp-fgroup">
            <div className="dp-fgroup-title">نوع دوره</div>
            <div className="dp-segment">
              {TYPE_OPTIONS.map((m) => (
                <button key={m.id} type="button" className={typeF === m.id ? "on" : ""} onClick={() => setTypeF(m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="dp-fgroup">
            <div className="dp-fgroup-title">امتیاز دوره</div>
            <div className="dp-check-list">
              {RATING_OPTIONS.map((o) => (
                <label className="dp-check-item" key={o.id}>
                  <input
                    type="checkbox"
                    checked={ratingSet.has(o.id)}
                    onChange={() => toggleRating(o.id)}
                  />
                  <span className="dp-check-box" />
                  <span className="dp-check-label">{o.label}</span>
                  <span className="dp-check-count">{faNum(countByRating(o.id))}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="dp-fgroup">
            <div className="dp-fgroup-title">طول دوره</div>
            <div className="dp-check-list">
              {DUR_OPTIONS.map((o) => (
                <label className="dp-check-item" key={o.id}>
                  <input
                    type="checkbox"
                    checked={durSet.has(o.id)}
                    onChange={() => toggleDur(o.id)}
                  />
                  <span className="dp-check-box" />
                  <span className="dp-check-label">{o.label}</span>
                  <span className="dp-check-count">{faNum(countByDur(o.id))}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
