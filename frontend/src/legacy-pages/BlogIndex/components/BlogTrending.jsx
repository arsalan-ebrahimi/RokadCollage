import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket, Lightbulb, Smartphone } from "lucide-react";
import { I, toFa, coverBg, TONES } from "./BlogIcons.jsx";
import { TRENDING_ITEMS } from "../data/blogIndexData.js";
import { getBlogs } from "@/services/blogService.js";

const DEFAULT_ICONS = [Rocket, Lightbulb, Smartphone];
const DEFAULT_TONES = ["magenta", "teal", "amber"];
const DEFAULT_ROTS = ["-1deg", "1deg", "-1deg"];

function formatReads(views) {
  if (typeof views !== "number") return "۱K";
  if (views >= 1000) {
    const k = (views / 1000).toFixed(1).replace(/\.0$/, "");
    return `${toFa(k)}K`;
  }
  return toFa(views);
}

export default function BlogTrending() {
  const [items, setItems] = useState(TRENDING_ITEMS);

  useEffect(() => {
    let isMounted = true;
    getBlogs({ sort: "-views", limit: 3 })
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : res?.data || [];
        if (list.length > 0) {
          const mapped = list.map((b, i) => {
            const fallback = TRENDING_ITEMS[i] || {};
            return {
              id: b._id || b.id,
              rank: i + 1,
              title: b.title,
              slug: b.slug || b._id || b.id,
              author: b.author?.name || b.author?.fullName || fallback.author || "تحریریه رکاد",
              reads: formatReads(b.views ?? 12000),
              tone: DEFAULT_TONES[i % DEFAULT_TONES.length],
              rot: DEFAULT_ROTS[i % DEFAULT_ROTS.length],
              icon: DEFAULT_ICONS[i % DEFAULT_ICONS.length],
            };
          });
          setItems(mapped);
        }
      })
      .catch((err) => console.error("Failed to load trending blogs:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bi-trending">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="bi-sec-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="bi-trend-ic">
              <I.Flame style={{ color: "#fff", width: 22, height: 22, transform: "rotate(4deg)" }} />
            </span>
            <h2 className="bi-h2">
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>پرخواننده‌ترین‌های</span>{" "}
              <span className="mk">ماه</span>
            </h2>
          </div>
          <span className="bi-update">به‌روزرسانی خودکار</span>
        </div>

        <div className="bi-trend-grid">
          {items.map((it, i) => {
            const c = TONES[it.tone] || TONES.magenta;
            const IconComp = it.icon || Rocket;
            const href = it.slug ? `/blog/${it.slug}` : "#";

            return (
              <div key={it.id || i} className="bi-trend-cell" style={{ transform: `rotate(${it.rot})` }}>
                <div className="bi-trend-sh" />
                <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <article className="bi-trend-card">
                    <div className="bi-trend-media" style={{ background: coverBg(it.tone) }}>
                      <div className="bi-card-circle" style={{ background: "rgba(255,255,255,.25)" }} />
                      <div className="bi-card-square" />
                      <span className="bi-trend-glyph" style={{ display: "grid", placeItems: "center" }}>
                        <IconComp size={28} />
                      </span>
                    </div>
                    <div className="bi-trend-body">
                      <span className="bi-trend-rank" style={{ color: c.solid }}>#{toFa(it.rank)}</span>
                      <div className="bi-trend-top">
                        <span className="bi-trend-badge" style={{ background: c.solid }}>رتبه {toFa(it.rank)}</span>
                      </div>
                      <h3>{it.title}</h3>
                      <div className="bi-trend-foot">
                        <span>{it.author}</span>
                        <span style={{ color: c.solid, fontWeight: 900 }}>{it.reads}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
