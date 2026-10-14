"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
  Key,
  RotateCw,
} from "lucide-react";
import { verifyCheckout } from "@/services/enrollmentService";
import { enrollInCourse } from "@/data/panelStore.js";
import "./payment-callback.css";

const SPOTPLAYER_APPS = [
  { name: "ویندوز", os: "Windows", url: "https://dl.spotplayer.ir/spotplayer.exe" },
  { name: "اندروید", os: "Android", url: "https://dl.spotplayer.ir/spotplayer.apk" },
  { name: "مک", os: "macOS", url: "https://dl.spotplayer.ir/spotplayer.dmg" },
  { name: "وب‌پلیر", os: "Web", url: "https://app.spotplayer.ir" },
];

export default function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const authority = searchParams.get("Authority") || searchParams.get("authority");
  const status = searchParams.get("Status") || searchParams.get("status");
  const courseId = searchParams.get("courseId");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (!authority) {
      setLoading(false);
      setError("شناسه پرداخت یافت نشد");
      return;
    }

    if (requestedRef.current) return;
    requestedRef.current = true;

    async function executeVerification() {
      try {
        setLoading(true);
        const res = await verifyCheckout({ authority, status, courseId });
        if (res?.success) {
          setResult(res.data);
          const enrolledCourse = res.data?.enrollment?.course;
          enrollInCourse({
            id: enrolledCourse?._id || courseId,
            _id: enrolledCourse?._id || courseId,
            slug: enrolledCourse?.slug,
            title: res.data?.courseTitle || enrolledCourse?.title,
          });
        } else {
          setError(res?.message || "پرداخت ناموفق بود یا توسط کاربر لغو شد");
        }
      } catch (err) {
        setError(err?.message || "خطا در تایید تراکنش بانکی");
      } finally {
        setLoading(false);
      }
    }

    executeVerification();
  }, [authority, status, courseId]);

  const copyLicenseKey = (key) => {
    if (!key) return;
    try {
      navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // fallback
    }
  };

  const licenseKey =
    result?.spotplayer?.key ||
    result?.enrollment?.spotplayer?.key ||
    result?.enrollment?.spotplayerKey;

  return (
    <div className="pc-page" dir="rtl">
      <div className="pc-card">
        {loading ? (
          <div className="pc-loading-wrap">
            <RotateCw className="w-10 h-10 text-[#f8a41d] animate-spin" />
            <h2 className="pc-title">در حال بررسی و اعتبارسنجی پرداخت</h2>
            <p className="pc-subtitle">لطفاً کمی صبر کنید، در حال استعلام وضعیت تراکنش از شاپرک هستیم...</p>
          </div>
        ) : error ? (
          <div className="pc-card-inner">
            <div className="pc-status-icon error">
              <XCircle className="w-8 h-8" />
            </div>
            <div className="pc-head">
              <h2 className="pc-title">پرداخت ناموفق بود</h2>
              <p className="pc-subtitle">{error}</p>
            </div>
            {authority && (
              <div className="w-full max-w-full">
                <div className="mc-spotplayer-box pc-error-auth-box">
                  <div className="mc-spotplayer-box-info">
                    <Key size={14} className="text-amber-600 flex-shrink-0" />
                    <span className="font-mono text-[11px] sm:text-[12px] truncate select-all">
                      {authority}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="pc-actions">
              <Link
                href={courseId ? `/courses/${courseId}` : "/courses"}
                className="pc-btn-primary"
              >
                تلاش مجدد
              </Link>
              <Link href="/" className="pc-btn-secondary">
                صفحه اصلی
              </Link>
            </div>
          </div>
        ) : (
          <div className="pc-card-inner">
            <div className="pc-status-icon success">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="pc-head">
              <h2 className="pc-title">پرداخت با موفقیت انجام شد</h2>
              <p className="pc-subtitle">ثبت‌نام شما در دوره نهایی و دسترسی صادر گردید.</p>
            </div>

            {/* رسید تراکنش */}
            <div className="pc-receipt-box">
              {result?.courseTitle && (
                <div className="pc-receipt-row">
                  <span className="pc-receipt-label">نام دوره:</span>
                  <span className="pc-receipt-val">{result.courseTitle}</span>
                </div>
              )}
              {result?.refId && (
                <div className="pc-receipt-row">
                  <span className="pc-receipt-label">شماره پیگیری شاپرک:</span>
                  <span className="pc-receipt-val font-mono">{result.refId}</span>
                </div>
              )}
              <div className="pc-receipt-row">
                <span className="pc-receipt-label">وضعیت تراکنش:</span>
                <span className="pc-receipt-pill">
                  <Check size={12} strokeWidth={2.5} />
                  <span>موفق</span>
                </span>
              </div>
              {result?.amount !== undefined && (
                <div className="pc-receipt-row">
                  <span className="pc-receipt-label">مبلغ پرداختی:</span>
                  <span className="pc-receipt-val">
                    {Number(result.amount).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}
            </div>

            {/* بخش اختصاصی لایسنس اسپات‌پلیر */}
            {licenseKey && (
              <div className="pc-license-wrap">
                <div className="pc-license-head">
                  <span className="flex items-center gap-1.5 font-black">
                    <Key size={14} className="text-[#f8a41d]" />
                    <span>کلید فعال‌سازی اسپات‌پلیر</span>
                  </span>
                  <span className="pc-license-badge">
                    <span>اختصاصی</span>
                  </span>
                </div>

                <div className="mc-spotplayer-box">
                  <div className="mc-spotplayer-box-info">
                    <Key size={14} className="text-amber-600 flex-shrink-0" />
                    <span className="font-mono text-[11px] sm:text-[12px] truncate select-all">
                      {licenseKey}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyLicenseKey(licenseKey)}
                    className="mc-copy-key-btn"
                    title="کپی کلید لایسنس"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? "کپی شد" : "کپی"}</span>
                  </button>
                </div>

                {/* دانلود نرم‌افزار اسپات‌پلیر */}
                <div className="pc-apps-section">
                  <div className="pc-apps-title">
                    <Download size={13} />
                    <span>دانلود پخش‌کننده اسپات‌پلیر:</span>
                  </div>
                  <div className="pc-apps-grid">
                    {SPOTPLAYER_APPS.map((app) => (
                      <a
                        key={app.os}
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        className="pc-app-btn"
                      >
                        <span>{app.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* دکمه‌های اقدام نهایی */}
            <div className="pc-actions">
              <Link
                href={
                  result?.enrollment?.course?.slug
                    ? `/courses/${result.enrollment.course.slug}`
                    : courseId
                    ? `/courses/${courseId}`
                    : "/courses"
                }
                className="pc-btn-primary"
              >
                ورود به دوره
              </Link>
              <Link href="/courses" className="pc-btn-secondary">
                دوره‌ها
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
