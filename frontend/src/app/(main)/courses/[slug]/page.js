import { Suspense } from "react";
import CourseSingleClient from "./CourseSingleClient";
import { getCourseBySlugOrId } from "@/services/courseService";

export default async function SingleCourseRoute({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug || "");
  const initialCourse = await getCourseBySlugOrId(decodedSlug).catch(() => null);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans text-stone-500">در حال بارگذاری دوره...</div>}>
      <CourseSingleClient slug={decodedSlug} initialCourse={initialCourse} />
    </Suspense>
  );
}
