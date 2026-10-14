/* ============================================================
   پشتیبانی: Support
   تیکت‌ها + فرم تیکت جدید + گفتگوی آنلاین تیکت + سوالات پرتکرار
   ============================================================ */
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, createSupportTicket, replySupportTicket } from "../../data/panelStore.js";
import { supportFaqs } from "./panelData.js";

const STATUS = {
  open: { label: "در بررسی", cls: "open" },
  answering: { label: "در حال پاسخ‌دهی", cls: "late" },
  closed: { label: "بسته‌شده", cls: "done" },
};

const LifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function Support({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [openFaq, setOpenFaq] = useState(null);
  const [subject, setSubject] = useState("");
  const [dept, setDept] = useState("پشتیبانی فنی");
  const [message, setMessage] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyInput, setReplyInput] = useState("");

  useEffect(() => {
    const handleStoreChange = (e) => {
      const s = e.detail || getPanelStore();
      setStore(s);
      if (activeTicket) {
        const updated = s.supportTickets.find((t) => t.id === activeTicket.id);
        if (updated) setActiveTicket(updated);
      }
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, [activeTicket]);

  const { supportTickets } = store;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    createSupportTicket(subject.trim(), dept, message.trim());
    setSubject("");
    setMessage("");
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 3500);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeTicket) return;
    replySupportTicket(activeTicket.id, replyInput.trim());
    setReplyInput("");
  };

  return (
    <section id="panel">
      <PanelLayout page="support" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w accent" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>پشتیبانی</span>
        </h1>
        <p className="pnl-sub">تیم پشتیبانی کالج رکاد همه‌روزه پاسخ‌گوی سوالات و مشکلات شماست.</p>

        <div className="pnl-support-grid">
          {/* تیکت‌ها */}
          <div className="pnl-panel">
            <h4>
              تیکت‌های من
              <span className="pnl-pill">{supportTickets.length} تیکت</span>
            </h4>
            <div className="pnl-tickets">
              {supportTickets.map((t) => {
                const st = STATUS[t.status] || STATUS.open;
                return (
                  <div key={t.id} className="pnl-ticket">
                    <span className={`pnl-asn-ic ${st.cls}`} style={{ width: 40, height: 40 }}>
                      <LifeIcon />
                    </span>
                    <div className="body">
                      <b>{t.subject}</b>
                      <span className="m">
                        {t.dept} · {t.messages?.length || 1} پیام · آخرین به‌روزرسانی {t.updated}
                      </span>
                    </div>
                    <div className="side">
                      <span className={`pnl-chip ${st.cls}`}>{st.label}</span>
                      <button className="pnl-cbtn ghost" onClick={() => setActiveTicket(t)}>
                        مشاهده گفتگو
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* تیکت جدید */}
            <form className="pnl-new-ticket" onSubmit={handleSubmit}>
              <b>ارسال تیکت جدید</b>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="موضوع تیکت…"
                  dir="rtl"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ flex: 2 }}
                />
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  style={{
                    flex: 1,
                    border: "2px solid var(--ink)",
                    borderRadius: "8px 0 8px 0",
                    padding: "0 10px",
                    fontFamily: "inherit",
                    fontWeight: 800,
                    fontSize: "12.5px",
                    background: "#fff",
                  }}
                >
                  <option value="پشتیبانی فنی">پشتیبانی فنی</option>
                  <option value="امور هنرجویان">امور هنرجویان</option>
                  <option value="امور مالی و اقساط">امور مالی و اقساط</option>
                  <option value="امور فارغ‌التحصیلان">امور فارغ‌التحصیلان</option>
                </select>
              </div>
              <textarea
                placeholder="توضیح کامل مشکل یا درخواست شما…"
                dir="rtl"
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="pnl-cbtn">ارسال تیکت به کارشناسان</button>
              {ticketSuccess && (
                <div style={{ color: "var(--teal-dark)", fontSize: "12.5px", fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={15} />
                  <span>تیکت شما با موفقیت ثبت شد. کارشناسان به زودی پاسخ می‌دهند.</span>
                </div>
              )}
            </form>
          </div>

          {/* FAQ */}
          <div className="pnl-panel">
            <h4>
              سوالات پرتکرار
              <span className="pnl-pill">{supportFaqs.length} سوال</span>
            </h4>
            <div className="pnl-faqs">
              {supportFaqs.map((f, i) => (
                <div key={i} className={`pnl-faq${openFaq === i ? " open" : ""}`}>
                  <button className="pnl-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q}
                    <span className="chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div className="pnl-faq-a"><span>{f.a}</span></div>
                </div>
              ))}
            </div>
            <div className="pnl-cert-note" style={{ marginTop: 16 }}>
              سوال درسی داری؟ مستقیم از منتورت بپرس.
              <button className="pnl-cbtn ghost" onClick={() => onNavigate("mentor")}>گفتگو با منتور</button>
            </div>
          </div>
        </div>

        {/* ---------- مودال مشاهده و پاسخ به تیکت پشتیبانی ---------- */}
        {activeTicket && (
          <div className="auth-modal-backdrop" onClick={() => setActiveTicket(null)}>
            <div className="auth-modal-card" style={{ maxWidth: 520, textAlign: "right", padding: 20 }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "2px solid var(--ink)", paddingBottom: 10, marginBottom: 14 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 950, color: "var(--navy)" }}>{activeTicket.subject}</h3>
                  <small style={{ color: "var(--college-dark)", fontWeight: 800 }}>{activeTicket.dept}</small>
                </div>
                <span className={`pnl-chip ${(STATUS[activeTicket.status] || STATUS.open).cls}`}>
                  {(STATUS[activeTicket.status] || STATUS.open).label}
                </span>
              </div>

              <div style={{ width: "100%", maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, padding: "4px" }}>
                {activeTicket.messages?.map((m, idx) => {
                  const isUser = m.sender === "user" || m.sender === "me";
                  return (
                    <div
                      key={idx}
                      style={{
                        alignSelf: isUser ? "flex-start" : "flex-end",
                        maxWidth: "85%",
                        background: isUser ? "var(--college-light)" : "var(--bg-lavender, #f3f0ff)",
                        border: "1.5px solid var(--ink)",
                        borderRadius: isUser ? "10px 0 10px 10px" : "0 10px 10px 10px",
                        padding: "10px 14px",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    >
                      <div style={{ fontSize: "11px", fontWeight: 900, color: isUser ? "var(--college-dark)" : "var(--navy)", marginBottom: 4 }}>
                        {isUser ? "شما" : "پشتیبانی کالج رکاد"} · <span style={{ color: "var(--ink-subtle)" }}>{m.date}</span>
                      </div>
                      <div>{m.text}</div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendReply} style={{ width: "100%", display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="پاسخ یا توضیح تکمیلی…"
                  dir="rtl"
                  required
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  style={{ flex: 1, padding: "9px 12px", border: "2px solid var(--ink)", borderRadius: "8px 0 8px 0", fontFamily: "inherit", fontSize: "13px" }}
                />
                <button type="submit" className="pnl-cbtn" style={{ padding: "9px 16px" }}>
                  ارسال پاسخ
                </button>
              </form>

              <button
                type="button"
                className="pnl-cbtn ghost wide"
                style={{ marginTop: 12 }}
                onClick={() => setActiveTicket(null)}
              >
                بستن تیکت
              </button>
            </div>
          </div>
        )}
      </PanelLayout>
    </section>
  );
}
