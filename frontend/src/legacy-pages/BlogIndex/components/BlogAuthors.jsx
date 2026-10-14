import React, { useState, useEffect } from "react";
import { I, toFa, coverBg, TONES } from "./BlogIcons.jsx";
import { AUTHORS_LIST } from "../data/blogIndexData.js";
import { getTeachers } from "@/services/teacherService.js";

const TONE_KEYS = ["magenta", "teal", "amber", "navy"];
const ROTS = ["-1deg", "1deg", "-1deg", "1deg"];

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}.${parts[parts.length - 1][0]}`;
  return name.slice(0, 2);
}

export default function BlogAuthors() {
  const [authors, setAuthors] = useState(AUTHORS_LIST);

  useEffect(() => {
    let isMounted = true;
    getTeachers()
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : data?.data || [];
        if (list.length > 0) {
          const mapped = list.map((t, i) => {
            const toneKey = TONE_KEYS[i % TONE_KEYS.length];
            return {
              id: t._id || i,
              name: t.name,
              role: t.specialization || "مدرس و نویسنده",
              photo: t.photo || null,
              posts: (i + 1) * 8 + 4,
              tone: toneKey,
              initials: getInitials(t.name),
              rot: ROTS[i % ROTS.length],
            };
          });
          setAuthors(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load teachers for blog authors:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bi-authors">
      <div className="container">
        <div className="bi-sec-head">
          <h2 className="bi-h2">
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>قلم‌های</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1deg)", color: "var(--college-dark)" }}>پشت</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>مقاله‌ها</span>
          </h2>
          <a className="bi-more-link" href="#blog-index">همه نویسنده‌ها <I.Arrow style={{ width: 16, height: 16 }} /></a>
        </div>

        <div className="bi-author-grid">
          {authors.map((a, i) => {
            const c = TONES[a.tone] || TONES.teal;
            return (
              <div key={a.id || i} className="bi-author-cell" style={{ transform: `rotate(${a.rot})` }}>
                <div className="bi-author-sh" />
                <div className="bi-author-card">
                  <div className="bi-author-strip" style={{ background: coverBg(a.tone) }} />
                  <span
                    className="bi-author-avatar"
                    style={{
                      background: c.tint,
                      color: c.solid,
                      overflow: "hidden",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {a.photo ? (
                      <img
                        src={a.photo}
                        alt={a.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      a.initials
                    )}
                  </span>
                  <h4>{a.name}</h4>
                  <p>{a.role}</p>
                  <span className="bi-author-posts" style={{ background: c.tint, color: c.solid, borderColor: c.solid }}>
                    <I.Book style={{ width: 12, height: 12 }} />
                    {toFa(a.posts)} مقاله
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
