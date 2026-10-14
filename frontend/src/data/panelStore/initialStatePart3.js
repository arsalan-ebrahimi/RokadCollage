export const initialSupportTickets = [
  {
    id: 1,
    subject: "خطا در پخش ویدیوی جلسهٔ ۴ ساختمان داده",
    dept: "پشتیبانی فنی",
    status: "answering",
    updated: "۲۰ دقیقه پیش",
    messages: [
      { sender: "user", text: "سلام، ویدیوی جلسه چهارم در دقیقه ۱۲ متوقف میشه و ارور پخش میده.", date: "امروز ۱۰:۱۴" },
      { sender: "support", text: "سلام پارسا جان، پلیر اختصاصی بازنشانی شد. لطفاً کش مرورگر رو پاک کرده و مجدد تست کنید.", date: "امروز ۱۰:۳۵" },
    ],
  },
  {
    id: 2,
    subject: "درخواست تمدید دسترسی تکالیف دوره هوش مصنوعی",
    dept: "امور هنرجویان",
    status: "open",
    updated: "۱ روز پیش",
    messages: [
      { sender: "user", text: "با سلام، به دلیل شرکت در آزمون دانشگاهی درخواست تمدید ۴۸ ساعته تکلیف ۲ را دارم.", date: "دیروز ۱۴:۰۰" },
    ],
  },
  {
    id: 3,
    subject: "صدور و تاییدیه گواهینامه دوره طراحی وب",
    dept: "امور فارغ‌التحصیلان",
    status: "closed",
    updated: "۱ هفته پیش",
    messages: [
      { sender: "user", text: "سلام، کد رهگیری گواهی دوره طراحی وب من با موفقیت صادر شد، تشکر از تیم کالج.", date: "۱ هفته پیش" },
      { sender: "support", text: "سلام، مبارکتون باشه! فایل دانلودی با امضای دیجیتال در بخش گواهی‌ها قرار گرفت.", date: "۱ هفته پیش" },
    ],
  },
];

export const initialOrders = [
  {
    id: "ORD-1404-9281",
    courseSlug: "data-structures",
    courseTitle: "ساختمان داده و الگوریتم",
    price: 2400000,
    paidAmount: 1800000,
    discountCode: "WELCOME",
    status: "paid",
    gateway: "زرین‌پال",
    trackingCode: "TRK-982341",
    createdAt: "۱۴۰۴/۰۵/۱۰",
    paidAt: "۱۴۰۴/۰۵/۱۰ - ۱۰:۴۵",
  },
];

export const initialAuth = {
  isLoggedIn: false,
  token: null,
  userPhone: null,
};

export const initialConsultations = [];

export const initialMentorBookings = [
  {
    id: "MB-101",
    mentorId: 1,
    mentorName: "مهندس سهراب علیزاده",
    mentorRole: "منتور ارشد هوش مصنوعی و داده",
    date: "دوشنبه ۱۸ شهریور",
    time: "۱۶:۳۰",
    topic: "بررسی پورتفولیو و آمادگی مصاحبه شغلی ماشین لرنینگ",
    status: "confirmed",
    meetLink: "https://meet.google.com/rokad-ai-mentoring",
    createdAt: "۱۴۰۴/۰۶/۱۲",
  },
];

export const initialMentorChats = {
  1: [
    { from: "them", text: "سلام پارسا جان! تمرین هفته قبل رو بررسی کردم، معماری مدلت عالی شده." },
    { from: "me", text: "سلام استاد، ممنون. یک سوال درباره تابع هزینه داشتم." },
    { from: "them", text: "حتماً، کدت رو بفرست تا با هم رفع اشکال کنیم." },
  ],
  2: [
    { from: "them", text: "سلام پارسا جان! سوالی در مورد جلسه طراحی فیگما داشتی؟" },
  ],
  3: [
    { from: "them", text: "سلام! تمرین ریدینگ این هفته رو بررسی کردم، پیشرفتت عالی بوده." },
  ],
};
