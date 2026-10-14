import React from "react";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

export default function DashboardOrdersHistory({ orders }) {
  if (!orders || orders.length === 0) return null;

  return (
    <div className="pnl-panel" style={{ marginTop: 24 }}>
      <h4>
        سوابق پرداخت و فاکتورهای دوره‌ها
        <span className="pnl-pill">{toFa(orders.length)} سفارش</span>
      </h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 12,
        }}
      >
        {orders.map((ord) => (
          <div
            key={ord.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              padding: "12px 16px",
              background: "#f8fafc",
              border: "1.5px solid var(--ink)",
              borderRadius: "8px 0 8px 0",
              fontSize: "13px",
            }}
          >
            <div>
              <b style={{ color: "var(--ink)" }}>{ord.courseTitle}</b>
              <div
                style={{
                  fontSize: "11.5px",
                  color: "var(--ink-muted)",
                  marginTop: 2,
                }}
              >
                شناسه: {ord.id} · تاریخ: {ord.createdAt} · درگاه: {ord.gateway}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 800, color: "var(--accent)" }}>
                {ord.paidAmount
                  ? ord.paidAmount.toLocaleString("fa-IR") + " تومان"
                  : "رایگان"}
              </span>
              <span
                style={{
                  padding: "3px 8px",
                  background:
                    ord.status === "paid" ? "var(--teal-light)" : "#fde8e8",
                  color: ord.status === "paid" ? "var(--teal-dark)" : "#9b1c1c",
                  border: "1px solid var(--ink)",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 900,
                }}
              >
                {ord.status === "paid"
                  ? `پرداخت موفق (کد: ${ord.trackingCode || "تایید شده"})`
                  : "در انتظار پرداخت"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
