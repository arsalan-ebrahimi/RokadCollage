import React, { useState, useEffect } from "react";
import { toFa } from "./BlogIcons.jsx";
import { ROTS } from "../data/blogIndexData.js";
import { getBlogs } from "@/services/blogService.js";

const DEFAULT_CATEGORIES = [
  { id: "all", label: "همه", color: "var(--ink)", bg: "#fff" },
  { id: "فرانتاند", label: "فرانت‌اند", color: "var(--teal)", bg: "var(--teal-light)" },
  { id: "بکاند", label: "بک‌اند", color: "var(--navy)", bg: "var(--bg-lavender)" },
  { id: "گرافیک", label: "گرافیک و دیزاین", color: "var(--accent)", bg: "var(--bg-blush)" },
  { id: "مسیر شغلی", label: "مسیر شغلی", color: "var(--college-dark)", bg: "var(--college-light)" },
  { id: "MBA", label: "مدیریت و کسب‌وکار", color: "var(--navy)", bg: "var(--bg-lavender)" },
  { id: "زبان", label: "زبان تخصصی", color: "var(--teal-dark)", bg: "var(--bg-mint)" },
];

export default function BlogCategories({ active, setActive }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES.map((c) => ({ ...c, count: 0 })));

  useEffect(() => {
    let isMounted = true;
    getBlogs({ limit: 100 })
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : res?.data || [];
        const counts = {};
        list.forEach((b) => {
          if (b.category) {
            counts[b.category] = (counts[b.category] || 0) + 1;
          }
        });

        setCategories(
          DEFAULT_CATEGORIES.map((c) => ({
            ...c,
            count: c.id === "all" ? list.length : counts[c.id] || 0,
          }))
        );
      })
      .catch((err) => console.error("Failed to fetch blog counts:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bi-cats">
      <div className="container">
        <div className="bi-chip-row">
          {categories.map((c, i) => {
            const isActive = active === c.id;
            const rot = ROTS[i % ROTS.length] || "0deg";
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  background: isActive ? c.color : c.bg,
                  color: isActive ? "#fff" : c.color,
                  borderColor: isActive ? "var(--ink)" : "rgba(41,40,39,.15)",
                  transform: isActive ? "rotate(0deg) scale(1.05)" : `rotate(${rot})`,
                  boxShadow: isActive ? "3px 3px 0 var(--ink)" : "none",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {c.label}
                <span
                  className="bi-chip-count"
                  style={{
                    background: isActive ? "rgba(255,255,255,.25)" : "#fff",
                    color: isActive ? "#fff" : c.color,
                  }}
                >
                  {toFa(c.count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
