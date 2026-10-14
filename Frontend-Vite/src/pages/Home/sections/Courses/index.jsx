import { useState, useEffect } from "react";
import { courses } from "@/data/content.js";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import PatternLayer from "@/components/PatternLayer";
import { getPanelStore } from "@/data/panelStore.js";
import { MODE_MAP } from "./coursesSectionData.jsx";
import { CourseCard, CtaRow } from "./HomeCourseCard.jsx";

function Chevron({ right = false }) {
  const d = right ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="20" height="20">
      <path d={d} />
    </svg>
  );
}

export default function Courses() {
  const [store, setStore] = useState(getPanelStore);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const displayCourses = courses.slice(0, 8);
  const counts = { all: displayCourses.length };
  displayCourses.forEach(function(_, i) {
    const m = MODE_MAP[i];
    if (!counts[m]) counts[m] = 0;
    counts[m]++;
  });

  useEffect(function() {
    const onStore = function(e) { setStore(e.detail || getPanelStore()); };
    window.addEventListener("rokad_panel_store_changed", onStore);
    return function() { window.removeEventListener("rokad_panel_store_changed", onStore); };
  }, []);

  const filtered = displayCourses.filter(function(_, i) {
    return filter === "all" || MODE_MAP[i] === filter;
  });

  useEffect(function() {
    const mq = window.matchMedia("(max-width: 700px)");
    const onChange = function(e) { setIsMobile(e.matches); };
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return function() { mq.removeEventListener("change", onChange); };
  }, []);

  const perPage = isMobile ? 1 : 4;
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pageCount - 1);

  useEffect(function() { setPage(0); }, [filter]);

  const segs = [
    { f: "all", label: "همه", count: counts.all },
    { f: "onsite", label: "حضوری", count: counts.onsite },
    { f: "online", label: "غیر حضوری", count: counts.online },
  ];

  return (
    <section className="section v2-courses" id="courses" style={{ background: "var(--bg-college-tint)" }}>
      <PatternLayer rotate={180} />
      <div className="container section-inner">
        <div className="head" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 820, margin: "0 auto 2rem" }}>
          <RotatedHeading words={"از این دوره‌ها شغلت را بساز"} className="t-section" color="var(--ink)" />
        </div>

        <div className="v2-controls">
          <div className="segment" role="tablist">
            {segs.map(function(s) {
              const isOn = filter === s.f;
              return (
                <button
                  key={s.f}
                  className={"seg-btn" + (isOn ? " on" : "")}
                  data-f={s.f}
                  onClick={function() { setFilter(s.f); }}
                >
                  <span className="dot" />
                  {s.label}
                  <span className="cnt">{s.count}</span>
                </button>
              );
            })}
          </div>
          <div className="v2-nav-arrows">
            {pageCount > 1 && (
              <button className="v2-icon-btn" onClick={function() { setPage((safePage - 1 + pageCount) % pageCount); }} aria-label="قبلی">
                <Chevron right />
              </button>
            )}
            <button className="v2-icon-btn" onClick={function() { setPage((safePage + 1) % pageCount); }} aria-label="بعدی">
              <Chevron />
            </button>
          </div>
        </div>

        <div className="v2-carousel">
          <div
            className="v2-track"
            style={isMobile ? {} : { transform: "translateX(calc(" + safePage + " * (100% + 2.5rem)))" }}
          >
            {Array.from({ length: pageCount }, function(_, p) {
              const pageCourses = filtered.slice(p * perPage, p * perPage + perPage);
              return (
                <div className="v2-page" key={filter + "-" + p} aria-hidden={p !== safePage}>
                  {pageCourses.map(function(c) {
                    const realIndex = displayCourses.indexOf(c);
                    return <CourseCard key={c.title} course={c} index={realIndex} store={store} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <CtaRow />
      </div>
    </section>
  );
}