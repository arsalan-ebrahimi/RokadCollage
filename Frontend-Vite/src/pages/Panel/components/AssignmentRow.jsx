import React from "react";
import { CheckCircle2 } from "lucide-react";

const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

export const STATUS = {
  open: { label: "باز", cls: "open" },
  late: { label: "در حال گذشتن مهلت", cls: "late" },
  done: { label: "تحویل‌شده", cls: "done" },
  graded: { label: "نمره‌داده‌شده", cls: "graded" },
};

export default function AssignmentRow({
  a,
  onOpenSubmit,
  onOpenFeedback,
}) {
  const st = STATUS[a.status];
  return (
    <div className={`pnl-asn${a.status === "late" ? " urgent" : ""}`}>
      <div className={`pnl-asn-ic ${st.cls}`}>
        {a.status === "graded" ? (
          <span className="grade">{a.grade}</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {a.status === "done" ? (
              <polyline points="20 6 9 17 4 12" />
            ) : (
              <>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
              </>
            )}
          </svg>
        )}
      </div>
      <div className="body">
        <b>{a.title}</b>
        <div className="m">
          {a.course} · {a.due} · تمرین {toFa(a.no)}
        </div>
        {a.status === "graded" && (
          <div
            className="graded-note"
            style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <CheckCircle2 size={13} style={{ color: "var(--teal-dark)" }} />
            <span>بازخورد منتور ثبت شد (نمره: {a.grade})</span>
          </div>
        )}
        {a.status === "done" && (
          <div
            className="graded-note"
            style={{
              color: "var(--teal-dark)",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CheckCircle2 size={13} />
            <span>پاسخ شما با موفقیت ارسال شده است.</span>
          </div>
        )}
      </div>
      <div className="side">
        <span className={`pnl-chip ${st.cls}`}>{st.label}</span>
        {a.status === "open" && (
          <button className="pnl-cbtn" onClick={() => onOpenSubmit(a)}>
            شروع و ارسال
          </button>
        )}
        {a.status === "late" && (
          <button className="pnl-cbtn" onClick={() => onOpenSubmit(a)}>
            فوری تحویل بده
          </button>
        )}
        {(a.status === "done" || a.status === "graded") && (
          <button
            className="pnl-cbtn ghost"
            onClick={() => onOpenFeedback(a)}
          >
            مشاهدهٔ جزئیات
          </button>
        )}
      </div>
    </div>
  );
}
