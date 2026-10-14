import React from "react";
import { ArrowIcon } from "./DepartmentIcons.jsx";

export default function DepartmentHero({ dept, persona, onScrollTo }) {
  return (
    <header className="dp-hero">
      <img src={persona.pattern} alt="" aria-hidden="true" className="dp-hero-pattern" />
      <div className="container dp-hero-inner">
        <nav className="dp-crumb" aria-label="مسیر">
          <a href="#">خانه</a>
          <span className="sep">›</span>
          <a href="#departments">دپارتمان‌ها</a>
          <span className="sep">›</span>
          <span className="cur">{dept.name}</span>
        </nav>

        <div className="dp-badge">
          <span className="dot" />
          {dept.crumb}
        </div>

        <h1 className="dp-hero-title">
          دوره‌های {dept.name} |{" "}
          <span className="dp-hero-accent">{dept.headline[1]}</span>
        </h1>
        <p className="dp-hero-lead">{dept.lead}</p>

        <div className="dp-hero-actions">
          <a className="dp-btn dp-btn-primary" href="#dp-all" onClick={(e) => onScrollTo(e, "dp-all")}>
            مشاهدهٔ دوره‌ها
            <ArrowIcon />
          </a>
          <a className="dp-btn dp-btn-ghost" href="#dp-paths" onClick={(e) => onScrollTo(e, "dp-paths")}>
            مسیر یادگیری
          </a>
        </div>

        {/* نوار آمار */}
        <div className="dp-hero-stats">
          {dept.stats.map((s) => (
            <div className="dp-hstat" key={s.lab}>
              <b>{s.num}</b>
              <span>{s.lab}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
