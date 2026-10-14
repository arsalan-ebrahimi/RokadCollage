// Two-layer brand button with the Rokad offset-shadow + tilt signature.
import clsx from "../lib/clsx";

export default function BrandButton({
  children,
  href = "#",
  variant = "primary", // primary | teal | white | amber | ghost
  size = "",
  rotate = "rotate-minus",
  className = "",
}) {
  const variantClass = {
    primary: "btn-primary",
    teal: "btn-teal",
    white: "btn-white",
    amber: "btn-amber",
    ghost: "btn-ghost",
  }[variant] ?? "btn-primary";

  return (
    <span className={clsx("btn-wrap", rotate)}>
      <div aria-hidden className="offset-back" style={{ background: "var(--shadow-ink)" }} />
      <a href={href} className={clsx("btn", variantClass, size, className)}>
        {children}
      </a>
    </span>
  );
}
