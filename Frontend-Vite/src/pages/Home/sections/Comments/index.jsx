import React, { useEffect, useRef, useState } from "react";
import "./comments.css";
import PatternLayer from "@/components/PatternLayer";
import { testimonials, pad2Fa } from "./testimonialsData.jsx";
import CommentCard from "./CommentCard.jsx";

const total = testimonials.length;

function Chevron({ right = false }) {
  const d = right ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function Comments() {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(2);
  const [step, setStep] = useState(0);
  const [dragDx, setDragDx] = useState(null);
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef = useRef(null);

  const maxIndex = Math.max(0, total - perView);
  const dotCount = maxIndex + 1;
  const dragging = dragDx !== null;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setPerView(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setIdx((i) => Math.min(i, Math.max(0, total - perView)));
  }, [perView]);

  useEffect(() => {
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
  }, [perView]);

  useEffect(() => {
    const start = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!dragRef.current) setIdx((i) => (i >= maxIndex ? 0 : i + 1));
      }, 3500);
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
  }, [maxIndex]);

  const goTo = (i) => setIdx(Math.max(0, Math.min(i, maxIndex)));

  const onPointerDown = (e) => {
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
    <section className="section cmt3-section" id="comments">
      <PatternLayer rotate={0} />
      <div className="container section-inner">
        <div
          className="sec-head"
          style={{
            marginBottom: 44,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <h2
              className="cmt3-title"
              style={{
                margin: "0 0 10px",
                fontWeight: 900,
                lineHeight: 1.2,
                color: "var(--ink)",
                letterSpacing: "-.5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 6,
                  transform: "rotate(-1.5deg)",
                }}
              >
                از صفر
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 6,
                  transform: "rotate(1.5deg)",
                  color: "var(--college)",
                }}
              >
                تا
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 6,
                  transform: "rotate(-1deg)",
                }}
              >
                اولین قرارداد
              </span>
            </h2>
          </div>
          <div className="cmt3-counter">
            <span className="cur">{pad2Fa(idx + 1)}</span>
            <span>از</span>
            <span>{pad2Fa(total)}</span>
          </div>
        </div>

        <div
          className={`cmt3-carousel${dragging ? " dragging" : ""}`}
          ref={carRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className="cmt3-track"
            ref={trackRef}
            style={{
              transform: `translateX(${shift}px)`,
              transition: dragging ? "none" : undefined,
            }}
          >
            {testimonials.map((t) => (
              <CommentCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>

        <div className="cmt3-nav">
          <div className="cmt3-dots">
            {Array.from({ length: dotCount }, (_, i) => (
              <button
                key={i}
                className={`cmt3-dot${i === idx ? " active" : ""}`}
                aria-label={`اسلاید ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="cmt3-nav-arrows">
            <button
              className="cmt3-icon-btn"
              onClick={() => goTo(idx - 1)}
              aria-label="قبلی"
            >
              <Chevron right />
            </button>
            <button
              className="cmt3-icon-btn"
              onClick={() => goTo(idx + 1)}
              aria-label="بعدی"
            >
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
