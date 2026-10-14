import { ONLINE_COURSES_PART1 } from "./data/onlineCoursesPart1.js";
import { ONLINE_COURSES_PART2 } from "./data/onlineCoursesPart2.js";
import { ONLINE_COURSES_PART3 } from "./data/onlineCoursesPart3.js";
import { BOOTCAMP_COURSES_PART1 } from "./data/bootcampCoursesPart1.js";
import { BOOTCAMP_COURSES_PART2 } from "./data/bootcampCoursesPart2.js";

export const ALL_COURSES = {
  ...ONLINE_COURSES_PART1,
  ...ONLINE_COURSES_PART2,
  ...ONLINE_COURSES_PART3,
  ...BOOTCAMP_COURSES_PART1,
  ...BOOTCAMP_COURSES_PART2,
};

export function getCourseBySlug(slug) {
  if (!slug) return ALL_COURSES["ui-ux"];
  const cleanSlug = slug.toLowerCase().replace(/^#(?:course|bootcamp)\/?/, "").replace(/\//g, "");
  
  if (ALL_COURSES[cleanSlug]) {
    return ALL_COURSES[cleanSlug];
  }

  // تلاش برای مچ کردن دوره‌های حضوری و بوت‌کمپ‌ها
  if (cleanSlug.includes("bootcamp") || cleanSlug.includes("حضوری") || cleanSlug.includes("inperson") || cleanSlug.includes("in-person")) {
    if (cleanSlug.includes("react") || cleanSlug.includes("frontend") || cleanSlug.includes("کدنویسی") || cleanSlug.includes("web")) return ALL_COURSES["react-bootcamp"];
    if (cleanSlug.includes("ux") || cleanSlug.includes("ui") || cleanSlug.includes("طراحی") || cleanSlug.includes("figma")) return ALL_COURSES["ux-bootcamp"];
    if (cleanSlug.includes("graphic") || cleanSlug.includes("گرافیک") || cleanSlug.includes("فتوشاپ") || cleanSlug.includes("photoshop")) return ALL_COURSES["graphic-bootcamp"];
    if (cleanSlug.includes("mba") || cleanSlug.includes("کارآفرینی") || cleanSlug.includes("کسب‌وکار") || cleanSlug.includes("استارتاپ")) return ALL_COURSES["mba-bootcamp"];
    if (cleanSlug.includes("ielts") || cleanSlug.includes("آیلتس") || cleanSlug.includes("انگلیسی") || cleanSlug.includes("مکالمه") || cleanSlug.includes("زبان")) return ALL_COURSES["ielts-bootcamp"];
    if (cleanSlug.includes("leader") || cleanSlug.includes("رهبری") || cleanSlug.includes("مدیریت")) return ALL_COURSES["leadership-bootcamp"];
    if (cleanSlug.includes("sales") || cleanSlug.includes("فروش") || cleanSlug.includes("مذاکره")) return ALL_COURSES["sales-bootcamp"];
    if (cleanSlug.includes("french") || cleanSlug.includes("فرانسه")) return ALL_COURSES["french-bootcamp"];
    if (cleanSlug.includes("devops") || cleanSlug.includes("docker") || cleanSlug.includes("داکر") || cleanSlug.includes("کوبرنتیز")) return ALL_COURSES["devops-bootcamp"];
    return ALL_COURSES["react-bootcamp"];
  }

  // تلاش برای مچ کردن بر اساس کلمات کلیدی
  if (cleanSlug.includes("wordpress") || cleanSlug.includes("وردپرس")) return ALL_COURSES["wordpress-pro"];
  if (cleanSlug.includes("react") || cleanSlug.includes("frontend") || cleanSlug.includes("فرانت")) return ALL_COURSES["frontend-react"];
  if (cleanSlug.includes("seo") || cleanSlug.includes("سئو")) return ALL_COURSES["seo-pro"];
  if (cleanSlug.includes("graphic") || cleanSlug.includes("photoshop") || cleanSlug.includes("گرافیک")) return ALL_COURSES["graphic-photoshop"];
  if (cleanSlug.includes("video") || cleanSlug.includes("motion") || cleanSlug.includes("تدوین")) return ALL_COURSES["video-motion"];
  if (cleanSlug.includes("ielts") || cleanSlug.includes("english") || cleanSlug.includes("زبان")) return ALL_COURSES["ielts-mastery"];
  if (cleanSlug.includes("mba") || cleanSlug.includes("business") || cleanSlug.includes("مدیریت")) return ALL_COURSES["mba-business"];

  const base = ALL_COURSES["ui-ux"];
  const formattedTitle = decodeURIComponent(cleanSlug).replace(/-/g, " ");
  return {
    ...base,
    slug: cleanSlug,
    title: `دوره تخصصی ${formattedTitle}`,
    lede: `دوره جامع و پروژه‌محور ${formattedTitle} در کالج رکاد؛ همراه با اساتید مجرب و پروژه‌های واقعی برای ورود به بازار کار.`,
  };
}

export const courseSingle = ALL_COURSES["ui-ux"];
