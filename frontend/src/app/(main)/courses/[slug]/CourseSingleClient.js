"use client";

import CourseSingle from "@/legacy-pages/CourseSingle/index.jsx";

export default function CourseSingleClient({ slug, initialCourse }) {
  return <CourseSingle slug={slug} initialCourse={initialCourse} />;
}
