import React from "react";
import { toFa } from "./AuthIcons.jsx";

export default function AuthOtpForm({
  phone,
  isLogin,
  loginOtp,
  loginOtpRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  onCompleteAuth,
  onBackToForm,
}) {
  return (
    <div className="auth-otp">
      <div className="otp-ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.84.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      <b>کد تایید پیامک شد</b>
      <p>
        کد {toFa(5)} رقمی ارسال‌شده به شمارهٔ {phone ? <b>{toFa(phone)}</b> : "همراهت"} رو وارد کن
        <small style={{ display: "block", marginTop: 4 }}>(کد تستی دلخواه یا {toFa(12345)} را وارد کنید)</small>
      </p>
      <div className="otp-boxes" dir="ltr" onPaste={(e) => handleOtpPaste(e, false)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <input
            key={i}
            ref={(el) => (loginOtpRefs.current[i] = el)}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={loginOtp[i] !== "" ? toFa(loginOtp[i]) : ""}
            onChange={(e) => handleOtpChange(i, e.target.value, false)}
            onKeyDown={(e) => handleOtpKeyDown(i, e, false)}
            aria-label={`رقم ${toFa(i + 1)}`}
          />
        ))}
      </div>
      <button
        type="button"
        className="auth-submit"
        onClick={() => onCompleteAuth()}
      >
        {isLogin ? "تایید و ورود" : "تایید و تکمیل ثبت‌نام"}
      </button>
      <button className="auth-forgot" onClick={onBackToForm}>
        ویرایش شماره موبایل
      </button>
    </div>
  );
}

