import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logoutUser } from "../../../data/panelStore.js";
import { ChevronDown, LogOut, BookOpen, UserCog, User } from "lucide-react";

export default function HeaderAuthButtons({ user, store, unreadCount, onRequestLogout }) {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleLogout = () => {
    setDropdownOpen(false);
    if (onRequestLogout) {
      onRequestLogout();
    }
  };

  if (!mounted) {
    return (
      <>
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
            style={{ padding: "5px 8px", gap: 6 }}
          >
            <span className="header-user-avatar">
              <User size={14} strokeWidth={2.4} />
            </span>
            <ChevronDown className="header-user-chevron" />
          </button>

          {dropdownOpen && (
            <div className="header-user-dropdown" role="menu">
              <Link
                href="/my-courses"
                className="header-dropdown-item"
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
              >
                <BookOpen size={16} />
                <span>دوره‌های من</span>
              </Link>
              <Link
                href="/profile"
                className="header-dropdown-item"
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
              >
                <UserCog size={16} />
                <span>تنظیمات پروفایل</span>
              </Link>
              <div style={{ height: 1, background: "var(--ink-light)", margin: "4px 0" }} />
              <button
                type="button"
                className="header-dropdown-item header-dropdown-logout"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={16} />
                <span>خروج از حساب</span>
              </button>
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

