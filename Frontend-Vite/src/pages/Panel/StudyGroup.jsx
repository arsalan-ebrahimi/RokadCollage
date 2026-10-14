/* ============================================================
   گروه مطالعه: Study Groups
   متصل به استور با امکان عضویت و ورود به جلسه آنلاین تعاملی
   ============================================================ */
import { useState, useEffect } from "react";
import { Users, Mic, MicOff, Video, VideoOff } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, toggleStudyGroup, sendGroupMessage } from "../../data/panelStore.js";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

const GroupIcon = ({ color }) => (
  <Users size={22} style={{ color }} strokeWidth={2.2} />
);

export default function StudyGroup({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [activeMeetGroup, setActiveMeetGroup] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  useEffect(() => {
    const handleStoreChange = (e) => {
      const s = e.detail || getPanelStore();
      setStore(s);
      if (activeMeetGroup) {
        const updatedG = s.studyGroups.find((g) => g.id === activeMeetGroup.id);
        if (updatedG) setActiveMeetGroup(updatedG);
      }
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, [activeMeetGroup]);

  const { studyGroups } = store;
  const joined = studyGroups.filter((g) => g.joined);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeMeetGroup) return;
    sendGroupMessage(activeMeetGroup.id, chatInput.trim());
    setChatInput("");
  };

  return (
    <section id="panel">
      <PanelLayout page="group" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>گروه</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>مطالعه</span>
        </h1>
        <p className="pnl-sub">
          توی {toFa(joined.length)} گروه فعالی؛ یادگیری گروهی سرعتت رو ۲ برابر می‌کنه.
        </p>

        <div className="pnl-groups">
          {studyGroups.map((g, i) => (
            <article key={g.id} className={`pnl-group${g.joined ? " joined" : ""}${i % 2 ? " alt" : ""}`}>
              <span className="pnl-group-ic" style={{ background: "var(--college-light)" }}>
                <GroupIcon color={g.color} />
              </span>
              <div className="body">
                <h3>{g.name}</h3>
                <span className="course">{g.course}</span>
                <div className="pnl-group-meta">
                  <span>
                    {toFa(g.members)} از {toFa(g.max)} عضو
                    <i className="bar">
                      <i style={{ width: `${(g.members / g.max) * 100}%` }} />
                    </i>
                  </span>
                  <span className="next">{g.next}</span>
                </div>
              </div>
              <div className="side">
                {g.joined ? (
                  <>
                    <span className="pnl-chip open">عضو هستی</span>
                    <button className="pnl-cbtn" onClick={() => setActiveMeetGroup(g)}>
                      ورود به جلسه
                    </button>
                    <button
                      className="pnl-cbtn ghost"
                      style={{ fontSize: "11px", padding: "4px 8px" }}
                      onClick={() => toggleStudyGroup(g.id)}
                    >
                      خروج از گروه
                    </button>
                  </>
                ) : (
                  <>
                    <span className="pnl-chip done">{g.members >= g.max ? "ظرفیت تکمیل" : "آماده عضویت"}</span>
                    <button
                      className="pnl-cbtn"
                      onClick={() => toggleStudyGroup(g.id)}
                      disabled={g.members >= g.max}
                    >
                      {g.members >= g.max ? "لیست انتظار" : "پیوستن به گروه"}
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pnl-cert-note">
          گروه‌های جدید هر ترم توسط منتورها چیده می‌شن؛ از رویدادها هم می‌تونی هم‌گروهی پیدا کنی.
          <button className="pnl-cbtn ghost" onClick={() => onNavigate("events")}>رویدادها</button>
        </div>

        {/* ---------- مودال اتاق جلسه آنلاین (Online Study Room) ---------- */}
        {activeMeetGroup && (
          <div className="auth-modal-backdrop" onClick={() => setActiveMeetGroup(null)}>
            <div
              className="auth-modal-card"
              style={{ maxWidth: 680, padding: 20, textAlign: "right" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "2px solid var(--ink)", paddingBottom: 12, marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 950, color: "var(--navy)" }}>
                    اتاق جلسه: {activeMeetGroup.name}
                  </h3>
                  <small style={{ color: "var(--college-dark)", fontWeight: 800 }}>{activeMeetGroup.course}</small>
                </div>
                <span style={{ background: "var(--teal-light)", color: "var(--teal-dark)", border: "1.5px solid var(--ink)", padding: "4px 10px", borderRadius: "6px 0 6px 0", fontSize: "12px", fontWeight: 900 }}>
                  ● زنده و متصل
                </span>
              </div>

              {/* شبکه شرکت‌کنندگان */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, width: "100%", marginBottom: 16 }}>
                {activeMeetGroup.participants?.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: p.isMe ? "var(--college-light)" : "#f8f9fa",
                      border: "2px solid var(--ink)",
                      borderRadius: "10px 0 10px 0",
                      padding: "12px 8px",
                      textAlign: "center",
                      position: "relative",
                      boxShadow: p.isMe ? "2.5px 2.5px 0 var(--ink)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: p.isMe ? "var(--college)" : "var(--navy)",
                        color: p.isMe ? "var(--ink)" : "#fff",
                        display: "grid",
                        placeItems: "center",
                        margin: "0 auto 6px",
                        fontWeight: 950,
                        fontSize: "16px",
                        border: "2px solid var(--ink)",
                      }}
                    >
                      {p.name[0]}
                    </div>
                    <b style={{ display: "block", fontSize: "12px", color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.name}
                    </b>
                    <small style={{ fontSize: "10.5px", color: "var(--ink-subtle)" }}>{p.role}</small>
                    {p.online && (
                      <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#10b981", borderRadius: "50%" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* باکس چت گروه */}
              <div style={{ width: "100%", background: "#fff", border: "2px solid var(--ink)", borderRadius: "8px 0 8px 0", padding: 12, marginBottom: 16 }}>
                <b style={{ display: "block", fontSize: "12.5px", marginBottom: 8, color: "var(--navy)" }}>گفتگوی متنی جلسه:</b>
                <div style={{ maxHeight: 120, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, padding: "4px 0" }}>
                  {activeMeetGroup.chatLogs && activeMeetGroup.chatLogs.map((c, i) => (
                    <div key={i} style={{ fontSize: "12px", background: "#f3f4f6", padding: "6px 10px", borderRadius: "6px" }}>
                      <b style={{ color: "var(--college-dark)" }}>{c.sender}: </b>
                      <span>{c.text}</span>
                    </div>
                  ))}
                  {(!activeMeetGroup.chatLogs || activeMeetGroup.chatLogs.length === 0) && (
                    <div style={{ color: "var(--ink-subtle)", fontSize: "12px", textAlign: "center" }}>اولین پیام را در چت جلسه ارسال کنید.</div>
                  )}
                </div>

                <form onSubmit={handleSendChat} style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <input
                    type="text"
                    placeholder="پیام به هم‌گروهی‌ها…"
                    dir="rtl"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    style={{ flex: 1, padding: "7px 10px", border: "1.5px solid var(--ink)", borderRadius: "6px", fontFamily: "inherit", fontSize: "12.5px" }}
                  />
                  <button type="submit" className="pnl-cbtn" style={{ padding: "7px 14px", fontSize: "12px" }}>
                    ارسال
                  </button>
                </form>
              </div>

              {/* ابزارهای پایین جلسه */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    className={`pnl-cbtn ${micMuted ? "ghost" : ""}`}
                    onClick={() => setMicMuted((v) => !v)}
                    style={{ fontSize: "12px", padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    {micMuted ? <MicOff size={15} /> : <Mic size={15} />}
                    <span>{micMuted ? "میکروفون: خاموش" : "میکروفون: فعال"}</span>
                  </button>
                  <button
                    type="button"
                    className={`pnl-cbtn ${camOff ? "ghost" : ""}`}
                    onClick={() => setCamOff((v) => !v)}
                    style={{ fontSize: "12px", padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    {camOff ? <VideoOff size={15} /> : <Video size={15} />}
                    <span>{camOff ? "وبکم: خاموش" : "وبکم: فعال"}</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="pnl-cbtn"
                  style={{ background: "#ef4444", color: "#fff", padding: "8px 16px", fontSize: "12px" }}
                  onClick={() => setActiveMeetGroup(null)}
                >
                  خروج از جلسه
                </button>
              </div>
            </div>
          </div>
        )}
      </PanelLayout>
    </section>
  );
}
