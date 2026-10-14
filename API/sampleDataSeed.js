import mongoose from "mongoose";
import dotenv from "dotenv";
import InPersonCourse from "./Modules/InPersonCourse/InPersonCourseMd.js";
import VirtualCourse from "./Modules/VirtualCourse/VirtualCourseMd.js";
import Blog from "./Modules/Blog/BlogMd.js";
import Comment from "./Modules/Comment/CommentMd.js";
import Teacher from "./Modules/Teacher/TeacherMd.js";

dotenv.config({ path: "./config.env" });

async function seedData() {
  try {
    await mongoose.connect(process.env.DATA_BASE);
    console.log("✅ Connected to Database for Sample Seeding.");

    // 1. دوره‌های حضوری
    const inPersonCount = await InPersonCourse.countDocuments();
    if (inPersonCount === 0) {
      await InPersonCourse.create([
        {
          title: "بوت‌کمپ جامع فرانت‌اند و React",
          category: "فناوری اطلاعات",
          tags: ["فرانت‌اند", "React", "Next.js"],
          description: "مسیر کامل صفر تا صد ورود به بازار کار طراحی وب با پروژه‌های واقعی و منتورینگ حضوری",
          duration: "۱۶ هفته",
          price: 12500000,
          img: "/assets/StatCard/teal.png",
          location: { address: "تهران، میدان آزادی، بلوار اکبری، کالج رکاد" },
        },
        {
          title: "کارگاه تخصصی طراحی UI/UX با فیگما",
          category: "فناوری اطلاعات",
          tags: ["UI/UX", "فیگما", "دیزاین سیستم"],
          description: "آموزش اصول تجربه کاربری، رابط کاربری و آماده‌سازی فایل برای برنامه‌نویسان",
          duration: "۱۰ هفته",
          price: 9800000,
          img: "/assets/StatCard/blue.png",
          location: { address: "تهران، میدان آزادی، بلوار اکبری، کالج رکاد" },
        },
      ]);
      console.log("✅ Sample InPerson courses seeded.");
    }

    // 2. دوره‌های آنلاین و مجازی
    const virtualCount = await VirtualCourse.countDocuments();
    if (virtualCount === 0) {
      await VirtualCourse.create([
        {
          title: "دوره جامع طراحی سایت با وردپرس",
          category: "فناوری اطلاعات",
          tags: ["وردپرس", "فروشگاهی", "المنتور"],
          description: "راه‌اندازی سایت‌های پیشرفته بدون کدنویسی همراه با سئو و بهینه‌سازی سرعت",
          duration: "۱۲ هفته",
          price: 4500000,
          img: "/assets/StatCard/blue.png",
          spotplayerCourseId: "650000000000000000000001",
          resources: [
            {
              title: "فایل‌های پروژه عملی و قالب‌ها",
              type: "ZIP",
              size: "۴۲ مگابایت",
              url: "/downloads/wp-starter-pack.zip",
            },
            {
              title: "چک‌لیست راه‌اندازی و کتابچه راهنما",
              type: "PDF",
              size: "۸ مگابایت",
              url: "/downloads/wp-guidebook.pdf",
            },
            {
              title: "مخزن افزونه‌ها و کدهای سفارشی",
              type: "لینک",
              size: "گیت‌هاب",
              url: "https://github.com/rokadcollege/wordpress-starter",
            },
          ],
        },
        {
          title: "دوره جامع سئو و بهینه‌سازی موتورهای جستجو",
          category: "فناوری اطلاعات",
          tags: ["سئو", "آنالیتیکس", "گوگل"],
          description: "تکنیک‌های جذب ترافیک ارگانیک، سئو تکنیکال و رتبه‌گیری در صفحه اول گوگل",
          duration: "۸ هفته",
          price: 3800000,
          img: "/assets/StatCard/green.png",
          spotplayerCourseId: "650000000000000000000002",
          resources: [
            {
              title: "چک‌لیست جامع ممیزی سئو تکنیکال",
              type: "PDF",
              size: "۱۴ مگابایت",
              url: "/downloads/seo-technical-audit.pdf",
            },
            {
              title: "شیت استراتژی کلمات کلیدی و رصد رقبا",
              type: "ZIP",
              size: "۵ مگابایت",
              url: "/downloads/seo-keywords-template.zip",
            },
          ],
        },
      ]);
      console.log("✅ Sample Virtual courses seeded.");
    }

    // 3. مقالات وبلاگ
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.create([
        {
          title: "چطور یادگیری برنامه‌نویسی را شروع کنیم و در مسیر ناامید نشویم؟",
          slug: "how-to-start-coding-and-stay-motivated",
          category: "فرانتاند",
          description: "راهنمای گام به گام انتخاب مسیر، دوری از تله آموزشی و ورود سریع به بازار کار",
          content: "<p>شروع مسیر یادگیری برنامه‌نویسی نیازمند نقشه راه شفاف و تمرین پروژه‌محور است...</p>",
          img: "/assets/Blogs/1.png",
          readTime: "۷ دقیقه",
          views: 18200,
        },
        {
          title: "چرا یادگیری پروژه‌محور مسیر شغلی را تا ۳ برابر کوتاه‌تر می‌کند؟",
          slug: "why-project-based-learning-speeds-up-career",
          category: "مسیر شغلی",
          description: "بررسی تفاوت دوره‌های تئوری و کارگاهی در تسلط بر مهارت‌های واقعی",
          content: "<p>در کالج رکاد تمرکز اصلی روی حل مسائل دنیای واقعی و ساخت پورتفولیو است...</p>",
          img: "/assets/Blogs/2.png",
          readTime: "۵ دقیقه",
          views: 14700,
        },
        {
          title: "اصول طراحی رابط کاربری مدرن و پرسونای مخاطب",
          slug: "modern-ui-design-and-user-persona",
          category: "گرافیک",
          description: "بررسی فرآیند طراحی تجربه کاربری استاندارد و متدهای ساخت پروتوتایپ حرفه‌ای",
          content: "<p>طراحی محصول دیجیتال قبل از خطوط رنگی، شناخت رفتار انسان‌هاست...</p>",
          img: "/assets/Blogs/1.png",
          readTime: "۸ دقیقه",
          views: 11900,
        },
      ]);
      console.log("✅ Sample Blog articles seeded.");
    }

    // 4. نظرات و تجربیات هنرجویان
    const commentCount = await Comment.countDocuments();
    if (commentCount === 0) {
      const anyInPerson = await InPersonCourse.findOne();
      const anyVirtual = await VirtualCourse.findOne();
      if (anyInPerson) {
        await Comment.create([
          {
            course: anyInPerson._id,
            courseModel: "InPersonCourse",
            name: "سارا رحیمی",
            role: "طراح فریلنسر",
            job: "در حال کار در بازار آزاد",
            comment: "من اصلاً پیش‌زمینهٔ فنی نداشتم و می‌ترسیدم شروع کنم. دوره‌های کارگاهی رکاد کاملاً پروژه‌محور بود و مهارت واقعی بازار کار را یاد گرفتم.",
          },
          {
            course: anyInPerson._id,
            courseModel: "InPersonCourse",
            name: "امیرحسین کریمی",
            role: "توسعه‌دهنده فرانت‌اند",
            job: "استخدام در تیم نرم‌افزاری",
            comment: "بزرگ‌ترین تفاوت رکاد با دوره‌های دیگر، پشتیبانی زنده و رفع اشکال روزانه بود. بعد از پایان کارگاه توانستم سریع وارد بازار کار شوم.",
          },
        ]);
      }
      if (anyVirtual) {
        await Comment.create([
          {
            course: anyVirtual._id,
            courseModel: "VirtualCourse",
            name: "مریم صادقی",
            role: "متخصص دیجیتال مارکتینگ",
            job: "شاغل تمام‌وقت",
            comment: "سرفصل‌ها بسیار عمیق و اصولی تدوین شده بودند و نحوه پیاده‌سازی گام‌به‌گام پروژه‌ها باعث شد در مصاحبه شغلی با اعتماد به نفس ظاهر شوم.",
          },
        ]);
      }
      console.log("✅ Sample Comments seeded.");
    }

    // 5. اساتید و منتورها
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      await Teacher.create([
        {
          name: "مهندس آرش تهرانی",
          specialization: "توسعه‌دهنده ارشد فرانت‌اند",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
        },
        {
          name: "مهندس محسن قاسمی",
          specialization: "کارآفرین و استراتژیست کسب و کار",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
        },
        {
          name: "استاد شبنم رضایی",
          specialization: "اگزمینر و مدرس ارشد آیلتس",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80",
        },
        {
          name: "نگین ایزدی",
          specialization: "مدیر ارشد دیجیتال مارکتینگ و سئو",
          photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
        },
      ]);
      console.log("✅ Sample Teachers seeded.");
    }

    console.log("🎉 All sample data ready!");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedData();
