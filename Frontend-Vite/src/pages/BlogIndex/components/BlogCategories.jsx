import React from "react";
import { toFa } from "./BlogIcons.jsx";
import { CATEGORIES, ROTS } from "../data/blogIndexData.js";

export default function BlogCategories({ active, setActive }) {
  return (
    <section className="bi-cats">
      <div className="container">
        <div className="bi-chip-row">
          {CATEGORIES.map((c, i) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  background: isActive ? c.color : c.bg,
                  color: isActive ? "#fff" : c.color,
                  borderColor: isActive ? "var(--ink)" : "rgba(41,40,39,.15)",
                  transform: isActive ? "rotate(0deg) scale(1.05)" : `rotate(${ROTS[i]})`,
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
