import { promoCards } from "@/data/content.js";
import PatternLayer from "@/components/PatternLayer";

/* ---- Department color maps (from HTML V5) ---- */
const deptColors = [
  {
    cat: "var(--college)",
    catBg: "var(--college-light)",
    catFg: "var(--college-darker)",
    catBorder: "var(--college-light-active)",
  },
  {
    cat: "var(--ecosystem)",
    catBg: "#E6F5F3",
    catFg: "#28544F",
    catBorder: "#CCEAE6",
  },
  {
    cat: "var(--navy)",
    catBg: "#E9EAEF",
    catFg: "#182044",
    catBorder: "#BABDCC",
  },
  {
    cat: "var(--female)",
    catBg: "#FCE8EF",
    catFg: "#A81344",
    catBorder: "#F5B8CC",
  },
];

/* ---- SVG icons (matching HTML V5 exactly) ---- */
const cardIcons = [
  <svg
    key="0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>,
  <svg
    key="1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
  <svg
    key="2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12l2 2 4-4" />
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,
  <svg
    key="3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>,
];

const stepNums = ["۰۱", "۰۲", "۰۳", "۰۴"];

/* ---- Pattern images: NOTE: the files in /assets/Pattern/*.png
   (yellow/blue/green/pink) are broken/blank in this project (all four
   are byte-identical placeholders). The real textured versions live in
   /assets/StatCard/*.png, so we use those instead. ---- */
const patterns = [
  "/assets/StatCard/yellow.png",
  "/assets/StatCard/green.png",
  "/assets/StatCard/blue.png",
  "/assets/StatCard/pink.png",
];

/* ---- Check rows per card (from HTML V5) ---- */
const checkRows = [
  ["اساتید شاغل در بازار", "پشتیبانی آموزشی مستمر"],
  ["پروژهٔ واقعی در پرتفولیو", "تمرین با ابزار حرفه‌ای"],
  ["رزومه‌نویسی حرفه‌ای", "معرفی به شرکت‌ها"],
  ["مدرک قابل ارائه", "احراز مهارت رسمی"],
];

const rotations = [
  "rotate(-.5deg)",
  "rotate(.5deg)",
  "rotate(-.3deg)",
  "rotate(.5deg)",
];

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function PromoBenefits() {
  return (
    <section
      className="section promo-v5"
      id="promo"
      style={{ background: "var(--bg-college-tint)" }}
    >
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={180} />
      <div className="container section-inner">
        {/* Head */}
        <div className="promo-head">
          <h2 className="t-section">
            <span className="mk">
              آینده‌ات
            </span>{" "}
            <span
              style={{
                display: "inline-block",
                transform: "rotate(1deg)",
                color: "var(--ink)",
              }}
            >
              رو بساز
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="promo-v5-grid">
          {promoCards.map((card, i) => {
            const d = deptColors[i];
            return (
              <div
                key={card.title}
                className="promo-v5-stack"
                style={{
                  transform: rotations[i],
                  "--cat": d.cat,
                  "--catBg": d.catBg,
                  "--catFg": d.catFg,
                  "--catBorder": d.catBorder,
                }}
              >
                <article className="promo-v5-card">
                  {/* Colored Header */}
                  <div className="promo-v5-header">
                    <img
                      src={patterns[i]}
                      alt=""
                      aria-hidden="true"
                      className="promo-v5-pattern"
                      style={{
                        opacity: 0.45,
                        mixBlendMode: "multiply",
                      }}
                    />
                    <div className="promo-v5-icon-h">{cardIcons[i]}</div>
                    <span className="promo-v5-num-h">{stepNums[i]}</span>
                  </div>

                  {/* Body */}
                  <div className="promo-v5-body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <div className="promo-v5-checks">
                      {checkRows[i].map((row) => (
                        <div key={row} className="promo-v5-row">
                          <CheckIcon />
                          {row}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
