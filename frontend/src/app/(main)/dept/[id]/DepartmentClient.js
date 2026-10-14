"use client";

import DepartmentPage from "@/legacy-pages/DepartmentPage/index.jsx";

export default function DepartmentClient({ deptId, initialCourses }) {
  return <DepartmentPage deptId={deptId} initialCourses={initialCourses} />;
}
