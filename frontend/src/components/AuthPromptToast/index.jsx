import { useState, useEffect } from "react";
import { Bookmark, UserPlus, X, ArrowLeft } from "lucide-react";

export default function AuthPromptToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("برای ذخیره دوره‌ها، لطفاً ابتدا در کالج ثبت‌نام کنید.");

  useEffect(() => {
    let timer = null;
    const handler = (e) => {
      const msg = e.detail?.message || "برای ذخیره دوره‌ها، لطفاً ابتدا در کالج ثبت‌نام کنید.";
      setMessage(msg);
      setVisible(true);

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setVisible(false);
      }, 7000);
    };

    window.addEventListener("rokad_auth_required", handler);
    return () => {
      window.removeEventListener("rokad_auth_required", handler);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  const handleGoRegister = () => {
    try {
      sessionStorage.setItem("rokad_auth_msg", message);
      sessionStorage.setItem("rokad_auth_redirect", window.location.hash.replace(/^#/, "") || "courses-index");
    } catch (_) {}
    setVisible(false);
    window.location.hash = "#auth/register";
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: "fixed",
        bottom: 24,
        right: "50%",
        transform: "translateX(50%)",
        zIndex: 99999,
        maxWidth: "92vw",
        width: 520,
        background: "#FFFDF7",
        border: "2.5px solid var(--ink, #18181B)",
        borderRadius: 14,
        padding: "14px 18px",
        boxShadow: "5px 5px 0 var(--ink, #18181B)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        animation: "authToastSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fontFamily: "inherit",
        direction: "rtl",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#FFF0D4",
            border: "1.8px solid var(--ink, #18181B)",
            boxShadow: "2px 2px 0 var(--ink, #18181B)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            color: "#B45309",
          }}
        >
          <Bookmark size={20} strokeWidth={2.4} fill="#FDE68A" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--ink, #18181B)", lineHeight: 1.45 }}>
            {message}
          </div>
          <div style={{ fontSize: "12px", color: "var(--ink-subtle, #71717A)", marginTop: 2, fontWeight: 500 }}>
            با ساخت حساب رایگان، دوره‌ها را نشان کرده و در پنل مدیریت کنید.
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button
          type="button"
          onClick={handleGoRegister}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--accent, #F8A41D)",
            color: "var(--ink, #18181B)",
            border: "2px solid var(--ink, #18181B)",
            borderRadius: 9,
            padding: "8px 14px",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "2px 2px 0 var(--ink, #18181B)",
            transition: "all 0.15s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-1px, -1px)";
            e.currentTarget.style.boxShadow = "3px 3px 0 var(--ink, #18181B)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "2px 2px 0 var(--ink, #18181B)";
          }}
        >
          <UserPlus size={15} strokeWidth={2.4} />
          <span>ثبت‌نام</span>
        </button>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="بستن پیام"
          style={{
            background: "transparent",
            border: "none",
            color: "var(--ink-subtle, #71717A)",
            cursor: "pointer",
            padding: 4,
            display: "grid",
            placeItems: "center",
            borderRadius: 6,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink, #18181B)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-subtle, #71717A)"; }}
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
