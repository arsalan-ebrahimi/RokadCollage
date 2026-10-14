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

import { getAllCourses } from "@/services/courseService.js";
import { getComments } from "@/services/commentService.js";

const INITIAL_COUNT = 6;

const DEPT_CATEGORY_MAP = {
  it: "فناوری اطلاعات",
  business: "کسب و کار",
  languages: "زبان‌های خارجی",
  counseling: "مشاوره",
};

export default function DepartmentPage({ deptId, initialCourses = [] }) {
  const [store, setStore] = useState(getPanelStore);
  const [liveCourses, setLiveCourses] = useState(initialCourses);
  const [liveComments, setLiveComments] = useState([]);
  const [loading, setLoading] = useState(initialCourses.length === 0);

  useEffect(() => {
    async function loadDeptData() {
      try {
        const [coursesRes, commentsRes] = await Promise.all([
          initialCourses && initialCourses.length > 0 ? Promise.resolve(initialCourses) : getAllCourses().catch(() => []),
          getComments().catch(() => []),
        ]);
        setLiveCourses(Array.isArray(coursesRes) ? coursesRes : []);
        const commList = Array.isArray(commentsRes) ? commentsRes : (commentsRes?.data || []);
        setLiveComments(commList);
      } catch (err) {
        console.error("Failed to load department data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDeptData();
  }, [initialCourses]);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const currentId = departments[deptId] ? deptId : "languages";
  const persona = DEPT_PERSONA[currentId] || DEPT_PERSONA.languages;
  const baseDept = departments[currentId] || departments.languages;

  // Filter live courses that match this department's category
  const targetCategory = DEPT_CATEGORY_MAP[currentId] || baseDept.name;
  const deptLiveCourses = liveCourses.filter(
    (c) =>
      c.category === targetCategory ||
      (currentId === "it" && (c.category?.includes("اطلاعات") || c.category?.includes("فرانتاند") || c.category?.includes("بکاند"))) ||
      (currentId === "counseling" && (c.category?.includes("مشاوره") || c.category?.includes("هدایت")))
  );

  const formattedDeptCourses = deptLiveCourses.map((c, i) => {
    const isHp = c.isInPerson || c.mode === "in-person" || c.type === "حضوری";
    const teacherName = c.instructor?.fullName || c.instructor?.name || (c.teachers && c.teachers[0]?.name) || "مدرس کالج";
    const priceNum = c.finalPrice !== undefined ? c.finalPrice : c.price;
    const hasDiscount = Boolean(c.isDiscountActive && c.price && c.finalPrice && c.finalPrice < c.price);

    return {
      id: c.id || c._id || `dept-c-${i}`,
      _id: c._id || c.id,
      title: c.title,
      cat: c.category || targetCategory,
      department: currentId,
      mode: isHp ? "حضوری" : "غیر حضوری",
      hours: c.duration || `${c.hours || 35} ساعت`,
      rating: "۴.۹",
      students: `${Number(c.studentCount || 95).toLocaleString("fa-IR")}`,
      price: priceNum ? `${Number(priceNum).toLocaleString("fa-IR")} تومان` : "رایگان",
      old: hasDiscount ? `${Number(c.price).toLocaleString("fa-IR")} تومان` : null,
      free: !priceNum || priceNum === 0,
      slug: c.slug || c.id || c._id,
      inst: teacherName,
      ic: currentId,
      tag: isHp ? "کارگاه حضوری" : "آنلاین",
    };
  });

  const deptTestimonials = useMemo(() => {
    if (!liveComments || liveComments.length === 0) return [];
    const matching = liveComments.filter((c) => {
      const cat = c.course?.category;
      if (!cat) return true;
      if (currentId === "it") return cat.includes("اطلاعات") || cat.includes("فرانتاند") || cat.includes("بکاند");
      if (currentId === "business") return cat.includes("کسب");
      if (currentId === "languages") return cat.includes("زبان");
      if (currentId === "counseling") return cat.includes("مشاوره") || cat.includes("هدایت");
      return true;
    });
    const source = matching.length > 0 ? matching : liveComments;
    return source.map((c) => ({
      name: c.name,
      role: c.role || c.job || "هنرجوی دوره",
      text: c.comment,
    }));
  }, [liveComments, currentId]);

  const dept = useMemo(() => {
    const popularCourses = formattedDeptCourses.length > 0 ? formattedDeptCourses : (baseDept.popular || []);
    const newestCourses = formattedDeptCourses.length > 0 ? formattedDeptCourses : (baseDept.newest || []);
    return {
      ...baseDept,
      popular: popularCourses,
      newest: newestCourses,
      suggested: popularCourses.slice(0, 4),
      testimonials: deptTestimonials.length > 0 ? deptTestimonials : (baseDept.testimonials || []),
    };
  }, [baseDept, formattedDeptCourses, deptTestimonials]);

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
