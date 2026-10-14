import clsx from "../lib/clsx";

export const STICKER_THEMES = {
  white:   { back: "bg-ink",       border: "border-ink",       bg: "bg-white" },
  navy:    { back: "bg-navy",      border: "border-navy",      bg: "bg-navy-alt" },
  teal:    { back: "bg-teal",      border: "border-teal",      bg: "bg-teal-light" },
  college: { back: "bg-college-dark", border: "border-college", bg: "bg-college-light" },
  magenta: { back: "bg-accent",    border: "border-accent",    bg: "bg-blush" },
  neutral: { back: "bg-navy",      border: "border-navy",      bg: "bg-neutral" },
};

export default function StickerCard({
  theme = "white",
  rotate = "",
  offset = "top-[0.3rem] left-[0.3rem]",
  radius = "rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-none rounded-bl-none",
  border = "border-[0.1875rem]",
  className = "",
  children,
  as: Tag = "div",
  ...rest
}) {
  const t = STICKER_THEMES[theme] ?? STICKER_THEMES.white;
  return (
    <div className={clsx("relative", rotate, className)} {...rest}>
      <div
        aria-hidden
        className={clsx(
          "absolute w-full h-full",
          offset,
          radius,
          "[corner-shape:squircle]",
          t.back
        )}
      />
      <Tag
        className={clsx(
          "relative z-10",
          radius,
          "[corner-shape:squircle]",
          border,
          t.border,
          t.bg
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
