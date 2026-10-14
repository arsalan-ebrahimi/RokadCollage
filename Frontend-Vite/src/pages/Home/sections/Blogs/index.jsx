/* V3: Editorial Magazine */
import React, { useEffect, useRef, useState } from "react";
import PatternLayer from "@/components/PatternLayer";
import { articles } from "@/data/blogArticles";

const totalArticles = articles.length;

export default function Blogs() {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(0);
  const [dragDx, setDragDx] = useState(null);
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const maxIndex = isMobile ? totalArticles - 1 : 0;
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
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const start = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!dragRef.current) setIdx((i) => (i >= maxIndex ? 0 : i + 1));
      }, 4000);
    };
    start();
    const el = carRef.current;
    const enter = () => clearInterval(timerRef.current);
    el?.addEventListener("mouseenter", enter);
    el?.addEventListener("mouseleave", start);
    return () => {
      clearInterval(timerRef.current);
      el?.removeEventListener("mouseenter", enter);
      el?.removeEventListener("mouseleave", start);
    };
  }, [isMobile, maxIndex]);

  const goTo = (i) => setIdx(Math.max(0, Math.min(i, maxIndex)));

  const onPointerDown = (e) => {
    if (!isMobile) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { id: e.pointerId, startX: e.clientX, dx: 0 };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    setDragDx(0);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.id) return;
    d.dx = e.clientX - d.startX;
    setDragDx(d.dx);
  };

  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture?.(d.id);
    } catch {
      /* noop */
    }
    setDragDx(null);
    if (Math.abs(d.dx) > 50) {
      if (d.dx > 0) goTo(idx + 1);
      else goTo(idx - 1);
    }
  };

  const rawShift = idx * step + (dragging ? dragDx : 0);
  const shift = Math.max(0, Math.min(rawShift, maxIndex * step));

  return (
    <section className="section mag-section" id="blog">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={180} />
      <div className="container section-inner">
        {/* Section heading */}
        <div className="mag-head">
          <div className="left">
            <h2 className="mag-title">
              <span className="w w1">تیتر</span>
              <span className="w w2">اول</span>
              <span className="w w3">این ماه</span>
            </h2>
          </div>
          <div className="right">
            <a href="#blog-index" className="mag-btn" aria-label="دنبال‌کردن مجله">
              <svg
                className="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="mag-btn-text">دنبال‌کردن مجله</span>
            </a>
          </div>
        </div>

        {/* Cards container: carousel on mobile, 2-col grid on desktop */}
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
            {articles.map((a) => (
              <article className="mag-card" key={a.slug}>
                <div className="shadow" />
                <div className="body">
                  <div className="cover">
                    <span className="num">{a.num}</span>
                    <span className="glyph-lg">{a.glyph}</span>
                  </div>
                  <div className="info">
                    <div className="cat-row">
                      <span className="cat">{a.cat}</span>
                      <span className="read-time">{a.readTime}</span>
                    </div>
                    <h3>
                      <a href={`#article/${a.slug}`} className="mag-title-link">
                        {a.title}
                      </a>
                    </h3>
                    <p>{a.excerpt}</p>
                    <div className="foot">
                      <div className="author-mini">
                        <span className="dot">{a.initial}</span>
                        <span>{a.author}</span>
                      </div>
                      <a href={`#article/${a.slug}`} className="go">
                        مطالعه
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M15 6l-6 6 6 6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile pagination dots */}
        <div className="mag-nav">
          <div className="cmt3-dots">
            {Array.from({ length: totalArticles }, (_, i) => (
              <button
                key={i}
                className={`cmt3-dot${i === idx ? " active" : ""}`}
                aria-label={`اسلاید ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
