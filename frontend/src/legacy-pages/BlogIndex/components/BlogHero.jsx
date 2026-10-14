import React, { useState } from "react";
import { I } from "./BlogIcons.jsx";
import { POPULAR_TAGS, POSTS } from "../data/blogIndexData.js";

function SuggestLabel({ text, q }) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </span>
  );
}

export default function BlogHero({ searchQuery, setSearchQuery, setActiveCategory, onGoResults }) {
  const [showSuggest, setShowSuggest] = useState(false);

  const q = searchQuery.trim().toLowerCase();
  const suggestions = q
    ? [...new Set([
        ...POSTS.filter((p) => p.title.toLowerCase().includes(q)).map((p) => p.title),
        ...[...new Set(POSTS.map((p) => p.tag))].filter((t) => t.toLowerCase().includes(q)),
      ])].slice(0, 6)
    : [];

  const line1 = [
    { text: "داستان‌ها،", rot: "-1deg" },
    { text: "ایده‌ها", rot: "1deg" },
    { text: "و", rot: "-1deg" },
    { text: "تجربه‌های", rot: "1deg" },
  ];
  const line2 = [
    { text: "یک", rot: "-1deg" },
    { text: "نسل", rot: "1deg", hl: true },
    { text: "استارتاپی", rot: "-1deg", hl: true },
  ];

  return (
    <section className="bi-hero">
      <div className="bi-hero-deco bi-hero-deco-1" style={{ background: "var(--accent)" }} />
      <div className="bi-hero-deco bi-hero-deco-2" style={{ background: "var(--teal)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <a className="bi-back" href="#">
          <I.ArrowLeft style={{ width: 14, height: 14 }} /> بازگشت به خانه
        </a>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div className="bi-pill">
            <I.Sparkle style={{ width: 16, height: 16, color: "var(--college)" }} />
            <span>مجلهٔ رکاد</span>
            <span style={{ color: "var(--ink-subtle)" }}>·</span>
            <span style={{ color: "var(--college-dark)", fontWeight: 900 }}>شماره ۱۴۰۵</span>
          </div>
        </div>

        <h1 className="bi-title">
          <span className="bi-line">
            {line1.map((w, i) => (
              <span key={i} className="bi-w" style={{ transform: `rotate(${w.rot})` }}>{w.text}</span>
            ))}
          </span>
          <span className="bi-line">
            {line2.map((w, i) => (
              <span key={i} className={`bi-w${w.hl ? " hl" : ""}`} style={{ transform: `rotate(${w.rot})` }}>{w.text}</span>
            ))}
          </span>
        </h1>

        <p className="bi-sub">
          هر هفته با مقاله‌های تازه، مصاحبه‌ها و تجربه‌های واقعی از دنیای کارآفرینی نوجوان همراه شما هستیم.
        </p>

        <form
          className="bi-search"
          onSubmit={(e) => {
            e.preventDefault();
            setShowSuggest(false);
            onGoResults?.();
          }}
        >
          <div className="bi-search-sh" />
          <div className="bi-search-box">
            <input
              type="text"
              placeholder="دنبال چی می‌گردی؟ مثلاً «استارتاپ» یا «برنامه‌نویسی»"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
              role="combobox"
              aria-expanded={showSuggest && !!searchQuery.trim()}
              autoComplete="off"
            />
            <button type="submit">
              <I.Search style={{ width: 18, height: 18 }} />
              <span className="bi-hide-mobile">جست‌وجو</span>
            </button>
          </div>

          {showSuggest && searchQuery.trim() && (
            <ul className="bi-suggest">
              {suggestions.length === 0 && (
                <li className="bi-suggest-empty">موردی پیدا نشد…</li>
              )}
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchQuery(s);
                      setActiveCategory("all");
                      setShowSuggest(false);
                      onGoResults?.();
                    }}
                  >
                    <I.Search style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.5 }} />
                    <SuggestLabel text={s} q={searchQuery.trim()} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="bi-poptags">
          <span>جست‌وجوهای پرطرفدار:</span>
          {POPULAR_TAGS.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSearchQuery(t);
                setActiveCategory("all");
                onGoResults?.();
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
