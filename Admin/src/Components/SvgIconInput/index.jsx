// ==========================================
// Component: SvgIconInput
// Dual-mode course icon picker supporting direct SVG code paste
// with live preview & references (Heroicons, Boxicons, etc.) and file upload.
// ==========================================

import React, { useState, useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CodeIcon from "@mui/icons-material/Code";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ImageUpload from "../UI/ImageUpload";

export function SvgIconInput({
  value,
  onChange,
  error = null,
  initialPreview = null,
}) {
  // Determine default tab: if existing value is raw SVG (starts with '<'), choose 'code', otherwise 'upload'
  const isExistingRawSvg = typeof value === "string" && value.trim().startsWith("<");
  const [activeTab, setActiveTab] = useState(isExistingRawSvg || !initialPreview ? "code" : "upload");
  const [svgCode, setSvgCode] = useState(isExistingRawSvg ? value : "");
  const [filePreview, setFilePreview] = useState(initialPreview || null);

  useEffect(() => {
    if (typeof value === "string" && value.trim().startsWith("<")) {
      setSvgCode(value);
      setActiveTab("code");
    }
  }, [value]);

  const isValidSvg = (str) => {
    if (!str || typeof str !== "string") return false;
    const trimmed = str.trim();
    return trimmed.startsWith("<svg") && trimmed.endsWith("</svg>");
  };

  const handleSvgCodeChange = (e) => {
    const code = e.target.value;
    setSvgCode(code);
    onChange(code);
  };

  const handleFileSelect = (file) => {
    setFilePreview(URL.createObjectURL(file));
    onChange(file);
  };

  const resourceLinks = [
    {
      name: "Heroicons",
      url: "https://heroicons.com",
      badge: "پیشنهادی",
      desc: "آیکون‌های استاندارد و مینیمال — کافیست روی هر آیکون بزنید و Copy SVG را انتخاب کنید.",
    },
    {
      name: "Boxicons",
      url: "https://boxicons.com",
      badge: "کامل‌ترین",
      desc: "هزاران آیکون باکیفیت؛ روی آیکون کلیک کرده، تب SVG را بزنید و Copy کنید.",
    },
    {
      name: "Lucide Icons",
      url: "https://lucide.dev/icons",
      badge: "مدرن",
      desc: "آیکون‌های وکتور تمیز؛ دکمه Copy SVG را کلیک کنید.",
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full text-right">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs md:text-sm font-semibold text-text-primary select-none">
          آیکون دوره آموزشی (SVG)
        </label>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-bg-light p-1 rounded-xl border border-border/80">
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "code"
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:text-secondary"
            }`}
          >
            <CodeIcon style={{ fontSize: "1rem" }} />
            <span>درج مستقیم کد SVG (پیشنهادی)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "upload"
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:text-secondary"
            }`}
          >
            <CloudUploadIcon style={{ fontSize: "1rem" }} />
            <span>آپلود فایل SVG</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Direct SVG Code Paste */}
      {activeTab === "code" && (
        <div className="flex flex-col gap-4 bg-bg-light/40 p-4 md:p-5 rounded-2xl border border-border/80">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            {/* Input Textarea */}
            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary">
                کد تگ SVG کپی‌شده را اینجا قرار دهید:
              </label>
              <textarea
                rows={4}
                dir="ltr"
                value={svgCode}
                onChange={handleSvgCodeChange}
                placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"> ... </svg>'
                className="w-full text-xs font-mono p-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-surface transition-all placeholder:text-text-muted resize-y"
              />
              <span className="text-[11px] text-text-muted">
                تگ باید با &lt;svg شروع شده و با &lt;/svg&gt; پایان یابد.
              </span>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="flex flex-col items-center justify-center p-4 bg-surface rounded-xl border border-border min-h-[135px]">
              <span className="text-xs font-bold text-text-secondary mb-2 select-none">
                پیش‌نمایش زنده آیکون
              </span>

              {isValidSvg(svgCode) ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light border border-primary-border flex items-center justify-center p-2.5 text-primary shadow-xs">
                    <div
                      className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                      dangerouslySetInnerHTML={{ __html: svgCode.trim() }}
                    />
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-success font-bold">
                    <CheckCircleOutlineIcon style={{ fontSize: "0.95rem" }} />
                    <span>کد SVG معتبر است</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1.5 text-center text-text-muted">
                  <div className="w-12 h-12 rounded-2xl bg-bg-light border border-dashed border-border flex items-center justify-center">
                    <CodeIcon fontSize="small" />
                  </div>
                  <span className="text-[11px]">
                    {svgCode.trim() ? "کد SVG هنوز کامل نیست" : "پیش‌نمایش پس از درج کد نمایان می‌شود"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Icon Resources & References Links */}
          <div className="border-t border-border/60 pt-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
              <span>🌐 مراجع پیشنهادی جهت دریافت رایگان کُد SVG:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {resourceLinks.map((res) => (
                <a
                  key={res.name}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-col p-2.5 rounded-xl border border-border/80 bg-surface hover:border-primary hover:bg-primary-light/30 transition-all group select-none"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-secondary text-xs group-hover:text-primary transition-colors flex items-center gap-1">
                      {res.name}
                      <OpenInNewIcon style={{ fontSize: "0.85rem" }} className="text-text-muted group-hover:text-primary" />
                    </span>
                    <span className="text-[10px] bg-bg-light text-text-muted px-1.5 py-0.5 rounded font-medium">
                      {res.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                    {res.desc}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-1 bg-primary-light/60 border border-primary-border/60 px-3 py-2 rounded-xl text-[11px] text-text-secondary leading-relaxed flex items-center gap-2">
              <span className="text-primary font-bold text-sm shrink-0">💡 راهنما:</span>
              <span>
                کافیست وارد یکی از سایت‌های بالا شوید، آیکون دلخواه خود را جستجو کرده و روی <strong>Copy SVG</strong> کلیک کنید؛ سپس در کادر بالا <strong>Paste</strong> کنید.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Classic File Upload */}
      {activeTab === "upload" && (
        <div className="bg-bg-light/40 p-4 rounded-2xl border border-border/80">
          <ImageUpload
            label=""
            imagePreview={filePreview}
            onChange={handleFileSelect}
            isSvgOnly={true}
            placeholder="جهت آپلود فایل وکتور SVG دوره کلیک کنید"
          />
        </div>
      )}

      {error && (
        <span className="text-xs text-error font-medium animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
}

export default SvgIconInput;
