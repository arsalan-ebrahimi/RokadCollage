"use client";

import Hero from "@/legacy-pages/Home/sections/Hero/index.jsx";
import PromoBenefits from "@/legacy-pages/Home/sections/PromoBenefits/index.jsx";
import Departments from "@/legacy-pages/Home/sections/Departments/index.jsx";
import About from "@/legacy-pages/Home/sections/About/index.jsx";
import StatsTicker from "@/legacy-pages/Home/sections/StatsTicker/index.jsx";
import Courses from "@/legacy-pages/Home/sections/Courses/index.jsx";
import CourseCta from "@/legacy-pages/Home/sections/CourseCta/index.jsx";
import Faq from "@/legacy-pages/Home/sections/Faq/index.jsx";
import Comments from "@/legacy-pages/Home/sections/Comments/index.jsx";
import Blogs from "@/legacy-pages/Home/sections/Blogs/index.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBenefits />
      <Departments layout="row3" />
      <StatsTicker />
      <About />
      <Courses />
      <CourseCta />
      <Faq />
      <Comments />
      <Blogs />
    </>
  );
}
