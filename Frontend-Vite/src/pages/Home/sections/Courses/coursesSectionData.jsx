import React from "react";

export const MODE_MAP = [
  "onsite", "online", "online",
  "onsite", "online", "onsite", "online", "online",
];

export const MODE_LABEL = { onsite: "حضوری", online: "غیر حضوری" };

export const MODE_ICON = {
  onsite: (
    <svg key="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  online: (
    <svg key="ol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

export const catColors = {
  "فناوری اطلاعات": { bg: "var(--college-light)", fg: "var(--college-darker)", border: "var(--college-light-active)", accent: "var(--college)" },
  "گرافیک": { bg: "#FCE8EF", fg: "#A81344", border: "#F5B8CC", accent: "var(--female)" },
  "زبان و MBA": { bg: "#E6F5F3", fg: "#28544F", border: "#CCEAE6", accent: "var(--ecosystem)" },
};

export const courseIcons = [
  <svg key="wp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7.07-7.07"/><path d="M22 12A10 10 0 0 0 12 2"/></svg>,
  <svg key="fe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  <svg key="gph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-3a3 3 0 0 0-3 3c0 1.5 1 2 1 3a2 2 0 0 1-2 1z"/></svg>,
];

export const durations = ["۱۲ هفته", "۱۶ هفته", "۸ هفته", "۱۰ هفته", "۱۲ هفته", "۴ ماه", "۶ ماه", "۱۴ هفته"];

export const courseFeatures = [
  ["پروژه‌محور", "مدرس معتبر"], ["React", "پرتفولیو"],
  ["کیس‌استادی", "ابزارهای واقعی"],
  ["Photoshop", "Illustrator"], ["Premiere", "After Effects"], ["IELTS", "MBA"], ["Canvas", "UI/UX"],
  ["Figma", "پروتوتایپ"],
];

export const courseTags = [
  ["WordPress", "WooCommerce", "Elementor"], ["JavaScript", "React", "Tailwind"],
  ["Google Analytics", "Ahrefs", "Search Console"], ["Photoshop", "Illustrator", "Figma"],
  ["Premiere Pro", "After Effects", "DaVinci"], ["IELTS", "General English", "Business"],
  ["Canvas", "Figma", "Prototyping"], ["User Research", "Wireframe", "Design System"],
];

export const toPersianNum = function(n) {
  return String(n).padStart(2, "0").replace(/\d/g, function(d) {
    return ["\u06f0","\u06f1","\u06f2","\u06f3","\u06f4","\u06f5","\u06f6","\u06f7","\u06f8","\u06f9"][d];
  });
};

export const COURSE_SLUGS = [
  "react-bootcamp",
  "frontend-react",
  "seo-pro",
  "graphic-bootcamp",
  "video-motion",
  "ielts-bootcamp",
  "mba-business",
  "ui-ux",
];
