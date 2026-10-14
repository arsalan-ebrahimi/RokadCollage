import React from "react";
import { SectionHead, CourseIcon, ArrowIcon } from "./DepartmentIcons.jsx";

export default function DepartmentPathsSection({ dept, currentId }) {
  return (
    <section className="dp-block dp-card-block" id="dp-paths">
      <SectionHead pre="مسیرهای" accent="یادگیری" />
      <div className="dp-paths-intro">
        <p>نقشهٔ راه پیوسته و گام‌به‌گام برای یادگیری عمیق، پروژه‌محور و آماده‌سازی برای بازار کار تخصصی</p>
      </div>
      <div className="dp-paths">
        {dept.paths.map((p, idx) => (
          <article className="dp-path" key={p.num}>
            <div className="dp-path-top">
              <div className="dp-path-num">گام {p.num}</div>
              <span className="dp-path-tag">{["سطح پایه", "توسعه مهارت", "مسیر تخصصی"][idx] || "مسیر تخصصی"}</span>
            </div>
            <div className="dp-path-content">
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
            <div className="dp-path-foot">
              <span className="dp-path-feature">
                <CourseIcon id="spark" size={14} /> پروژه‌محور
              </span>
              <a href={`#courses-index/${currentId}`} className="dp-path-btn">
                <span>شروع مسیر</span>
                <ArrowIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
