import React from "react";
import { Sparkles, BookOpen, Users, Award } from "lucide-react";
import PatternLayer from "@/components/PatternLayer";

export default function CoursesHubHero() {
  return (
    <header className="ch-hero">
      <PatternLayer rotate={0} />
      <div className="ch-hero-inner">
        <nav className="ch-crumb" aria-label="مسیر راهنما">
          <a href="#">خانه</a>
          <span className="ch-crumb-sep">›</span>
          <span className="ch-crumb-cur">دوره‌ها و دپارتمان‌ها</span>
        </nav>

        <div className="ch-hero-badge">
          <Sparkles size={14} />
          <span>کاتالوگ جامع دوره‌های کالج رکاد</span>
        </div>

        <h1 className="ch-hero-title">
          مسیر حرفه‌ای خود را با{" "}
          <span className="ch-marker">دوره‌های تخصصی</span> کالج بسازید
        </h1>

        <p className="ch-hero-desc">
          مجموعه‌ای منتخب از کاربردی‌ترین دوره‌های پروژه‌محور در دپارتمان‌های فناوری اطلاعات، کسب‌وکار و زبان‌های خارجی، تدریس‌شده توسط برجسته‌ترین اساتید و مدیران صنعت.
        </p>

        <div className="ch-stats">
          <div className="ch-stat-pill">
            <BookOpen size={16} />
            <span>بیش از <strong>۵۰+</strong> دوره تخصصی</span>
          </div>
          <div className="ch-stat-pill">
            <Users size={16} />
            <span>بیش از <strong>۱۲٬۰۰۰+</strong> هنرجوی فعال</span>
          </div>
          <div className="ch-stat-pill">
            <Award size={16} />
            <span><strong>۹۲٪</strong> نرخ موفقیت در اشتغال</span>
          </div>
        </div>
      </div>
    </header>
  );
}
