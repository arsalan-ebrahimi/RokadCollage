import React from "react";

export const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 16, height: 16, transform: open ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Star = ({ on }) => (
  <svg viewBox="0 0 24 24" fill={on ? "var(--college)" : "none"} stroke={on ? "var(--college)" : "var(--ink-light)"} strokeWidth="1.6" style={{ width: 15, height: 15 }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

export const PlayGlyph = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}><path d="M8 5v14l11-7z" /></svg>
);

export function CurriculumPanel({ course, openChapter, setOpenChapter, onLessonPlay, isEnrolled }) {
  return (
    <div className="cs-curriculum">
      <div className="cs-progress">
        <b>۱۲ فصل · ۴۸ درس · ۳۲ ساعت</b>
        <div className="bar"><span /></div>
        <b>{course.progressLabel}</b>
      </div>

      <div className="cs-chapters">
        {course.chapters.map((ch, i) => {
          const open = openChapter === i;
          return (
            <div key={ch.n} className={`cs-ch${open ? " open" : ""}`}>
              <button className="cs-ch-head" onClick={() => setOpenChapter(open ? -1 : i)} aria-expanded={open}>
                <span className="num">{ch.n}</span>
                <span className="info">
                  <b>{ch.title}</b>
                  <small>{ch.sub}</small>
                </span>
                <span className="dur">{ch.dur}</span>
                <span className="chev"><Chevron open={open} /></span>
              </button>

              {ch.lessons.length > 0 && (
                <div className={`cs-lessons${open ? " open" : ""}`}>
                  {ch.lessons.map((l) => {
                    const canPlay = l.free || isEnrolled;
                    return (
                      <div
                        key={l.t}
                        className={`cs-lesson${canPlay ? " free" : " locked"}`}
                        onClick={() => onLessonPlay(l)}
                        style={{ cursor: "pointer" }}
                        title={canPlay ? "مشاهده درس در ویدیو پلیر" : "قفل - نیازمند ثبت‌نام در دوره"}
                      >
                        <span className="ic">
                          {canPlay ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}><path d="M8 5v14l11-7z" /></svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ width: 13, height: 13 }}>
                              <rect x="4" y="11" width="16" height="10" rx="2" />
                              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                            </svg>
                          )}
                        </span>
                        <span className="t">{l.t}</span>
                        <span className="tag">{l.free ? "رایگان (پخش) ▶" : isEnrolled ? "پخش درس ▶" : l.time}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ReviewsPanel({ course }) {
  return (
    <div className="cs-panel-body">
      <div className="cs-reviews">
        {course.reviews.map((r) => (
          <div className="cs-review" key={r.name}>
            <div className="cs-review-head">
              <span className="cs-review-av">{r.avatar}</span>
              <div className="cs-review-who">
                <b>{r.name}</b>
                <small>{r.date}</small>
              </div>
              <span className="cs-review-stars" aria-label={`${r.rating} از ۵`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} on={s <= r.rating} />
                ))}
              </span>
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QaPanel({ course }) {
  return (
    <div className="cs-panel-body">
      <div className="cs-qa">
        {course.qa.map((item) => (
          <div className="cs-qa-item" key={item.q}>
            <b>{item.q}</b>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DescriptionPanel({ course }) {
  const paragraphs = Array.isArray(course.description) && course.description.length > 0
    ? course.description
    : (course.lede ? [course.lede] : []);

  return (
    <div className="cs-panel-body cs-desc-panel">
      {course.lede && (
        <div className="cs-desc-highlight-box">
          <p className="cs-desc-lead">{course.lede}</p>
        </div>
      )}

      {paragraphs.length > 0 && (
        <div className="cs-desc-content">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
