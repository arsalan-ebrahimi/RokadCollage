// Word-by-word rotated headline: a core Rokad signature.
// Pass words as [{ text, deg }] or a plain string (auto-slight split).
export default function RotatedHeading({ words, as: Tag = "h2", tag, className = "", color }) {
  const Component = tag || Tag;
  const items =
    typeof words === "string"
      ? words.split(" ").map((t, i) => {
          const pattern = i % 4;
          const deg = pattern === 0 ? 0.5
                    : pattern === 1 ? -0.5
                    : pattern === 2 ? 0.5
                    : -0.5;
          return { text: t, deg };
        })
      : (Array.isArray(words) ? words : []).map((w) => ({
          text: w.text ?? w.t ?? "",
          deg: w.deg !== undefined ? w.deg : (w.rot ? parseFloat(w.rot) : 0),
          hl: w.hl,
          color: w.color,
        }));

  return (
    <Component className={`headline ${className}`} style={color ? { color } : undefined}>
      {items.map((w, i) => (
        <span
          key={i}
          className={`word${w.hl ? " hl mk" : ""}`}
          style={{
            transform: `rotate(${w.deg ?? 0}deg)`,
            transition: "transform 0.3s ease",
            display: "inline-block",
            marginInline: "3px",
            ...(w.color ? { color: w.color } : w.hl ? { color: "var(--ink)" } : {}),
          }}
        >
          {w.text}
        </span>
      ))}
    </Component>
  );
}
