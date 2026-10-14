import React from "react";

export default function VideoLessonsFooter({
  lessons = [],
  currentLesson,
  onSelectLesson,
}) {
  if (!lessons || lessons.length === 0) return null;

  return (
    <div className="vpm-footer-lessons">
      <span
        style={{
          fontSize: "11px",
          fontWeight: 900,
          color: "#9ca3af",
          whiteSpace: "nowrap",
        }}
      >
        لیست دروس:
      </span>
      {lessons.map((les, idx) => {
        const isActive = currentLesson
          ? currentLesson.t === les.t
          : idx === 0;
        return (
          <button
            key={les.t || idx}
            className={`vpm-lesson-pill ${isActive ? "active" : ""} ${
              les.locked ? "locked" : ""
            }`}
            onClick={() => {
              if (!les.locked && onSelectLesson) onSelectLesson(les);
            }}
            disabled={les.locked}
          >
            <span>{les.free ? "رایگان" : les.time || "درس"}</span>
            <span>{les.t || les.title}</span>
          </button>
        );
      })}
      <div className="vpm-shortcuts-hint">
        کلیدها: Space (توقف/پخش) | ← → (۱۰ ثانیه پرش) | M (بی‌صدا) | F (تمام‌صفحه)
      </div>
    </div>
  );
}
