"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Copy,
  Check,
  Download,
  ExternalLink,
  RotateCw,
  KeyRound,
  ShieldCheck,
  Key,
} from "lucide-react";
import { getCourseLicense, retrySpotPlayerLicense } from "@/services/enrollmentService";
import "./spotplayer-modal.css";

const SPOTPLAYER_APPS = [
  { name: "ویندوز", os: "Windows", url: "https://dl.spotplayer.ir/spotplayer.exe" },
  { name: "اندروید", os: "Android", url: "https://dl.spotplayer.ir/spotplayer.apk" },
  { name: "مک", os: "macOS", url: "https://dl.spotplayer.ir/spotplayer.dmg" },
  { name: "وب‌پلیر", os: "Web", url: "https://app.spotplayer.ir" },
];

export default function SpotPlayerLicenseModal({ isOpen, onClose, courseId, courseTitle }) {
  const [loading, setLoading] = useState(true);
  const [licenseData, setLicenseData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (!isOpen || !courseId) return;

    let isMounted = true;
    setLoading(true);

    getCourseLicense(courseId)
      .then((res) => {
        if (!isMounted) return;
        setLicenseData(res?.spotplayer || res?.data?.spotplayer || null);
      })
      .catch((err) => {
        console.error("Failed to load license:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      isMounted = false;
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, courseId, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const licenseKey = licenseData?.key;
  const isFailed = licenseData?.status === "failed";

  const handleCopy = () => {
    if (!licenseKey) return;
    try {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {}
  };

  const handleRetry = async () => {
    if (retrying || !licenseData?._id) return;
    setRetrying(true);
    try {
      const res = await retrySpotPlayerLicense(licenseData._id);
      if (res?.data?.spotplayer) {
        setLicenseData(res.data.spotplayer);
      }
    } catch (err) {
      console.error("Retry license failed:", err);
    } finally {
      setRetrying(false);
    }
  };

  const modal = (
    <div className="spm-backdrop" onClick={onClose} dir="rtl">
      <div className="spm-card" onClick={(e) => e.stopPropagation()}>
        {/* دکمه بستن */}
        <button
          type="button"
          onClick={onClose}
          className="spm-close-btn"
          aria-label="بستن"
        >
          <X size={18} strokeWidth={2.4} />
        </button>

        {/* هدر مودال */}
        <div className="spm-head">
          <div className="spm-badge">
            <KeyRound size={13} strokeWidth={2.4} />
            <span>لایسنس دوره</span>
          </div>
          <h3 className="spm-title">کلید دسترسی اسپات‌پلیر</h3>
          <p className="spm-subtitle">{courseTitle || "دوره تخصصی کالج رکاد"}</p>
        </div>

        {loading ? (
          <div className="py-14 flex flex-col items-center justify-center gap-3">
            <RotateCw className="w-8 h-8 text-[#f8a41d] animate-spin" />
            <span className="text-xs sm:text-sm font-bold text-stone-600">در حال دریافت کلید لایسنس...</span>
          </div>
        ) : licenseKey ? (
          <div>
            {/* کادر لایسنس */}
            <div className="spm-box">
              <div className="spm-box-head">
                <span>کلید لایسنس اختصاصی شما:</span>
                <span className="spm-status-pill">
                  <ShieldCheck size={14} />
                  <span>فعال و معتبر</span>
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
                  onClick={handleCopy}
                  className="mc-copy-key-btn"
                  title="کپی کلید لایسنس"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "کپی شد" : "کپی"}</span>
                </button>
              </div>
            </div>

            {/* دانلود نرم‌افزار اسپات‌پلیر */}
            <div className="spm-box">
              <div className="spm-apps-title">
                <Download size={14} />
                <span>دانلود نرم‌افزار پخش‌کننده اسپات‌پلیر:</span>
              </div>
              <div className="spm-apps-grid">
                {SPOTPLAYER_APPS.map((app) => (
                  <a
                    key={app.os}
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="spm-app-btn"
                  >
                    <span>{app.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* دکمه‌های اقدام فوتر */}
            <div className="spm-actions">
              <a
                href="https://app.spotplayer.ir"
                target="_blank"
                rel="noreferrer"
                className="spm-btn-webplayer"
              >
                <span>ورود به وب‌پلیر</span>
                <ExternalLink size={15} />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="spm-btn-close"
              >
                بستن
              </button>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center space-y-4">
            <p className="text-sm font-bold text-stone-700">
              {isFailed
                ? "صدور لایسنس با خطا مواجه شد. می‌توانید درخواست صدور مجدد ارسال کنید."
                : "لایسنس در حال پردازش و صدور است."}
            </p>
            {isFailed && (
              <button
                type="button"
                onClick={handleRetry}
                disabled={retrying}
                className="spm-copy-btn"
              >
                {retrying ? "در حال صدور مجدد..." : "تلاش مجدد"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
