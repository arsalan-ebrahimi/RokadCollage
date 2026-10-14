import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../../Logo.jsx";
import { logoutUser } from "../../../data/panelStore.js";
import { BookOpen, UserCog, LogOut } from "lucide-react";

const ROTS = [-1, 0.5, -0.5, 1, -1, 0.5];

export default function MobileDrawer({
  mobileOpen,
  setMobileOpen,
  links,
  setActive,
  store,
  user,
  onRequestLogout,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setMobileOpen(false);
    if (onRequestLogout) {
      onRequestLogout();
    }
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
        {mounted && store.auth?.isLoggedIn ? (
          <>
            <div style={{ display: "flex", gap: 8, width: "100%" }}>
              <Link
                href="/my-courses"
                className="hb1-cta"
                style={{
                  flex: 1,
                  background: "var(--white)",
                  color: "var(--navy)",
                  borderColor: "var(--ink)",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  textDecoration: "none",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  padding: "11px 6px",
                  fontSize: 12,
                }}
                onClick={() => setMobileOpen(false)}
              >
                <BookOpen size={15} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: "nowrap" }}>دوره‌های من</span>
              </Link>
              <Link
                href="/profile"
                className="hb1-cta"
                style={{
                  flex: 1,
                  background: "var(--white)",
                  color: "var(--navy)",
                  borderColor: "var(--ink)",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  textDecoration: "none",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  padding: "11px 6px",
                  fontSize: 12,
                }}
                onClick={() => setMobileOpen(false)}
              >
                <UserCog size={15} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: "nowrap" }}>تنظیمات پروفایل</span>
              </Link>
            </div>
            <button
              type="button"
              className="hb1-cta"
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                borderColor: "#dc2626",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>خروج از حساب</span>
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
    </div>
  );
}

