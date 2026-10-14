import React from "react";
import { Star as LucideStar } from "lucide-react";
import { PlayGlyph } from "./CoursePanels.jsx";

export default function CourseMobilePlayer({ course, headRef, onOpenVideo }) {
  return (
    <div className="cs-player-col" ref={headRef}>
      <div
        className="cs-thumb cs-video"
        style={{ position: "relative", overflow: "hidden", background: "#000", cursor: "pointer" }}
        onClick={onOpenVideo}
      >
        <img
          src={course.pattern || "/assets/StatCard/blue.png"}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <button
          type="button"
          className="play"
          onClick={(e) => {
            e.stopPropagation();
            onOpenVideo();
          }}
          aria-label="پخش ویدیو با پلیر پیشرفته"
        >
          <span><PlayGlyph /></span>
        </button>
      </div>

      <div className="cs-title-row">
        <h1>{course.title}</h1>
        <small className="cs-title-sub" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>{course.teacher.name}</span>
          <span>·</span>
          <LucideStar size={13} fill="#F8A41D" stroke="#F8A41D" />
          <span>۴.۹</span>
          <span>·</span>
          <span>{course.students} دانشجو</span>
        </small>
      </div>
    </div>
  );
}
