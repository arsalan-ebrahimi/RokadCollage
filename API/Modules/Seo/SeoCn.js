import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Seo from "./SeoMd.js";

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Seo, req.query, req.role)
    .limitFields()
    .paginate();

  const result = await features.execute();

  let doc = Array.isArray(result) ? result[0] : result?.data ? result.data[0] : result;

  if (!doc) {
    doc = {
      title: "کالج آموزشی رکاد",
      description: "پلتفرم جامع آموزشی، دوره‌های تخصصی و مهارت‌محور کالج رکاد",
      keywords: "رکاد, کالج آموزشی, برنامه نویسی, هوش مصنوعی, طراحی گرافیک",
      robots: "index, follow",
      canonicalUrl: "https://rokad.ir",
      ogTitle: "کالج آموزشی رکاد",
      ogDescription: "پلتفرم جامع آموزشی، دوره‌های تخصصی و مهارت‌محور کالج رکاد",
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
    };
  }

  return res.status(200).json({
    success: true,
    data: doc,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const allowedUpdates = [
    "title",
    "description",
    "keywords",
    "robots",
    "canonicalUrl",
    "ogTitle",
    "ogDescription",
    "ogImage",
    "ogType",
    "twitterCard",
    "twitterTitle",
    "twitterDescription",
    "twitterImage",
  ];
  const updates = {};

  Object.keys(req.body).forEach((el) => {
    if (allowedUpdates.includes(el)) updates[el] = req.body[el];
  });

  const updatedSeo = await Seo.findOneAndUpdate({}, updates, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  if (!updatedSeo) {
    return next(new HandleERROR("خطا در بروزرسانی تنظیمات سئو", 400));
  }

  return res.status(200).json({
    success: true,
    message: "تنظیمات سئو با موفقیت بروزرسانی شد",
    data: updatedSeo,
  });
});
