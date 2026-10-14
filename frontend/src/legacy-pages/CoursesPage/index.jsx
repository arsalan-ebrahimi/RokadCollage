import React, { useState, useEffect } from "react";
import "./courses-hub.css";
import { getPanelStore } from "@/data/panelStore.js";
import { isWishlisted } from "@/data/selectors.js";
import { getAllCourses } from "@/services/courseService.js";
import { getTeachers } from "@/services/teacherService.js";
import { useHorizontalDragScroll } from "./hooks/useHorizontalDragScroll.js";
import CoursesHubHero from "./components/CoursesHubHero.jsx";
import FlagshipSection from "./components/FlagshipSection.jsx";
import SuggestedGroupSection from "./components/SuggestedGroupSection.jsx";
import InstructorsSection from "./components/InstructorsSection.jsx";
import { Code, Briefcase, Globe, Sparkles } from "lucide-react";

const DEPT_CONFIG = {
  "فناوری اطلاعات": {
    deptId: "it",
    deptName: "فناوری اطلاعات",
    badgeColor: "var(--navy-alt)",
    badgeBg: "var(--male-light)",
    pattern: "/assets/StatCard/blue.png",
    icon: Code,
    themeClass: "flag-it",
    badge: "دپارتمان فناوری اطلاعات",
  },
  "کسب و کار": {
    deptId: "business",
    deptName: "کسب و کار",
    badgeColor: "var(--college-darker)",
    badgeBg: "var(--college-light)",
    pattern: "/assets/StatCard/yellow.png",
    icon: Briefcase,
    themeClass: "flag-business",
    badge: "دپارتمان کسب و کار",
  },
  "زبان‌های خارجی": {
    deptId: "languages",
    deptName: "زبان‌های خارجی",
    badgeColor: "var(--olive)",
    badgeBg: "var(--green-light)",
    pattern: "/assets/StatCard/green.png",
    icon: Globe,
    themeClass: "flag-languages",
    badge: "دپارتمان زبان‌های خارجی",
  },
  "مشاوره": {
    deptId: "counseling",
    deptName: "مشاوره",
    badgeColor: "var(--female-dark)",
    badgeBg: "var(--female-light)",
    pattern: "/assets/StatCard/pink.png",
    icon: Sparkles,
    themeClass: "flag-female",
    badge: "دپارتمان مشاوره",
  },
};

export default function CoursesPage() {
  const [store, setStore] = useState(getPanelStore);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const instScroll = useHorizontalDragScroll();

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesData, teachersData] = await Promise.all([
          getAllCourses().catch(() => []),
          getTeachers().catch(() => []),
        ]);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setInstructors(Array.isArray(teachersData) ? teachersData : []);
      } catch (err) {
        console.error("Failed to load courses or instructors:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  // Format flagship courses from real API courses
  const flagshipCourses = courses.slice(0, 3).map((c, i) => {
    const deptInfo = DEPT_CONFIG[c.category] || DEPT_CONFIG["فناوری اطلاعات"];
    return {
      id: c._id || c.id || `flag-${i}`,
      deptId: deptInfo.deptId,
      deptName: c.category || deptInfo.deptName,
      themeClass: deptInfo.themeClass,
      pattern: deptInfo.pattern,
      badge: c.isInPerson || c.mode === "in-person" ? "دوره حضوری و کارگاهی" : "دوره آنلاین و پروژه محور",
      title: c.title,
      inst: c.instructor?.fullName || c.instructor?.name || "استاد کالج رکاد",
      desc: c.description || c.headline || "آموزش جامع و پروژه محور متناسب با نیازهای بازار کار ایران و بین‌الملل.",
      hours: c.duration || `${c.hours || 40} ساعت آموزش`,
      students: `${Number(c.studentCount || 120).toLocaleString("fa-IR")} هنرجو`,
      rating: "۴.۹",
      price: c.price ? `${Number(c.price).toLocaleString("fa-IR")} تومان` : "رایگان",
      slug: c.slug || c.id || c._id,
      mode: c.isInPerson || c.mode === "in-person" ? "in-person" : "online",
      deptHref: `/dept/${deptInfo.deptId}`,
      deptBtnText: `مشاهده دپارتمان ${c.category || deptInfo.deptName}`,
      icon: deptInfo.icon,
    };
  });

  // Group real courses dynamically by category
  const groupedCategories = {};
  courses.forEach((c) => {
    const cat = c.category || "فناوری اطلاعات";
    const deptInfo = DEPT_CONFIG[cat] || DEPT_CONFIG["فناوری اطلاعات"];
    if (!groupedCategories[cat]) {
      groupedCategories[cat] = {
        deptId: deptInfo.deptId,
        deptName: cat,
        badgeColor: deptInfo.badgeColor,
        badgeBg: deptInfo.badgeBg,
        pattern: deptInfo.pattern,
        courses: [],
      };
    }
    groupedCategories[cat].courses.push({
      id: c.id || c._id,
      title: c.title,
      cat: cat,
      inst: c.instructor?.fullName || c.instructor?.name || "استاد کالج",
      hours: c.duration || `${c.hours || 30} ساعت`,
      students: `${Number(c.studentCount || 85).toLocaleString("fa-IR")} هنرجو`,
      rating: "۴.۸",
      price: c.price ? `${Number(c.price).toLocaleString("fa-IR")} تومان` : "رایگان",
      tag: c.isInPerson || c.mode === "in-person" ? "حضوری" : "آنلاین",
      tagType: "hot",
      slug: c.slug || c.id || c._id,
      mode: c.isInPerson || c.mode === "in-person" ? "in-person" : "online",
    });
  });

  const displayedSuggestedGroups = Object.values(groupedCategories);

  const displayedInstructors = instructors.map((t) => ({
    name: t.name,
    dept: t.specialization?.includes("فرانت") || t.specialization?.includes("برنامه") || t.specialization?.includes("UI") ? "فناوری اطلاعات" : t.specialization?.includes("کسب") || t.specialization?.includes("مارکتینگ") ? "کسب و کار" : "زبان‌های خارجی",
    role: t.specialization,
    bio: `استاد و مربی کالج رکاد در زمینه تخصصی ${t.specialization}.`,
    courses: "دوره‌های فعال",
    students: "هنرجوی فعال",
    rating: "۴.۹",
    initial: t.name?.slice(0, 2) || "اس",
    avatar: t.photo || "/assets/StatCard/blue.png",
    color: "var(--male-light)",
  }));

  return (
    <div className="ch-page">
      <CoursesHubHero />

      <div className="ch-container">
        {loading ? (
          <div className="py-20 text-center text-stone-500 font-bold">در حال بارگذاری دوره‌ها از سرور...</div>
        ) : (
          <>
            {flagshipCourses.length > 0 && (
              <FlagshipSection flagshipCourses={flagshipCourses} store={store} />
            )}
            {displayedSuggestedGroups.length > 0 && (
              <SuggestedGroupSection suggestedGroups={displayedSuggestedGroups} store={store} />
            )}
            {displayedInstructors.length > 0 && (
              <InstructorsSection topInstructors={displayedInstructors} instScroll={instScroll} />
            )}
          </>
        )}
      </div>
    </div>
  );
}