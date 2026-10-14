import React, { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { I, toFa } from "./BlogIcons.jsx";
import BlogCard from "./BlogCard.jsx";
import { PAGE_SIZE } from "../data/blogIndexData.js";
import { getBlogs } from "@/services/blogService.js";

const ENTER_STAGGER = 60, ENTER_MS = 550, EXIT_STAGGER = 45, EXIT_MS = 420;

export default function BlogGrid({ activeCategory, searchQuery }) {
  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [animState, setAnimState] = useState({ phase: "idle", fromIndex: 0 });
  const ref = useRef(null);
  const animTimers = useRef([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getBlogs({
          category: activeCategory !== "all" ? activeCategory : undefined,
          search: searchQuery ? searchQuery.trim() : undefined,
        });
        const list = Array.isArray(res) ? res : res.data || [];
        setBlogsList(list);
      } catch (err) {
        console.error("Failed to load blogs from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory, searchQuery]);

  const clearAnimTimers = () => {
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];
  };

  useEffect(() => clearAnimTimers, []);

  useEffect(() => {
    if (!sortOpen) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [sortOpen]);

  useEffect(() => {
    clearAnimTimers();
    setVisible(PAGE_SIZE);
    setAnimState({ phase: "idle", fromIndex: 0 });
  }, [activeCategory, searchQuery, sortBy]);

  const SORTS = [
    { id: "newest", label: "جدیدترین" },
    { id: "oldest", label: "قدیمی‌ترین" },
    { id: "popular", label: "پرخواننده‌ترین" },
  ];
  const sortLabel = SORTS.find((s) => s.id === sortBy)?.label;

  const formattedPosts = blogsList.map((b, i) => ({
    id: b.id || b._id,
    title: b.title,
    excerpt: b.excerpt || b.headline || (b.content ? b.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..." : ""),
    tag: b.category || "آموزش",
    tagColor: i % 2 === 0 ? "primary" : "secondary",
    author: b.author?.fullName || b.author?.name || "تحریریه کالج رکاد",
    readTime: b.readTime ? `${toFa(b.readTime)} دقیقه` : "۵ دقیقه",
    reads: `${toFa(b.views || 320)}`,
    date: b.createdAt ? new Date(b.createdAt).toLocaleDateString("fa-IR") : "به‌تازگی",
    size: i % 3 === 0 ? "lg" : "sm",
    slug: b.slug || b.id || b._id,
  }));

  const sorted = [...formattedPosts].sort((a, b) => {
    if (sortBy === "oldest") return a.id > b.id ? 1 : -1;
    return 0;
  });

  const posts = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  const loadMore = () => {
    if (animState.phase !== "idle" || !hasMore) return;
    const from = visible;
    const count = Math.min(PAGE_SIZE, sorted.length - from);
    setVisible((v) => v + PAGE_SIZE);
    setAnimState({ phase: "enter", fromIndex: from });
    animTimers.current.push(
      setTimeout(() => {
        setAnimState((s) => (s.phase === "enter" ? { phase: "idle", fromIndex: 0 } : s));
      }, (count - 1) * ENTER_STAGGER + ENTER_MS + 60)
    );
  };

  const collapseAll = () => {
    if (animState.phase !== "idle" || visible <= PAGE_SIZE) return;
    setAnimState({ phase: "exit", fromIndex: PAGE_SIZE });
    const EXIT_TOTAL = EXIT_MS + (visible - PAGE_SIZE - 1) * EXIT_STAGGER + 80;
    animTimers.current.push(
      setTimeout(() => {
        setVisible(PAGE_SIZE);
        setAnimState({ phase: "idle", fromIndex: 0 });
      }, EXIT_TOTAL)
    );
  };

  return (
    <section className="bi-grid-sec" id="bi-results">
      <div className="container">
        <div className="bi-sec-head">
          <h2 className="bi-h2">
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>همه‌ی</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--college-dark)" }}>مقاله‌ها</span>
          </h2>
          <div className="bi-sort-wrap" ref={ref}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-subtle)" }}>مرتب‌سازی:</span>
            <button className="bi-sort" onClick={() => setSortOpen((v) => !v)} aria-expanded={sortOpen}>
              {sortLabel} <span style={{ fontSize: 10 }}>▼</span>
            </button>
            {sortOpen && (
              <ul className="bi-sort-menu">
                {SORTS.map((s) => (
                  <li key={s.id}>
                    <button
                      className={sortBy === s.id ? "active" : ""}
                      onClick={() => {
                        setSortBy(s.id);
                        setSortOpen(false);
                      }}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bi-blog-grid">
          {posts.map((p, i) => (
            <BlogCard
              key={p.id}
              post={p}
              index={i}
              entering={animState.phase === "enter" && i >= animState.fromIndex}
              exiting={animState.phase === "exit" && i >= animState.fromIndex}
              animDelay={(i - animState.fromIndex) * (animState.phase === "exit" ? EXIT_STAGGER : ENTER_STAGGER)}
            />
          ))}
        </div>

        {sorted.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--ink-subtle)", fontWeight: 700, padding: "3rem 1rem" }}>
            <p style={{ fontSize: 16, margin: 0 }}>مقاله‌ای مطابق با جست‌وجوی شما پیدا نشد.</p>
            <p style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>می‌توانید کلمهٔ دیگری را جست‌وجو کنید یا دسته‌بندی را تغییر دهید.</p>
          </div>
        )}

        {sorted.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: "3.5rem" }}>
            <div className="bi-loadmore">
              <div className="bi-loadmore-sh" />
              {hasMore ? (
                <button onClick={loadMore} disabled={animState.phase !== "idle"}>
                  {animState.phase === "enter" ? (
                    <>
                      در حال بارگذاری
                      <span className="bi-loadmore-dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span>
                    </>
                  ) : (
                    <>
                      مقاله‌های بیشتر
                      <span className="bi-loadmore-num">{toFa(sorted.length - visible)}</span>
                    </>
                  )}
                </button>
              ) : (
                <button className="bi-loadmore-close" onClick={collapseAll} disabled={animState.phase !== "idle"}>
                  {animState.phase === "exit" ? (
                    "در حال بستن…"
                  ) : (
                    <>
                      بستن مقاله‌ها <I.X style={{ width: 16, height: 16 }} />
                    </>
                  )}
                </button>
              )}
            </div>
            {!hasMore && animState.phase !== "exit" && (
              <p className="bi-loadmore-end" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Sparkles size={16} />
                <span>به آخر لیست رسیدی! مقاله جدید به‌زودی اضافه می‌شه.</span>
              </p>
            )}
          </div>
        )}

        <div className="bi-divider" aria-hidden="true">
          <span className="line" />
          <span className="glyph">✦</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}
