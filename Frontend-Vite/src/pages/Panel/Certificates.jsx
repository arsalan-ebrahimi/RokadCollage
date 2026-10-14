/* ============================================================
   گواهی‌ها: Certificates
   کارت گواهی به سبک تیکت CTA (cta5) DS رکاد:
   بوردر 3px، شدو 8px 8px 0 college، رادیوس 24px، پرفوراژ.
   متصل به استور با امکان مشاهده و صدور خودکار گواهینامه‌ها
   ============================================================ */
import { useState, useEffect } from "react";
import { Download, CheckCircle2 } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore } from "../../data/panelStore.js";

const SealGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13l1.5 8-5-3-5 3 1.5-8" />
  </svg>
);

const QR = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
    <path d="M3 3h7v7H3zM5 5v3h3V5zM14 3h7v7h-7zM16 5v3h3V5zM3 14h7v7H3zM5 16v3h3v-3zM14 14h3v3h-3zM18 14h3v3h-3zM14 18h3v3h-3zM18 18h3v3h-3z" />
  </svg>
);

export default function Certificates({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [selectedCert, setSelectedCert] = useState(null);
  const [downloadToast, setDownloadToast] = useState(false);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const { certificates, user } = store;

  const handleDownload = (cert) => {
    setDownloadToast(cert.title);
    setTimeout(() => setDownloadToast(false), 3500);

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fffef7" />
          <stop offset="100%" stop-color="#fdf6e2" />
        </linearGradient>
      </defs>
      <rect width="1200" height="840" fill="url(#bg)" stroke="#292827" stroke-width="12" />
      <rect x="24" y="24" width="1152" height="792" fill="none" stroke="#e0a800" stroke-width="4" stroke-dasharray="12 8" />
      <rect x="40" y="40" width="1120" height="760" fill="none" stroke="#292827" stroke-width="2" />
      
      <!-- هدر گواهینامه -->
      <text x="600" y="140" font-family="sans-serif" font-size="24" font-weight="900" fill="#e0a800" text-anchor="middle" letter-spacing="4">ROKAD ACADEMY CERTIFICATE OF COMPLETION</text>
      <text x="600" y="200" font-family="sans-serif" font-size="44" font-weight="950" fill="#292827" text-anchor="middle">گواهی‌نامه رسمی پایان دوره آموزشی</text>
      
      <text x="600" y="270" font-family="sans-serif" font-size="20" font-weight="700" fill="#555" text-anchor="middle">بدین‌وسیله گواهی می‌شود که هنرجوی گرامی:</text>
      <text x="600" y="340" font-family="sans-serif" font-size="48" font-weight="950" fill="#1a365d" text-anchor="middle">${user.fullName || "پارسا محمدی"}</text>
      
      <text x="600" y="410" font-family="sans-serif" font-size="20" font-weight="700" fill="#555" text-anchor="middle">با موفقیت دوره تخصصی و پروژه‌محور زیر را با نمره عالی ${cert.grade || "A+"} به پایان رسانده است:</text>
      <text x="600" y="480" font-family="sans-serif" font-size="36" font-weight="900" fill="#e0195b" text-anchor="middle">${cert.title}</text>
      
      <line x1="200" y1="530" x2="1000" y2="530" stroke="#ccc" stroke-width="2" />
      
      <!-- جزئیات -->
      <text x="240" y="600" font-family="sans-serif" font-size="18" font-weight="800" fill="#292827">مدرس دوره: ${cert.teacher || "اساتید کالج رکاد"}</text>
      <text x="240" y="640" font-family="sans-serif" font-size="18" font-weight="800" fill="#292827">تاریخ صدور: ${cert.date || "۱۴۰۴/۰۶/۱۵"}</text>
      <text x="240" y="680" font-family="sans-serif" font-size="18" font-weight="800" fill="#292827">شناسه استعلام: ${cert.serial || "ROKAD-CERT-1404"}</text>
      
      <!-- مهر کالج -->
      <circle cx="920" cy="640" r="60" fill="#fff" stroke="#e0a800" stroke-width="4" />
      <text x="920" y="635" font-family="sans-serif" font-size="14" font-weight="900" fill="#292827" text-anchor="middle">کالج رکاد</text>
      <text x="920" y="655" font-family="sans-serif" font-size="11" font-weight="800" fill="#e0a800" text-anchor="middle">مهر تایید رسمی</text>
      
      <text x="600" y="760" font-family="sans-serif" font-size="14" font-weight="700" fill="#888" text-anchor="middle">این مدرک با امضای دیجیتال و کد اعتبارسنجی یکتا صادر گردیده و در سامانه کالج رکاد قابل استعلام می‌باشد.</text>
    </svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificate_${cert.serial || "ROKAD"}_${(user.fullName || "student").replace(/\s+/g, "_")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="panel">
      <PanelLayout page="certs" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>گواهی‌های</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
        </h1>
        <p className="pnl-sub">
          {certificates.length} گواهی معتبر و قابل استعلام داری؛ هر گواهی دارای کد QR و سریال انحصاریه.
        </p>

        {downloadToast && (
          <div
            style={{
              background: "var(--teal-light)",
              border: "2px solid var(--ink)",
              padding: "10px 16px",
              borderRadius: "8px 0 8px 0",
              fontWeight: 800,
              fontSize: "13px",
              color: "var(--teal-dark)",
              marginBottom: 16,
              boxShadow: "2.5px 2.5px 0 var(--ink)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={16} />
            <span>فایل PDF گواهینامه با کیفیت چاپی و امضای دیجیتال آماده دریافت شد</span>
          </div>
        )}

        <div className="pnl-certs">
          {certificates.map((c, i) => (
            <article key={c.id} className={`pnl-cert${i % 2 ? " alt" : ""}`}>
              <span className="pnl-cert-stamp">
                <SealGlyph />
                معتبر
              </span>

              <div className="pnl-cert-main">
                <h3>{c.title}</h3>
                <div className="pnl-cert-meta">
                  <span>
                    <b>{c.date}</b>
                    <small>تاریخ صدور</small>
                  </span>
                  <span>
                    <b>{c.hours}</b>
                    <small>مدت دوره</small>
                  </span>
                  <span>
                    <b>{c.grade}</b>
                    <small>نمرهٔ نهایی</small>
                  </span>
                </div>
              </div>

              {/* پرفوراژ + کد */}
              <div className="pnl-cert-perf" aria-hidden="true">
                <span className="line" />
              </div>

              <div className="pnl-cert-stub">
                <div className="qr"><QR /></div>
                <span className="serial">{c.serial}</span>
                <button
                  type="button"
                  className="pnl-cbtn"
                  onClick={() => setSelectedCert(c)}
                >
                  مشاهده و دانلود
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="pnl-cert-note">
          گواهی‌های جدید بعد از قبولی در امتحان نهایی یا تکمیل ۱۰۰٪ هر دوره، خودکار همین‌جا اضافه می‌شن.
          <button className="pnl-cbtn ghost" onClick={() => onNavigate("courses")}>دوره‌های من</button>
        </div>

        {/* ---------- مودال پیش‌نمایش گواهی معتبر کالج رکاد ---------- */}
        {selectedCert && (
          <div className="auth-modal-backdrop" onClick={() => setSelectedCert(null)}>
            <div className="auth-modal-card" style={{ maxWidth: 540, padding: 24, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
              <div
                style={{
                  border: "3px double var(--ink)",
                  padding: "24px 20px",
                  background: "#fffef8",
                  borderRadius: "14px 0 14px 0",
                  boxShadow: "4px 4px 0 var(--college)",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 950, letterSpacing: "2px", color: "var(--college-dark)", marginBottom: 4 }}>
                  ROKAD COLLEGE · CERTIFICATE OF COMPLETION
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 950, color: "var(--navy)", margin: "0 0 10px" }}>
                  گواهینامه رسمی پایان دوره
                </h2>
                <p style={{ fontSize: "13px", color: "var(--ink-subtle)", margin: "0 0 14px" }}>
                  بدین‌وسیله گواهی می‌شود که هنرجو
                </p>
                <div style={{ fontSize: "19px", fontWeight: 950, color: "var(--ink)", borderBottom: "2px solid var(--college)", display: "inline-block", paddingBottom: "4px", marginBottom: "14px" }}>
                  {user.fullName}
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-subtle)", lineHeight: 1.7, margin: "0 0 16px" }}>
                  دوره تخصصی <b>«{selectedCert.title}»</b> را به مدت <b>{selectedCert.hours}</b> با نمره نهایی <b>{selectedCert.grade} از ۲۰</b> با موفقیت سپری نموده است.
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px dashed var(--ink-light)", paddingTop: "14px", marginTop: "14px", fontSize: "12px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div><b>تاریخ صدور:</b> {selectedCert.date}</div>
                    <div><b>مدرس دوره:</b> {selectedCert.instructor || "اساتید کالج"}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 44, height: 44, margin: "0 auto 4px" }}><QR /></div>
                    <small style={{ fontFamily: "monospace", fontWeight: 900, color: "var(--navy)" }}>{selectedCert.serial}</small>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 18 }}>
                <button
                  type="button"
                  className="pnl-cbtn"
                  style={{ flex: 1, padding: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={() => handleDownload(selectedCert)}
                >
                  <Download size={16} />
                  <span>دانلود نسخه چاپی PDF</span>
                </button>
                <button
                  type="button"
                  className="pnl-cbtn ghost"
                  style={{ flex: 1, padding: "10px" }}
                  onClick={() => setSelectedCert(null)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        )}
      </PanelLayout>
    </section>
  );
}
