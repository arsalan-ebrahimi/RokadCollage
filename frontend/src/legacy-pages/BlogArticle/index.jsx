/* ============================================================
   کالج رکاد: تک‌صفحهٔ بلاگ
   دیزاین و محتوا: دقیقاً «BlogSingle» سایت رکاد وب
   («چطور یک نوجوان را عاشق کد کنیم؟») با رنگ‌بندی کالج
   ============================================================ */
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { getBlogBySlugOrId, getBlogs } from "@/services/blogService.js";

/* رنگ‌های پالت کالج */
const AMBER_GRAD = "linear-gradient(135deg, #ffd44d 0%, var(--college) 55%, var(--college-dark) 100%)";
const toneGrad = (t) =>
  t === "teal"
    ? "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)"
    : t === "magenta"
      ? "linear-gradient(135deg, var(--accent) 0%, var(--female-dark) 100%)"
      : "linear-gradient(135deg, var(--navy) 0%, var(--navy-hover) 100%)";

const H2_COLORS = ["var(--college)", "var(--navy)", "var(--accent)"];

export default function BlogArticle({ slug }) {
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      try {
        const data = await getBlogBySlugOrId(slug);
        setArticle(data);

        // Fetch related articles from same category or newest
        const rel = await getBlogs({ limit: 4 }).catch(() => []);
        const relList = (Array.isArray(rel) ? rel : rel?.data || []).filter(
          (b) => b._id !== data?._id && b.id !== data?.id
        );
        setRelatedArticles(relList.slice(0, 3));

        // Parse H2 headings from content or blocks
        if (data?.content) {
          const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
          const found = [];
          let match;
          let idx = 0;
          while ((match = regex.exec(data.content)) !== null) {
            found.push({
              id: `sec-${idx}`,
              label: match[1].replace(/<[^>]+>/g, "").trim(),
            });
            idx++;
          }
          setHeadings(found);
        }
      } catch (err) {
        console.error("Failed to load blog article:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-['IRANSansX'] text-stone-500 font-medium">
        در حال بارگذاری مقاله...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-['IRANSansX'] text-stone-500 gap-4">
        <h2 className="text-xl font-bold">مقاله مورد نظر یافت نشد.</h2>
        <Link href="/blog" className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm">
          بازگشت به مقالات
        </Link>
      </div>
    );
  }

  const displayTitle = article.title;
  const displayCategory = article.category || "آموزش";
  const displayAuthorName = article.author?.fullName || article.author?.name || "تحریریه کالج رکاد";
  const displayAuthorRole = article.author?.role || "مدرس و نویسنده کالج";
  const displayDate = article.createdAt ? new Date(article.createdAt).toLocaleDateString("fa-IR") : "به‌تازگی";
  const displayReadTime = article.readTime || "۵ دقیقه";

  return (
    <section className="rbs-page">
      <div className="container">
        {/* بریدکرامب */}
        <nav className="rbs-crumb" aria-label="مسیر">
          <Link href="/">خانه</Link>
          <span className="sep">/</span>
          <Link href="/blog">مجله</Link>
          <span className="sep">/</span>
          <span className="cur">{displayTitle}</span>
        </nav>

        {/* گرید اصلی: مقاله + سایدبار */}
        <div className="rbs-layout">
          {/* ══════ مقاله ══════ */}
          <article className="rbs-article">
            {/* تگ‌ها */}
            <div className="rbs-tags">
              <span className="rbs-tag filled-amber">{displayCategory}</span>
              {article?.tags?.map((t, i) => (
                <span key={i} className="rbs-tag ghost">{t}</span>
              ))}
            </div>

            {/* تیتر مقاله */}
            <h1 className="rbs-title" style={{ fontSize: "2rem", lineHeight: "1.4" }}>
              {displayTitle}
            </h1>

            {/* متا */}
            <div className="rbs-meta">
              <span className="rbs-meta-item">{displayReadTime}</span>
              <span className="rbs-meta-item">
                <span className="dot" style={{ color: "var(--accent)" }}>●</span>
                {displayDate}
              </span>
              <span className="rbs-meta-item">
                <span className="dot" style={{ color: "var(--college)" }}>●</span>
                {displayAuthorName}
              </span>
            </div>

            {/* کاور */}
            <div className="rbs-cover">
              <div className="rbs-cover-card" style={{ background: AMBER_GRAD }}>
                <span className="rbs-cover-cap">{article?.headline || article?.title}</span>
              </div>
            </div>

            {/* بدنه */}
            <div className="rbs-prose">
              {article?.content ? (
                <div
                  className="article-dynamic-html"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="rbs-p">{article.description}</p>
              )}
            </div>

            {/* نویسنده پایین مقاله */}
            <div className="rbs-author">
              <span className="avatar">
                {displayAuthorName.slice(0, 2)}
              </span>
              <div className="info">
                <strong>{displayAuthorName}</strong>
                <div className="role">{displayAuthorRole}</div>
                <p>مدرس و عضو هیئت علمی کالج تخصصی مهارت و کارآفرینی رکاد.</p>
              </div>
            </div>

            {/* مطالب مرتبط */}
            {relatedArticles.length > 0 && (
              <section className="rbs-related">
                <h2 className="rbs-related-head">
                  <span className="bar" />
                  مطالب مرتبط
                </h2>
                <div className="rbs-rp-grid">
                  {relatedArticles.map((r, i) => (
                    <Link className="rbs-rp" href={`/blog/${r.slug || r._id || r.id}`} key={i}>
                      <div className="thumb" style={{ background: toneGrad(i % 3 === 0 ? "amber" : i % 3 === 1 ? "teal" : "magenta") }} />
                      <div className="body">
                        <span className="tag">{r.category}</span>
                        <h3>{r.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ══════ سایدبار (sticky) ══════ */}
          <aside className="rbs-side">
            {/* نویسنده */}
            <div className="rbs-side-card rbs-side-author">
              <div className="row">
                <span className="avatar">
                  {displayAuthorName.slice(0, 2)}
                </span>
                <div>
                  <strong>{displayAuthorName}</strong>
                  <div className="role">{displayAuthorRole}</div>
                </div>
              </div>
              <p>تولید شده توسط تحریریه تخصصی و اساتید کالج رکاد.</p>
            </div>

            {/* فهرست مطالب */}
            {headings.length > 0 && (
              <div className="rbs-side-card">
                <div className="head">فهرست مطالب</div>
                <ul className="rbs-toc">
                  {headings.map((t, i) => (
                    <li key={i}>
                      <a href={`#${t.id}`} onClick={scrollTo(t.id)}>
                        <span className="num">۰{i + 1}</span>
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* اشتراک‌گذاری */}
            <div className="rbs-side-card">
              <div className="head">اشتراک‌گذاری</div>
              <div className="rbs-share-btns">
                <button
                  className={`rbs-sbtn${copied ? " copied" : ""}`}
                  type="button"
                  onClick={copyLink}
                  style={copied ? { background: "var(--teal)", color: "#fff", borderColor: "var(--ink)" } : {}}
                >
                  {copied ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Check size={12} strokeWidth={3} />
                      <span>کپی شد</span>
                    </span>
                  ) : (
                    "کپی لینک"
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}