import React from "react";
import { FileText, UserCheck } from "lucide-react";

export function InPersonAbout({ course }) {
  return (
    <section className="cs-ip-section-card" id="about-workshop">
      <div className="cs-ip-sec-header">
        <div className="cs-ip-sec-header-right">
          <span className="cs-ip-sec-num">۰۱</span>
          <div className="cs-ip-sec-icon-box">
            <FileText size={18} />
          </div>
          <div className="cs-ip-sec-titles">
            <h2 className="cs-ip-sec-title">درباره این کارگاه حضوری</h2>
            <span className="cs-ip-sec-sub">مشخصات، اهداف و رویکرد اجرایی دوره</span>
          </div>
        </div>
        <span className="cs-ip-sec-badge">معرفی کارگاه</span>
      </div>

      <div className="cs-ip-sec-body">
        <div className="cs-inperson-desc-panel">
          <div className="cs-desc-intro-card">
            <p className="cs-desc-lede-text">
              {course.lede || (typeof course.description === "string" ? course.description : "کارگاه تخصصی و پروژه‌محور کالج رکاد")}
            </p>
          </div>
          {Array.isArray(course.description) && course.description.length > 0 ? (
            <div className="cs-desc-paragraphs">
              {course.description.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          ) : typeof course.description === "string" && course.lede ? (
            <div className="cs-desc-paragraphs">
              <p>{course.description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function InPersonTeacher({ teacher }) {
  return (
    <section className="cs-ip-section-card" id="workshop-instructor">
      <div className="cs-ip-sec-header">
        <div className="cs-ip-sec-header-right">
          <span className="cs-ip-sec-num">۰۴</span>
          <div className="cs-ip-sec-icon-box">
            <UserCheck size={18} />
          </div>
          <div className="cs-ip-sec-titles">
            <h2 className="cs-ip-sec-title">مدرس و سرپرست کارگاه</h2>
            <span className="cs-ip-sec-sub">راهبری مستقیم پروژه، حل تمرین و انتقال تجربه</span>
          </div>
        </div>
        <span className="cs-ip-sec-badge">راهبر کارگاه</span>
      </div>

      <div className="cs-ip-sec-body">
        <div className="cs-inperson-teacher-panel">
          <div className="cs-inperson-teacher-card">
            <div className="teacher-av">{teacher.initial || "آ.ت"}</div>
            <div className="teacher-info">
              <h4>{teacher.name}</h4>
              <span className="teacher-role">{teacher.role}</span>
              <p className="teacher-bio">{teacher.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
