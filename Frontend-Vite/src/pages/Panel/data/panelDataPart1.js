export const panelUser = {
  firstName: "پارسا",
  fullName: "پارسا محمدی",
  initial: "پ",
  role: "دانشجوی کارشناسی ارشد · هوش مصنوعی",
  greeting: "امروز ۳ کلاس زنده و ۲ تکلیف مهلت‌دار داری.",
  tags: ["Python", "Machine Learning", "NLP", "+۴"],
  stats: [
    { num: "۲۸", label: "دوره" },
    { num: "۱۴", label: "گواهی" },
    { num: "۲,۴۸۰", label: "امتیاز" },
  ],
  level: { title: "محقق برتر", number: "۷", pointsToNext: "۵۲۰ امتیاز تا سطح بعد", pct: 72 },
};

export const streak = {
  days: "۱۲",
  hint: "۴۵ دقیقه دیگه مطالعه کن تا رکورد این هفته‌ات رو بشکنی.",
  week: [
    { on: true }, { on: true }, { on: true }, { on: true },
    { on: true }, { on: false }, { on: false },
  ],
};

export const kpis = [
  { label: "درس‌های تکمیل‌شده", value: "۲۸", chip: "+۴" },
  { label: "ساعت مطالعه این ماه", value: "۴۲", chip: "۸۵٪" },
  { label: "میانگین نمرات", value: "۱۸.۴", chip: "A", dark: true },
  { label: "امتیاز رتبه‌بندی", value: "۲,۴۸۰" },
];

export const learning = [
  {
    title: "ساختمان داده و الگوریتم",
    meta: "فصل ۴ از ۷ · ۲۴ دقیقه باقی‌مانده",
    progress: 62,
    cta: "ادامه",
    image: "/assets/StatCard/blue.png",
  },
  {
    title: "مبانی هوش مصنوعی",
    meta: "فصل ۲ از ۸ · تکلیف باز",
    progress: 28,
    cta: "ادامه",
    image: "/assets/StatCard/green.png",
  },
  {
    title: "معماری کامپیوتر",
    meta: "فصل ۶ از ۶ · آماده امتحان",
    progress: 100,
    cta: "امتحان",
    done: true,
    image: "/assets/StatCard/pink.png",
  },
  {
    title: "آمار و احتمال کاربردی",
    meta: "فصل ۱ از ۵ · تازه شروع کردی",
    progress: 12,
    cta: "ادامه",
    image: "/assets/StatCard/yellow.png",
  },
];

export const schedule = [
  { day: "۱۴", month: "شهریور", title: "کلاس زنده: الگوریتم‌های گراف", time: "۱۰:۳۰ · دکتر رستمی", today: true },
  { day: "۱۴", month: "شهریور", title: "مهلت تحویل تمرین AI", time: "۲۳:۵۹ · تمرین ۴" },
  { day: "۱۵", month: "شهریور", title: "گروه مطالعه معماری", time: "۱۹:۰۰ · Google Meet" },
  { day: "۱۶", month: "شهریور", title: "وبینار: مصاحبه شغلی تکنیکال", time: "۲۰:۰۰ · رایگان" },
];

export const weeklyActivity = [
  { day: "شنبه", hours: "۲", pct: 45 },
  { day: "یکشنبه", hours: "۳.۵", pct: 70 },
  { day: "دوشنبه", hours: "۴.۵", pct: 90, hi: true },
  { day: "سه‌شنبه", hours: "۲.۵", pct: 55 },
  { day: "چهارشنبه", hours: "۴.۲", pct: 85, hi: true },
  { day: "پنجشنبه", hours: "۱.۵", pct: 35 },
  { day: "جمعه", hours: "۱", pct: 20 },
];

export const skills = [
  { name: "یادگیری ماشین", pct: 88 },
  { name: "پردازش زبان طبیعی", pct: 72 },
  { name: "شبکه عصبی عمیق", pct: 64 },
  { name: "آمار و احتمال", pct: 82 },
  { name: "کامپیوتر ویژن", pct: 45 },
];

export const badges = [
  { label: "اولین ۱۰۰٪", cls: "b1" },
  { label: "۳۰ روز پیاپی", cls: "b2" },
  { label: "سرعتی", cls: "b3" },
  { label: "قهرمان ماه", cls: "b1" },
  { label: "کتاب‌خوان", cls: "b2" },
  { label: "?", cls: "locked" },
  { label: "?", cls: "locked" },
  { label: "?", cls: "locked" },
];
