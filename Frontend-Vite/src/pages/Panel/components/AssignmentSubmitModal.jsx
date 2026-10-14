import React from "react";
import { FolderOpen, CheckCircle2 } from "lucide-react";
import { toFa } from "./AssignmentRow.jsx";

export default function AssignmentSubmitModal({
  activeModalAssignment,
  setActiveModalAssignment,
  submissionText,
  setSubmissionText,
  submissionFile,
  fileInputRef,
  handleFileChange,
  handleSubmitAssignment,
}) {
  if (!activeModalAssignment) return null;

  return (
    <div
      className="auth-modal-backdrop"
      onClick={() => setActiveModalAssignment(null)}
    >
      <div
        className="auth-modal-card"
        style={{ maxWidth: 480, textAlign: "right" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: "17.5px",
            fontWeight: 950,
            color: "var(--navy)",
          }}
        >
          ارسال پاسخ: {activeModalAssignment.title}
        </h3>
        <div
          style={{
            fontSize: "12.5px",
            color: "var(--college-dark)",
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          {activeModalAssignment.course} · تمرین شماره{" "}
          {toFa(activeModalAssignment.no)}
        </div>
        <p
          style={{
            fontSize: "13px",
            color: "var(--ink-subtle)",
            lineHeight: 1.6,
            margin: "0 0 16px",
          }}
        >
          {activeModalAssignment.description}
        </p>

        <form
          onSubmit={handleSubmitAssignment}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 800,
                marginBottom: 6,
                color: "var(--navy)",
              }}
            >
              توضیحات و یادداشت پاسخ:
            </label>
            <textarea
              rows={4}
              required
              dir="rtl"
              placeholder="توضیحات تکمیلی درباره نحوه پیاده‌سازی یا لینک گیت‌هاب پروژه…"
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "2px solid var(--ink)",
                borderRadius: "8px 0 8px 0",
                fontFamily: "inherit",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 800,
                marginBottom: 6,
                color: "var(--navy)",
              }}
            >
              فایل ضمیمه یا سورس کد (ZIP / PDF / IPYNB):
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept=".zip,.rar,.pdf,.ipynb,.py,.js,.jsx,.ts,.tsx,.png,.jpg"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: "2px dashed var(--ink)",
                padding: "16px",
                borderRadius: "8px 0 8px 0",
                background: submissionFile
                  ? "var(--teal-light)"
                  : "var(--college-light)",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--navy)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {submissionFile ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: "var(--teal-dark)" }}
                    />
                    <span>
                      فایل انتخاب شد: <b>{submissionFile.name}</b>
                    </span>
                  </div>
                  <small
                    style={{ color: "var(--ink-subtle)", fontWeight: 700 }}
                  >
                    حجم: {submissionFile.size} (کلیک برای تغییر فایل)
                  </small>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <FolderOpen size={18} />
                    <span>برای انتخاب یا آپلود فایل پروژه کلیک کنید</span>
                  </div>
                  <small
                    style={{ color: "var(--ink-subtle)", fontWeight: 700 }}
                  >
                    پشتیبانی از فرمت‌های ZIP، PDF، IPYNB و کدهای سورس
                  </small>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button
              type="submit"
              className="pnl-cbtn"
              style={{ flex: 1, padding: "10px" }}
            >
              ثبت نهایی و تحویل
            </button>
            <button
              type="button"
              className="pnl-cbtn ghost"
              style={{ flex: 1, padding: "10px" }}
              onClick={() => setActiveModalAssignment(null)}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
