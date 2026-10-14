import React from "react";

export const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

export const TONES = {
  amber:   { solid: "var(--college)",     dark: "var(--college-dark)",  tint: "var(--college-light)", darker: "var(--college-darker)" },
  navy:    { solid: "var(--navy-alt)",    dark: "var(--navy-hover)",    tint: "var(--bg-lavender)",   darker: "var(--navy-hover)" },
  magenta: { solid: "var(--accent)",      dark: "var(--female-dark)",   tint: "var(--bg-blush)",      darker: "var(--female-dark)" },
  teal:    { solid: "var(--teal)",        dark: "var(--teal-dark)",     tint: "var(--teal-light)",    darker: "#1f413d" },
};

export const coverBg = (tone, deg = 135) => {
  const c = TONES[tone] || TONES.amber;
  if (tone === "amber") {
    return `linear-gradient(${deg}deg, #ffd44d 0%, var(--college) 50%, var(--college-dark) 100%)`;
  }
  return `linear-gradient(${deg}deg, ${c.solid} 0%, ${c.dark} 100%)`;
};

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" };

export const I = {
  Search: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>,
  ArrowLeft: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  ArrowRight: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M19 12H5M12 5l7 7-7 7" /></svg>,
  Clock: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  Eye: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>,
  Bookmark: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-4 7 4z" /></svg>,
  Chat: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  Flame: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>,
  Rocket: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  Book: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  Sparkle: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6L12 2z" /></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12" /></svg>,
  X: (p) => <svg viewBox="0 0 24 24" {...S} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
};
