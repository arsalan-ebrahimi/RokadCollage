import React from "react";
import { Users, ChevronRight, ChevronLeft, BookOpen, Star } from "lucide-react";

export default function InstructorsSection({ topInstructors, instScroll }) {
  return (
    <section className="ch-sec" id="ch-instructors">
      <div className="ch-sec-head">
        <div className="ch-sec-title-wrap">
          <span className="ch-sec-tag">
            <Users size={13} /> منتورها و مربیان صنعت
          </span>
          <h2 className="ch-sec-title">اساتید و مربیان برجستهٔ کالج رکاد</h2>
        </div>
        <div className="ch-inst-nav-btns" aria-label="هدایت اسلاید اساتید">
          <button
            type="button"
            className="ch-inst-nav-btn"
            disabled={!instScroll.nav.prev}
            onClick={() => instScroll.scroll(false)}
            aria-label="اساتید قبلی"
            title="قبلی"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="ch-inst-nav-btn"
            disabled={!instScroll.nav.next}
            onClick={() => instScroll.scroll(true)}
            aria-label="اساتید بعدی"
            title="بعدی"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="ch-inst-track-wrap">
        <div className="ch-inst-track" ref={instScroll.rowRef}>
          {topInstructors.map((inst) => (
            <div key={inst.name} className="ch-inst-card">
              <div className="ch-inst-cover">
                <img
                  src="/assets/Pattern/layout-pattern.png"
                  alt=""
                  className="ch-inst-cover-pattern"
                  aria-hidden="true"
                />
                <span className="ch-inst-dept-badge">
                  {inst.dept}
                </span>
              </div>

              <div className="ch-inst-av-centered-wrap">
                <div className="ch-inst-av-box">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="ch-inst-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="ch-inst-fallback-av">
                    {inst.initial}
                  </div>
                </div>
              </div>

              <div className="ch-inst-body-centered">
                <h3 className="ch-inst-name">{inst.name}</h3>
                <div className="ch-inst-role">{inst.role}</div>
                <p className="ch-inst-bio">{inst.bio}</p>

                <div className="ch-inst-stats">
                  <span className="ch-inst-stat-item">
                    <BookOpen size={13} />
                    <span>{inst.courses}</span>
                  </span>
                  <span className="ch-inst-stat-item">
                    <Users size={13} />
                    <span>{inst.students} هنرجو</span>
                  </span>
                  <span className="ch-inst-stat-item ch-rate">
                    <Star size={13} fill="#f5a623" color="#f5a623" />
                    <span>{inst.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
