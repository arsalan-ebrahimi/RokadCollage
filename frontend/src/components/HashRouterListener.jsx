"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HashRouterListener() {
  const router = useRouter();

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;
      if (!hash) return;

      // 1. Articles / Blog
      if (hash.startsWith("#article/")) {
        const slug = hash.replace("#article/", "");
        router.push(`/blog/${slug}`);
        return;
      }
      if (hash === "#blog-index" || hash === "#blog") {
        router.push("/blog");
        return;
      }

      // 2. Courses
      if (hash.startsWith("#course/") || hash.startsWith("#bootcamp/")) {
        const slug = hash.replace(/^#(?:course|bootcamp)\//, "");
        router.push(`/courses/${slug}`);
        return;
      }
      if (hash.startsWith("#courses-index")) {
        router.push("/courses");
        return;
      }

      // 3. Departments
      if (hash.startsWith("#dept/")) {
        const id = hash.replace("#dept/", "");
        router.push(`/dept/${id}`);
        return;
      }

      // 4. Panel & Auth
      if (hash.startsWith("#panel")) {
        router.push("/");
        return;
      }
      if (hash === "#auth" || hash === "#auth/register") {
        router.push("/auth");
        return;
      }

      // 5. In-page anchors (e.g. #hero, #about, #faq, #comments)
      if (hash.startsWith("#") && !hash.includes("/")) {
        const id = hash.slice(1);
        if (id !== "consult") {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("hashchange", handleNavigation);
    handleNavigation();

    return () => window.removeEventListener("hashchange", handleNavigation);
  }, [router]);

  return null;
}
