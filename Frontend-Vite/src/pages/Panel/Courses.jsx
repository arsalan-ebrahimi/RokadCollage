/* ============================================================
   دوره‌های من: My Courses
   کارت دوره با بازشدن درس‌ها (done / now / locked): DS رکاد:
   بوردر 2px ink، شدو آفست سخت، رادیوس 20px 0 20px 0، چرخش ظریف.
   متصل به استور و پیشرفت لحظه‌ای درس‌ها
   ============================================================ */
import { useState, useEffect } from "react";
import { Trophy, Award, Check, Play } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, toggleLessonDone } from "../../data/panelStore.js";
import VideoPlayerModal from "../../components/VideoPlayerModal/index.jsx";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

const PlayGlyph = () => (
  <Play size={12} fill="currentColor" />
);

export default function Courses({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [openId, setOpenId] = useState(1);
  const [certAlert, setCertAlert] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoCourse, setActiveVideoCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const { myCourses } = store;
  const active = myCourses.filter((c) => c.status !== "done");
  const done = myCourses.filter((c) => c.status === "done");

  const handleLessonToggle = (courseId, lessonId) => {
    const { generatedCert } = toggleLessonDone(courseId, lessonId);
    if (generatedCert) {
      setCertAlert(generatedCert);
      setTimeout(() => setCertAlert(null), 6000);
    }
  };

  const CourseCard = ({ c }) => {
    const isOpen = openId === c.id;
    const statusLabel =
      c.status === "done" ? "تکمیل‌شده" : c.status === "new" ? "تازه شروع" : "در حال یادگیری";
    return (
      <div
        className={`pnl-mc${c.status === "new" ? " is-new" : ""}${c.status === "done" ? " is-done" : ""}`}
      >
        <button
          className="pnl-mc-head"
          onClick={() => setOpenId(isOpen ? null : c.id)}
          aria-expanded={isOpen}
        >
          <span className={`pnl-mc-thumb ${c.status === "new" ? "b" : c.status === "done" ? "c" : ""}`}>
            <img src={c.pattern} alt="" aria-hidden="true" />
          </span>
          <span className="pnl-mc-info">
            <b>{c.title}</b>
            <span className="m">
              {c.teacher} · {c.sessions}
            </span>
            <span className={`pnl-mc-state ${c.status}`}>{statusLabel}</span>
          </span>
          <span className="pnl-mc-side">
            <span className="pct">{toFa(c.progress)}٪</span>
            <span className={`pnl-mc-chev${isOpen ? " open" : ""}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </span>
        </button>

        <div className={`pnl-mc-body${isOpen ? " open" : ""}`}>
          <div className="pnl-mc-progress">
            <div className="pnl-mc-track">
              <i style={{ width: `${c.progress}%` }} />
            </div>
            <span className="pnl-mc-next">
              {c.next}
            </span>
          </div>

          <div className="pnl-mc-lessons">
            {c.lessons && c.lessons.map((l) => (
              <div
                key={l.id || l.n}
                className={`pnl-les${l.now ? " now" : ""}${l.done ? " is-done-lesson" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <span
                  className={`n ${l.done ? "done-badge" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLessonToggle(c.id, l.id || l.n);
                  }}
                  title="تغییر وضعیت انجام درس"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  {l.done ? <Check size={13} strokeWidth={3} /> : toFa(l.n)}
                </span>
                <span
                  className="t"
                  onClick={() => {
                    setActiveVideoCourse(c);
                    setActiveLesson(l);
                    setVideoModalOpen(true);
                  }}
                  title="مشاهده ویدیو درس در ویدیو پلیر"
                >
                  <b>{l.title}</b>
                  <small>{l.now ? `${l.time} · در حال یادگیری (کلیک برای پخش ویدیو)` : `${toFa(l.n)} از ${toFa(c.lessons.length)} · ${l.time}`}</small>
                </span>
                <span
                  className="ic"
                  onClick={() => {
                    setActiveVideoCourse(c);
                    setActiveLesson(l);
                    setVideoModalOpen(true);
                  }}
                  title="پخش ویدیو"
                >
                  {l.done ? (
                    <span style={{ color: "var(--teal-dark)", fontWeight: 900, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      تکمیل شد <Play size={12} fill="currentColor" />
                    </span>
                  ) : l.now ? (
                    <span style={{ background: "var(--college)", color: "var(--ink)", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: 900, border: "1px solid var(--ink)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      پخش ویدیو <Play size={10} fill="currentColor" />
                    </span>
                  ) : (
                    <PlayGlyph />
                  )}
                </span>
              </div>
            ))}
          </div>

          {c.status === "done" && (
            <div className="pnl-mc-done-note" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Award size={20} style={{ color: "var(--navy)", flexShrink: 0 }} />
              <span>تبریک! در این دوره قبول شدی؛ گواهی‌ات در صفحهٔ گواهی‌ها آماده‌ست.</span>
              <button className="pnl-cbtn" style={{ marginRight: "auto" }} onClick={() => onNavigate("certs")}>مشاهدهٔ گواهی</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="panel">
      <PanelLayout page="courses" onNavigate={onNavigate}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 className="pnl-h1">
              <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>دوره‌های</span>{" "}
              <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
            </h1>
            <p className="pnl-sub">
              {toFa(active.length)} دورهٔ فعال داری؛ روی هر درس کلیک کن تا به عنوان تکمیل‌شده علامت‌گذاری بشه.
            </p>
          </div>
          <button
            className="pnl-cbtn"
            style={{ padding: "10px 18px", fontSize: "13.5px" }}
            onClick={() => { window.location.hash = "courses-index"; }}
          >
            + ثبت‌نام در دوره جدید
          </button>
        </div>

        {/* پیام تبریک صدور گواهی */}
        {certAlert && (
          <div
            style={{
              background: "var(--teal-light)",
              border: "2px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--ink)",
              borderRadius: "12px 0 12px 0",
              padding: "14px 18px",
              margin: "16px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Trophy size={26} style={{ color: "var(--college)", flexShrink: 0 }} />
              <div>
                <b style={{ color: "var(--navy)", fontSize: "15px" }}>تبریک! دوره «{certAlert.title}» ۱۰۰٪ کامل شد!</b>
                <div style={{ color: "var(--teal-dark)", fontSize: "13px", fontWeight: 700 }}>گواهی معتبر با کد رهگیری {certAlert.serial} صادر گردید.</div>
              </div>
            </div>
            <button className="pnl-cbtn" onClick={() => onNavigate("certs")}>مشاهده گواهینامه</button>
          </div>
        )}

        <div className="pnl-panel">
          <h4>
            در حال یادگیری
            <span className="pnl-pill">{toFa(active.length)} دوره</span>
          </h4>
          <div className="pnl-mc-list">
            {active.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
            {active.length === 0 && (
              <div style={{ textAlign: "center", padding: "26px", color: "var(--ink-subtle)", fontWeight: 700 }}>
                هیچ دوره فعالی نداری! همه دوره‌هات کامل شدن.
              </div>
            )}
          </div>
        </div>

        <div className="pnl-panel" style={{ marginTop: 22 }}>
          <h4>
            تکمیل‌شده
            <span className="pnl-pill">{toFa(done.length)} دوره</span>
          </h4>
          <div className="pnl-mc-list">
            {done.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
          </div>
        </div>

        {/* مودال پخش ویدیو دروس پنل هنرجو */}
        <VideoPlayerModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={activeVideoCourse?.videoUrl}
          title={activeVideoCourse?.title || "دورهٔ من"}
          lessonTitle={activeLesson ? `${activeLesson.title || activeLesson.t}` : "جلسه آموزشی"}
          poster={activeVideoCourse?.pattern || "/assets/StatCard/blue.png"}
          lessons={activeVideoCourse?.lessons || []}
          currentLesson={activeLesson}
          onSelectLesson={(les) => setActiveLesson(les)}
        />
      </PanelLayout>
    </section>
  );
}
