import React from "react";
import { Monitor, MapPin, Bookmark, Code, Briefcase, Globe } from "lucide-react";
import { toggleWishlist } from "@/data/panelStore.js";
import { isWishlisted } from "@/data/selectors.js";

export const DEPT_ICONS = {
  it: Code,
  business: Briefcase,
  languages: Globe,
};

export const CourseModeBadge = ({ mode, className = "" }) => {
  const isOnline = mode === "online";
  return (
    <span className={`course-mode-badge ${isOnline ? "online" : "in-person"} ${className}`}>
      {isOnline ? <Monitor size={12} strokeWidth={2.4} /> : <MapPin size={12} strokeWidth={2.4} />}
      <span>{isOnline ? "غیر حضوری" : "حضوری"}</span>
    </span>
  );
};

export const CourseSaveButton = ({ slug, store, className = "" }) => {
  const isSaved = isWishlisted(slug, store);
  return (
    <button
      type="button"
      className={`course-card-save-btn ${isSaved ? "is-saved" : ""} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(slug);
      }}
      aria-label={isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره"}
      title={isSaved ? "حذف از نشان‌شده‌ها" : "نشان کردن دوره"}
    >
      <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.2} />
    </button>
  );
};
