import React, { useState, useRef, useEffect } from "react";
import "./auth.css";
import Logo from "../../components/Logo.jsx";
import AuthMainForm from "./components/AuthMainForm.jsx";
import AuthOtpForm from "./components/AuthOtpForm.jsx";
import AuthForgotFlow from "./components/AuthForgotFlow.jsx";
import AuthSocialAndGuest from "./components/AuthSocialAndGuest.jsx";
import { loginUser } from "../../data/panelStore.js";
import { toEnDigits, toFa } from "./components/AuthIcons.jsx";
import { getCourseBySlug } from "../CourseSingle/courseData.js";
import { Sparkles, BookOpen, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AuthPage({ initialMode, onLoginSuccess }) {
  const getIsLoginFromHash = () => {
    if (typeof window === "undefined") return true;
    return window.location.hash !== "#auth/register";
  };

  const [isLogin, setIsLogin] = useState(() => {
    if (initialMode) return initialMode !== "register";
    return getIsLoginFromHash();
  });
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "otp" | "forgot"
  const [forgotStep, setForgotStep] = useState(1); // 1: mobile, 2: otp+newpass, 3: success
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Form states
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  // Post-registration celebration modal state
  const [regSuccessModalOpen, setRegSuccessModalOpen] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState(null);

  useEffect(() => {
    // Check saved redirect intent from previous actions (e.g. course bookmark/enroll/panel)
    try {
      const savedRedirect = sessionStorage.getItem("rokad_auth_redirect");
      if (savedRedirect) {
        let courseInfo = null;
        const match = savedRedirect.match(/^(?:course|bootcamp)\/(.+)$/);
        if (match) {
          const c = getCourseBySlug(match[1]);
          if (c) {
            courseInfo = {
              title: c.title,
              hash: `#${savedRedirect}`,
            };
          }
        }
        setRedirectTarget({
          raw: savedRedirect,
          course: courseInfo,
        });
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#auth/register") {
        setIsLogin(false);
      } else if (window.location.hash === "#auth") {
        setIsLogin(true);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // OTP inputs state (array of 5 digits, stored as English 0-9 for logic)
  const [loginOtp, setLoginOtp] = useState(["", "", "", "", ""]);
  const loginOtpRefs = useRef([]);

  const [forgotOtp, setForgotOtp] = useState(["", "", "", "", ""]);
  const forgotOtpRefs = useRef([]);

  // Reset password state
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passError, setPassError] = useState("");

  const handleOtpChange = (index, value, isForgot = false) => {
    // Convert to english digits and only take numeric chars
    const numericOnly = toEnDigits(value).replace(/\D/g, "");
    if (!numericOnly && value !== "") return; // reject non-numeric keys

    const val = numericOnly.slice(-1);
    const setFn = isForgot ? setForgotOtp : setLoginOtp;
    const refs = isForgot ? forgotOtpRefs : loginOtpRefs;

    setFn((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });

    if (val && index < 4) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e, isForgot = false) => {
    const otpArr = isForgot ? forgotOtp : loginOtp;
    const refs = isForgot ? forgotOtpRefs : loginOtpRefs;

    if (e.key === "Backspace" && !otpArr[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e, isForgot = false) => {
    e.preventDefault();
    const raw = e.clipboardData.getData("text");
    const pasted = toEnDigits(raw).replace(/\D/g, "").slice(0, 5);
    if (!pasted) return;

    const setFn = isForgot ? setForgotOtp : setLoginOtp;
    const refs = isForgot ? forgotOtpRefs : loginOtpRefs;

    const arr = pasted.split("");
    setFn((prev) => {
      const next = [...prev];
      arr.forEach((ch, i) => {
        if (i < 5) next[i] = ch;
      });
      return next;
    });
    const focusIdx = Math.min(arr.length, 4);
    refs.current[focusIdx]?.focus();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 11) {
      setFormError("شماره موبایل باید دقیقاً ۱۱ رقم باشد (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");
      return;
    }
    if (!phone.startsWith("09")) {
      setFormError("شماره موبایل باید با ۰۹ شروع شود");
      return;
    }
    if (!isLogin && !fullName.trim()) {
      setFormError("لطفاً نام و نام خانوادگی خود را وارد کنید");
      return;
    }
    if (password.length < 6) {
      setFormError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setFormError("");
    setStep("otp");
  };

  const completeAuth = () => {
    // 1. Log user in store
    loginUser({
      phone: phone || "09123456789",
      name: !isLogin && fullName.trim() ? fullName.trim() : undefined,
    });

    // 2. If it was registration, show the celebration modal
    if (!isLogin) {
      setRegSuccessModalOpen(true);
      return;
    }

    // 3. If login, proceed to custom callback or previous redirect or panel
    proceedToNextPage();
  };

  const proceedToNextPage = (targetOverride = null) => {
    try {
      const savedRedirect = targetOverride || sessionStorage.getItem("rokad_auth_redirect");
      sessionStorage.removeItem("rokad_auth_redirect");
      sessionStorage.removeItem("rokad_auth_msg");

      if (onLoginSuccess) {
        onLoginSuccess();
        return;
      }

      if (savedRedirect) {
        window.location.hash = savedRedirect.startsWith("#") ? savedRedirect : `#${savedRedirect}`;
      } else {
        window.location.hash = "panel";
      }
    } catch (_) {
      window.location.hash = "panel";
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setPassError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }
    if (newPass !== confirmPass) {
      setPassError("تکرار رمز عبور با رمز عبور جدید مطابقت ندارد");
      return;
    }
    setPassError("");
    setShowConfirmModal(true);
  };

  const confirmPasswordReset = () => {
    setShowConfirmModal(false);
    setForgotStep(3);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = "";
    }
  };

  return (
    <div className="auth-page auth-root">
      <div className="auth-pattern" />
      <div className="auth-card">
        <div className="auth-card-top">
          <Logo size={36} />
          <button
            type="button"
            className="auth-close-btn"
            onClick={handleClose}
            aria-label="بازگشت به صفحه اصلی"
            title="بازگشت به صفحه اصلی"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {step !== "forgot" ? (
          <>
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab ${isLogin ? "active on" : ""}`}
                onClick={() => {
                  setIsLogin(true);
                  setStep("form");
                  setFormError("");
                  window.location.hash = "#auth";
                }}
              >
                ورود
              </button>
              <button
                type="button"
                className={`auth-tab ${!isLogin ? "active on" : ""}`}
                onClick={() => {
                  setIsLogin(false);
                  setStep("form");
                  setFormError("");
                  window.location.hash = "#auth/register";
                }}
              >
                ثبت‌نام
              </button>
            </div>

            <div className="auth-header">
              <h1 className="auth-title">
                {isLogin ? "خوش‌آمدید به راکد" : "ایجاد حساب کاربری"}
              </h1>
              <p className="auth-sub">
                {isLogin
                  ? "برای دسترسی به پنل و دوره‌ها وارد شوید"
                  : "به جمع بیش از ۱۰٬۰۰۰ دانشجوی راکد بپیوندید"}
              </p>
            </div>

            {step === "form" && (
              <AuthMainForm
                isLogin={isLogin}
                phone={phone}
                setPhone={setPhone}
                fullName={fullName}
                setFullName={setFullName}
                password={password}
                setPassword={setPassword}
                formError={formError}
                setFormError={setFormError}
                showPass={showPass}
                setShowPass={setShowPass}
                onOpenForgot={() => {
                  setStep("forgot");
                  setForgotStep(1);
                  setPassError("");
                }}
                onSubmit={handleFormSubmit}
              />
            )}

            {step === "otp" && (
              <AuthOtpForm
                phone={phone}
                isLogin={isLogin}
                loginOtp={loginOtp}
                loginOtpRefs={loginOtpRefs}
                handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown}
                handleOtpPaste={handleOtpPaste}
                onCompleteAuth={completeAuth}
                onBackToForm={() => setStep("form")}
              />
            )}

            {step === "form" && <AuthSocialAndGuest />}
          </>
        ) : (
          <>
            <div className="auth-header" style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h1 className="auth-title" style={{ margin: 0, fontSize: "1.2rem" }}>
                  بازیابی رمز عبور
                </h1>
                <button
                  type="button"
                  className="auth-back-btn"
                  onClick={() => {
                    setStep("form");
                    setForgotStep(1);
                  }}
                  aria-label="بازگشت"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span>بازگشت</span>
                </button>
              </div>
              <p className="auth-sub">
                {forgotStep === 1 && "شماره موبایل خود را وارد کنید تا کد تایید ارسال شود"}
                {forgotStep === 2 && "کد پیامک‌شده و رمز جدید را تعیین کنید"}
                {forgotStep === 3 && "رمز عبور با موفقیت به‌روزرسانی شد"}
              </p>
            </div>

            <AuthForgotFlow
              forgotStep={forgotStep}
              setForgotStep={setForgotStep}
              forgotOtp={forgotOtp}
              forgotOtpRefs={forgotOtpRefs}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              handleOtpPaste={handleOtpPaste}
              newPass={newPass}
              setNewPass={setNewPass}
              confirmPass={confirmPass}
              setConfirmPass={setConfirmPass}
              showNewPass={showNewPass}
              setShowNewPass={setShowNewPass}
              showConfirmPass={showConfirmPass}
              setShowConfirmPass={setShowConfirmPass}
              passError={passError}
              setPassError={setPassError}
              handleForgotSubmit={handleForgotSubmit}
              showConfirmModal={showConfirmModal}
              setShowConfirmModal={setShowConfirmModal}
              confirmPasswordReset={confirmPasswordReset}
            />
          </>
        )}
      </div>

      {/* ---------- مودال تبریک ثبت‌نام و هدایت ---------- */}
      {regSuccessModalOpen && (
        <div className="auth-modal-backdrop">
          <div className="auth-modal-card auth-reg-success-card" role="dialog" aria-modal="true">
            <span className="auth-reg-success-badge">
              <Sparkles size={14} />
              ثبت‌نام با موفقیت انجام شد
            </span>

            <div className="auth-reg-success-ic">
              <CheckCircle2 size={34} strokeWidth={2.4} />
            </div>

            <h3 className="auth-reg-success-title">
              تبریک {fullName ? `${fullName} عزیز` : "دوست راکدی"}! 🎉
            </h3>
            <p className="auth-reg-success-desc">
              حساب کاربری شما در کالج رکاد ایجاد شد. حالا به جمع ده‌ها هزار دانشجوی خلاق پیوستید.
            </p>

            {redirectTarget?.course ? (
              <>
                <div className="auth-reg-target-box">
                  <BookOpen size={18} />
                  <span>دورهٔ انتخابی شما: <b>{redirectTarget.course.title}</b></span>
                </div>
                <div className="auth-reg-actions">
                  <button
                    type="button"
                    className="auth-reg-primary-btn"
                    onClick={() => {
                      setRegSuccessModalOpen(false);
                      proceedToNextPage(redirectTarget.raw);
                    }}
                  >
                    <span>بازگشت و ثبت‌نام در دوره</span>
                    <ArrowLeft size={16} strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    className="auth-reg-secondary-btn"
                    onClick={() => {
                      setRegSuccessModalOpen(false);
                      proceedToNextPage("courses-index");
                    }}
                  >
                    مشاهده سایر دوره‌ها
                  </button>
                </div>
              </>
            ) : redirectTarget?.raw ? (
              <div className="auth-reg-actions">
                <button
                  type="button"
                  className="auth-reg-primary-btn"
                  onClick={() => {
                    setRegSuccessModalOpen(false);
                    proceedToNextPage(redirectTarget.raw);
                  }}
                >
                  <span>ادامه فرایند قبلی</span>
                  <ArrowLeft size={16} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  className="auth-reg-secondary-btn"
                  onClick={() => {
                    setRegSuccessModalOpen(false);
                    proceedToNextPage("courses-index");
                  }}
                >
                  مشاهده دوره‌ها
                </button>
              </div>
            ) : (
              <div className="auth-reg-actions">
                <button
                  type="button"
                  className="auth-reg-primary-btn"
                  onClick={() => {
                    setRegSuccessModalOpen(false);
                    proceedToNextPage("courses-index");
                  }}
                >
                  <BookOpen size={16} strokeWidth={2.4} />
                  <span>مشاهده و انتخاب دوره‌ها</span>
                </button>
                <button
                  type="button"
                  className="auth-reg-secondary-btn"
                  onClick={() => {
                    setRegSuccessModalOpen(false);
                    proceedToNextPage("panel");
                  }}
                >
                  ورود به پنل کاربری
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

