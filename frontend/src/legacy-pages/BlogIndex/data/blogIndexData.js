import { TONES } from "../components/BlogIcons.jsx";
import { Rocket, Lightbulb, Smartphone } from "lucide-react";

export const POPULAR_TAGS = ["استارتاپ", "مصاحبه", "داستان", "راهنما", "ابزار"];

export const CATEGORIES = [
  { id: "all",       label: "همه",           color: "var(--ink)",      bg: "#fff",             count: 128 },
  { id: "startup",   label: "استارتاپ",      color: "var(--teal)",     bg: "var(--teal-light)", count: 42 },
  { id: "boys",      label: "مدرسه پسران",   color: "var(--navy)",     bg: "var(--bg-lavender)", count: 28 },
  { id: "girls",     label: "مدرسه دختران",  color: "var(--accent)",   bg: "var(--bg-blush)",   count: 24 },
  { id: "college",   label: "کالج و دانشگاه", color: "var(--college-dark)", bg: "var(--college-light)", count: 19 },
  { id: "interview", label: "مصاحبه",        color: "var(--navy)",     bg: "var(--bg-lavender)", count: 15 },
  { id: "tips",      label: "راهنما و ترفند", color: "var(--teal-dark)", bg: "var(--bg-mint)",    count: 22 },
];

export const ROTS = ["-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg"];

export const POSTS = [
  { id: 1, title: "چطور از هیچ، یک ایده استارتاپی پیدا کنیم؟", excerpt: "روش‌شناسی یافتن ایده‌های نو از دل مسائل روزمره و دردهای واقعی مردم.", tag: "استارتاپ", tagColor: "primary", author: "مهدی رضایی", date: "۱۲ خرداد", readTime: "۶ دقیقه", reads: "۴.۲K", size: "lg" },
  { id: 2, title: "مصاحبه با فاطمه، دانش‌آموز سال چهارم دختران", excerpt: "قصه‌ی راه‌اندازی یک کسب‌وکار آنلاین در دوران دبیرستان.", tag: "دختران", tagColor: "girl", author: "نگین کریمی", date: "۱۰ خرداد", readTime: "۹ دقیقه", reads: "۳.۸K", size: "sm" },
  { id: 3, title: "راهنمای کامل پیچ کردن جلوی سرمایه‌گذار", excerpt: "۱۰ نکته طلایی که هر بنیان‌گذار جوان باید بداند.", tag: "کالج", tagColor: "third", author: "رضا احمدی", date: "۹ خرداد", readTime: "۱۲ دقیقه", reads: "۵.۱K", size: "sm" },
  { id: 4, title: "برنامه‌نویسی یاد بگیرم یا بازاریابی؟", excerpt: "مقایسه‌ی دو مسیر شغلی داغ برای نوجوانان امروز، از زبان کسی که هر دو را تجربه کرده.", tag: "راهنما", tagColor: "sec", author: "علی محمدی", date: "۸ خرداد", readTime: "۸ دقیقه", reads: "۶.۷K", size: "md" },
  { id: 5, title: "چرا شکست، اولین گام موفقیت است", excerpt: "داستان سه بنیان‌گذار جوان که قبل از موفقیت، بارها زمین خوردند.", tag: "مصاحبه", tagColor: "girl", author: "سارا اکبری", date: "۶ خرداد", readTime: "۷ دقیقه", reads: "۳.۲K", size: "md" },
  { id: 6, title: "ابزارهای رایگانی که هر استارتاپی باید بشناسد", excerpt: "لیست جامع از فیگما تا نوشن؛ کاربردی و رایگان.", tag: "استارتاپ", tagColor: "primary", author: "محمد کریمی", date: "۴ خرداد", readTime: "۵ دقیقه", reads: "۸.۳K", size: "sm" },
  { id: 7, title: "زندگی روزانه یک دانش‌آموز رکادی چطور می‌گذرد؟", excerpt: "یک روز کامل از صبح تا شب، از کلاس درس تا کارگاه ایده‌پردازی.", tag: "پسران", tagColor: "sec", author: "امیر حسینی", date: "۳ خرداد", readTime: "۴ دقیقه", reads: "۲.۹K", size: "sm" },
  { id: 8, title: "راز درست‌کردن یک تیم برنده", excerpt: "چطور هم‌بنیان‌گذارت را انتخاب کنی؟", tag: "راهنما", tagColor: "third", author: "زهرا رضایی", date: "۱ خرداد", readTime: "۶ دقیقه", reads: "۴.۵K", size: "md" },
  { id: 9, title: "از دانش‌آموز تا کارآفرین: ۵ سال بعد چه اتفاقی می‌افتد؟", excerpt: "گفت‌وگو با فارغ‌التحصیلان اولین دوره رکاد.", tag: "مصاحبه", tagColor: "primary", author: "حسین محمدی", date: "۲۹ اردیبهشت", readTime: "۱۱ دقیقه", reads: "۷.۱K", size: "lg" },
  { id: 10, title: "AI را در استارتاپت به کار بگیر", excerpt: "راهنمای عملی استفاده از هوش مصنوعی.", tag: "ابزار", tagColor: "sec", author: "فرزاد نوری", date: "۲۷ اردیبهشت", readTime: "۹ دقیقه", reads: "۹.۲K", size: "sm" },
  { id: 11, title: "داستان یک شکست: چرا استارتاپم بسته شد", excerpt: "اعتراف بی‌پرده از یک بنیان‌گذار.", tag: "داستان", tagColor: "girl", author: "مریم صادقی", date: "۲۵ اردیبهشت", readTime: "۷ دقیقه", reads: "۵.۸K", size: "sm" },
  { id: 12, title: "MVP چیست و چطور می‌سازیم؟", excerpt: "قدم‌به‌قدم ساخت اولین نسخه از محصول.", tag: "کالج", tagColor: "third", author: "ناصر پورقاسم", date: "۲۲ اردیبهشت", readTime: "۱۰ دقیقه", reads: "۶.۰K", size: "md" },
];

export const TAG_COLORS = {
  primary: { ...TONES.teal },
  sec: { ...TONES.navy },
  girl: { ...TONES.magenta },
  third: { ...TONES.amber },
};

export const TAG_TONE = {
  primary: "teal",
  sec: "navy",
  girl: "magenta",
  third: "amber",
};

export const CARD_ROTS = ["-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg", "-1deg", "1deg"];

export const PAGE_SIZE = 9;

export const CAT_TAGS = {
  all: null,
  startup: ["استارتاپ", "ابزار"],
  boys: ["پسران"],
  girls: ["دختران"],
  college: ["کالج"],
  interview: ["مصاحبه", "داستان"],
  tips: ["راهنما"],
};

export const TRENDING_ITEMS = [
  { rank: 1, title: "راز موفقیت استارتاپ‌های نوجوان که هیچ‌کس بهت نمی‌گه", author: "علی رضایی", reads: "۱۸.۲K", tone: "magenta", rot: "-1deg", icon: Rocket },
  { rank: 2, title: "۷ اشتباه رایج در پیچ‌دک که حتی حرفه‌ای‌ها می‌کنند", author: "سارا محمدی", reads: "۱۴.۷K", tone: "teal", rot: "1deg", icon: Lightbulb },
  { rank: 3, title: "از صفر تا اپلیکیشن: مسیر یک دانش‌آموز رکادی", author: "محمد امینی", reads: "۱۱.۹K", tone: "amber", rot: "-1deg", icon: Smartphone },
];

export const AUTHORS_LIST = [
  { name: "نگین کریمی", role: "سردبیر مجله", posts: 32, tone: "magenta", initials: "ن.ک", rot: "-1deg" },
  { name: "مهدی رضایی", role: "نویسنده استارتاپ", posts: 24, tone: "teal", initials: "م.ر", rot: "1deg" },
  { name: "سارا اکبری", role: "مصاحبه‌گر", posts: 18, tone: "amber", initials: "س.ا", rot: "-1deg" },
  { name: "علی محمدی", role: "مربی راهنما", posts: 15, tone: "navy", initials: "ع.م", rot: "1deg" },
];
