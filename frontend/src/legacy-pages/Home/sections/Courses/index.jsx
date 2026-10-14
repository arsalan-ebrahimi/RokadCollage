"use client";

import { useState, useEffect } from "react";
import RotatedHeading from "@/components/RotatedHeading.jsx";
import PatternLayer from "@/components/PatternLayer";
import { getPanelStore } from "@/data/panelStore.js";
import { getAllCourses } from "@/services/courseService.js";
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
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllCourses();
        setCoursesList(data);
      } catch (err) {
        console.error("Failed to load courses from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const onStore = function (e) { setStore(e.detail || getPanelStore()); };
    window.addEventListener("rokad_panel_store_changed", onStore);
    return function () { window.removeEventListener("rokad_panel_store_changed", onStore); };
  }, []);

  const counts = { all: coursesList.length, onsite: 0, online: 0 };
  coursesList.forEach((c) => {
    if (c.mode === "in-person") counts.onsite++;
    if (c.mode === "online") counts.online++;
  });

  const filtered = coursesList.filter((c) => {
    if (filter === "onsite") return c.mode === "in-person";
    if (filter === "online") return c.mode === "online";
    return true;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = function (e) { setIsMobile(e.matches); };
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return function () { mq.removeEventListener("change", onChange); };
  }, []);

  const perPage = isMobile ? 1 : 4;
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pageCount - 1);

  useEffect(() => { setPage(0); }, [filter]);

  const segs = [
    { f: "all", label: "همه", count: counts.all },
    { f: "onsite", label: "حضوری", count: counts.onsite },
    { f: "online", label: "غیر حضوری", count: counts.online },
  ];

  return (
    <section className="section v2-courses" id="courses">
      <PatternLayer />
      <div className="container section-inner">
        <div className="head">
          <RotatedHeading
            words={[
              { t: "مسیر", rot: "-1deg" },
              { t: "یادگیری", rot: "1deg" },
              { t: "تخصصی", rot: "-1.5deg", hl: true },
              { t: "خودت", rot: "1deg" },
              { t: "رو", rot: "-1deg" },
              { t: "انتخاب", rot: "1.5deg", hl: true },
              { t: "کن", rot: "-0.5deg" },
            ]}
          />
        </div>

        <div className="v2-controls">
          <div className="segment" role="tablist">
            {segs.map((s) => (
              <button
                key={s.f}
                type="button"
                role="tab"
                aria-selected={filter === s.f}
                data-f={s.f}
                className={"seg-btn" + (filter === s.f ? " on" : "")}
                onClick={() => setFilter(s.f)}
              >
                <span className="dot" />
                {s.label}
                <span className="cnt">{s.count}</span>
              </button>
            ))}
          </div>

          <div className="v2-nav-arrows" aria-label="ورق‌زدن دوره‌ها">
            <button
              type="button"
              className="v2-icon-btn"
              aria-label="صفحه قبلی"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <Chevron right={true} />
            </button>
            <button
              type="button"
              className="v2-icon-btn"
              aria-label="صفحه بعدی"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            >
              <Chevron right={false} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-white border-2 border-[#292827] rounded-2xl animate-pulse p-4" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500 font-bold">هیچ دوره‌ای در این بخش یافت نشد.</div>
        ) : (
          <div className="v2-carousel">
            <div
              className="v2-track"
              style={isMobile ? {} : { transform: `translateX(calc(${safePage} * (100% + 2.5rem)))` }}
            >
              {Array.from({ length: pageCount }, (_, p) => {
                const pageCourses = filtered.slice(p * perPage, p * perPage + perPage);
                return (
                  <div className="v2-page" key={`${filter}-${p}`} aria-hidden={!isMobile && p !== safePage}>
                    {pageCourses.map((c, idx) => {
                      const realIndex = p * perPage + idx;
                      return <CourseCard key={c._id || c.slug || realIndex} course={c} index={realIndex} store={store} />;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <CtaRow />
      </div>
    </section>
  );
}