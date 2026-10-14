import React from "react";
import Link from "next/link";
import { I, coverBg } from "./BlogIcons.jsx";

export default function BlogFeatured({ featured }) {
  if (!featured) return null;
  const authorInitials = (featured.author || "رکاد").trim().split(/\s+/).map((w) => w[0]).join(".");

  return (
    <section className="bi-featured">
      <div className="container">
        <div className="bi-sec-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="bi-dot-ring" />
            <h2 className="bi-h2">
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>مقاله</span>{" "}
              <span className="mk">ویژه</span>{" "}
              <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>این هفته</span>
            </h2>
          </div>
          <a className="bi-more-link" href="#blog-index">همه مقالات ویژه <I.Arrow style={{ width: 16, height: 16 }} /></a>
        </div>

        <div className="bi-featured-card">
          <div className="bi-featured-sh" />
          <div className="bi-featured-grid">
            <div className="bi-featured-media" style={{ background: coverBg("amber") }}>
              <div className="bi-feat-shape bi-feat-shape-1" style={{ background: "var(--navy-alt)" }} />
              <div className="bi-feat-shape bi-feat-shape-2" style={{ background: "var(--accent)" }} />
              <div className="bi-feat-rocket">
                <I.Rocket style={{ color: "var(--navy)", width: 32, height: 32, transform: "rotate(-20deg)" }} />
              </div>

              <div className="bi-feat-top">
                <span className="bi-feat-hot">
                  <I.Flame style={{ width: 14, height: 14, color: "var(--college)" }} />
                  داغ‌ترین مقاله هفته
                </span>
              </div>
              <div className="bi-feat-chips">
                <span className="chip white">{featured.cat}</span>
                <span className="chip amber">مصاحبه اختصاصی</span>
              </div>
            </div>

            <div className="bi-featured-body">
              <div>
                <div className="bi-feat-meta">
                  <span><I.Clock style={{ width: 14, height: 14 }} /> {featured.date}</span>
                  <span className="sep" />
                  <span><I.Eye style={{ width: 14, height: 14 }} /> ۱۲.۴K بازدید</span>
                  <span className="sep bi-hide-mob-inline" />
                  <span className="bi-hide-mob-inline"><I.Chat style={{ width: 14, height: 14 }} /> ۴۸ نظر</span>
                </div>

                <h3 className="bi-feat-title">{featured.title}</h3>
                <p className="bi-feat-desc">{featured.excerpt}</p>

                <div className="bi-progress">
                  <span> {featured.readTime}</span>
                  <div className="track"><div className="fill" style={{ width: "35%" }} /></div>
                  <span>۳۵٪</span>
                </div>
              </div>

              <div className="bi-feat-foot">
                <div className="bi-author-mini">
                  <span className="avatar">{authorInitials}</span>
                  <span>
                    <strong>{featured.author}</strong>
                    <small>سردبیر مجلهٔ رکاد</small>
                  </span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="bi-read-btn">
                  خواندن مقاله <I.Arrow style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
