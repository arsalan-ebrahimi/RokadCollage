import React, { useEffect, useMemo, useRef, useState } from "react";
import "./department.css";
import { DEPT_PERSONA, departments } from "@/data/departments.js";
import { getPanelStore } from "@/data/panelStore.js";
import { faToNum } from "./components/DepartmentIcons.jsx";
import { useRtlRowNav } from "./hooks/useRtlRowNav.js";
import { matchesTopic, filterCourses } from "./utils/departmentFilters.js";
import DepartmentHero from "./components/DepartmentHero.jsx";
import DepartmentSuggestedRow from "./components/DepartmentSuggestedRow.jsx";
import DepartmentCoursesSection from "./components/DepartmentCoursesSection.jsx";
import DepartmentFilterModal from "./components/DepartmentFilterModal.jsx";
import DepartmentPathsSection from "./components/DepartmentPathsSection.jsx";
import DepartmentTestimonialsSection from "./components/DepartmentTestimonialsSection.jsx";
import DepartmentCtaSection from "./components/DepartmentCtaSection.jsx";
import DepartmentFab from "./components/DepartmentFab.jsx";

const INITIAL_COUNT = 6;

export default function DepartmentPage({ deptId }) {
  const [store, setStore] = useState(getPanelStore);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const currentId = departments[deptId] ? deptId : "languages";
  const persona = DEPT_PERSONA[currentId] || DEPT_PERSONA.languages;
  const dept = departments[currentId] || departments.languages;

  const [tab, setTab] = useState("popular");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [ratingSet, setRatingSet] = useState(() => new Set());
  const [durSet, setDurSet] = useState(() => new Set());
  const [typeF, setTypeF] = useState("all");
  const [modeF, setModeF] = useState("all");
  const [sort, setSort] = useState("default");
  const [showAll, setShowAll] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  const sortRef = useRef(null);
  const filterRef = useRef(null);
  const suggestNav = useRtlRowNav();

  const toggleSet = (set, setter, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  useEffect(() => {
    setShowAll(false);
  }, [ratingSet, durSet, typeF, modeF, sort, selectedTopic, currentId]);

  useEffect(() => {
    suggestNav.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    setSelectedTopic(null);
  }, [currentId]);

  useEffect(() => {
    if (!sortOpen) return;
    const onDoc = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [sortOpen]);

  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setFilterOpen(false); };
    window.addEventListener("keydown", onKey);

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    let prevOverflow = "";
    if (isMobile) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    const onDoc = (e) => {
      if (typeof window !== "undefined" && window.innerWidth > 768) {
        if (filterRef.current && !filterRef.current.contains(e.target) && !e.target.closest(".dp-filter-btn")) {
          setFilterOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", onDoc);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
      if (isMobile) {
        document.body.style.overflow = prevOverflow;
      }
    };
  }, [filterOpen]);

  const scrollToSection = (e, id) => {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const collegePersona = DEPT_PERSONA.business;
  const styleVars = {
    "--dp": collegePersona.colorVar,
    "--dp-light": collegePersona.lightVar,
    "--dp-dark": collegePersona.darkVar,
    "--dp-text": "var(--ink)",
  };

  const allCourses = useMemo(() => {
    return filterCourses({ dept, selectedTopic, modeF, ratingSet, durSet, typeF, sort });
  }, [dept, selectedTopic, modeF, ratingSet, durSet, typeF, sort]);

  const activeFilterCount =
    (selectedTopic ? 1 : 0) +
    (modeF !== "all" ? 1 : 0) +
    (ratingSet.size ? 1 : 0) +
    (durSet.size === 1 ? 1 : 0) +
    (typeF !== "all" ? 1 : 0);

  const resetFilters = () => {
    setSelectedTopic(null);
    setModeF("all");
    setRatingSet(new Set());
    setDurSet(new Set());
    setTypeF("all");
    setSort("default");
  };

  const displayedCourses = showAll ? allCourses : allCourses.slice(0, INITIAL_COUNT);
  const countBy = (fn) => [...dept.popular, ...dept.newest].filter((c) => matchesTopic(c, selectedTopic) && fn(c)).length;

  return (
    <div className="dp-page" style={styleVars} data-dept={currentId} key={currentId}>
      <DepartmentHero dept={dept} persona={collegePersona} onScrollTo={scrollToSection} />

      <main className="dp-main container">
        <DepartmentSuggestedRow
          dept={dept}
          tab={tab}
          setTab={setTab}
          suggestNav={suggestNav}
          persona={persona}
          store={store}
        />

        <DepartmentCoursesSection
          allCourses={allCourses}
          displayedCourses={displayedCourses}
          showAll={showAll}
          setShowAll={setShowAll}
          initialCount={INITIAL_COUNT}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          activeFilterCount={activeFilterCount}
          setFilterOpen={setFilterOpen}
          sort={sort}
          setSort={setSort}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
          sortRef={sortRef}
          resetFilters={resetFilters}
          persona={persona}
          store={store}
        />

        <DepartmentPathsSection dept={dept} currentId={currentId} />

        <DepartmentTestimonialsSection dept={dept} />

        <DepartmentCtaSection
          dept={dept}
          currentId={currentId}
          persona={collegePersona}
          onScrollTo={scrollToSection}
        />
      </main>

      <DepartmentFilterModal
        filterRef={filterRef}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        activeFilterCount={activeFilterCount}
        resetFilters={resetFilters}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        modeF={modeF}
        setModeF={setModeF}
        typeF={typeF}
        setTypeF={setTypeF}
        ratingSet={ratingSet}
        toggleRating={(id) => toggleSet(ratingSet, setRatingSet, id)}
        durSet={durSet}
        toggleDur={(id) => toggleSet(durSet, setDurSet, id)}
        countByRating={(minR) => countBy((c) => faToNum(c.rating) >= minR)}
        countByDur={(type) => countBy((c) => (type === "short" ? faToNum(c.hours) < 20 : faToNum(c.hours) >= 20))}
      />

      <DepartmentFab fabOpen={fabOpen} setFabOpen={setFabOpen} currentId={currentId} />
    </div>
  );
}
