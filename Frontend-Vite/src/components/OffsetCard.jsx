// Two-layer offset "sticker" card: Rokad signature.
// Back layer is a solid rect offset down-right (RTL-correct); this IS the shadow.
import clsx from "../lib/clsx";

export default function OffsetCard({
  children,
  className = "",
  backColor = "var(--shadow-ink)",
  radius = "cut-tl-br",
  rotate = "rotate-3",
  shadowOffset = 5,
  style,
  ...rest
}) {
  // Split className into animation/entrance classes (apply to BOTH layers so the
  // back shadow and the front card move in sync) vs card-only classes.
  const classNames = className.split(" ").filter(Boolean);
  const animationClasses = classNames
    .filter((c) => c.startsWith("animate-") || c.startsWith("delay-"))
    .join(" ");
  const cardOnlyClasses = classNames
    .filter((c) => !c.startsWith("animate-") && !c.startsWith("delay-"))
    .join(" ");

  return (
    // `rotate` stays on the WRAPPER only so both layers rotate as one rigid sticker
    <div className={clsx("offset-wrapper", rotate)} style={style} {...rest}>
      <div
        aria-hidden
        className={clsx("offset-back", radius, animationClasses)}
        style={{ background: backColor, top: shadowOffset, left: shadowOffset }}
      />
      <div className={clsx("offset-card", radius, animationClasses, cardOnlyClasses)}>
        {children}
      </div>
    </div>
  );
}