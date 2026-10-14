/* V3: Editorial Magazine connected to API */
"use client";

import React, { useEffect, useRef, useState } from "react";
import PatternLayer from "@/components/PatternLayer";
import { getBlogs } from "@/services/blogService.js";
import Link from "next/link";

export default function Blogs() {
  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(0);
  const [dragDx, setDragDx] = useState(null);
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getBlogs({ limit: 6 });
        const list = Array.isArray(res) ? res : res.data || [];
        setBlogsList(list);
      } catch (err) {
        console.error("Failed to load blogs from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalArticles = blogsList.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const maxIndex = isMobile ? Math.max(0, totalArticles - 1) : 0;
  const dragging = dragDx !== null;

  useEffect(() => {
    if (!isMobile) {
      setIdx(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      const card = track?.firstElementChild;
      if (!track || !card) return;
      const g = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      setStep(card.offsetWidth + g);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [isMobile, blogsList]);

  useEffect(() => {
    if (!isMobile || totalArticles === 0) return;
    const start = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!dragRef.current) setIdx((i) => (i >= maxIndex ? 0 : i + 1));
      }, 4000);
    };
    start();
    const el = carRef.current;
    const enter = () => clearInterval(timerRef.current);
    const leave = () => start();
    el?.addEventListener("mouseenter", enter);
    el?.addEventListener("mouseleave", leave);
    return () => {
      clearInterval(timerRef.current);
      el?.removeEventListener("mouseenter", enter);
      el?.removeEventListener("mouseleave", leave);
    };
  }, [isMobile, maxIndex, totalArticles]);

  const onPointerDown = (e) => {
    if (!isMobile) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { id: e.pointerId, startX: e.clientX, dx: 0 };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setDragDx(0);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current || dragRef.current.id !== e.pointerId) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.dx = dx;
    setDragDx(dx);
  };

  const endDrag = (e) => {
    if (!dragRef.current || dragRef.current.id !== e.pointerId) return;
    const dx = dragRef.current.dx;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setDragDx(null);
    const threshold = 40;
    if (dx > threshold) {
      setIdx((i) => Math.min(maxIndex, i + 1));
    } else if (dx < -threshold) {
      setIdx((i) => Math.max(0, i - 1));
    }
  };

  const shift = isMobile ? idx * step + (dragDx || 0) : 0;

  return (
    <section className="section mag-section" id="blog">
      <PatternLayer />
      <div className="container">
        <div className="mag-head">
          <div className="left">
            <h2 className="mag-title">
              <span className="w w1">روایت‌ها،</span>
              <span className="w w2">بینش‌ها</span>
              <span className="w w3">و تجربه‌ها</span>
            </h2>
            <p style={{ color: "var(--ink-subtle)", margin: "8px 0 0", fontSize: "14.5px", fontWeight: 500 }}>
              مقاله‌های دست‌اول از مدیران و مدرسین کالج برای تسلط بر مهارت‌های روز
            </p>
          </div>

          <div className="right">
            <Link href="/blog" className="mag-btn">
              <span className="mag-btn-text">مشاهده همه مقالات</span>
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-64 bg-white border-2 border-[#292827] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : blogsList.length === 0 ? (
          <div className="text-center py-12 text-stone-500 font-bold">هنوز مقاله‌ای منتشر نشده است.</div>
        ) : (
          <div
            className={`mag-carousel-wrap${dragging ? " dragging" : ""}`}
            ref={carRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className="mag-grid"
              ref={trackRef}
              style={
                isMobile
                  ? {
                      transform: `translateX(${shift}px)`,
                      transition: dragging ? "none" : undefined,
                    }
                  : undefined
              }
            >
              {blogsList.map((a, i) => {
                const articleSlug = a.slug || a._id;
                return (
                  <article className="mag-card" key={a._id || i}>
                    <div className="shadow" />
                    <div className="body">
                      <div className="cover">
                        <span className="num">۰{i + 1}</span>
                        <span className="glyph-lg">✦</span>
                      </div>
                      <div className="info">
                        <div className="cat-row">
                          <span className="cat">{a.category || "مقاله"}</span>
                          <span className="read-time">{a.readTime || "۵ دقیقه"}</span>
                        </div>
                        <h3>
                          <Link href={`/blog/${articleSlug}`}>
                            {a.title}
                          </Link>
                        </h3>
                        <p>{a.description}</p>
                        <div className="foot">
                          <div className="author-mini">
                            <span className="dot">ر</span>
                            <span>تحریریه کالج رکاد</span>
                          </div>
                          <Link href={`/blog/${articleSlug}`} className="go">
                            مطالعه
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                              <path d="M15 6l-6 6 6 6" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
