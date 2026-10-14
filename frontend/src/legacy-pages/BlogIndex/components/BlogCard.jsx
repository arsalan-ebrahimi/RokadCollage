import React, { useState } from "react";
import Link from "next/link";
import { I, coverBg } from "./BlogIcons.jsx";
import { TAG_COLORS, TAG_TONE, CARD_ROTS } from "../data/blogIndexData.js";

export default function BlogCard({ post, index, entering, exiting, animDelay = 0 }) {
  const c = TAG_COLORS[post.tagColor] || TAG_COLORS.primary;
  const rot = CARD_ROTS[index % CARD_ROTS.length];
  const slug = post.slug || post.id;
  const [saved, setSaved] = useState(false);

  return (
    <div
      className={`bi-card bi-card-${post.size}${entering ? " bi-enter" : ""}${exiting ? " bi-exit" : ""}`}
      style={{ "--rot": rot, animationDelay: animDelay ? `${animDelay}ms` : undefined }}
    >
      <div className="bi-card-sh" />
      <Link href={`/blog/${slug}`} className="bi-card-body">
        <div className="bi-card-media" style={{ background: coverBg(TAG_TONE[post.tagColor]) }}>
          <div className="bi-card-circle" style={{ background: "rgba(255,255,255,.25)" }} />
          <div className="bi-card-square" />
          <span className="bi-card-tag" style={{ color: c.dark }}>#{post.tag}</span>

          <button
            className={`bi-card-bookmark${saved ? " saved" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSaved((v) => !v);
            }}
            style={saved ? { background: c.solid, color: "#fff" } : undefined}
            aria-label={saved ? "حذف از ذخیره‌شده‌ها" : "ذخیره"}
            aria-pressed={saved}
          >
            <I.Bookmark style={{ width: 15, height: 15, fill: saved ? "currentColor" : "none" }} />
          </button>
        </div>

        <div className="bi-card-info">
          <div className="bi-card-meta">
            <span><I.Clock style={{ width: 12, height: 12 }} /> {post.readTime}</span>
            <span className="dot" />
            <span>{post.date}</span>
            <span className="dot" />
            <span style={{ color: c.dark, fontWeight: 900 }}>
              <I.Eye style={{ width: 12, height: 12 }} /> {post.reads}
            </span>
          </div>
          <h3 className={`bi-card-title${post.size === "lg" ? " lg" : ""}`}>{post.title}</h3>
          <p className="bi-card-excerpt">{post.excerpt}</p>

          <div className="bi-card-foot">
            <span className="bi-card-author">
              <span className="avatar" style={{ background: coverBg(TAG_TONE[post.tagColor]) }}>
                {post.author.charAt(0)}
              </span>
              {post.author}
            </span>
            <span className="bi-card-arr" style={{ background: c.solid }}>
              <I.Arrow style={{ width: 14, height: 14 }} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
