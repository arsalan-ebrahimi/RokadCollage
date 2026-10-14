import React from "react";
import { Calendar, Check, ArrowLeft } from "lucide-react";
import { toFa } from "./AssignmentRow.jsx";

export default function MentorBookedList({ bookings }) {
  return (
    <div className="pnl-panel" style={{ padding: 24 }}>
      <h3
        style={{
          margin: "0 0 16px",
          fontSize: "17.5px",
          fontWeight: 950,
          color: "var(--navy)",
        }}
      >
        جلسات رزرو شده من
        <span className="pnl-pill">{toFa(bookings.length)} جلسه</span>
      </h3>

      {bookings.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "30px 10px",
            color: "var(--ink-subtle)",
            fontSize: "13.5px",
          }}
        >
          هنوز جلسه‌ای رزرو نکرده‌اید. از فرم روبه‌رو می‌توانید اولین نوبت خود را
          تعیین کنید.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {bookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: "#fff",
                border: "2px solid var(--ink)",
                borderRadius: "10px 0 10px 0",
                padding: 14,
                boxShadow: "3px 3px 0 var(--ink-light)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <b style={{ fontSize: "14px", color: "var(--navy)" }}>
                  {b.mentorName}
                </b>
                <span
                  style={{
                    background: "var(--teal-light)",
                    color: "var(--teal-dark)",
                    border: "1px solid var(--ink)",
                    borderRadius: "4px 0 4px 0",
                    padding: "2px 8px",
                    fontSize: "11.5px",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                  <span>تأیید شده</span>
                </span>
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-subtle)",
                  fontWeight: 700,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Calendar size={14} />
                <span>
                  {b.date} · ساعت {b.time}
                </span>
              </div>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink)",
                  lineHeight: 1.5,
                  margin: "0 0 10px",
                }}
              >
                {b.topic}
              </p>
              <a
                href={b.meetLink}
                target="_blank"
                rel="noreferrer"
                className="pnl-cbtn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  fontSize: "12px",
                  textDecoration: "none",
                }}
              >
                <span>ورود به اتاق جلسه آنلاین</span>
                <ArrowLeft size={13} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
