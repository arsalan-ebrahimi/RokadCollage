import React from "react";
import { weeklyActivity, skills, badges } from "../panelData.js";

export default function ProfileActivityPanels() {
  return (
    <div className="pnl-right">
      <div className="pnl-panel">
        <h4>
          فعالیت هفتگی
          <span className="pnl-pill">+۱۲٪ نسبت به هفته قبل</span>
        </h4>
        <div className="pnl-chart">
          {weeklyActivity.map((b) => (
            <div
              key={b.day}
              className={`pnl-bar${b.hi ? " hi" : ""}`}
              style={{ height: `${b.pct}%` }}
            >
              {b.hours}س
              <span>{b.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pnl-panel">
        <h4>مهارت‌های تخصصی</h4>
        {skills.map((s) => (
          <div className="pnl-skill" key={s.name}>
            <div className="n">{s.name}</div>
            <div className="track">
              <i style={{ width: `${s.pct}%` }} />
            </div>
            <div className="pct">{s.pct.toLocaleString("fa-IR")}٪</div>
          </div>
        ))}
      </div>

      <div className="pnl-panel">
        <h4>
          دستاوردها
          <span className="pnl-pill">۵ از ۸</span>
        </h4>
        <div className="pnl-badges">
          {badges.map((b, i) => (
            <div key={i} className={`pnl-badge ${b.cls}`}>
              <b>{b.label}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
