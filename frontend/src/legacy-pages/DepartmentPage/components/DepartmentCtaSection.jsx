import React from "react";
import { CourseIcon, ArrowIcon, DEPT_ICONS } from "./DepartmentIcons.jsx";

export default function DepartmentCtaSection({ dept, currentId, persona, onScrollTo }) {
  return (
    <section className="dp-block dp-cta-block">
      <div className="dp-cta">
        <img src={persona.pattern} alt="" aria-hidden="true" className="dp-cta-pattern" />
        <div className="dp-cta-copy">
          <h2>{dept.cta.title}</h2>
          <p>{dept.cta.text}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <a href="#consult" className="dp-btn dp-btn-ink">
              دریافت مشاورهٔ تخصصی {dept.name}
              <ArrowIcon />
            </a>
            <a href="#dp-all" onClick={(e) => onScrollTo(e, "dp-all")} className="dp-btn dp-btn-ghost">
              مشاهدهٔ همهٔ دوره‌ها
            </a>
          </div>
        </div>
        <div className="dp-cta-visual">
          <CourseIcon id={DEPT_ICONS[currentId]?.cta || "briefcase"} size={96} />
        </div>
      </div>
    </section>
  );
}
