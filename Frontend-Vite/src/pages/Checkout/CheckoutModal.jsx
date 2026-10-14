/* ============================================================
   مودال پرداخت و تسویه حساب دوره: Checkout Modal
   جریان خرید آنلاین با پشتیبانی از کد تخفیف، انتخاب درگاه و شبیه‌سازی پرداخت
   دیزاین سیستم رکاد: بوردر ۲.۵px، شدو آفست سخت، رادیوس کات‌کورنر
   ============================================================ */
import { useState, useEffect } from "react";
import { CreditCard, Building2, Lock, CheckCircle2, X, ArrowLeft } from "lucide-react";
import "./checkout.css";
import { validateCoupon, createOrder } from "../../data/panelStore.js";

const GATEWAYS = [
  { id: "zarinpal", name: "درگاه پرداخت زرین‌پال", desc: "کارت‌های عضو شتاب · پرداخت سریع", icon: CreditCard },
  { id: "saman", name: "درگاه پرداخت الکترونیک سامان (سپ)", desc: "دارای نماد اعتماد الکترونیکی شاپرک", icon: Building2 },
];

export default function CheckoutModal({ isOpen, onClose, course }) {
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("zarinpal");
  const [isProcessing, setIsProcessing] = useState(false);

  // پاکسازی وضعیت هنگام باز شدن
  useEffect(() => {
    if (isOpen) {
      setCouponCode("");
      setCouponResult(null);
      setCouponError("");
      setIsProcessing(false);
    }
  }, [isOpen]);

  // قفل اسکرول بدنه و بستن با کلید Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape" && !isProcessing) onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !course) return null;

  // محاسبه قیمت پایه عددی از روی رشته
  const rawPrice = typeof course.price === "number"
    ? course.price
    : parseInt(String(course.price || "2800000").replace(/[^\d]/g, ""), 10) || 2800000;

  const finalAmount = couponResult ? couponResult.finalPrice : rawPrice;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const res = validateCoupon(couponCode, rawPrice);
    if (res.valid) {
      setCouponResult(res);
    } else {
      setCouponError(res.error);
      setCouponResult(null);
    }
  };

  const handleProceedToPayment = () => {
    if (isProcessing) return; // جلوگیری از دابل سابمیت
    setIsProcessing(true);

    const order = createOrder({
      courseSlug: course.slug || "course-" + Date.now(),
      courseTitle: course.title,
      price: rawPrice,
      discountPrice: finalAmount,
      couponCode: couponResult?.code || null,
      teacher: course.teacher?.name || course.teacher || "اساتید کالج رکاد",
      sessions: course.sessions || "۱۲ فصل · ۳۲ ساعت",
    });

    // شبیه‌سازی اتصال به درگاه شاپرک و بازگشت به کال‌بک
    setTimeout(() => {
      onClose();
      window.location.hash = `payment-callback?orderId=${order.id}&status=success`;
    }, 1200);
  };

  return (
    <div className="chk-backdrop" onClick={!isProcessing ? onClose : undefined} role="dialog" aria-modal="true">
      <div className="chk-card" onClick={(e) => e.stopPropagation()}>
        {/* دکمه بستن */}
        {!isProcessing && (
          <button type="button" className="chk-close" onClick={onClose} aria-label="بستن">
            <X size={18} strokeWidth={2.5} />
          </button>
        )}

        <div className="chk-head">
          <span className="chk-pill">تسویه حساب و فعال‌سازی دوره</span>
          <h2 className="chk-title">{course.title}</h2>
          <div className="chk-meta">
            <span>مدرس: <b>{course.teacher?.name || course.teacher || "اساتید کالج رکاد"}</b></span>
            <span>دسترسی: <b>مادام‌العمر به محتوا و پروژه‌ها</b></span>
          </div>
        </div>

        {/* بخش کد تخفیف */}
        <div className="chk-coupon-box">
          <form onSubmit={handleApplyCoupon} className="chk-coupon-form">
            <input
              type="text"
              placeholder="کد تخفیف داری؟ (مثال: ROKAD20 یا NOWRUZ)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isProcessing}
            />
            <button type="submit" disabled={!couponCode.trim() || isProcessing}>
              اعمال کد
            </button>
          </form>

          {couponResult && (
            <div className="chk-coupon-success">
              <CheckCircle2 size={16} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }} />
              کد <b>{couponResult.code}</b> با موفقیت اعمال شد ({couponResult.desc}).
            </div>
          )}

          {couponError && <div className="chk-coupon-error">{couponError}</div>}
        </div>

        {/* انتخاب درگاه پرداخت */}
        <div className="chk-gateways">
          <div className="chk-label">انتخاب درگاه پرداخت امن:</div>
          {GATEWAYS.map((g) => {
            const GatewayIcon = g.icon;
            return (
              <label key={g.id} className={`chk-gateway-item${selectedGateway === g.id ? " active" : ""}`}>
                <input
                  type="radio"
                  name="gateway"
                  value={g.id}
                  checked={selectedGateway === g.id}
                  onChange={() => setSelectedGateway(g.id)}
                  disabled={isProcessing}
                />
                <span className="chk-gw-logo">
                  <GatewayIcon size={20} strokeWidth={2} />
                </span>
                <div className="chk-gw-info">
                  <b>{g.name}</b>
                  <small>{g.desc}</small>
                </div>
              </label>
            );
          })}
        </div>

        {/* فاکتور قیمت */}
        <div className="chk-invoice">
          <div className="chk-row">
            <span>مبلغ دوره:</span>
            <span>{rawPrice.toLocaleString("fa-IR")} تومان</span>
          </div>
          {couponResult && (
            <div className="chk-row discount">
              <span>تخفیف ({couponResult.percent}٪):</span>
              <span>- {couponResult.discountAmount.toLocaleString("fa-IR")} تومان</span>
            </div>
          )}
          <div className="chk-row total">
            <span>مبلغ قابل پرداخت:</span>
            <b>{finalAmount.toLocaleString("fa-IR")} تومان</b>
          </div>
        </div>

        {/* دکمه پرداخت */}
        <div className="chk-actions">
          <button
            type="button"
            className="chk-pay-btn"
            onClick={handleProceedToPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="chk-loading">
                <span className="chk-spinner" />
                در حال انتقال به درگاه شاپرک...
              </span>
            ) : (
              <>
                <span>پرداخت آنلاین و شروع یادگیری</span>
                <ArrowLeft size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
          <small className="chk-security-note">
            <Lock size={14} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }} />
            پرداخت امن با پروتکل رمزنگاری SSL از طریق شبکه شاپرک
          </small>
        </div>
      </div>
    </div>
  );
}
