import React, { useState } from "react";
import Logo from "../../Logo.jsx";
import { logoutUser } from "../../../data/panelStore.js";
import { LogOut } from "lucide-react";

const ROTS = [-1, 0.5, -0.5, 1, -1, 0.5];

export default function MobileDrawer({
  mobileOpen,
  setMobileOpen,
  links,
  setActive,
  store,
  user,
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setMobileOpen(false);
    logoutUser();
    window.location.hash = "";
  };

  return (
    <div className={`hb1-panel ${mobileOpen ? "hb1-panel--open" : ""}`}>
      <div className="hb1-panel-head">
        <Logo size={28} />
        <button
          className="hb1-close"
          onClick={() => setMobileOpen(false)}
          aria-label="بستن"
        >
          ×
        </button>
      </div>

      <ul className="hb1-list">
        {links.map((l, i) => (
          <li key={i}>
            <a
              href={l.href}
              onClick={() => {
                setActive(i);
                setMobileOpen(false);
              }}
              style={{ transform: `rotate(${ROTS[i]}deg)` }}
            >
              {l.t}
            </a>
            <span className="hb1-chev">‹</span>
          </li>
        ))}
      </ul>

      <div
        className="hb1-actions"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {store.auth?.isLoggedIn ? (
          <>
            <a
              href="#panel"
              className="hb1-cta"
              style={{
                background: "var(--college-light)",
                color: "var(--college-darker)",
                borderColor: "var(--ink)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              پنل کاربری ({user?.firstName || "هنرجو"})
            </a>
            <button
              type="button"
              className="hb1-cta"
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                borderColor: "#dc2626",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onClick={() => setShowLogoutConfirm(true)}
            >
              خروج از حساب
            </button>
          </>
        ) : (
          <a
            href="#auth"
            className="hb1-cta"
            style={{
              background: "var(--white)",
              color: "var(--navy)",
              borderColor: "var(--navy)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            ورود / ثبت‌نام
          </a>
        )}
        <a
          href="#consult"
          className="hb1-cta"
          onClick={() => setMobileOpen(false)}
        >
          مشاورهٔ رایگان
        </a>
      </div>

      {/* مودال تأیید خروج در موبایل */}
      {showLogoutConfirm && (
        <div className="auth-modal-backdrop" onClick={() => setShowLogoutConfirm(false)}>
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
              آیا برای خروج از حساب کاربری خود اطمینان دارید؟
            </p>
            <div className="pnl-logout-actions">
              <button
                type="button"
                className="pnl-logout-confirm"
                onClick={handleConfirmLogout}
              >
                بله، خروج از حساب
              </button>
              <button
                type="button"
                className="pnl-logout-cancel"
                onClick={() => setShowLogoutConfirm(false)}
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

