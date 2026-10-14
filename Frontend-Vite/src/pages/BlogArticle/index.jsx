/* ============================================================
   کالج رکاد: تک‌صفحهٔ بلاگ
   دیزاین و محتوا: دقیقاً «BlogSingle» سایت رکاد وب
   («چطور یک نوجوان را عاشق کد کنیم؟») با رنگ‌بندی کالج
   ============================================================ */
import { post, blocks, related } from "../../data/blogSingle.js";

/* رنگ‌های پالت کالج */
const AMBER_GRAD = "linear-gradient(135deg, #ffd44d 0%, var(--college) 55%, var(--college-dark) 100%)";
const toneGrad = (t) =>
  t === "teal"
    ? "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)"
    : t === "magenta"
      ? "linear-gradient(135deg, var(--accent) 0%, var(--female-dark) 100%)"
      : "linear-gradient(135deg, var(--navy) 0%, var(--navy-hover) 100%)";

const H2_COLORS = ["var(--college)", "var(--navy)", "var(--accent)"];

import { useState } from "react";
import { Check } from "lucide-react";

export default function BlogArticle() {
  const [copied, setCopied] = useState(false);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyLink = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      /* ignore */
    }
  };

  const renderBlock = (b, i) => {
    if (b.type === "h2") {
      const n = parseInt(String(b.id || "s0").replace(/\D/g, ""), 10) || 0;
      const hc = H2_COLORS[n % 3];
      return (
        <h2 className="rbs-h2" id={b.id} key={i} style={{ color: hc }}>
          <span className="bar" style={{ background: hc }} />
          {b.text}
        </h2>
      );
    }
    if (b.type === "quote")
      return (
        <figure className="rbs-quote" key={i}>
          <span className="mark">&ldquo;</span>
          <blockquote>{b.text}</blockquote>
        </figure>
      );
    if (b.type === "info")
      return (
        <div className="rbs-info" key={i}>
          <div className="rbs-info-label">{b.label}</div>
          <div className="rbs-info-text">{b.text}</div>
        </div>
      );
    return <p className="rbs-p" key={i}>{b.text}</p>;
  };

  return (
    <section className="rbs-page">
      <div className="container">
        {/* بریدکرامب */}
        <nav className="rbs-crumb" aria-label="مسیر">
          <a href="#/">خانه</a>
          <span className="sep">/</span>
          <a href="#blog-index">مجله</a>
          <span className="sep">/</span>
          <span className="cur">{post.titleWords.map((w) => w.t).join(" ")}</span>
        </nav>

        {/* گرید اصلی: مقاله + سایدبار */}
        <div className="rbs-layout">
          {/* ══════ مقاله ══════ */}
          <article className="rbs-article">
            {/* تگ‌ها */}
            <div className="rbs-tags">
              {post.tags.map((t, i) => (
                <span
                  key={i}
                  className={`rbs-tag ${i === 0 ? "filled-amber" : i === 1 ? "filled-navy" : "ghost"}`}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* تیتر کلمه‌ای چرخان */}
            <h1 className="rbs-title">
              {post.titleWords.map((w, i) => (
                <span
                  key={i}
                  className={`w ${i % 2 === 0 ? "even" : "odd"} ${w.accent || ""}`}
                >
                  {w.t}
                </span>
              ))}
            </h1>

            {/* متا */}
            <div className="rbs-meta">
              {post.meta.map((m, i) => (
                <span className="rbs-meta-item" key={i}>
                  {i > 0 && (
                    <span className="dot" style={{ color: i % 2 ? "var(--accent)" : "var(--college)" }}>●</span>
                  )}
                  {m}
                </span>
              ))}
            </div>

            {/* کاور */}
            <div className="rbs-cover">
              <div className="rbs-cover-card" style={{ background: AMBER_GRAD }}>
                <span className="rbs-cover-cap">{post.coverCaption}</span>
              </div>
            </div>

            {/* بدنه */}
            <div className="rbs-prose">{blocks.map(renderBlock)}</div>

            {/* نویسنده پایین مقاله */}
            <div className="rbs-author">
              <span className="avatar">{post.author.initials}</span>
              <div className="info">
                <strong>{post.author.name}</strong>
                <div className="role">{post.author.role}</div>
                <p>{post.author.bio}</p>
              </div>
            </div>

            {/* مطالب مرتبط */}
            <section className="rbs-related">
              <h2 className="rbs-related-head">
                <span className="bar" />
                مطالب مرتبط
              </h2>
              <div className="rbs-rp-grid">
                {related.map((r, i) => (
                  <a className="rbs-rp" href="#blog-index" key={i}>
                    <div className="thumb" style={{ background: toneGrad(r.tone) }} />
                    <div className="body">
                      <span className="tag">{r.tag}</span>
                      <h3>{r.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </article>

          {/* ══════ سایدبار (sticky) ══════ */}
          <aside className="rbs-side">
            {/* نویسنده */}
            <div className="rbs-side-card rbs-side-author">
              <div className="row">
                <span className="avatar">{post.author.initials}</span>
                <div>
                  <strong>{post.author.name}</strong>
                  <div className="role">{post.author.role}</div>
                </div>
              </div>
              <p>{post.author.bio}</p>
            </div>

            {/* فهرست مطالب */}
            <div className="rbs-side-card">
              <div className="head">فهرست مطالب</div>
              <ul className="rbs-toc">
                {post.toc.map((t, i) => (
                  <li key={i}>
                    <a href={`#${t.id}`} onClick={scrollTo(t.id)}>
                      <span className="num">{t.num}</span>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* اشتراک‌گذاری */}
            <div className="rbs-side-card">
              <div className="head">این مطلب رو به اشتراک بذار!</div>
              <div className="rbs-share-btns">
                {post.share.map((s, i) => (
                  <button
                    className={`rbs-sbtn${s === "کپی لینک" && copied ? " copied" : ""}`}
                    type="button"
                    key={i}
                    onClick={s === "کپی لینک" ? copyLink : undefined}
                    style={s === "کپی لینک" && copied ? { background: "var(--teal)", color: "#fff", borderColor: "var(--ink)" } : {}}
                  >
                    {s === "کپی لینک" && copied ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Check size={12} strokeWidth={3} />
                        <span>کپی شد</span>
                      </span>
                    ) : (
                      s
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}