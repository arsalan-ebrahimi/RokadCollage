/* ============================================================
   مودال مشاوره رایگان کالج رکاد: Consultation Modal
   طراحی هماهنگ با دیزاین سیستم رکاد:
   بوردر 2.5px ink، شدو آفست سخت 4px 4px، رادیوس کات‌کورنر،
   فرم تعاملی و ثبت آنی درخواست
   ============================================================ */
import { useState, useEffect } from "react";
import { Check, ArrowLeft, X } from "lucide-react";
import "./consultation.css";
import { getPanelStore, createSupportTicket } from "../../data/panelStore.js";

const DEPARTMENTS = [
  { id: "it", title: "فناوری اطلاعات و برنامه‌نویسی", desc: "فرانت‌اند، وردپرس، پایتون، بک‌اند" },
  { id: "design", title: "طراحی و گرافیک دیجیتال", desc: "UI/UX، فتوشاپ، ایلاستریتور، موشن" },
  { id: "business", title: "کسب‌وکار، مدیریت و MBA", desc: "کارآفرینی، مارکتینگ، فروش، رهبری" },
  { id: "languages", title: "زبان‌های خارجی و بین‌الملل", desc: "آیلتس، مکالمه، Business English" },
];

export default function ConsultationModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("it");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // لود نام و شماره در صورت وجود در استور
  useEffect(() => {
    if (isOpen) {
      const s = getPanelStore();
      if (s?.user?.fullName) setName(s.user.fullName);
      setIsSubmitted(false);
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("لطفاً نام و نام خانوادگی خود را وارد کنید.");
      return;
    }
    const cleanPhone = phone.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/\s/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setError("لطفاً شماره تماس معتبر ۱۱ رقمی وارد نمایید.");
      return;
    }

    // ثبت درخواست در استور
    const deptObj = DEPARTMENTS.find((d) => d.id === dept);
    createSupportTicket(
      `درخواست مشاوره رایگان (${deptObj?.title || "عمومی"})`,
      "واحد مشاوره و پذیرش",
      `هنرجو: ${name.trim()} - تماس: ${cleanPhone}\nتوضیحات: ${note.trim() || "درخواست مشاوره جهت انتخاب مسیر آموزشی"}`
    );

    setIsSubmitted(true);
    setError("");
  };

  return (
    <div className="cmod-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmod-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button type="button" className="cmod-close" onClick={onClose} aria-label="بستن">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            <div className="cmod-head">
              <span className="cmod-pill">مشاورهٔ تخصصی و رایگان</span>
              <h2 className="cmod-title">
                برای انتخاب مسیر یادگیری، <span className="cmod-accent">همراهت هستیم</span>
              </h2>
              <p className="cmod-sub">
                فرم زیر را پر کنید تا مشاوران آموزشی کالج رکاد ظرف کمتر از ۲ ساعت کاری با شما تماس بگیرند و مسیر اختصاصی‌تان را مشخص کنند.
              </p>
            </div>

            {error && <div className="cmod-error">{error}</div>}

            <form onSubmit={handleSubmit} className="cmod-form">
              <div className="cmod-field">
                <label>نام و نام خانوادگی <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="مثال: پارسا محمدی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="cmod-field">
                <label>شماره تماس (جهت برقراری تماس) <span className="req">*</span></label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="0912 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="cmod-field">
                <label>حوزه آموزشی مورد علاقه</label>
                <div className="cmod-depts">
                  {DEPARTMENTS.map((d) => (
                    <label key={d.id} className={`cmod-dept-opt${dept === d.id ? " active" : ""}`}>
                      <input
                        type="radio"
                        name="consult-dept"
                        value={d.id}
                        checked={dept === d.id}
                        onChange={() => setDept(d.id)}
                      />
                      <span className="cmod-dept-name">{d.title}</span>
                      <small className="cmod-dept-desc">{d.desc}</small>
                    </label>
                  ))}
                </div>
              </div>

              <div className="cmod-field">
                <label>توضیحات یا سوال شما (اختیاری)</label>
                <textarea
                  rows="2"
                  placeholder="مثال: می‌خواهم بدانم آیا برای شروع فرانت‌اند باید به زبان انگلیسی مسلط باشم؟"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="cmod-foot">
                <button type="submit" className="cmod-submit">
                  <span>ثبت و درخواست مشاوره رایگان</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="cmod-success">
            <div className="cmod-success-badge">
              <Check size={26} strokeWidth={3} />
            </div>
            <h3>درخواست شما با موفقیت ثبت شد!</h3>
            <p>
              کارشناسان پذیرش و مشاوره کالج رکاد ظرف کمتر از ۲ ساعت کاری با شماره <b>{phone}</b> تماس خواهند گرفت.
            </p>
            <div className="cmod-success-info">
              <span>دپارتمان انتخابی: <b>{DEPARTMENTS.find((d) => d.id === dept)?.title}</b></span>
              <span>همچنین وضعیت مشاوره در بخش تیکت‌های پنل کاربری شما ثبت گردید.</span>
            </div>
            <div className="cmod-success-actions">
              <button type="button" className="cmod-submit" onClick={onClose}>
                بستن و ادامه مرور سایت
              </button>
              <button
                type="button"
                className="cmod-btn-ghost"
                onClick={() => {
                  onClose();
                  window.location.hash = "panel/support";
                }}
              >
                مشاهده در پنل کاربری
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
