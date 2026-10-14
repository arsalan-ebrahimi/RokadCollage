/* ============================================================
   رویدادها: Events
   کارت رویداد با روز بزرگ + ثبت‌نام؛ featured = سایه کهربایی.
   متصل به استور با هماهنگی تقویم داشبورد
   ============================================================ */
import { useState, useEffect } from "react";
import { Calendar, Check } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, toggleEventRegistration } from "../../data/panelStore.js";

const CalIcon = () => <Calendar size={16} strokeWidth={2.2} />;

export default function Events({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const { events } = store;

  return (
    <section id="panel">
      <PanelLayout page="events" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w accent" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>رویدادها</span>
        </h1>
        <p className="pnl-sub">کلاس‌های زنده، وبینارها و رویدادهای حضوری کالج رکاد (همگام با تقویم داشبورد).</p>

        <div className="pnl-events">
          {events.map((e, i) => (
            <article key={e.id} className={`pnl-event${e.featured ? " featured" : ""}${i % 2 ? " alt" : ""}`}>
              <div className={`day${e.featured ? " hot" : ""}`}>
                <b>{e.day}</b>
                <span>{e.month}</span>
              </div>
              <div className="body">
                <div className="top">
                  <h3>{e.title}</h3>
                  <span className="pnl-chip open">{e.kind}</span>
                </div>
                <div className="meta">
                  <span><CalIcon /> {e.time}</span>
                  <span>{e.host}</span>
                  <span>{e.place}</span>
                  {e.seats && <span className="seats">{e.seats}</span>}
                </div>
              </div>
              <div className="side">
                {e.registered ? (
                  <>
                    <span className="pnl-chip done" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Check size={12} strokeWidth={3} />
                      <span>ثبت‌نام شدی</span>
                    </span>
                    <button className="pnl-cbtn ghost" onClick={() => toggleEventRegistration(e.id)}>
                      لغو ثبت‌نام
                    </button>
                  </>
                ) : (
                  <button className="pnl-cbtn" onClick={() => toggleEventRegistration(e.id)}>
                    ثبت‌نام رایگان
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </PanelLayout>
    </section>
  );
}
