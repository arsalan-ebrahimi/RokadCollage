/* ============================================================
   صفحه بازگشت از درگاه پرداخت: Payment Callback
   تاییدیه سمت سرور/استور از وضعیت پرداخت (جلوگیری از جعل وضعیت با URL)
   دیزاین سیستم رکاد: کارت فاکتور نئوبروتالیست با پرفراژ و امضای الکترونیک
   ============================================================ */
import { useEffect, useState } from "react";
import { Check, X, ArrowLeft } from "lucide-react";
import PatternLayer from "../../components/PatternLayer";
import { verifyAndCompleteOrder, getOrderById } from "../../data/panelStore.js";
import "./paymentCallback.css";

export default function PaymentCallback() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // خواندن orderId از پارامترهای هش
    const hashStr = window.location.hash || "";
    const match = hashStr.match(/orderId=([^&]+)/);
    const orderId = match ? decodeURIComponent(match[1]) : null;

    if (!orderId) {
      setResult({ success: false, error: "شناسه سفارش نامعتبر است یا پرداخت لغو شد." });
      setLoading(false);
      return;
    }

    // اعتبارسنجی مستقل از استور (عدم اعتماد صرف به query param)
    const verification = verifyAndCompleteOrder(orderId);
    setResult(verification);
    setLoading(false);
  }, []);

  return (
    <main className="pay-cb-page">
      <PatternLayer rotate={0} />
      <div className="container pay-cb-container">
        {loading ? (
          <div className="pay-cb-loading">
            <div className="pay-cb-spinner" />
            <h2>در حال استعلام وضعیت پرداخت از شاپرک...</h2>
            <p>لطفاً شکیبا باشید، در حال اتصال به سامانه مرکزی پرداخت هستیم.</p>
          </div>
        ) : result?.success ? (
          <div className="pay-cb-card success">
            <div className="pay-cb-badge success">
              <Check size={26} strokeWidth={3} />
            </div>
            <span className="pay-cb-pill">تراکنش موفق</span>
            <h1 className="pay-cb-title">پرداخت با موفقیت انجام شد!</h1>
            <p className="pay-cb-sub">
              دورهٔ <b>«{result.order?.courseTitle || result.course?.title}»</b> برای شما فعال گردید و هم‌اکنون در پنل کاربری در دسترس است.
            </p>

            {/* فاکتور چاپی */}
            <div className="pay-cb-receipt">
              <div className="pay-cb-row">
                <span>شناسه سفارش:</span>
                <b>{result.order?.id}</b>
              </div>
              <div className="pay-cb-row">
                <span>کد پیگیری شاپرک:</span>
                <b>{result.order?.trackingCode}</b>
              </div>
              <div className="pay-cb-row">
                <span>مبلغ پرداختی:</span>
                <b>{result.order?.paidAmount?.toLocaleString("fa-IR")} تومان</b>
              </div>
              <div className="pay-cb-row">
                <span>تاریخ و ساعت:</span>
                <span>{result.order?.paidAt || "همین حالا"}</span>
              </div>
              <div className="pay-cb-row">
                <span>درگاه پرداخت:</span>
                <span>{result.order?.gateway || "شاپرک"}</span>
              </div>
            </div>

            <div className="pay-cb-actions">
              <button
                type="button"
                className="pay-cb-btn primary"
                onClick={() => { window.location.hash = "panel/courses"; }}
              >
                <span>ورود به کلاس و شروع یادگیری</span>
                <ArrowLeft size={16} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                className="pay-cb-btn ghost"
                onClick={() => {
                  const targetSlug = result.order?.courseSlug;
                  window.location.hash = targetSlug ? `course/${targetSlug}` : "panel/courses";
                }}
              >
                مشاهده صفحه دوره
              </button>
            </div>
          </div>
        ) : (
          <div className="pay-cb-card failed">
            <div className="pay-cb-badge failed">
              <X size={26} strokeWidth={3} />
            </div>
            <span className="pay-cb-pill failed">پرداخت ناموفق</span>
            <h1 className="pay-cb-title">تراکنش انجام نشد یا توسط کاربر لغو گردید</h1>
            <p className="pay-cb-sub">
              {result?.error || "اگر مبلغی از حساب شما کسر شده است، ظرف حداکثر ۷۲ ساعت آینده از سوی بانک به حسابتان بازخواهد گشت."}
            </p>

            <div className="pay-cb-actions">
              <button
                type="button"
                className="pay-cb-btn primary"
                onClick={() => { window.history.back(); }}
              >
                تلاش مجدد برای پرداخت
              </button>
              <button
                type="button"
                className="pay-cb-btn ghost"
                onClick={() => { window.location.hash = "courses-index"; }}
              >
                مشاهده سایر دوره‌ها
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
