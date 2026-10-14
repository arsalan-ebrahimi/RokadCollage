import { faToNum } from "../components/DepartmentIcons.jsx";

const TOPIC_MAP = {
  "گرامر انگلیسی": ["گرامر", "grammar", "پایه", "انگلیسی"],
  "مکالمه انگلیسی": ["مکالمه", "speaking", "محیط کار", "پزشکان", "انگلیسی"],
  "آیلتس": ["ielts", "academic", "آیلتس", "speaking"],
  "تافل": ["toefl", "ibt", "تافل"],
  "لغات ضروری": ["لغات", "vocabulary", "گرامر", "essay"],
  "تلفظ": ["تلفظ", "speaking", "مکالمه", "pronunciation"],
  "business english": ["business", "مذاکره", "مکاتبات", "تجاری"],
  "ترجمه": ["ترجمه", "translation"],
  "آلمانی": ["آلمانی", "german", "deutsch"],
  "اسپانیایی": ["اسپانیایی", "spanish", "español"],
  "دیجیتال مارکتینگ": ["دیجیتال مارکتینگ", "مارکتینگ", "سئو", "پرفورمنس", "تبلیغات", "گوگل"],
  "کارآفرینی": ["کارآفرینی", "mba", "ایده", "استارتاپ", "pitch deck"],
  "mba": ["mba", "کارآفرینی", "مدیریت"],
  "فروش و مذاکره": ["فروش", "مذاکره", "b2b", "مهارت‌های فروش"],
  "رهبری": ["رهبری", "مدیریت", "چابک", "تیم"],
  "حسابداری": ["حسابداری", "مالی", "صورت‌های مالی"],
  "مدیریت پروژه": ["مدیریت پروژه", "scrum", "okr", "مدیریت"],
  "برندینگ": ["برند", "برندینگ", "کانتنت"],
  "مالی": ["مالی", "حسابداری", "سرمایه‌گذاران", "استارتاپ"],
  "منابع انسانی": ["رهبری", "مدیریت", "تیم", "hr"],
  "برنامه‌نویسی": ["برنامه‌نویسی", "react", "node", "python", "laravel", "flutter", "sql", "html", "typescript", "کد"],
  "فرانت‌اند": ["فرانت‌اند", "react", "next", "html", "css", "typescript"],
  "بک‌اند": ["بک‌اند", "node", "laravel", "php", "api"],
  "پایتون و ai": ["python", "ai", "علم داده", "ماشین", "پرامپت", "داده"],
  "devops": ["devops", "docker", "kubernetes", "ci/cd", "actions"],
  "امنیت": ["امنیت", "owasp", "security", "soc"],
  "موبایل": ["موبایل", "flutter", "react native", "ios", "اندروید"],
  "دیتابیس": ["دیتابیس", "sql", "داده"],
  "سئو فنی": ["سئو", "vitals", "search"],
  "react": ["react", "next", "react native", "فرانت‌اند"],
  "مشاوره تحصیلی": ["مشاوره", "تحصیلی", "برنامه‌ریزی", "هدایت"],
  "هدایت شغلی": ["هدایت", "شغلی", "استعداد", "کوچینگ"],
  "استعدادیابی": ["استعداد", "استعدادیابی", "خودشناسی"],
  "توسعه فردی": ["توسعه", "فردی", "کوچینگ", "هدف"],
  "کوچینگ": ["کوچینگ", "منتورینگ", "هدایت"],
};

export function matchesTopic(course, topic) {
  if (!topic) return true;
  const t = topic.toLowerCase().trim();
  const cCat = (course.cat || "").toLowerCase();
  const cTitle = (course.title || "").toLowerCase();
  const cTag = (course.tag || "").toLowerCase();

  if (cCat.includes(t) || cTitle.includes(t) || cTag.includes(t)) return true;

  const keywords = TOPIC_MAP[t] || [t];
  return keywords.some((k) => cCat.includes(k) || cTitle.includes(k) || cTag.includes(k));
}

export function filterCourses({ dept, selectedTopic, modeF, ratingSet, durSet, typeF, sort }) {
  const combined = [...(dept.popular || []), ...(dept.newest || [])];
  const seen = new Set();
  let list = [];
  for (const item of combined) {
    const key = item._id || item.id || item.slug || item.title;
    if (!seen.has(key)) {
      seen.add(key);
      list.push(item);
    }
  }
  if (selectedTopic) {
    list = list.filter((c) => matchesTopic(c, selectedTopic));
  }
  if (modeF === "in-person") {
    list = list.filter((c) => c.mode === "in-person" || c.mode === "onsite" || c.mode === "حضوری");
  }
  if (modeF === "online") {
    list = list.filter((c) => c.mode === "online" || c.mode === "غیرحضوری" || c.mode === "غیر حضوری");
  }
  if (ratingSet.size) {
    const minR = Math.min(...ratingSet);
    list = list.filter((c) => faToNum(c.rating) >= minR);
  }
  if (durSet.size === 1) {
    if (durSet.has("short")) list = list.filter((c) => faToNum(c.hours) < 20);
    else list = list.filter((c) => faToNum(c.hours) >= 20);
  }
  if (typeF === "free") list = list.filter((c) => c.free);
  if (typeF === "off") list = list.filter((c) => c.old);
  if (sort === "popular") list.sort((a, b) => faToNum(b.students) - faToNum(a.students));
  if (sort === "rating") list.sort((a, b) => faToNum(b.rating) - faToNum(a.rating));
  if (sort === "cheap") list.sort((a, b) => faToNum(a.price) - faToNum(b.price));
  return list;
}
