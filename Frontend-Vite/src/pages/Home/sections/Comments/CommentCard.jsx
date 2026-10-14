import React from "react";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function CommentCard({ testimonial }) {
  const t = testimonial;
  return (
    <article className="cmt3-card" key={t.name}>
      <div className="shadow" />
      <div className="body">
        <div className="avatar-side">
          <div className="avatar-big">{t.name.charAt(0)}</div>
          <p className="name-white">{t.name}</p>
          <p className="role-white">{t.role}</p>
          <div className="cmt3-stars">
            {Array.from({ length: 5 }, (_, s) => (
              <StarIcon key={s} />
            ))}
          </div>
        </div>
        <div className="content-side">
          <div className="head-row">
            <span className="course-chip">{t.course}</span>
            <span className="date">{t.date}</span>
          </div>
          <p className="quote-text">{t.quote}</p>
          <div className="foot-row">
            <span className="status">
              <span className="pulse" />
              {t.status}
            </span>
            <span>هنرجوی رکاد</span>
          </div>
        </div>
      </div>
    </article>
  );
}
