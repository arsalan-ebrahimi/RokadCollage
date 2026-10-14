import React, { useEffect, useRef, useState } from "react";
import { Award, Sparkles, Star, Clock, Users, CheckCircle2, ArrowLeft, ChevronLeft } from "lucide-react";
import { CourseModeBadge, CourseSaveButton } from "./CourseCardComponents.jsx";

export default function FlagshipSection({ flagshipCourses, store }) {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(0);
  const [dragDx, setDragDx] = useState(null);
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef(null);

  const total = flagshipCourses.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const maxIndex = isMobile ? Math.max(0, total - 1) : 0;
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
      const g = parseFloat(window.getComputedStyle(track).gap) || 20;
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
    <section className="ch-sec" id="ch-flagships">
      <div className="ch-sec-head">
        <div className="ch-sec-title-wrap">
          <span className="ch-sec-tag">
            <Award size={13} /> دوره‌های منتخب و برگزیده
          </span>
          <h2 className="ch-sec-title">دوره‌های منتخب و برتر هر دپارتمان</h2>
        </div>
      </div>

      <div
        className={`ch-courses-carousel-wrap${dragging ? " dragging" : ""}`}
        ref={carRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="ch-flagships"
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
          {flagshipCourses.map((f) => {
            const FlagIcon = f.icon;
            return (
              <article key={f.deptId} className={`ch-flag-card ${f.themeClass}`}>
                <div className="ch-flag-visual">
                  <img src={f.pattern} alt="" className="ch-flag-pattern" aria-hidden="true" />
                  <CourseSaveButton slug={f.slug} store={store} className="ch-flag-save-btn" />
                  <span className="ch-flag-dept-chip">دپارتمان {f.deptName}</span>
                  <div className="ch-flag-icon-wrap">
                    <FlagIcon size={44} style={{ color: "var(--ink)" }} />
                  </div>
                  <span className="ch-flag-badge">
                    <Sparkles size={12} />
                    {f.badge}
                  </span>
                </div>

                <div className="ch-flag-content">
                  <div className="ch-flag-top">
                    <div className="ch-flag-meta-row">
                      <div className="ch-flag-meta-info">
                        <span>مدرس دوره: <strong>{f.inst}</strong></span>
                        <span>•</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Star size={14} fill="#f5a623" color="#f5a623" />
                          <strong>{f.rating}</strong>
                        </span>
                      </div>
                      <CourseModeBadge mode={f.mode} />
                    </div>

                    <h3 className="ch-flag-title">{f.title}</h3>
                    <p className="ch-flag-desc">{f.desc}</p>

                    <div className="ch-flag-stats-row">
                      <span className="ch-flag-pill ch-pill-hours">
                        <Clock size={13} />
                        <span className="pill-text-full">{f.hours}</span>
                        <span className="pill-text-short">{f.hours.replace(" آموزش پروژه‌محور", "").replace(" کارگاه عملی", "").replace(" آموزش فشرده", "")}</span>
                      </span>
                      <span className="ch-flag-pill ch-pill-students">
                        <Users size={13} />
                        <span className="pill-text-full">{f.students}</span>
                        <span className="pill-text-short">{f.students.replace(" هنرجوی موفق", "").replace(" هنرجوی فعال", "").replace(" متقاضی پذیرفته‌شده", "")} هنرجو</span>
                      </span>
                      <span className="ch-flag-pill ch-pill-cert">
                        <CheckCircle2 size={13} />
                        <span className="pill-text-full">پروژه‌محور با گواهی معتبر</span>
                        <span className="pill-text-short">گواهی معتبر</span>
                      </span>
                    </div>
                  </div>

                  <div className="ch-flag-actions">
                    <div className="ch-flag-price-block">
                      {f.old && <s>{f.old}</s>}
                      <b>{f.price}</b>
                    </div>

                    <div className="ch-flag-btn-group">
                      <a href={`#course/${f.slug}`} className="ch-btn-view-course">
                        <span>مشاهده سرفصل دوره</span>
                        <ArrowLeft size={14} />
                      </a>
                      <a href={f.deptHref} className="ch-btn-dept-gateway">
                        <span>{f.deptBtnText}</span>
                        <ChevronLeft size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {isMobile && total > 1 && (
        <div className="ch-mobile-dots">
          <div className="cmt3-dots">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`cmt3-dot${i === idx ? " active" : ""}`}
                aria-label={`اسلاید ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
