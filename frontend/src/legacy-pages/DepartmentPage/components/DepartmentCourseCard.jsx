import Link from "next/link";
import { Bookmark, MapPin, Monitor } from "lucide-react";
import { DEPT_PERSONA } from "@/data/departments.js";
import { toggleWishlist } from "@/data/panelStore.js";
import { isWishlisted } from "@/data/selectors.js";
import { CourseIcon, StarIcon, ClockIcon, UsersIcon } from "./DepartmentIcons.jsx";

export const getSlugForDeptCourse = (c) => {
  if (c?.slug) return c.slug;
  if (c?._id) return c._id;
  if (c?.id && !String(c.id).startsWith("dept-c-")) return c.id;
  return c?._id || c?.id || "";
};

export default function DepartmentCourseCard({ c, rot, persona: cardPersona, store }) {
  const cardTheme = cardPersona || DEPT_PERSONA[c.department] || DEPT_PERSONA.languages;
  const slug = getSlugForDeptCourse(c);
  const isSaved = isWishlisted(slug, store);
  const isOnline = c.mode === "online" || c.mode === "غیرحضوری" || c.mode === "غیر حضوری";

  return (
    <Link
      className="dp-card"
      data-dept={cardTheme.id}
      href={`/courses/${slug}`}
      style={{
        "--rot": `rotate(${rot}deg)`,
        "--dp": cardTheme.colorVar,
        "--dp-light": cardTheme.lightVar,
        "--dp-dark": cardTheme.darkVar,
        "--dp-text": cardTheme.id === "it" ? "var(--white)" : "var(--ink)",
      }}
    >
      <div className="dp-card-cover">
        <img className="dp-cover-pattern" src={cardTheme.pattern} alt="" aria-hidden="true" />
        {c.tag && <span className="dp-card-tag">{c.tag}</span>}
        <button
          type="button"
          className={`course-card-save-btn${isSaved ? " is-saved" : ""}`}
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
        <CourseIcon id={c.ic} size={34} />
      </div>
      <div className="dp-card-body">
        <div className="dp-card-top-row">
          <div className="dp-card-cat">{c.cat}</div>
          <span className={`course-mode-badge ${isOnline ? "online" : "in-person"}`}>
            {isOnline ? <Monitor size={12} strokeWidth={2.4} /> : <MapPin size={12} strokeWidth={2.4} />}
            <span>{isOnline ? "غیر حضوری" : "حضوری"}</span>
          </span>
        </div>
        <div className="dp-card-title">{c.title}</div>
        <div className="dp-card-inst">
          <span className="dp-av">{c.inst.charAt(0)}</span>
          <span>{c.inst}</span>
        </div>
        <div className="dp-card-meta">
          <span className="dp-rate"><StarIcon /> {c.rating}</span>
          <span><ClockIcon /> {c.hours}</span>
          <span><UsersIcon /> {c.students}</span>
        </div>
        <div className="dp-card-foot">
          {c.free ? (
            <span className="dp-free">رایگان</span>
          ) : (
            <span className="dp-price">
              {c.old && <s>{c.old}</s>}
              <b>{c.price}</b>
            </span>
          )}
          <span
            className="dp-card-btn"
          >
            مشاهده
          </span>
        </div>
      </div>
    </Link>
  );
}
