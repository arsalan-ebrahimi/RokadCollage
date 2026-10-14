import React from "react";
import { I, toFa, coverBg, TONES } from "./BlogIcons.jsx";
import { AUTHORS_LIST } from "../data/blogIndexData.js";

export default function BlogAuthors() {
  return (
    <section className="bi-authors">
      <div className="container">
        <div className="bi-sec-head">
          <h2 className="bi-h2">
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>قلم‌های</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--college-dark)" }}>پشت</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>مقاله‌ها</span>
          </h2>
          <a className="bi-more-link" href="#blog-index">همه نویسنده‌ها <I.Arrow style={{ width: 16, height: 16 }} /></a>
        </div>

        <div className="bi-author-grid">
          {AUTHORS_LIST.map((a, i) => {
            const c = TONES[a.tone];
            return (
              <div key={i} className="bi-author-cell" style={{ transform: `rotate(${a.rot})` }}>
                <div className="bi-author-sh" />
                <div className="bi-author-card">
                  <div className="bi-author-strip" style={{ background: coverBg(a.tone) }} />
                  <span className="bi-author-avatar" style={{ background: c.tint, color: c.solid }}>{a.initials}</span>
                  <h4>{a.name}</h4>
                  <p>{a.role}</p>
                  <span className="bi-author-posts" style={{ background: c.tint, color: c.solid, borderColor: c.solid }}>
                    <I.Book style={{ width: 12, height: 12 }} />
                    {toFa(a.posts)} مقاله
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
