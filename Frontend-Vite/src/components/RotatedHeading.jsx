// Word-by-word rotated headline: a core Rokad signature.
// Pass words as [{ text, deg }] or a plain string (auto-slight split).
export default function RotatedHeading({ words, as: Tag = "h2", className = "", color }) {
  const items =
    typeof words === "string"
      ? words.split(" ").map((t, i) => {
          // Very subtle alternating rotations: ±0.5deg pattern
          const pattern = i % 4;
          const deg = pattern === 0 ? 0.5
                    : pattern === 1 ? -0.5
                    : pattern === 2 ? 0.5
                    : -0.5;
          return { text: t, deg };
        })
      : words;
  return (
    <Tag className={`headline ${className}`} style={color ? { color } : undefined}>
      {items.map((w, i) => (
        <span
          key={i}
          className="word"
          style={{
            transform: `rotate(${w.deg ?? 0}deg)`,
            transition: "transform 0.3s ease",
          }}
        >
          {w.text}
        </span>
      ))}
    </Tag>
  );
}
