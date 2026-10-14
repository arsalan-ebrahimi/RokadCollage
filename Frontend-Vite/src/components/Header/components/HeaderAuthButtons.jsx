import React, { useState, useRef, useEffect } from "react";
import { logoutUser } from "../../../data/panelStore.js";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";

export default function HeaderAuthButtons({ user, store, unreadCount }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setDropdownOpen(false);
    logoutUser();
    window.location.hash = "";
  };

  const handleGoPanel = (e) => {
    e.preventDefault();
    setDropdownOpen(false);
    window.location.hash = "panel";
  };

  return (
    <>
      {user && store.auth?.isLoggedIn ? (
        <div className="header-user-wrapper desktop-only" ref={dropdownRef}>
          <button
            type="button"
            className={`header-user-trigger ${dropdownOpen ? "open" : ""}`}
            onClick={() => setDropdownOpen((v) => !v)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            title="منوی حساب کاربری"
          >
            <span className="header-user-avatar">
              {user.initial || user.firstName?.charAt(0) || "پ"}
            </span>
            <span className="header-user-name">
              {user.fullName || user.firstName || "حساب کاربری"}
            </span>
            {unreadCount > 0 && (
              <span className="header-user-badge">
                {unreadCount}
              </span>
            )}
            <ChevronDown className="header-user-chevron" />
          </button>

          {dropdownOpen && (
            <div className="header-user-dropdown" role="menu">
              <a
                href="#panel"
                className="header-dropdown-item"
                onClick={handleGoPanel}
                role="menuitem"
              >
                <LayoutDashboard size={16} />
                <span>پنل من</span>
              </a>

              <a
                href="#panel/profile"
                className="header-dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  window.location.hash = "panel/profile";
                }}
                role="menuitem"
              >
                <User size={16} />
                <span>پروفایل و تنظیمات</span>
              </a>

              <div className="header-dropdown-divider" />

              <button
                type="button"
                className="header-dropdown-item header-dropdown-logout"
                onClick={() => {
                  setDropdownOpen(false);
                  setShowLogoutConfirm(true);
                }}
                role="menuitem"
              >
                <LogOut size={16} />
                <span>خروج از حساب</span>
              </button>
            </div>
          )}

          {/* مودال تأیید خروج در هدر */}
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
      ) : (
        <a href="#auth" className="login-pill desktop-only">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
          </svg>
          ورود / ثبت‌نام
        </a>
      )}
      <a href="#consult" className="cta-pill desktop-only">
        مشاورهٔ رایگان
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </a>
    </>
  );
}

