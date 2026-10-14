import React from "react";
import { I, toFa, coverBg, TONES } from "./BlogIcons.jsx";
import { TRENDING_ITEMS } from "../data/blogIndexData.js";

export default function BlogTrending() {
  return (
    <section className="bi-trending">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="bi-sec-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="bi-trend-ic">
              <I.Flame style={{ color: "#fff", width: 22, height: 22, transform: "rotate(4deg)" }} />
            </span>
            <h2 className="bi-h2">
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>پرخواننده‌ترین‌های</span>{" "}
              <span className="mk">ماه</span>
            </h2>
          </div>
          <span className="bi-update">به‌روزرسانی هر یکشنبه</span>
        </div>

        <div className="bi-trend-grid">
          {TRENDING_ITEMS.map((it, i) => {
            const c = TONES[it.tone];
            const IconComp = it.icon;
            return (
              <div key={i} className="bi-trend-cell" style={{ transform: `rotate(${it.rot})` }}>
                <div className="bi-trend-sh" />
                <article className="bi-trend-card">
                  <div className="bi-trend-media" style={{ background: coverBg(it.tone) }}>
                    <div className="bi-card-circle" style={{ background: "rgba(255,255,255,.25)" }} />
                    <div className="bi-card-square" />
                    <span className="bi-trend-glyph" style={{ display: "grid", placeItems: "center" }}>
                      <IconComp size={28} />
                    </span>
                  </div>
                  <div className="bi-trend-body">
                    <span className="bi-trend-rank" style={{ color: c.solid }}>#{toFa(it.rank)}</span>
                    <div className="bi-trend-top">
                      <span className="bi-trend-badge" style={{ background: c.solid }}>رتبه {toFa(it.rank)}</span>
                    </div>
                    <h3>{it.title}</h3>
                    <div className="bi-trend-foot">
                      <span>{it.author}</span>
                      <span style={{ color: c.solid, fontWeight: 900 }}>{it.reads}</span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
