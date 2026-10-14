export const initialUser = {
  firstName: "پارسا",
  fullName: "پارسا محمدی",
  initial: "پ",
  role: "دانشجوی کارشناسی ارشد · هوش مصنوعی",
  bio: "علاقه‌مند به یادگیری عمیق، پردازش زبان طبیعی و بهینه‌سازی الگوریتم‌ها. در حال آماده‌سازی برای ورود به بازار کار تخصصی.",
  greeting: "امروز ۳ کلاس زنده و ۲ تکلیف مهلت‌دار داری.",
  tags: ["Python", "Machine Learning", "NLP", "React", "Data Structures"],
  stats: [
    { num: "۴", label: "دوره" },
    { num: "۴", label: "گواهی" },
    { num: "۲,۴۸۰", label: "امتیاز" },
  ],
  level: { title: "محقق برتر", number: 7, points: 2480, pointsToNext: "۵۲۰ امتیاز تا سطح بعد", pct: 72 },
};

export const initialStreak = {
  days: 12,
  todayRecorded: false,
  hint: "۴۵ دقیقه دیگه مطالعه کن تا رکورد این هفته‌ات رو بشکنی.",
  week: [
    { day: "ش", on: true },
    { day: "ی", on: true },
    { day: "د", on: true },
    { day: "س", on: true },
    { day: "چ", on: true },
    { day: "پ", on: false },
    { day: "ج", on: false },
  ],
};

export const initialMyCourses = [];


export const initialWishlist = ["wordpress", "frontend-react"];

export const initialAssignments = [
  {
    id: 1,
    title: "پیاده‌سازی گراف وزن‌دار و Dijkstra",
    course: "ساختمان داده و الگوریتم",
    due: "مهلت: امروز ۲۳:۵۹",
    no: 4,
    status: "late",
    description: "پیاده‌سازی الگوریتم دایکسترا با صف اولویت در زبان پایتون یا ++C به همراه محاسبه تحلیل پیچیدگی زمانی.",
    submission: null,
    feedback: null,
    grade: null,
  },
  {
    id: 2,
    title: "آموزش مدل طبقه‌بندی روی دیتاست MNIST",
    course: "مبانی هوش مصنوعی و یادگیری ماشین",
    due: "مهلت: ۱۸ شهریور",
    no: 2,
    status: "open",
    description: "آموزش یک شبکه پرسپترون یا SVM روی ارقام دست‌نویس با دقت بالای ۹۵٪ به همراه نمودار ماتریس اغتشاش.",
    submission: null,
    feedback: null,
    grade: null,
  },
  {
    id: 3,
    title: "تحلیل حافظه و بهینه‌سازی کش",
    course: "معماری کامپیوتر و سیستم‌های دیجیتال",
    due: "تحویل ۱۶ شهریور",
    no: 5,
    status: "done",
    description: "محاسبه نرخ Hit/Miss در سطوح L1 و L2 کش برای دسترسی‌های آرایه دو بعدی در زبان C.",
    submission: {
      text: "گزارش شبیه‌سازی کش و نمودارهای کارایی با ابزار Valgrind پیوست شد.",
      fileName: "cache_optimization_report.pdf",
      date: "۱۶ شهریور - ۱۸:۳۰",
    },
    feedback: "تحلیل‌ها بسیار دقیق بود. راهکارهای بهینه‌سازی لوپ عالی پیاده شده بودند.",
    grade: "۲۰",
  },
  {
    id: 4,
    title: "مدل‌سازی توزیع نرمال با پایتون",
    course: "آمار و احتمال کاربردی در دیتا ساینس",
    due: "تحویل ۱۲ شهریور",
    no: 1,
    status: "graded",
    description: "تولید متغیرهای تصادفی نرمال و رسم هیستوگرام به همراه برازش منحنی چگالی احتمال با SciPy.",
    submission: {
      text: "کدهای ژوپیتر نوتبوک به همراه توضیحات کامل هر بخش ارسال شد.",
      fileName: "gaussian_distribution_final.ipynb",
      date: "۱۲ شهریور - ۲۱:۱۵",
    },
    feedback: "بسیار تمیز و استاندارد. استفاده از Seaborn جلوه زیبایی به نمودارها داده بود.",
    grade: "۱۹",
  },
];
