import React, { useState, useEffect } from "react";
import "./course.css";
import "./courseInPerson.css";
import PatternLayer from "../../components/PatternLayer";
import { getPanelStore, toggleWishlist } from "../../data/panelStore.js";
import { isEnrolledIn, isWishlisted as checkWishlisted } from "../../data/selectors.js";
import CheckoutModal from "../Checkout/CheckoutModal.jsx";
import InPersonHero from "./components/InPersonHero.jsx";
import InPersonSprints from "./components/InPersonSprints.jsx";
import InPersonVenue from "./components/InPersonVenue.jsx";
import { InPersonAbout, InPersonTeacher } from "./components/InPersonTeacher.jsx";

export default function CourseSingleInPerson({ course, slug }) {
  const [store, setStore] = useState(getPanelStore);
  const [openSprint, setOpenSprint] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const courseSlug = course.slug || slug;
  const isLoggedIn = Boolean(store?.auth?.isLoggedIn);
  const isEnrolled = isEnrolledIn(courseSlug, store);
  const isWished = isLoggedIn && checkWishlisted(courseSlug, store);

  const venue = course.venue || {
    name: "کمپوس مرکزی کالج رکاد",
    address: "تهران، میدان آزادی، بلوار اکبری، جنب ایستگاه مترو، پلاک ۲۴، طبقه ۳",
    metro: "۲ دقیقه پیاده‌روی از ایستگاه مترو میدان آزادی (خط ۴)",
    parking: "دارای پارکینگ اختصاصی برای هنرجویان",
    room: "سالن کارگاهی آلفا",
  };

  const schedule = course.schedule || {
    days: "شنبه و چهارشنبه",
    hours: "۱۶:۰۰ الی ۲۰:۰۰",
    totalWeeks: "۱۰ هفته",
    totalHours: "۸۰ ساعت کارگاهی + ۴۰ ساعت منتورینگ",
    startDate: course.startDate || "۱۵ مهر ۱۴۰۴",
  };

  const cleanDays = (schedule.days || "").replace(/\s*\(.*?\)/g, "").trim();
  const cleanHours = (schedule.hours || "").replace(/\s*\(.*?\)/g, "").trim();
  const cleanRoom = (venue.room || "سالن کارگاهی آلفا").replace(/\s*\(.*?\)/g, "").trim();

  const capacity = course.capacity || {
    total: 18,
    registered: 14,
    remaining: 4,
    pct: 78,
  };

  const sprints = course.sprints || [
    {
      n: "۰۱",
      weeks: "هفته ۱ و ۲",
      title: "راه‌اندازی محیط کار تیمی و زیرساخت حرفه‌ای",
      desc: "پیکربندی ورک‌استیشن، گیت تیمی، استانداردهای کدنویسی تمیز و پیاده‌سازی نخستین تسک عملیاتی کارگاه.",
      output: "ریپازیتوری تیمی استاندارد و اجرای نخستین سناریو",
    },
    {
      n: "۰۲",
      weeks: "هفته ۳ تا ۵",
      title: "معماری عمیق، حل چالش‌های واقعی و کد ریویو زنده",
      desc: "پیاده‌سازی معماری ماژولار با هدایت استاد و بررسی خط‌به‌خط پروژه‌ها روی پروژکتور سالن کارگاه.",
      output: "پیاده‌سازی هسته عملیاتی پروژه تیمی",
    },
    {
      n: "۰۳",
      weeks: "هفته ۶ و ۷",
      title: "هکاتون حضوری و شبیه‌سازی اسپرینت اسکرام شرکتی",
      desc: "شبیه‌سازی یک اسپرینت فشرده شرکتی، مواجهه با باگ‌های نامنتظره و استقرار روی سرور واقعی.",
      output: "نسخه قابل اتکا و آماده تحویل محصول (Production-Ready)",
    },
    {
      n: "۰۴",
      weeks: "هفته ۸ تا ۱۰",
      title: "ارائه در Demo Day، ساخت رزومه و آمادگی مصاحبه",
      desc: "پرزنت محصول در حضور مدیران فنی شرکت‌های پارتنر کالج رکاد و شبیه‌سازی مصاحبه‌های استخدامی.",
      output: "پورتفولیوی اختصاصی و معرفی رزومه به شرکت‌های همکار",
    },
  ];

  const teacher = course.teacher || {
    name: "مهندس آرش تهرانی",
    role: "مدرس ارشد و سرپرست کارگاه حضوری",
    bio: "بیش از ۱۰ سال سابقه هدایت تیم‌های فنی در شرکت‌های بزرگ فناوری و راهبری بیش از ۶۰۰ متخصص تا ورود به بازار کار.",
    initial: "آ.ت",
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
      />


      <div className="container">
        <div className="cs-ip-sections-stack">
          <InPersonAbout course={course} />
          <InPersonSprints
            sprints={sprints}
            schedule={schedule}
            openSprint={openSprint}
            setOpenSprint={setOpenSprint}
          />
          <InPersonVenue
            venue={venue}
            cleanDays={cleanDays}
            cleanHours={cleanHours}
            cleanRoom={cleanRoom}
          />
          <InPersonTeacher teacher={teacher} />
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        course={course}
      />
    </main>
  );
}
