import React, { useEffect, useRef, useState, useMemo } from "react";
import "./course.css";
import PatternLayer from "../../components/PatternLayer";
import { getCourseBySlug } from "./courseData.js";
import { getPanelStore, enrollInCourse, toggleWishlist } from "../../data/panelStore.js";
import { isEnrolledIn, isWishlisted as checkWishlisted } from "../../data/selectors.js";
import CheckoutModal from "../Checkout/CheckoutModal.jsx";
import VideoPlayerModal from "../../components/VideoPlayerModal/index.jsx";
import CourseSingleInPerson from "./CourseSingleInPerson.jsx";
import CourseSingleNotFound from "./components/CourseSingleNotFound.jsx";
import { CourseTopbar, CourseSidebar } from "./components/CourseSidebar.jsx";
import CourseMobilePlayer from "./components/CourseMobilePlayer.jsx";
import ResourcesPanel from "./components/ResourcesPanel.jsx";
import {
  DescriptionPanel,
  CurriculumPanel,
  ReviewsPanel,
  QaPanel,
} from "./components/CoursePanels.jsx";

export default function CourseSingle({ slug }) {
  const [tab, setTab] = useState(0);
  const [openChapter, setOpenChapter] = useState(0);
  const headRef = useRef(null);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  const course = useMemo(() => getCourseBySlug(slug), [slug]);
  const [store, setStore] = useState(getPanelStore);
  const [enrollToast, setEnrollToast] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const allLessons = useMemo(() => {
    return (course?.chapters || []).flatMap((ch) => ch.lessons || []);
  }, [course]);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  if (!course) {
    return <CourseSingleNotFound />;
  }

  if (
    course.mode === "in-person" ||
    course.isInPerson ||
    (slug && (slug.includes("bootcamp") || slug.includes("حضوری") || slug.includes("in-person")))
  ) {
    return <CourseSingleInPerson course={course} slug={slug} />;
  }

  const courseSlug = course.slug || slug;
  const isEnrolled = isEnrolledIn(courseSlug, store);
  const isWishlisted = Boolean(store?.auth?.isLoggedIn) && checkWishlisted(courseSlug, store);

  const courseTabs = ["توضیحات", ...(course.tabs || ["سرفصل‌ها", "نظرات", "پرسش و پاسخ", "منابع"]).filter((t) => t !== "توضیحات")];

  const handleStartPurchase = () => {
    if (!Boolean(store?.auth?.isLoggedIn)) {
      try {
        sessionStorage.setItem("rokad_auth_redirect", `course/${courseSlug}`);
        sessionStorage.setItem("rokad_auth_msg", `برای ثبت‌نام در «${course.title}»، لطفاً ابتدا وارد شوید یا ثبت‌نام کنید.`);
      } catch (_) {}
      window.dispatchEvent(
        new CustomEvent("rokad_auth_required", {
          detail: {
            message: `برای ثبت‌نام در «${course.title}»، لطفاً ابتدا در کالج ثبت‌نام کنید.`,
            action: "register",
          },
        })
      );
      return;
    }

    const isFree = course.price === "رایگان" || course.free === true || course.price === "۰";
    if (isFree) {
      enrollInCourse({
        slug: courseSlug,
        title: course.title,
        teacher: course.teacher?.name || "اساتید کالج رکاد",
        sessions: course.facts?.find((f) => f.k === "مدت زمان")?.v ? `۱۲ فصل · ${course.facts.find((f) => f.k === "مدت زمان").v}` : "۱۲ فصل · ۳۲ ساعت",
      });
      setEnrollToast(true);
      setTimeout(() => { window.location.hash = "panel/courses"; }, 1200);
      return;
    }
    setCheckoutOpen(true);
  };

  const handleWishlistToggle = () => {
    if (!Boolean(store?.auth?.isLoggedIn)) {
      try {
        sessionStorage.setItem("rokad_auth_redirect", `course/${courseSlug}`);
        sessionStorage.setItem("rokad_auth_msg", `برای افزودن «${course.title}» به نشان‌شده‌ها، لطفاً ابتدا حساب کاربری بسازید.`);
      } catch (_) {}
      window.dispatchEvent(
        new CustomEvent("rokad_auth_required", {
          detail: {
            message: `برای ذخیره «${course.title}»، لطفاً ابتدا در کالج ثبت‌نام کنید.`,
            action: "register",
          },
        })
      );
      return;
    }
    toggleWishlist(courseSlug);
  };


  const handleOpenVideo = (lesson = null) => {
    if (lesson && !lesson.free && !isEnrolled) {
      handleStartPurchase();
      return;
    }
    setActiveLesson(lesson || allLessons.find((l) => l.free) || allLessons[0] || null);
    setVideoModalOpen(true);
  };

  return (
    <main className="cs-page" id="course">
      <PatternLayer rotate={0} />

      <CourseTopbar course={course} />

      <div className="cs-grid container">
        <CourseMobilePlayer course={course} headRef={headRef} onOpenVideo={() => handleOpenVideo()} />

        <div className="cs-main">
          <div className="cs-hero">
            <h1>
              <span style={{ display: "inline-block", transform: "rotate(-0.5deg)" }}>{course.title}</span>
            </h1>
            <div className="cs-meta">
              {course.meta.map((m) => (
                <span className="m" key={m}>{m}</span>
              ))}
            </div>
          </div>

          <div className="cs-tabs" role="tablist">
            {courseTabs.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === i}
                className={tab === i ? "on" : ""}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 0 && <DescriptionPanel course={course} />}
          {tab === 1 && (
            <CurriculumPanel
              course={course}
              openChapter={openChapter}
              setOpenChapter={setOpenChapter}
              onLessonPlay={handleOpenVideo}
              isEnrolled={isEnrolled}
            />
          )}
          {tab === 2 && <ReviewsPanel course={course} />}
          {tab === 3 && <QaPanel course={course} />}
          {tab === 4 && <ResourcesPanel course={course} isEnrolled={isEnrolled} onEnrollClick={handleStartPurchase} />}
        </div>

        <CourseSidebar
          course={course}
          isEnrolled={isEnrolled}
          isWishlisted={isWishlisted}
          enrollToast={enrollToast}
          onStartPurchase={handleStartPurchase}
          onWishlistToggle={handleWishlistToggle}
          onOpenVideo={() => handleOpenVideo()}
        />
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        course={course}
      />

      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={course.videoUrl}
        title={course.title}
        lessonTitle={activeLesson ? activeLesson.t : (course.eyebrow || "پیش‌نمایش ویدیو دوره")}
        poster={course.pattern || "/assets/StatCard/blue.png"}
        lessons={allLessons}
        currentLesson={activeLesson}
        onSelectLesson={(les) => setActiveLesson(les)}
      />
    </main>
  );
}
