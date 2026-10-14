import React from "react";
import { CourseIcon, DEPT_ICONS, ALL_DEPTS } from "./DepartmentIcons.jsx";

export default function DepartmentFab({ fabOpen, setFabOpen, currentId }) {
  return (
    <div className="dp-fab-wrap">
      {fabOpen && (
        <>
          <div className="dp-fab-backdrop" onClick={() => setFabOpen(false)} />
          <div className="dp-fab-menu" role="menu">
            {ALL_DEPTS.map((d) => {
              const active = d.id === currentId;
              return (
                <a
                  key={d.id}
                  href={`#dept/${d.id}`}
                  role="menuitem"
                  className={`dp-fab-item${active ? " active" : ""}`}
                  style={active ? { background: d.color, color: d.id === "it" ? "#fff" : "var(--ink)" } : {}}
                  onClick={() => setFabOpen(false)}
                >
                  <span className="dp-fab-ic">
                    <CourseIcon id={DEPT_ICONS[d.id].hero} size={16} />
                  </span>
                  {d.name}
                </a>
              );
            })}
          </div>
        </>
      )}
      <button
        type="button"
        className={`dp-fab${fabOpen ? " open" : ""}`}
        onClick={() => setFabOpen((v) => !v)}
        aria-label="انتخاب دپارتمان"
        aria-expanded={fabOpen}
      >
        <CourseIcon id={DEPT_ICONS[currentId]?.hero || "globe"} size={24} />
      </button>
    </div>
  );
}
