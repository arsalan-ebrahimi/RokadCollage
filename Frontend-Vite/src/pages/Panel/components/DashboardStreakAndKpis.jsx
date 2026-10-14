import React from "react";
import { Flame, CheckCircle2 } from "lucide-react";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

export default function DashboardStreakAndKpis({
  streak,
  handleRecordStreak,
  kpis,
}) {
  return (
    <>
      {/* ---------- Streak banner ---------- */}
      <div className="pnl-streak">
        <div>
          <h3>{toFa(streak.days)} روز پیاپی یادگیری</h3>
          <p>{streak.hint}</p>
          {!streak.todayRecorded ? (
            <button
              type="button"
              className="pnl-cbtn"
              style={{
                marginTop: 10,
                fontSize: "13px",
                padding: "8px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={handleRecordStreak}
            >
              <Flame size={16} />
              <span>ثبت مطالعه امروز (+۱۰۰ امتیاز)</span>
            </button>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                marginTop: 10,
                fontSize: "12.5px",
                fontWeight: 900,
                color: "var(--teal-dark)",
                background: "var(--teal-light)",
                border: "1.5px solid var(--ink)",
                padding: "4px 10px",
                borderRadius: "6px 0 6px 0",
              }}
            >
              <CheckCircle2 size={15} />
              <span>مطالعه امروز ثبت شد</span>
            </span>
          )}
        </div>
        <div className="pnl-flames" aria-hidden="true">
          {streak.week.map((d, i) => (
            <div key={i} className={`pnl-flame${d.on ? "" : " off"}`}>
              {toFa(i + 1)}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- KPIs ---------- */}
      <div className="pnl-kpis">
        {kpis.map((k) => (
          <div key={k.label} className={`pnl-kpi${k.dark ? " dark" : ""}`}>
            <div className="lbl">
              {k.label}
              {k.chip && <span className="chip">{k.chip}</span>}
            </div>
            <div className="v">{k.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
