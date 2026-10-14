import React from "react";
import { PhoneIcon, LockIcon, EyeIcon, sanitizePhone, toFa } from "./AuthIcons.jsx";

export default function AuthMainForm({
  isLogin,
  phone,
  setPhone,
  fullName,
  setFullName,
  password,
  setPassword,
  formError,
  setFormError,
  showPass,
  setShowPass,
  onOpenForgot,
  onSubmit,
}) {
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const sanitized = sanitizePhone(raw);
    setPhone(sanitized);
    if (formError) setFormError("");
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="auth-field">
        <span className="lbl">
          <PhoneIcon />
          شمارهٔ موبایل
        </span>
        <input
          type="tel"
          dir="ltr"
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          required
          maxLength={11}
          value={toFa(phone)}
          onChange={handlePhoneChange}
          inputMode="numeric"
          autoComplete="tel"
        />
        <span className="auth-field-hint" style={{ fontSize: "11px", color: "var(--ink-subtle)", textAlign: "right" }}>
          {phone.length > 0 && `تعداد ارقام: ${toFa(phone.length)} از ۱۱ رقم`}
        </span>
      </label>

      {!isLogin && (
        <label className="auth-field">
          <span className="lbl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            نام و نام خانوادگی
          </span>
          <input
            type="text"
            placeholder="مثلاً پارسا محمدی"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (formError) setFormError("");
            }}
          />
        </label>
      )}

      <label className="auth-field">
        <span className="lbl">
          <LockIcon />
          رمز عبور
        </span>
        <div className="auth-input-wrap">
          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            required
            minLength={6}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formError) setFormError("");
            }}
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "مخفی‌سازی رمز" : "نمایش رمز"}
          >
            <EyeIcon open={showPass} />
          </button>
        </div>
      </label>

      {formError && (
        <div className="auth-error-msg" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {isLogin && (
        <button
          type="button"
          className="auth-forgot"
          onClick={onOpenForgot}
        >
          فراموشی رمز عبور؟
        </button>
      )}

      <button type="submit" className="auth-submit">
        {isLogin ? "ورود به حساب" : "ساخت حساب جدید"}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>
    </form>
  );
}

