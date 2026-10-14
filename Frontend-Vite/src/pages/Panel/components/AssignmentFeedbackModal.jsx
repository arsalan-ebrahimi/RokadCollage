import React from "react";
import { STATUS } from "./AssignmentRow.jsx";

export default function AssignmentFeedbackModal({
  viewFeedbackAssignment,
  setViewFeedbackAssignment,
}) {
  if (!viewFeedbackAssignment) return null;

  return (
    <div
      className="auth-modal-backdrop"
      onClick={() => setViewFeedbackAssignment(null)}
    >
      <div
        className="auth-modal-card"
        style={{ maxWidth: 460, textAlign: "right" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            margin: "0 0 4px",
            fontSize: "17px",
            fontWeight: 950,
            color: "var(--navy)",
          }}
        >
          جزئیات تکلیف: {viewFeedbackAssignment.title}
        </h3>
        <div
          style={{
            fontSize: "12.5px",
            color: "var(--college-dark)",
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          {viewFeedbackAssignment.course} · وضعیت:{" "}
          {STATUS[viewFeedbackAssignment.status]?.label}
        </div>

        {viewFeedbackAssignment.grade && (
          <div
            style={{
              background: "var(--teal-light)",
              border: "2px solid var(--ink)",
              borderRadius: "8px 0 8px 0",
              padding: "10px 14px",
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <b style={{ color: "var(--teal-dark)", fontSize: "14px" }}>
              نمره نهایی منتور:
            </b>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 950,
                color: "var(--navy)",
              }}
            >
              {viewFeedbackAssignment.grade} از ۲۰
            </span>
          </div>
        )}

        {viewFeedbackAssignment.feedback && (
          <div style={{ marginBottom: 14 }}>
            <b
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--navy)",
                marginBottom: 4,
              }}
            >
              بازخورد و نکات استاد:
            </b>
            <p
              style={{
                background: "var(--bg-lavender, #f3f0ff)",
                padding: "10px 12px",
                border: "1.5px solid var(--ink)",
                borderRadius: "6px 0 6px 0",
                fontSize: "13px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {viewFeedbackAssignment.feedback}
            </p>
          </div>
        )}

        {viewFeedbackAssignment.submission && (
          <div style={{ marginBottom: 14 }}>
            <b
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--navy)",
                marginBottom: 4,
              }}
            >
              پاسخ ارسالی شما:
            </b>
            <div
              style={{
                background: "#f8f9fa",
                padding: "10px 12px",
                border: "1.5px solid var(--ink)",
                borderRadius: "6px 0 6px 0",
                fontSize: "12.5px",
                color: "var(--ink)",
              }}
            >
              <p style={{ margin: "0 0 6px" }}>
                {viewFeedbackAssignment.submission.text}
              </p>
              <small style={{ color: "var(--ink-subtle)" }}>
                فایل: {viewFeedbackAssignment.submission.fileName} (
                {viewFeedbackAssignment.submission.date})
              </small>
            </div>
          </div>
        )}

        <button
          type="button"
          className="pnl-cbtn wide"
          onClick={() => setViewFeedbackAssignment(null)}
        >
          بستن پنجره
        </button>
      </div>
    </div>
  );
}
