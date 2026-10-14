import React, { useState } from "react";
import { Check } from "lucide-react";
import { PhoneIcon, LockIcon, EyeIcon, toFa, sanitizePhone } from "./AuthIcons.jsx";

export default function AuthForgotFlow({
  forgotStep,
  setForgotStep,
  forgotOtp,
  forgotOtpRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  newPass,
  setNewPass,
  confirmPass,
  setConfirmPass,
  showNewPass,
  setShowNewPass,
  showConfirmPass,
  setShowConfirmPass,
  passError,
  setPassError,
  handleForgotSubmit,
  showConfirmModal,
  setShowConfirmModal,
  confirmPasswordReset,
}) {
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotPhoneError, setForgotPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (forgotPhone.length !== 11) {
      setForgotPhoneError("شماره موبایل باید دقیقاً ۱۱ رقم باشد (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");
      return;
    }
    if (!forgotPhone.startsWith("09")) {
      setForgotPhoneError("شماره موبایل باید با ۰۹ شروع شود");
      return;
    }
    setForgotPhoneError("");
    setIsSubmitting(true);
    try {
      const { sendOtp } = await import("@/services/authService");
      await sendOtp(forgotPhone);
      setForgotStep(2);
    } catch (err) {
      setForgotPhoneError(err.message || "خطا در ارسال کد");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="auth-forgot-flow">
      {forgotStep === 1 && (
        <form className="auth-form" onSubmit={handlePhoneSubmit}>
          <label className="auth-field">
            <span className="lbl">
              <PhoneIcon />
              شمارهٔ موبایل حساب کاربری
            </span>
            <input
              type="tel"
              dir="ltr"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              required
              maxLength={11}
              value={toFa(forgotPhone)}
              onChange={(e) => {
                setForgotPhone(sanitizePhone(e.target.value));
                if (forgotPhoneError) setForgotPhoneError("");
              }}
              inputMode="numeric"
            />
          </label>
          {forgotPhoneError && (
            <div className="auth-error-msg" role="alert">
              <span>{forgotPhoneError}</span>
            </div>
          )}
          <button type="submit" className="auth-submit">
            ارسال کد بازیابی
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        </form>
      )}

      {forgotStep === 2 && (
        <form className="auth-form" onSubmit={handleForgotSubmit}>
          <div className="auth-otp-hint">
            <span>کد ۵ رقمی پیامک‌شده را وارد کنید:</span>
            <small>(کد تستی دلخواه یا {toFa(12345)})</small>
          </div>
          <div className="otp-boxes" dir="ltr" onPaste={(e) => handleOtpPaste(e, true)}>
            {[0, 1, 2, 3, 4].map((i) => (
              <input
                key={i}
                ref={(el) => (forgotOtpRefs.current[i] = el)}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={forgotOtp[i] !== "" ? toFa(forgotOtp[i]) : ""}
                onChange={(e) => handleOtpChange(i, e.target.value, true)}
                onKeyDown={(e) => handleOtpKeyDown(i, e, true)}
                aria-label={`رقم ${toFa(i + 1)}`}
              />
            ))}
          </div>


          <label className="auth-field" style={{ marginTop: 6 }}>
            <span className="lbl">
              <LockIcon />
              رمز عبور جدید
            </span>
            <div className="auth-input-wrap">
              <input
                type={showNewPass ? "text" : "password"}
                placeholder="رمز جدید (حداقل ۶ کاراکتر)"
                required
                minLength={6}
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                  if (passError) setPassError("");
                }}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowNewPass((v) => !v)}
                aria-label={showNewPass ? "مخفی‌سازی رمز" : "نمایش رمز"}
              >
                <EyeIcon open={showNewPass} />
              </button>
            </div>
          </label>

          <label className="auth-field">
            <span className="lbl">
              <LockIcon />
              تکرار رمز عبور جدید
            </span>
            <div className="auth-input-wrap">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="تکرار مجدد رمز عبور جدید"
                required
                minLength={6}
                value={confirmPass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  if (passError) setPassError("");
                }}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowConfirmPass((v) => !v)}
                aria-label={showConfirmPass ? "مخفی‌سازی رمز" : "نمایش رمز"}
              >
                <EyeIcon open={showConfirmPass} />
              </button>
            </div>
          </label>

          {passError && (
            <div className="auth-error-msg" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{passError}</span>
            </div>
          )}

          <button type="submit" className="auth-submit">
            ثبت و تأیید رمز جدید
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        </form>
      )}

      {forgotStep === 3 && (
        <div className="auth-success-box">
          <div className="auth-success-icon">
            <Check size={26} strokeWidth={3} />
          </div>
          <b>رمز عبور شما با موفقیت تغییر کرد</b>
          <p>اکنون می‌توانید با رمز عبور جدید خود وارد پنل کاربری شوید.</p>
          <button
            type="button"
            className="auth-submit"
            onClick={() => {
              window.location.hash = "panel";
            }}
          >
            ورود مستقیم به پنل
          </button>
        </div>
      )}

      {showConfirmModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowConfirmModal(false)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="auth-modal-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h4 className="auth-modal-title">اطمینان از تغییر رمز عبور</h4>
            <p className="auth-modal-desc">
              آیا مطمئن هستید که می‌خواهید رمز عبور حساب کاربری خود را به رمز جدید تغییر دهید؟
            </p>
            <div className="auth-modal-actions">
              <button
                type="button"
                className="auth-modal-btn-confirm"
                onClick={confirmPasswordReset}
              >
                بله، رمز تغییر کند
              </button>
              <button
                type="button"
                className="auth-modal-btn-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                انصراف و ویرایش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
