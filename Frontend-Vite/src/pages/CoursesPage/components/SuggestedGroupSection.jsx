import React, { useEffect, useRef, useState } from "react";
import { Compass, ChevronLeft, Star, Clock, Users, ArrowLeft, Code } from "lucide-react";
import { DEPT_ICONS, CourseModeBadge, CourseSaveButton } from "./CourseCardComponents.jsx";

function SuggestedDeptGroup({ group, store, isMobile }) {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [dragDx, setDragDx] = useState(null);
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef(null);

  const courses = group.courses || [];
  const total = courses.length;
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
      const g = parseFloat(window.getComputedStyle(track).gap) || 16;
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
  const DeptIcon = DEPT_ICONS[group.deptId] || Code;

  return (
    <div className="ch-suggested-dept-wrap" style={{ marginBottom: 68 }}>
      <div className="ch-suggested-dept-header">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: group.badgeBg,
            color: group.badgeColor,
            border: "2px solid var(--ink)",
            borderRadius: "8px",
            padding: "4px 12px",
            fontSize: "13px",
            fontWeight: "900",
            boxShadow: "2px 2px 0 var(--ink)",
          }}
        >
          <DeptIcon size={14} />
          دپارتمان {group.deptName}
        </span>
        <a href={`#dept/${group.deptId}`} className="ch-dept-more-link">
          <span>مشاهده همه دوره‌های {group.deptName}</span>
          <span className="ch-dept-more-arrow" aria-hidden="true">
            <ChevronLeft size={15} strokeWidth={2.8} />
          </span>
        </a>
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
          className="ch-grid-3"
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
          {courses.map((c) => (
            <a
              key={c.id}
              href={`#course/${c.slug}`}
              className="ch-card"
              data-dept={group.deptId}
            >
              <div className="ch-card-cover" style={{ background: group.badgeBg }}>
                <img src={group.pattern} alt="" className="ch-cover-pat" aria-hidden="true" />
                <span className={`ch-card-tag ${c.tagType}`}>{c.tag}</span>
                <CourseSaveButton slug={c.slug} store={store} />
                <DeptIcon size={34} style={{ color: group.badgeColor, position: "relative", zIndex: 1 }} />
              </div>

              <div className="ch-card-body">
                <div className="ch-card-badges-row">
                  <span
                    className="ch-card-dept-badge"
                    style={{ background: group.badgeBg, color: group.badgeColor }}
                  >
                    {c.cat}
                  </span>
                  <CourseModeBadge mode={c.mode} />
                </div>

                <h3 className="ch-card-title">{c.title}</h3>

                <div className="ch-card-inst">
                  <span className="ch-card-av">{c.inst.charAt(0)}</span>
                  <span>مدرس: {c.inst}</span>
                </div>

                <div className="ch-card-meta">
                  <span className="ch-card-meta-item ch-rate">
                    <Star size={13} fill="#f5a623" color="#f5a623" />
                    {c.rating}
                  </span>
                  <span className="ch-card-meta-item">
                    <Clock size={13} />
                    {c.hours}
                  </span>
                  <span className="ch-card-meta-item">
                    <Users size={13} />
                    {c.students}
                  </span>
                </div>

                <div className="ch-card-foot">
                  <div className="ch-card-price">
                    {c.old && <s>{c.old}</s>}
                    <b>{c.price}</b>
                  </div>
                  <span className="ch-card-btn">
                    <span>مشاهده</span>
                    <ArrowLeft size={13} />
                  </span>
                </div>
              </div>
            </a>
          ))}
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
    </div>
  );
}

export default function SuggestedGroupSection({ suggestedGroups, store }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="ch-sec" id="ch-suggested">
      <div className="ch-sec-head">
        <div className="ch-sec-title-wrap">
          <span className="ch-sec-tag">
            <Compass size={13} /> دوره‌های پیشنهادی
          </span>
          <h2 className="ch-sec-title">دوره‌های پیشنهادی برای شروع هر مسیر</h2>
        </div>
      </div>

      {suggestedGroups.map((group) => (
        <SuggestedDeptGroup
          key={group.deptId}
          group={group}
          store={store}
          isMobile={isMobile}
        />
      ))}
    </section>
  );
}
