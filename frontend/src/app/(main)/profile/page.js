"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserProfileSettings from "./components/UserProfileSettings";
import { isUserLoggedIn } from "@/data/panelStore";
import "./profile.css";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("rokad_token") : null;
    if (!token && !isUserLoggedIn()) {
      try {
        sessionStorage.setItem("rokad_auth_redirect", "profile");
      } catch (_) {}
      router.push("/auth");
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="prof-page" dir="rtl">
        <div className="prof-loading">
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="prof-page" dir="rtl">
      {/* هیرو سکشن پروفایل */}
      <header className="prof-hero">
        <img
          src="/assets/StatCard/yellow.png"
          alt=""
          aria-hidden="true"
          className="prof-hero-pattern"
        />

        <div className="prof-hero-inner">
          {/* بردکرامب */}
          <nav className="prof-crumb" aria-label="مسیر">
            <Link href="/">خانه</Link>
            <span className="sep">›</span>
            <span className="cur">تنظیمات پروفایل</span>
          </nav>

          {/* بج وضعیت */}
          <div className="prof-badge">
            <span className="dot" />
            <span>اطلاعات کاربری</span>
          </div>

          {/* عنوان اصلی همراه با هایلایتر */}
          <h1 className="prof-hero-title">
            تنظیمات پروفایل | <span className="prof-hero-accent">مدیریت حساب کاربری</span>
          </h1>
        </div>
      </header>

      {/* بدنه و فرم تنظیمات */}
      <main className="prof-content-wrap">
        <UserProfileSettings />
      </main>
    </div>
  );
}
