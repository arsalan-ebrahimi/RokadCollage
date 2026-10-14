import React from "react";
import { HelpCircle, GraduationCap, MessageSquare } from "lucide-react";

export const searchableData = [
  { section: "دوره‌ها", title: "طراحی سایت با وردپرس", text: "از آشنایی با وردپرس تا طراحی سایت حرفه‌ای", link: "#course/wordpress-pro", slug: "wordpress-pro", tags: "وردپرس wordpress وب طراحی سایت", image: "/assets/StatCard/blue.png" },
  { section: "دوره‌ها", title: "برنامه‌نویسی فرانت‌اند", text: "با HTML، CSS و JavaScript وارد دنیای توسعه وب شو", link: "#course/frontend-react", slug: "frontend-react", tags: "javascript react فرانت‌اند frontend html css", image: "/assets/StatCard/teal.png" },
  { section: "دوره‌ها", title: "سئو و بهینه‌سازی سایت", text: "بهینه‌سازی سایت برای موتورهای جست‌وجو", link: "#course/seo-pro", slug: "seo-pro", tags: "seo سئو بهینه‌سازی google analytics", image: "/assets/StatCard/green.png" },
  { section: "دوره‌ها", title: "فتوشاپ و طراحی گرافیک", text: "اصول طراحی و Photoshop", link: "#course/graphic-photoshop", slug: "graphic-photoshop", tags: "فتوشاپ photoshop گرافیک طراحی illustrator", image: "/assets/StatCard/pink.png" },
  { section: "دوره‌ها", title: "تدوین و موشن گرافیک", text: "Premiere و After Effects", link: "#course/video-motion", slug: "video-motion", tags: "موشن تدوین premiere after effects ویدیو", image: "/assets/StatCard/magenta.png" },
  { section: "دوره‌ها", title: "زبان انگلیسی (IELTS)", text: "از پایه تا آمادگی آیلتس", link: "#course/ielts-mastery", slug: "ielts-mastery", tags: "زبان انگلیسی ielts آیلتس english", image: "/assets/StatCard/yellow.png" },
  { section: "دوره‌ها", title: "MBA و مهارت‌های مدیریتی", text: "مدیریت و کسب‌وکار", link: "#course/mba-business", slug: "mba-business", tags: "mba مدیریت کسب‌وکار بازار کار", image: "/assets/StatCard/orange.png" },
  { section: "دوره‌ها", title: "طراحی رابط کاربری UI/UX", text: "فیگما و پروتوتایپ", link: "#course/ui-ux", slug: "ui-ux", tags: "ui ux فیگما طراحی تجربه", image: "/assets/StatCard/blue.png" },
  { section: "دپارتمان‌ها", title: "دپارتمان فناوری اطلاعات (IT)", text: "مسیرهای تخصصی وب، برنامه‌نویسی و سئو", link: "#dept/it", tags: "دپارتمان it وب برنامه‌نویسی", image: "/assets/StatCard/blue.png" },
  { section: "دپارتمان‌ها", title: "دپارتمان دیزاین و گرافیک", text: "طراحی لوگو، موشن گرافیک و فتوشاپ", link: "#dept/design", tags: "دپارتمان گرافیک دیزاین هنر", image: "/assets/StatCard/pink.png" },
  { section: "دپارتمان‌ها", title: "دپارتمان زبان و MBA", text: "آیلتس، مکالمه و مهارت‌های نوین کسب‌وکار", link: "#dept/business", tags: "دپارتمان زبان انگلیسی mba کسب و کار", image: "/assets/StatCard/yellow.png" },
  { section: "دپارتمان‌ها", title: "دپارتمان زبان‌های خارجی", text: "انگلیسی، فرانسه، آلمانی و مکالمه", link: "#dept/languages", tags: "دپارتمان زبان خارجی مکالمه", image: "/assets/StatCard/green.png" },
  { section: "وبلاگ", title: "از کجا یادگیری یک مهارت را شروع کنیم؟", text: "مسیر یادگیری مهارت تخصصی", link: "#article/از-کجا-یادگیری-یک-مهارت-تخصصی-را-شروع-کنیم؟", tags: "یادگیری مهارت شروع مسیر شغلی", image: "/assets/StatCard/blue.png" },
  { section: "وبلاگ", title: "۴ دپارتمان کالج رکاد", text: "فناوری اطلاعات، گرافیک، زبان یا MBA؟", link: "#article/۴-دپارتمان-کالج-رکاد؛-کدام-مسیر-برای-تو-بهتر-است؟", tags: "دپارتمان مسیر رشته", image: "/assets/StatCard/yellow.png" },
  { section: "وبلاگ", title: "یادگیری پروژه‌محور", text: "پروژه‌های واقعی سرعت یادگیری را بالا می‌برد", link: "#article/چرا-یادگیری-پروژه‌محور-مسیر-را-کوتاه‌تر-می‌کند؟", tags: "پروژه‌محور پروژه تمرین عملی", image: "/assets/StatCard/teal.png" },
  { section: "سوالات", title: "آیا پیش‌نیاز لازم دارم؟", text: "خیر. از سطح مقدماتی شروع می‌شود", link: "#faq", tags: "پیش‌نیاز مبتدی شروع", icon: <HelpCircle size={18} /> },
  { section: "سوالات", title: "مدرک دریافت می‌کنم؟", text: "گواهینامه داخلی با کد QR", link: "#faq", tags: "مدرک گواهینامه certificate", icon: <GraduationCap size={18} /> },
  { section: "سوالات", title: "پشتیبانی آموزشی دارم؟", text: "منتور اختصاصی و پاسخ‌گویی زیر ۲۴ ساعت", link: "#faq", tags: "پشتیبانی منتور استاد", icon: <MessageSquare size={18} /> },
  { section: "نظرات", title: "سارا (وردپرس)", text: "از پایه شروع کردم، الان فریلنسرم", link: "#comments", tags: "تجربه نظر هنرجو وردپرس فریلنسر", image: "/assets/StatCard/pink.png", avatarText: "س" },
  { section: "نظرات", title: "امیر (فرانت‌اند)", text: "بازار کار لازم داشتم، الان در اسنپ", link: "#comments", tags: "تجربه نظر هنرجو فرانت‌اند استخدام", image: "/assets/StatCard/blue.png", avatarText: "ا" },
  { section: "نظرات", title: "نگار (گرافیک)", text: "از صفر تا حرفه‌ای عالی بود", link: "#comments", tags: "تجربه نظر هنرجو گرافیک فریلنسر", image: "/assets/StatCard/magenta.png", avatarText: "ن" },
  { section: "نظرات", title: "مریم (زبان)", text: "آیلسم رو ۶.۵ گرفتم", link: "#comments", tags: "تجربه نظر هنرجو زبان ielts", image: "/assets/StatCard/yellow.png", avatarText: "م" },
];

export function matchItem(item, query) {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const hay = (item.title + " " + item.text + " " + item.tags + " " + item.section).toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w));
}

export const sectionBadge = {
  "دوره‌ها": { bg: "var(--college-light)", fg: "var(--college-darker)" },
  "دپارتمان‌ها": { bg: "var(--bg-college-tint)", fg: "var(--college-darker)" },
  "وبلاگ": { bg: "var(--bg-lavender)", fg: "var(--navy)" },
  "سوالات": { bg: "var(--bg-college-tint)", fg: "var(--college-darker)" },
  "نظرات": { bg: "var(--teal-light)", fg: "var(--teal-dark)" },
};
