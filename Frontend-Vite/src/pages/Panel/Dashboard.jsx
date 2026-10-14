import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, recordDailyStreak } from "../../data/panelStore.js";
import DashboardStreakAndKpis from "./components/DashboardStreakAndKpis.jsx";
import DashboardOrdersHistory from "./components/DashboardOrdersHistory.jsx";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

const PlayGlyph = () => (
  <span className="play" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

export default function Dashboard({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const { user, streak, myCourses, events, certificates } = store;

  const handleRecordStreak = () => {
    recordDailyStreak();
  };

  const activeCourses = myCourses.filter((c) => c.status !== "done");
  const registeredEvents = events.filter((e) => e.registered);
  const totalCompletedLessons = myCourses.reduce(
    (acc, c) => acc + (c.lessons ? c.lessons.filter((l) => l.done).length : 0),
    0
  );

  const kpis = [
    { label: "درس‌های تکمیل‌شده", value: toFa(totalCompletedLessons), chip: "+۴" },
    { label: "دوره‌های فعال", value: toFa(activeCourses.length), chip: "در حال یادگیری" },
    { label: "گواهی‌های کسب‌شده", value: toFa(certificates.length), chip: "A+", dark: true },
    { label: "امتیاز رتبه‌بندی", value: toFa(user.level?.points || 2480) },
  ];

  return (
    <section id="panel">
      <PanelLayout page="dashboard" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>سلام</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>{user.firstName}</span>
        </h1>
        <p className="pnl-sub">{user.greeting}</p>

        <DashboardStreakAndKpis
          streak={streak}
          handleRecordStreak={handleRecordStreak}
          kpis={kpis}
        />

        {/* ---------- Learning + Schedule ---------- */}
        <div className="pnl-grid">
          <div className="pnl-panel">
            <h4>
              ادامهٔ یادگیری
              <button
                type="button"
                className="pnl-link-btn"
                onClick={() => onNavigate("courses")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--navy)", fontWeight: 800, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <span>مشاهده همه</span>
                <ArrowLeft size={14} />
              </button>
            </h4>
            {activeCourses.slice(0, 4).map((c) => (
              <div className="pnl-course" key={c.id}>
                <div className="pnl-thumb">
                  <img src={c.pattern} alt="" aria-hidden="true" />
                  <PlayGlyph />
                </div>
                <div>
                  <b>{c.title}</b>
                  <div className="m">{c.next || c.sessions}</div>
                  <div className="pnl-prog">
                    <i style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button
                  className={`pnl-cbtn${c.progress === 100 ? " ok" : ""}`}
                  onClick={() => onNavigate("courses")}
                >
                  {c.progress === 100 ? "تکمیل شد" : "ادامه"}
                </button>
              </div>
            ))}
            {activeCourses.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-subtle)", fontSize: "14px", fontWeight: 700 }}>
                تمامی دوره‌های شما تکمیل شده‌اند!
                <button
                  className="pnl-cbtn wide"
                  style={{ marginTop: 12 }}
                  onClick={() => { window.location.hash = "courses-index"; }}
                >
                  مشاهده کاتالوگ و ثبت‌نام در دوره جدید
                </button>
              </div>
            )}
          </div>

          <div className="pnl-panel">
            <h4>
              برنامه و رویدادهای من
              <button
                type="button"
                className="pnl-link-btn"
                onClick={() => onNavigate("events")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--navy)", fontWeight: 800, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <span>تقویم کامل</span>
                <ArrowLeft size={14} />
              </button>
            </h4>
            <div className="pnl-sched">
              {registeredEvents.map((ev) => (
                <div key={ev.id} className={`pnl-ev${ev.featured ? " today" : ""}`}>
                  <div className="day">
                    <b>{ev.day}</b>
                    <span>{ev.month}</span>
                  </div>
                  <div className="info">
                    <b>{ev.title}</b>
                    <span>{ev.time} · {ev.host}</span>
                  </div>
                </div>
              ))}
              {registeredEvents.length === 0 && (
                <div style={{ padding: "16px", textAlign: "center", color: "var(--ink-subtle)", fontSize: "13.5px" }}>
                  هنوز در رویدادی ثبت‌نام نکرده‌اید.
                  <button className="pnl-cbtn ghost" style={{ marginTop: 10, width: "100%" }} onClick={() => onNavigate("events")}>
                    مشاهده رویدادها و وبینارها
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <DashboardOrdersHistory orders={store.orders} />
      </PanelLayout>
    </section>
  );
}
