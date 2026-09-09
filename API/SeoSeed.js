import mongoose from "mongoose";
import dotenv from "dotenv";
import Seo from "./Modules/Seo/SeoMd.js";

dotenv.config({ path: "./config.env" });

const seedSeo = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE);
    console.log("✅ Connected to RokadCollage Database.");

    const existingSeo = await Seo.findOne();

    if (existingSeo) {
      console.log("⚠️ Default SEO settings already exist in the database.");
      process.exit(0);
    }

    await Seo.create({
      title: "کالج آموزشی رکاد",
      description: "پلتفرم جامع آموزشی، دوره‌های تخصصی و مهارت‌محور کالج رکاد",
      keywords: "رکاد, کالج آموزشی, برنامه نویسی, هوش مصنوعی, طراحی گرافیک",
      robots: "index, follow",
      canonicalUrl: "https://rokad.ir",
      ogTitle: "کالج آموزشی رکاد",
      ogDescription: "پلتفرم جامع آموزشی، دوره‌های تخصصی و مهارت‌محور کالج رکاد",
      ogType: "website",
      twitterCard: "summary_large_image",
    });

    console.log("🎉 Default SEO settings created successfully!");
  } catch (error) {
    console.error("❌ Error seeding SEO:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedSeo();
