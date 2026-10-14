/* ============================================================
   PanelLayout: پوسته مشترک داشبورد و صفحه کاربر
   سایدبار چسبان + نوار بالا؛ با دیزاین‌سیستم کالج رکاد.
   ============================================================ */
import { useState } from "react";
import "../Panel/admin.css";
import { logoutUser } from "../../data/panelStore.js";
import { LogOut, AlertTriangle } from "lucide-react";

/* ---------- Sidebar icons (inline SVG, stroke = currentColor) ---------- */
const I = {
  dash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  courses: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  homework: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  ),
  certs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.5 13l1.5 8-5-3-5 3 1.5-8" />
    </svg>
  ),
  mentor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  group: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

const NAV = [
  { sec: "اصلی", items: [
    { key: "dashboard", label: "داشبورد", icon: I.dash },
    { key: "courses", label: "دوره‌های من", icon: I.courses },
    { key: "assignments", label: "تکالیف", icon: I.homework },
    { key: "certs", label: "گواهی‌ها", icon: I.certs },
  ]},
  { sec: "اجتماع", items: [
    { key: "mentor", label: "گفتگو با منتور", icon: I.mentor },
    { key: "group", label: "گروه مطالعه", icon: I.group },
    { key: "events", label: "رویدادها", icon: I.events },
  ]},
  { sec: "حساب", items: [
    { key: "profile", label: "پروفایل", icon: I.settings },
    { key: "support", label: "پشتیبانی", icon: I.support },
  ]},
];

/* عنوان صفحهٔ فعلی: برای h1 داینامیک */
export const PAGE_TITLES = { dashboard: "داشبورد", profile: "پروفایل", assignments: "تکالیف", courses: "دوره‌های من", certs: "گواهی‌ها", mentor: "گفتگو با منتور", group: "گروه مطالعه", events: "رویدادها", support: "پشتیبانی" };

export default function PanelLayout({ page, onNavigate, children }) {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* بستن منوی موبایل بعد از هر ناوبری */
  const go = (key) => {
    setMobileOpen(false);
    onNavigate(key);
  };

  /* محتوای ناوبری: بین سایدبار دسکتاپ و پنل موبایل مشترک */
  const navContent = (onItemClick) =>
    NAV.map((group) => (
      <div key={group.sec}>
        <div className="pnl-sec">{group.sec}</div>
        <nav className="pnl-nav">
          {group.items.map((item) => (
            <a
              key={item.key}
              href="#panel"
              className={page === item.key ? "on" : ""}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(item);
              }}
            >
              <span className="ic">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    ));

  const goHome = (e) => {
    e?.preventDefault();
    window.location.hash = "";
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("rokad_auth_redirect");
      sessionStorage.removeItem("rokad_auth_msg");
    } catch (_) {}
    setShowLogoutModal(false);
    logoutUser();
    window.location.hash = "#";
    setTimeout(() => {
      window.location.hash = "";
    }, 10);
  };


  return (
    <div className="pnl-root">
      {/* ---------- نوار موبایل (فقط ≤900px) ---------- */}
      <div className="pnl-mobilebar">
        <a href="#" className="pnl-brand" onClick={goHome}>
          <span className="mark">
            <img src="/assets/Shared/Logos/logo-white-512.png" alt="" aria-hidden="true" />
          </span>
          <span>
            <strong>رکاد</strong>
            <small>ROKAD COLLEGE</small>
          </span>
        </a>
        <button
          className="pnl-burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="منو"
          aria-expanded={mobileOpen}
        >
          <span className={`pnl-burger-bars${mobileOpen ? " open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* ---------- پنل تمام‌صفحهٔ موبایل ---------- */}
      <div className={`pnl-mobile-panel${mobileOpen ? " open" : ""}`}>
        <div className="pnl-mobile-head">
          <span className="pnl-mobile-title">{PAGE_TITLES[page] || "پنل"}</span>
          <button className="pnl-mobile-close" onClick={() => setMobileOpen(false)} aria-label="بستن">
            ×
          </button>
        </div>
        {navContent((item) => go(item.key))}
        <div className="pnl-mobile-foot">
          <a href="#" className="pnl-back" onClick={goHome}>
            {I.home}
            بازگشت به سایت
          </a>
          <button
            type="button"
            className="pnl-logout-btn"
            onClick={() => {
              setMobileOpen(false);
              setShowLogoutModal(true);
            }}
          >
            <LogOut size={15} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </div>

      {/* ---------- Sidebar (دسکتاپ) ---------- */}
      <aside className="pnl-side">
        <a href="#" className="pnl-brand" onClick={goHome}>
          <span className="mark">
            <img src="/assets/Shared/Logos/logo-white-512.png" alt="" aria-hidden="true" />
          </span>
          <span>
            <strong>رکاد</strong>
            <small>ROKAD COLLEGE</small>
          </span>
        </a>

        <nav className="pnl-nav-wrap">
          {navContent((item) => onNavigate(item.key))}
        </nav>

        <div className="pnl-side-foot">
          <a href="#" className="pnl-back" onClick={goHome}>
            {I.home}
            بازگشت به سایت
          </a>
          <button
            type="button"
            className="pnl-logout-btn"
            onClick={() => setShowLogoutModal(true)}
            title="خروج از حساب کاربری"
          >
            <LogOut size={15} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* ---------- Main ---------- */}
      <main className="pnl-main">
        <div className="pnl-top">
          <div className="pnl-search">
            {I.search}
            <input
              type="text"
              placeholder="جستجو در دوره‌ها، اساتید، تکالیف..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              dir="rtl"
            />
          </div>
          <div className="pnl-user">
            <button className="pnl-iconbtn" aria-label="اعلان‌ها">{I.bell}<span className="dot" /></button>
            <button className="pnl-iconbtn" aria-label="پیام‌ها">{I.mail}</button>
            <button
              className="pnl-avatar"
              aria-label="پروفایل من"
              onClick={() => onNavigate("profile")}
            >
              پ
            </button>
            <button
              type="button"
              className="pnl-top-logout-btn"
              onClick={() => setShowLogoutModal(true)}
              title="خروج از حساب کاربری"
            >
              <LogOut size={15} />
              <span>خروج</span>
            </button>
          </div>
        </div>
        {children}
      </main>

      {/* مودال تأیید خروج از حساب */}
      {showLogoutModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowLogoutModal(false)}>
          <div
            className="auth-modal-card pnl-logout-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="pnl-logout-ic">
              <LogOut size={26} strokeWidth={2.4} />
            </div>
            <h3 className="pnl-logout-title">خروج از حساب کاربری</h3>
            <p className="pnl-logout-desc">
              آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟ برای دسترسی مجدد به دوره‌ها باید دوباره وارد شوید.
            </p>
            <div className="pnl-logout-actions">
              <button
                type="button"
                className="pnl-logout-confirm"
                onClick={handleLogout}
              >
                بله، خروج از حساب
              </button>
              <button
                type="button"
                className="pnl-logout-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export { I as panelIcons };
