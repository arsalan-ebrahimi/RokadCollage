import React from "react";

const CheckGlyph = () => (
  <span className="verified" aria-label="حساب تأییدشده">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

export default function ProfileIdentityCard({ user }) {
  return (
    <div>
      <div className="pnl-prof">
        <div className="pnl-cover">
          <img src="/assets/Hero/Hero-Pattern.png" alt="" aria-hidden="true" />
          <span className="glyphs" aria-hidden="true">
            ✦ ◆ ✦
          </span>
        </div>
        <div className="pnl-avatar-lg">
          {user.initial}
          <CheckGlyph />
        </div>
        <div className="pnl-prof-body">
          <h2>{user.fullName}</h2>
          <div className="role">{user.role}</div>
          {user.bio && (
            <p
              style={{
                fontSize: "12.5px",
                color: "var(--ink-subtle)",
                margin: "8px 0 12px",
                lineHeight: 1.6,
              }}
            >
              {user.bio}
            </p>
          )}
          <div className="pnl-tags">
            {user.tags &&
              user.tags.map((t) => (
                <span className="pnl-tag" key={t}>
                  {t}
                </span>
              ))}
          </div>
          <div className="pnl-prof-stats">
            {user.stats &&
              user.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.num}</b>
                  <span>{s.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* level card */}
      <div className="pnl-level">
        <div>
          <div className="lbl">سطح فعلی</div>
          <h3>{user.level?.title || "محقق برتر"}</h3>
          <small>{user.level?.pointsToNext || "۵۲۰ امتیاز تا سطح بعد"}</small>
        </div>
        <div className="pnl-lvl-circle">{user.level?.number || 7}</div>
        <div className="pnl-lvl-bar">
          <i style={{ width: `${user.level?.pct || 72}%` }} />
        </div>
      </div>
    </div>
  );
}
