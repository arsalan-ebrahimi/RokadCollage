import React, { useState, useEffect } from "react";
import "./course.css";
import "./courseInPerson.css";
import PatternLayer from "../../components/PatternLayer";
import { getPanelStore, toggleWishlist, enrollInCourse } from "../../data/panelStore.js";
import { isEnrolledIn, isWishlisted as checkWishlisted } from "../../data/selectors.js";
import { getCourseLicense } from "@/services/enrollmentService.js";
import CheckoutModal from "../Checkout/CheckoutModal.jsx";
import InPersonHero from "./components/InPersonHero.jsx";
import InPersonSprints from "./components/InPersonSprints.jsx";
import InPersonVenue from "./components/InPersonVenue.jsx";
import { InPersonAbout, InPersonTeacher } from "./components/InPersonTeacher.jsx";
import { CheckCircle2, MapPin, Calendar, Clock, X } from "lucide-react";

export default function CourseSingleInPerson({ course, slug }) {
  const [store, setStore] = useState(getPanelStore);
  const [openSprint, setOpenSprint] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [serverEnrolled, setServerEnrolled] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const courseSlug = course.slug || slug;
  const isLoggedIn = Boolean(
    store?.auth?.isLoggedIn || (typeof window !== "undefined" && localStorage.getItem("rokad_token"))
  );

  useEffect(() => {
    const targetId = course?._id || course?.id || slug;
    if (!isLoggedIn || !targetId) return;

    getCourseLicense(targetId)
      .then((res) => {
        if (res?.isEnrolled) {
          setServerEnrolled(true);
          enrollInCourse({
            id: course?._id || course?.id,
            _id: course?._id || course?.id,
            slug: courseSlug,
            title: course?.title,
            teacher: course?.teacher?.name || course?.teachers?.[0]?.name,
          });
        }
      })
      .catch(() => {});
  }, [isLoggedIn, course?._id, course?.id, slug, courseSlug]);

  const isEnrolled =
    serverEnrolled ||
    isEnrolledIn(courseSlug, store) ||
    (course._id && isEnrolledIn(course._id, store)) ||
    (slug && isEnrolledIn(slug, store));
  const isWished = isLoggedIn && checkWishlisted(courseSlug, store);

  const venue = {
    name: course.location?.name || "کمپوس مرکزی کالج رکاد",
    address: course.location?.address || "تهران، میدان آزادی، بلوار اکبری، کالج رکاد",
    metro: "۲ دقیقه پیاده‌روی از ایستگاه مترو میدان آزادی",
    parking: "دارای پارکینگ اختصاصی برای هنرجویان",
    room: course.location?.room || "سالن کارگاهی تخصصی",
    neshanUrl: course.location?.neshanEmbedUrl || "https://nshn.ir",
    baladUrl: course.location?.baladEmbedUrl || "https://balad.ir",
    googleMapUrl: course.location?.googleMapEmbedUrl || "https://maps.google.com",
  };

  const schedule = {
    days: course.days || "شنبه و چهارشنبه",
    hours: course.hours || "۱۶:۰۰ الی ۲۰:۰۰",
    totalWeeks: course.duration || "۱۰ هفته",
    totalHours: course.duration ? `${course.duration} آموزش و کارگاه عملی` : "۸۰ ساعت کارگاهی + ۴۰ ساعت منتورینگ",
    startDate: course.startDate || "به‌زودی",
  };

  const capacity = {
    total: course.capacity || 20,
    registered: course.enrolledCount || 12,
    remaining: Math.max(0, (course.capacity || 20) - (course.enrolledCount || 12)),
    pct: Math.min(100, Math.round(((course.enrolledCount || 12) / (course.capacity || 20)) * 100)),
  };

  const liveSprints = Array.isArray(course.sprints) && course.sprints.length > 0
    ? course.sprints.map((s, idx) => ({
        n: `۰${idx + 1}`,
        weeks: s.weeks || `بخش ${idx + 1}`,
        title: s.title || `اسپرینت ${idx + 1}`,
        desc: s.description || "تمرین و پیاده‌سازی گام‌به‌گام در محیط کارگاهی",
        output: s.output || "پروژه و تحویل تمرین عملی",
      }))
    : [];

  const firstTeacher = Array.isArray(course.teachers) && course.teachers.length > 0 ? course.teachers[0] : course.teacher;
  const teacher = {
    name: firstTeacher?.name || firstTeacher?.fullName || "استاد کالج رکاد",
    role: firstTeacher?.role || "مدرس ارشد و سرپرست کارگاه حضوری",
    bio: firstTeacher?.bio || firstTeacher?.description || "مدرس باسابقه و راهبر دوره‌های تخصصی کالج رکاد.",
    initial: (firstTeacher?.name || firstTeacher?.fullName || "رکاد").slice(0, 2),
  };

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      try {
        sessionStorage.setItem("rokad_auth_redirect", `course/${courseSlug}`);
        sessionStorage.setItem("rokad_auth_msg", `برای نشان کردن کارگاه «${course.title}»، لطفاً ابتدا حساب کاربری بسازید.`);
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

  const handleCheckoutOpen = () => {
    if (!isLoggedIn) {
      try {
        sessionStorage.setItem("rokad_auth_redirect", `course/${courseSlug}`);
        sessionStorage.setItem("rokad_auth_msg", `برای ثبت‌نام در کارگاه «${course.title}»، لطفاً ابتدا حساب کاربری بسازید.`);
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
    setCheckoutOpen(true);
  };

  return (
    <main className="cs-page cs-inperson-wrapper" id="course">
      <PatternLayer rotate={0} />

      <InPersonHero
        course={course}
        schedule={schedule}
        capacity={capacity}
        isLoggedIn={isLoggedIn}
        isEnrolled={isEnrolled}
        isWished={isWished}
        onBookmarkClick={handleBookmarkClick}
        onCheckoutOpen={handleCheckoutOpen}
        onOpenEnrollmentInfo={() => setInfoModalOpen(true)}
      />

      <div className="container">
        <div className="cs-ip-sections-stack">
          <InPersonAbout course={course} />
          {liveSprints.length > 0 && (
            <InPersonSprints
              sprints={liveSprints}
              schedule={schedule}
              openSprint={openSprint}
              setOpenSprint={setOpenSprint}
            />
          )}
          <InPersonVenue
            venue={venue}
            cleanDays={schedule.days}
            cleanHours={schedule.hours}
            cleanRoom={venue.room}
          />
          <InPersonTeacher teacher={teacher} />
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        course={course}
      />

      {infoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setInfoModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white border-2 border-stone-900 rounded-[20px_0_20px_0] shadow-[6px_6px_0_#292827] p-6 text-right"
            style={{ fontFamily: "var(--font-iransans), 'IRANSansX', system-ui, -apple-system, sans-serif" }}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-lg">
                <CheckCircle2 size={20} />
                <span>ثبت‌نام نهایی شده</span>
              </div>
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                className="w-8 h-8 rounded-full border-2 border-stone-900 shadow-[2px_2px_0_#1F1E1D] flex items-center justify-center transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1F1E1D] hover:bg-stone-100 cursor-pointer"
                aria-label="بستن"
              >
                <X size={16} />
              </button>
            </div>

            <h3 className="font-black text-lg text-stone-900 mb-2">{course.title}</h3>
            <p className="text-sm font-semibold text-stone-600 mb-4 leading-relaxed">
              ثبت‌نام شما در این کارگاه حضوری تکمیل گردیده است. مشخصات حضور در کارگاه به شرح زیر است:
            </p>

            <div className="space-y-3 bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm font-bold text-stone-800">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-stone-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-stone-500">محل برگزاری:</div>
                  <div>{venue.name} — {venue.room}</div>
                  <div className="text-xs text-stone-600 font-normal mt-0.5">{venue.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-stone-200">
                <Calendar size={16} className="text-stone-500 flex-shrink-0" />
                <div>
                  <span className="text-xs text-stone-500">روزهای برگزاری: </span>
                  <span>{schedule.days}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-stone-200">
                <Clock size={16} className="text-stone-500 flex-shrink-0" />
                <div>
                  <span className="text-xs text-stone-500">ساعت کلاس: </span>
                  <span>{schedule.hours}</span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                className="w-full py-2.5 bg-stone-900 text-white font-black text-sm rounded-[10px_0_10px_0] shadow-[3px_3px_0_#000] hover:bg-stone-800 transition-all text-center"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
