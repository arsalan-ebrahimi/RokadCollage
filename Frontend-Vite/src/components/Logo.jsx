// Rokad wordmark: white "Sign W" logo on college background + "COLLEGE" accent.
export default function Logo({ withWord = true, size = 40, compact = false }) {
  return (
    <a
      href="#top"
      className="logo"
      aria-label="کالج رکاد"
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
    >
      <span
        className="logo-mark"
        style={{
          width: size,
          height: size,
          borderRadius: "10px 0 10px 0",
          background: "var(--college)",
          border: "2px solid var(--ink)",
          boxShadow: "2px 2px 0 var(--ink)",
          transform: compact ? "rotate(-3deg) scale(0.92)" : "rotate(-3deg)",
          transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          padding: size * 0.16,
          flexShrink: 0,
        }}
      >
        <img
          src="/assets/Shared/Logos/logo-white-512.png"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </span>
      {withWord && (
        <span
          style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
        >
          <strong
            style={{
              fontSize: size * 0.5,
              color: "var(--navy)",
              fontWeight: 950,
            }}
          >
            کالج رکاد
          </strong>
          <span
            style={{
              fontSize: size * 0.24,
              color: "var(--college-dark)",
              fontWeight: 800,
              letterSpacing: 1.5,
              marginTop: size * 0.08,
            }}
          >
            ROKAD COLLEGE
          </span>
        </span>
      )}
    </a>
  );
}