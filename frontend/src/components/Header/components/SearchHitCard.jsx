import React from "react";
import { Check, Star } from "lucide-react";
import { isEnrolledIn, isWishlisted } from "../../../data/selectors.js";

export default function SearchHitCard({ item, store, onClick }) {
  const enrolled = item.slug ? isEnrolledIn(item.slug, store) : false;
  const wished = item.slug ? isWishlisted(item.slug, store) : false;

  return (
    <button className="search-hit" onClick={onClick}>
      {item.image ? (
        <div className="search-hit-img-wrap">
          <img src={item.image} alt={item.title} className="search-hit-thumb" />
        </div>
      ) : item.avatarText ? (
        <div className="search-hit-img-wrap search-hit-avatar">
          {item.avatarText}
        </div>
      ) : item.icon ? (
        <div className="search-hit-img-wrap search-hit-icon">
          {item.icon}
        </div>
      ) : null}
      <div className="search-hit-body">
        <div
          className="search-hit-title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
          }}
        >
          <span>{item.title}</span>
          {enrolled && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                background: "var(--teal-light)",
                color: "var(--teal-dark)",
                border: "1px solid var(--ink)",
                padding: "1px 5px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Check size={11} strokeWidth={3} />
              <span>ثبت‌نام شده</span>
            </span>
          )}
          {wished && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                background: "#fff8e6",
                color: "var(--accent)",
                border: "1px solid var(--ink)",
                padding: "1px 5px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Star size={11} fill="currentColor" />
              <span>نشان‌شده</span>
            </span>
          )}
        </div>
        <div className="search-hit-text">{item.text}</div>
      </div>
      <svg
        className="search-hit-arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        width="14"
        height="14"
      >
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
  );
}
