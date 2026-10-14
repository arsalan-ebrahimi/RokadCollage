---
version: "1.0 — Unified"
name: رکاد (Rokad)
description: نسخهٔ نهایی و یکپارچهٔ سیستم طراحی رُکاد‌اسکول — حاصل ترکیب «Rokad-design-system.md» (منبع دقیق رنگ، مستخرج از صفحهٔ Design System فیگما) و «DESIGN.md» (منبع دقیق تایپوگرافی/فاصله‌گذاری/شعاع/سایه/کامپوننت، مستخرج از سایت واقعی).
sources:
  colors: Rokad-design-system.md (Figma node 1:2 — دقیق‌تر برای رنگ)
  typography_spacing_radius_shadow_components: DESIGN.md (سایت واقعی — دقیق‌تر برای پیاده‌سازی)
---

# سیستم طراحی نهایی رُکاد‌اسکول (Unified Design System)

## ۰. روش ترکیب (Merge Methodology)

این سند حاصل ترکیب دو منبع است، هرکدام در حوزهٔ تخصصی خودشان مرجع دانسته شده‌اند:

| حوزه | منبع مرجع | دلیل |
|---|---|---|
| **رنگ‌ها (Colors)** | `Rokad-design-system.md` | مستقیماً از فایل فیگما (صفحهٔ Design System) استخراج شده و طیف کامل ۵ پرسونا + حالت‌های hover/active را دقیق پوشش می‌دهد. |
| **تایپوگرافی، فاصله‌گذاری، شعاع گوشه، سایه، کامپوننت‌ها** | `DESIGN.md` | از خروجی واقعی سایت (کد تولید) استخراج شده و رفتار واقعی هر کامپوننت (ازجمله حاشیه‌ها/شعاع‌های نامتقارن) را دقیق‌تر نشان می‌دهد؛ توکن‌های حاشیه/شعاع فایل رکاد صرفاً تقریبی بودند. |

هرجا بین دو منبع اختلاف مقدار وجود داشت (مثل دو هگز نزدیک‌به‌هم برای سرمه‌ای یا فیروزه‌ای)، در بخش «نکات آشتی‌دادن» (۹) علامت‌گذاری شده است.

---

## ۱. فلسفه برند (Brand Foundations)

رُکاد — اولین هنرستان استارتاپی ایران — یک پلتفرم آموزشی فارسی‌زبان با شخصیت بازیگوش، پرانرژی و غیرکلیشه‌ای است. سیستم رنگی حول **۵ پرسونای برند** چیده شده که هرکدام یک طیف کامل (Light → Normal → Dark → Darker) با حالت‌های تعاملی دارند:

| نماد | کلید تم | معنی | معادل در DESIGN.md |
|---|---|---|---|
| 🌿 اکوسیستم | `Ecosystem` | رنگ اصلی/برند | `secondary` / `secondary-alt` (تیل) |
| 🔵 پسر | `Male` | بخش پسران | `primary` / `primary-alt` (سرمه‌ای) |
| 🌸 دختر | `Female` | بخش دختران | `accent` (مجنتا) |
| 🟠 کالج | `College` | بخش دانشگاه/کالج | `tertiary-brand` (کهربایی) |
| 🟣 کلوپ | `Club` | بخش باشگاه/انجمن | *(هنوز در سایت زنده پیاده‌سازی نشده — نکات بخش ۹ را ببینید)* |
| ⚫ متن و عنوان | `text & title` | رنگ‌های خنثی | `ink` |

**امضای بصری (از DESIGN.md، هنوز معتبر):**
- کارت‌ها، کلمات تیتر و دکمه‌ها هرکدام مستقل با زاویهٔ ±۱ تا ۳ درجه چرخانده می‌شوند (استیکر/کولاژ کاغذی).
- تیترها کلمه‌به‌کلمه و هرکدام با `<span>` مستقل چرخانده می‌شوند.
- سایهٔ دولایهٔ آفست‌شده (رنگ تخت، بدون بلور) پشت هر کارت — هرگز از CSS `box-shadow` استفاده نشود.
- شکل نامتقارن گوشه‌بریده (squircle) — رایج‌ترین موتیف شکلی سایت.
- کدگذاری رنگی بخش‌ها: سرمه‌ای = پسران، مجنتا = دختران، تیل = برند/CTA، کهربایی = تأکید ثالث.

---

## ۲. توکن‌های رنگی (مرجع: Rokad-design-system.md)

### ۲.۱ رنگ‌های اصلی برند (Semantic Aliases)

| توکن | مقدار | معادل تمی |
|---|---|---|
| `Primary` | `#59BBAF` | Ecosystem / Normal (تیل) |
| `Girl` | `#E0195B` | Female / Normal (مجنتا) |
| `Third` | `#F8A41D` | College / Normal (کهربایی) |
| `Sec` | `#202A5A` | Male / Normal (سرمه‌ای) |

### ۲.۲ طیف اکوسیستم (Ecosystem — برند اصلی / تیل)

| توکن | Hover | Active | Normal | Dark | Darker |
|---|---|---|---|---|---|
| Light | `#E6F5F3` | `#CCEAE6` | `#EEF8F7` | — | — |
| Normal | `#50A89E` | `#47968C` | `#59BBAF` | `#438C83` | `#1F413D` |
| Dark | `#357069` | `#28544F` | `#438C83` | — | — |
| Darker | — | — | `#1F413D` | — | — |

### ۲.۳ طیف پسر (Male / سرمه‌ای)

| توکن | Hover | Active | Normal | Dark | Darker |
|---|---|---|---|---|---|
| Light | `#DEDFE6` | `#BABDCC` | `#E9EAEF` | — | — |
| Normal | `#1D2651` | `#1A2248` | `#202A5A` | `#182044` | `#0B0F1F` |
| Dark | `#131936` | `#0E1328` | `#182044` | — | — |
| Darker | — | — | `#0B0F1F` | — | — |

### ۲.۴ طیف دختر (Female / مجنتا)

| توکن | Hover | Active | Normal | Dark | Darker |
|---|---|---|---|---|---|
| Light | `#FADDE6` | `#F5B8CC` | `#FCE8EF` | — | — |
| Normal | `#CA1752` | `#B31449` | `#E0195B` | `#A81344` | `#4E0920` |
| Dark | `#860F37` | `#650B29` | `#A81344` | — | — |
| Darker | — | — | `#4E0920` | — | — |

### ۲.۵ طیف کالج (College / کهربایی)

| توکن | Hover | Active | Normal | Dark | Darker |
|---|---|---|---|---|---|
| Light | `#FEF1DD` | `#FDE3B9` | `#FEF6E8` | — | — |
| Normal | `#DF941A` | `#C68317` | `#F8A41D` | `#BA7B16` | `#57390A` |
| Dark | `#956211` | `#704A0D` | `#BA7B16` | — | — |
| Darker | — | — | `#57390A` | — | — |

### ۲.۶ طیف کلوپ (Club / بنفش)

| توکن | Hover | Active | Normal | Dark | Darker |
|---|---|---|---|---|---|
| Light | `#E8E0EE` | `#CFBEDD` | `#F0EAF4` | — | — |
| Normal | `#5B2982` | `#512473` | `#652D90` | `#4C226C` | `#231032` |
| Dark | `#3D1B56` | `#2D1441` | `#4C226C` | — | — |
| Darker | — | — | `#231032` | — | — |

> ⚠️ در سایت زنده (DESIGN.md) این طیف پیاده‌سازی نشده؛ به‌جایش رنگ‌های موقتِ `purple #4f215a`، `violet #5b3e9e`، `violet-accent #7c4dbf` برای شاخهٔ «کافه/اکوسیستم» استفاده شده‌اند. توصیه: در ریفکتور بعدی، این‌ها با طیف Club بالا جایگزین شوند (بخش ۹).

### ۲.۷ متن و عنوان (Text & Title — خنثی)

| توکن | Hover | Active | Light | Normal | Dark | Darker |
|---|---|---|---|---|---|---|
| text & title | `#DFDFDF` | `#BDBCBC` | `#EAEAE9` | `#292827` | `#1F1E1D` | `#0E0E0E` |

`#292827` دقیقاً با `ink` در DESIGN.md یکی است — بدون Drift.

### ۲.۸ رنگ‌های کمکی برند (Accents از Rokad)

| نام | مقدار | کاربرد |
|---|---|---|
| Green Accent | `#009966` | حاشیه/تأکید ثانویه |
| Red Accent | `#C60036` | حاشیه/تأکید ثانویه |
| Purple Accent | `#8A38F5` | حاشیه لوگو |

### ۲.۹ رنگ‌های اضافی تولیدی (فقط در DESIGN.md موجودند — به سیستم اضافه شدند)

این‌ها در Figma مستند نشده بودند اما در سایت واقعی استفادهٔ فعال دارند؛ به‌عنوان توکن‌های تکمیلی نگه داشته می‌شوند:

| توکن | مقدار | کاربرد |
|---|---|---|
| `ink-faq` | `#3d3b3a` | پس‌زمینهٔ دکمهٔ آکاردئون FAQ |
| `ink-subtle` | `#777777` | متن توضیحات StudentCard |
| `ink-soft` | `#333230` | پرکنندهٔ progress bar |
| `gold` | `#f8a41d` | رتبهٔ اول Honors (برابر College/Normal) |
| `silver` | `#525252` | رتبهٔ دوم Honors |
| `bronze` | `#a56216` | رتبهٔ سوم Honors |
| `yellow-label` | `#ffd641` | لیبل شناور بخش Story |
| `linkedin-blue` | `#0a78b5` | آیکون لینکدین |
| `linkedin-border` | `#70b8e8` | حاشیهٔ آیکون لینکدین |
| `linkedin-bg` | `#eef7ff` | پس‌زمینهٔ آیکون لینکدین |
| `progress-bg` | `#ededec` | ترک نوار پیشرفت |
| `bg-mint` | `#f2faf9` | پس‌زمینهٔ StatCard تیل، navbar |
| `bg-blush` | `#fefafb` | پس‌زمینهٔ StatCard مجنتا |
| `bg-lavender` | `#f4f5fb` | پس‌زمینهٔ StatCard سرمه‌ای |
| `bg-neutral` | `#f6f6f6` | پس‌زمینهٔ StatCard کهربایی، بخش Story |
| `tertiary` | `#f4971f` | نوع دیگر نارنجی — کارت آمار شبکه/شعبه‌ها |
| `tertiary-alt` | `#f9a21d` | لایهٔ سایهٔ پشت StatCard |
| `overlay-white-15` / `-58` / `-69` | `rgba(255,255,255,…)` | افکت‌های شفاف روی کارت‌های تیره |
| `overlay-grey-22` | `rgba(180,180,180,0.22)` | روبان اعتماد Hero |
| `overlay-black-5` | `rgba(0,0,0,0.05)` | overlay هدر StudentCard |

---

## ۳. تایپوگرافی (مرجع: DESIGN.md)

**فونت اصلی:** `IRANSansX` (فارسی/لاتین) — وزن‌های فعال در سایت: DemiBold(600)، Bold(700)، ExtraBold(800)، Black(900)، ExtraBlack(950). برش عددی مخصوص `IRANSansXFaNum` برای ارقام فارسی در شمارنده‌های آماری.
**فونت ثانویه:** `Montserrat` (variable، فقط گلیف لاتین) — قبل از IRANSansX در فونت‌استک، تا حروف لاتین از Montserrat و فارسی از IRANSansX رندر شود.

> نکتهٔ آشتی: مقیاس ساده `D4` در فایل Rokad (۸ سطح `text-xs` تا `text-3xl`, وزن ثابت ۴۰۰) هنوز به‌عنوان **مقیاس پایهٔ عمومی** (بدنهٔ متن ساده، فرم‌ها، مستندات) نگه داشته می‌شود؛ اما برای هر نقش تولیدی/تبلیغاتی، نقش‌های زیر از DESIGN.md که دقیق‌تر و واقعی‌ترند اولویت دارند.

### ۳.۱ نقش‌های تایپوگرافی تولیدی (Roles)

| نقش | وزن | اندازه (دسکتاپ → موبایل) | line-height | رنگ | نکته |
|---|---|---|---|---|---|
| Hero H1 | ExtraBlack (950) | 59.4px → 20px | 1.1 | سفید | هر کلمه چرخش مستقل ±۲ تا ۴° |
| Section H2 (دسکتاپ) | ExtraBlack (950) | 53.2px | 1.2 | ink / رنگ برند هر کلمه | چرخش ±۰.۵ تا ۳° |
| Section H2 (تبلت) | ExtraBlack (950) | 36px | 1.2–1.3 | ink | |
| Section H2 (موبایل) | ExtraBlack (950) | 24px | 1.3 | ink | |
| Card H3 (مدرسه) | Black (900) | 43px | tight | سفید | چرخش −۱° |
| عدد بزرگ آماری | ExtraBlack (950) | 70.5px → 44px | 1.0 | رنگ تم کارت | برش FaNum |
| Label pill | Bold (700) | 15.8px | 1.35 | رنگ تم کارت | پیل سفید، حاشیه 0.76px |
| بدنهٔ متن | DemiBold (600) | 17.5px | 1.7 | ink | وسط‌چین، حداکثر عرض ~494px |
| Body lead | SemiBold (600) | 18px | 1.7–1.9 | ink/navy | |
| دکمهٔ اصلی | ExtraBold (800) | 20.4px (هیرو) / 16px (مدرسه) | normal | سفید یا navy | Hero: −۱.۵° / +۱.۵° |
| لینک ناوبری | DemiBold (600) | 15px | 1.25 | navy | |
| Nav CTA pill | Black (900) | 15px | 1.25 | سفید روی navy | چرخش −۳° |
| Feature chip | DemiBold (600) | 14.3–15px | 1.8 | سفید | تزیین دو-نقطه‌ای |
| Small badge | Bold (700) | 15.8px | 1.35 | سفید، bg شفاف | |
| Meta line | Medium (500, FaNum) | 15.5px | 1.64 | سفید/۸۰٪ | آدرس مدرسه |
| Micro | Medium (500) | 11px | 1.4 | ink/۶۰–۷۰٪ | متادیتای Honors/بلاگ |
| Caption small | Medium (500) | 12px | 1.5 | ink/۹۰٪ | متن پاسخ FAQ |
| Caption micro | Medium (500) | 10–11px | 1.4 | ink/۴۵–۷۰٪ | نوار پیشرفت، فوتر |

**مقیاس چرخش تیتر (Snap):** `-3deg, -1.5deg, 0deg, +1.5deg, +2deg, +2.5deg, +3deg` — هرگز اعداد شناور دستی مثل `1.83deg` استفاده نشود.

### ۳.۲ مقیاس پایهٔ متن ساده (مرجع Rokad — برای متون غیرتبلیغاتی)

| توکن | اندازه | خط | وزن |
|---|---|---|---|
| `text-xs` | 10px | 15px | 400 |
| `text-sm` | 13px | 19.5px | 400 |
| `text-base` | 16px | 24px | 400 |
| `text-md` | 20px | 30px | 400 |
| `text-lg` | 25px | 37.5px | 400 |
| `text-xl` | 39px | 58.5px | 400 |
| `text-2xl` | 49px | 73.5px | 400 |
| `text-3xl` | 61px | 91.5px | 400 |

جهت متن همیشه RTL؛ روی `<html>` و `<body>` هم `dir="rtl"` و هم `direction: rtl` در CSS تنظیم شود (نه صرفاً `dir="auto"` روی نودها).

---

## ۴. فاصله‌گذاری (مرجع: DESIGN.md برای مقیاس صفحه، Rokad برای واحد پایه)

### ۴.۱ مقیاس صفحه/کامپوننت (واقعی، از DESIGN.md)

| توکن | مقدار |
|---|---|
| `section` | 4rem |
| `section-sm` | 3rem |
| `section-lg` | 5rem |
| `section-xl` | 6rem |
| `gutter` | 3rem |
| `gutter-md` | 4rem |
| `gutter-lg` | 6rem |
| `gutter-xl` | 7.5rem |
| `content-max` | 75rem (1200px) |
| `card-gap` | 1rem |
| `card-gap-lg` | 1.5rem |
| `card-gap-xl` | 2rem |

- بوم مرجع طراحی: 1440px دسکتاپ.
- ستون محتوا: 1200px (`max-w-[75rem]`)، در `xl` حاشیهٔ ثابت ۱۲۰px هر طرف.
- ریتم عمودی بخش‌ها: `py-[4rem]` موبایل → `py-[5rem]` تبلت → `py-[6rem]` دسکتاپ.
- بریک‌پوینت‌ها: `xs` 420px، `sm` 640px، `md` 768px، `lg` 1024px، `xl` 1280px، `2xl` 1536px.

### ۴.۲ واحد پایهٔ ۴px (مرجع Rokad — برای gap‌های ریز داخل کامپوننت‌ها، آیکن‌ها، padding دکمه)

| توکن | مقدار |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |

**قاعدهٔ RTL:** در فلکس/گرید، اولین آیتم آرایه در **لبهٔ راست** رندر می‌شود؛ همهٔ آرایه‌های داده باید با این فرض مرتب شوند.

---

## ۵. شعاع گوشه (مرجع اصلی: DESIGN.md — چون توکن‌های Rokad تقریبی بودند)

### ۵.۱ مقیاس پایهٔ عمومی (Rokad — برای کامپوننت‌های جدید/عمومی، وقتی DESIGN.md مقدار خاصی ندارد)

| توکن | مقدار | کاربرد پیشنهادی |
|---|---|---|
| `radius-xs` | 5px | دکمه‌های کوچک / تگ |
| `radius-sm` | 8px | ورودی‌ها / کارت‌های کوچک |
| `radius-md` | 12px | کارت‌های استاندارد |
| `radius-lg` | 17px | تصاویر / بج‌ها |
| `radius-xl` | 24px | عنوان‌ها / هدر |
| `radius-2xl` | 34px | کامپوننت‌های بزرگ |
| `radius-pill` | 40px | پیل/دایره کامل |

### ۵.۲ شعاع واقعی به‌ازای کامپوننت (مرجع دقیق — از سایت واقعی)

الگوی امضادار سایت: **گوشه‌بریدگی نامتقارن** (`rounded-tl-* rounded-br-*` یا معکوس آن با دو گوشهٔ دیگر تیز) + خاصیت سفارشی `[corner-shape:squircle]`.

| کامپوننت | کلاس شعاع | شکل |
|---|---|---|
| StatCard | `rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-none rounded-bl-none` | بریدگی بالا-چپ + پایین-راست |
| SchoolCard | `rounded-[1.5rem] sm:rounded-[2.75rem] lg:rounded-[3.25rem]` | squircle کامل، بزرگ |
| PillarCard (روشن) | `rounded-[0_2rem_0_2rem]` | نامتقارن: بالا-چپ + پایین-راست |
| PillarCard (تیره) | `rounded-[1.25rem]` | متقارن متوسط |
| کارت FAQ (بسته/باز) | `rounded-tr-[1.375rem] rounded-bl-[1.375rem]` | نامتقارن معکوس |
| باکس مشاورهٔ FAQ | `rounded-tl-[2.5rem] rounded-br-[2.5rem]` | نامتقارن |
| دکمهٔ آیکون آکاردئون FAQ | `rounded-[0_0.978125rem_0_0.978125rem]` | نامتقارن |
| کارت Honors | `rounded-[0_2rem_0_2rem]` | نامتقارن |
| بج Honors | `rounded-[0.6875rem] sm:rounded-[0.75rem]` | متقارن متوسط |
| کارت Comments (موبایل) | `rounded-[0_1.375rem_0_1.375rem]` | نامتقارن |
| کارت Comments (دسکتاپ) | `rounded-[2.5rem_0_2.5rem_0]` | نامتقارن **معکوس** (عمداً فلیپ می‌شود) |
| BlogCard | `rounded-[1.875rem_0_1.875rem_0]` | نامتقارن |
| StudentCard | `rounded-[0_1.25rem_0_1.25rem]` موبایل / `rounded-[0_0.875rem_0_0.875rem]` دسکتاپ | نامتقارن |
| پیل ناوبری CTA | `rounded-[8px] [corner-shape:squircle]` | squircle سفارشی |
| پیل ناوبری ثانویه | `rounded-[12px] [corner-shape:squircle]` | squircle سفارشی |
| روبان اعتماد Hero | `rounded-br-[0.875rem] sm:rounded-br-[1.25rem] lg:rounded-br-[2.25rem]` | فقط یک گوشه |
| BranchCard اکوسیستم | `0 12px 0 12px` (اینلاین) | نامتقارن |

`[corner-shape:squircle]` باید روی **هر** المان با شعاع نامتقارن اعمال شود — بخشی از قرارداد سیستم طراحی است.

---

## ۶. سایه/عمق (مرجع اصلی: DESIGN.md — تکنیک واقعی تولید)

فایل Rokad یک سایهٔ سخت تک‌لایه به رنگ هر پرسونا مستند کرده (`shadow-ecosystem` و غیره)، اما در پیاده‌سازی واقعی سایت این با **تکنیک دولایهٔ آفست‌شده** پیاده می‌شود — نه CSS `box-shadow`:

```jsx
{/* لایهٔ سایهٔ پشتی */}
<div aria-hidden="true"
  className="absolute top-[0.1875rem] left-[0.1875rem] w-full h-full bg-[#292827] rounded-[...]" />
{/* لایهٔ کارت جلویی */}
<div className="relative z-10 bg-white border-2 border-[#292827] rounded-[...]">
  {content}
</div>
```

**آفست به‌ازای کامپوننت:** StatCard ≈4px · SchoolCard ≈5px · PillarCard روشن ≈5px · FAQ accordion 5px · Honors 3px · Comments 2px(موبایل)/4px(دسکتاپ) · BlogCard 4px · StudentCard ~5px.
**رنگ سایه:** تقریباً همیشه `#292827` (ink) یا رنگ تم خود کارت. جهت آفست همیشه `top/left` (برای صحت RTL، سایه به سمت پایین-راست می‌افتد).

### توکن‌های سایهٔ تکمیلی (DESIGN.md)

| توکن | مقدار | کاربرد |
|---|---|---|
| `soft` | `0 1.25rem 3.75rem -1.25rem rgba(33,41,90,0.25)` | کارت Hero، کارت‌های عمومی |
| `card-offset` | `6px 8px 0 0` | BranchCard اکوسیستم |
| `card-offset-sm` | `4px 4px 0 0` | کارت آماری Rokadians، دکمهٔ CTA |
| `card-offset-ink` | `0.1875rem 0.1875rem 0 0 #292827` | کارت آکاردئون FAQ |
| `navbar` | چندلایه (سه سایهٔ نرم Apple-style) | پیل navbar |

### مرجع سایهٔ برند/داکیومنتیشن (Rokad — برای استفاده در Figma/مستندات، نه کد تولید)

| توکن | مقدار |
|---|---|
| `shadow-ecosystem` | `2.75px 2.75px 0 #59BBAF` |
| `shadow-male` | `2.75px 2.75px 0 #202A5A` |
| `shadow-female` | `2.75px 2.75px 0 #E0195B` |
| `shadow-college` | `2.75px 2.75px 0 #F8A41D` |
| `shadow-club` | `2.75px 2.75px 0 #652D90` |
| `shadow-neutral` | `2.75px 2.75px 0 #292827` |

> **قانون طلایی:** هرگز از `box-shadow` برای سایهٔ کارت استفاده نشود؛ لبهٔ سخت (hard-edge) امضای برند است.

---

## ۷. حاشیه/بوردر (Border)

فایل Rokad سه ضخامت پایه تعریف کرده بود، اما مقدار دقیق رنگ/کاربرد هرکدام در واقعیت پروژه متغیر است؛ **در تعارض، مقدار واقعی کامپوننت (DESIGN.md) اولویت دارد.**

| توکن پایه (Rokad) | مقدار | کاربرد عمومی |
|---|---|---|
| `border-thin` | 1px | `#EAEAEA` خنثی |
| `border-mid` | 1.5px | رنگ تم |
| `border-bold` | 3px | رنگ برند/تم |

**نمونه‌های واقعی مشاهده‌شده (DESIGN.md) که این مقیاس را override می‌کنند:**
- StatCard: `border-[0.1875rem]` (۳px) به رنگ accent کارت
- دکمهٔ اصلی/کارت‌های استیکر: `border-2` (۲px) معمولاً `#292827`
- روبان اعتماد Hero: بدون بوردر، فقط لایهٔ آفست

---

## ۸. کامپوننت‌ها

### ۸.۱ کامپوننت‌های برند/داکیومنتیشن (از Rokad — سطح Figma)
- **سیستم لوگو:** Component Set با شخصیت (Ecosystem/Male/Female/College/Club/text) × نوع لوگو (type/Logo-EN/Logo/Logo-FA)، ابعاد ۱۲۰×۱۵۷ (یا ۱۲۰×۹۳ نسخهٔ تایپ).
- **Pattern:** کامپوننت بافت تزیینی صفحات.
- **Color Preview:** نمایش زندهٔ `Color=<Persona>, Opacity=Bold|Light`.
- **Primary/Prymary:** مجموعهٔ دکمه‌های برندمحور.

### ۸.۲ کامپوننت‌های تولیدی (از DESIGN.md — سطح کد، مرجع پیاده‌سازی)

**نمونه — NavPill:**
| نوع | مقدار |
|---|---|
| پیل سرمه‌ای پرشده (CTA اصلی) | bg `Sec #202A5A`، متن سفید، `font-black`, 15px، `rounded-[8px]`، padding `11px 7px`، چرخش `-3deg`، هاور: `rotate-0 scale-105` |
| پیل تیل (ورود/ثبت‌نام) | bg `Primary #59BBAF`، متن سفید، `font-extrabold`، `rounded-[12px]`، padding `9.4px 20px`، هاور: `bg-white text-teal` |

**نمونه — StatCard:** بوردر ۳px به رنگ تم، شعاع `rounded-tl-[2rem] rounded-br-[2rem]` نامتقارن + squircle.

**نمونه — Hero:** کارت با پس‌زمینهٔ `Primary/Normal #59BBAF`، الگوی پترن opacity 25% روی کارت/60% روی سکشن با ماسک گرادیانی محو در لبه‌ها، تیتر کلمه‌به‌کلمه چرخان.

سایر کامپوننت‌های کامل (Mobile Nav Overlay، EventsCarousel، FAQ Accordion، Honors، Comments swiper، Progress bar، Icon buttons، Footer) دقیقاً طبق مشخصات موجود در DESIGN.md پیاده‌سازی شوند — چون آن فایل تنها منبعی است که رفتار واقعی (انیمیشن، breakpoint، افست‌ها) را ثبت کرده.

---

## ۹. نکات آشتی‌دادن و اقلام باز (Reconciliation Notes)

| مورد | Rokad (رنگ) | DESIGN.md (واقعیت سایت) | تصمیم پیشنهادی |
|---|---|---|---|
| سرمه‌ای اصلی | `Sec = #202A5A` | `primary = #21295a` و `primary-alt = #202a5a` | مقدار دقیق‌تر **`#202A5A`** (از Rokad) به‌عنوان توکن نهایی؛ `#21295a` در کد به‌عنوان drift تلقی و در ریفکتور بعدی یکدست شود. |
| تیل اصلی | `Ecosystem/Normal = #59BBAF` | `secondary = #58bdaf`، `secondary-alt = #59bbaf` | مقدار نهایی **`#59BBAF`**؛ `#58bdaf` را در کد به این مقدار یکدست کنید. |
| مجنتا | `Female/Normal = #E0195B` | `accent = #e0195b` | مطابقت کامل — بدون تغییر. |
| کهربایی | `College/Normal = #F8A41D` | `tertiary-brand = #f8a41d` | مطابقت کامل. توجه: `tertiary #f4971f` و `tertiary-alt #f9a21d` رنگ‌های واقعاً متفاوتی هستند (نه drift) و باید جدا نگه داشته شوند. |
| بنفش/کلوپ | طیف کامل `Club` تعریف‌شده | فقط `purple/violet/violet-accent` پراکنده، برای شاخهٔ «کافه» | پرسونای Club در Figma مستند شده اما در سایت زنده پیاده نشده؛ پیشنهاد می‌شود شاخهٔ کافه به‌جای رنگ‌های ادهاک به طیف `Club` مهاجرت کند. |
| شعاع/حاشیه | مقیاس تقریبی ۷ سطحی | مقادیر دقیق per-component (اغلب نامتقارن) | برای کامپوننت‌های موجود همیشه مقدار DESIGN.md را بگیرید؛ مقیاس Rokad فقط برای کامپوننت‌های تازه که هنوز در سایت نیستند. |
| سایه | تک‌لایه رنگی هر پرسونا | دولایهٔ آفست‌شدهٔ سخت | در کد همیشه از تکنیک دولایه استفاده شود؛ توکن‌های رنگی Rokad فقط رنگ لایهٔ پشتی را مشخص می‌کنند، نه شکل سایه را. |

---

## ۱۰. متغیرهای CSS نهایی (:root)

```css
:root {
  /* ===== رنگ‌های اصلی برند (منبع: Rokad — دقیق‌ترین) ===== */
  --color-primary: #59BBAF;   /* Ecosystem/Normal — جایگزین #58bdaf */
  --color-sec:     #202A5A;   /* Male/Normal — جایگزین #21295a */
  --color-girl:    #E0195B;   /* Female/Normal */
  --color-third:   #F8A41D;   /* College/Normal */

  /* Ecosystem */
  --ecosystem-light: #EEF8F7; --ecosystem-light-hover: #E6F5F3; --ecosystem-light-active: #CCEAE6;
  --ecosystem-normal: #59BBAF; --ecosystem-normal-hover: #50A89E; --ecosystem-normal-active: #47968C;
  --ecosystem-dark: #438C83; --ecosystem-dark-hover: #357069; --ecosystem-dark-active: #28544F;
  --ecosystem-darker: #1F413D;

  /* Male */
  --male-light: #E9EAEF; --male-light-hover: #DEDFE6; --male-light-active: #BABDCC;
  --male-normal: #202A5A; --male-normal-hover: #1D2651; --male-normal-active: #1A2248;
  --male-dark: #182044; --male-dark-hover: #131936; --male-dark-active: #0E1328;
  --male-darker: #0B0F1F;

  /* Female */
  --female-light: #FCE8EF; --female-light-hover: #FADDE6; --female-light-active: #F5B8CC;
  --female-normal: #E0195B; --female-normal-hover: #CA1752; --female-normal-active: #B31449;
  --female-dark: #A81344; --female-dark-hover: #860F37; --female-dark-active: #650B29;
  --female-darker: #4E0920;

  /* College */
  --college-light: #FEF6E8; --college-light-hover: #FEF1DD; --college-light-active: #FDE3B9;
  --college-normal: #F8A41D; --college-normal-hover: #DF941A; --college-normal-active: #C68317;
  --college-dark: #BA7B16; --college-dark-hover: #956211; --college-dark-active: #704A0D;
  --college-darker: #57390A;

  /* Club (طیف کامل مستند اما هنوز اختیاری برای پیاده‌سازی) */
  --club-light: #F0EAF4; --club-light-hover: #E8E0EE; --club-light-active: #CFBEDD;
  --club-normal: #652D90; --club-normal-hover: #5B2982; --club-normal-active: #512473;
  --club-dark: #4C226C; --club-dark-hover: #3D1B56; --club-dark-active: #2D1441;
  --club-darker: #231032;

  /* متن/خنثی */
  --ink: #292827; --ink-hover: #DFDFDF; --ink-active: #BDBCBC;
  --ink-light: #EAEAE9; --ink-dark: #1F1E1D; --ink-darker: #0E0E0E;
  --ink-faq: #3d3b3a; --ink-subtle: #777777; --ink-soft: #333230;

  /* تکمیلی از DESIGN.md (تنها در سایت واقعی) */
  --tertiary: #f4971f; --tertiary-alt: #f9a21d;
  --violet: #5b3e9e; --violet-accent: #7c4dbf; --violet-card-bg: #fbfafe; --purple-legacy: #4f215a;
  --gold: #f8a41d; --silver: #525252; --bronze: #a56216; --yellow-label: #ffd641;
  --linkedin-blue: #0a78b5; --linkedin-border: #70b8e8; --linkedin-bg: #eef7ff;
  --progress-bg: #ededec;
  --bg-mint: #f2faf9; --bg-blush: #fefafb; --bg-lavender: #f4f5fb; --bg-neutral: #f6f6f6; --white: #ffffff;
  --overlay-white-15: rgba(255,255,255,0.15); --overlay-white-58: rgba(255,255,255,0.58);
  --overlay-white-69: rgba(255,255,255,0.69); --overlay-grey-22: rgba(180,180,180,0.22);
  --overlay-black-5: rgba(0,0,0,0.05);

  /* Accents برند (Rokad) */
  --accent-green: #009966; --accent-red: #C60036; --accent-purple: #8A38F5;

  /* ===== تایپوگرافی ===== */
  --font-family: "IRANSansX", "Montserrat", sans-serif;

  /* مقیاس پایه (Rokad) */
  --text-xs: 10px;  --leading-xs: 15px;
  --text-sm: 13px;  --leading-sm: 19.5px;
  --text-base: 16px; --leading-base: 24px;
  --text-md: 20px;  --leading-md: 30px;
  --text-lg: 25px;  --leading-lg: 37.5px;
  --text-xl: 39px;  --leading-xl: 58.5px;
  --text-2xl: 49px; --leading-2xl: 73.5px;
  --text-3xl: 61px; --leading-3xl: 91.5px;

  /* نقش‌های تولیدی (DESIGN.md) */
  --font-hero-h1: 59.4px;      --weight-hero-h1: 950; --leading-hero-h1: 1.1;
  --font-h2-desktop: 53.2px;   --weight-h2: 950;      --leading-h2: 1.2;
  --font-h2-tablet: 36px;
  --font-h2-mobile: 24px;
  --font-stat-number: 70.5px;  --weight-stat: 950;    --leading-stat: 1.0;
  --font-body: 17.5px;         --weight-body: 600;    --leading-body: 1.7;
  --font-button: 20.4px;       --weight-button: 800;
  --font-nav-link: 15px;       --weight-nav-link: 600; --leading-nav: 1.25;
  --font-nav-cta: 15px;        --weight-nav-cta: 900;
  --font-micro: 11px;          --weight-micro: 500;    --leading-micro: 1.4;
  --rotation-scale: -3deg, -1.5deg, 0deg, 1.5deg, 2deg, 2.5deg, 3deg;

  /* ===== فاصله‌گذاری ===== */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;

  --section: 4rem; --section-sm: 3rem; --section-lg: 5rem; --section-xl: 6rem;
  --gutter: 3rem; --gutter-md: 4rem; --gutter-lg: 6rem; --gutter-xl: 7.5rem;
  --content-max: 75rem;
  --card-gap: 1rem; --card-gap-lg: 1.5rem; --card-gap-xl: 2rem;

  /* ===== شعاع ===== */
  --radius-xs: 5px;  --radius-sm: 8px;  --radius-md: 12px;
  --radius-lg: 17px; --radius-xl: 24px; --radius-2xl: 34px; --radius-pill: 40px;

  /* ===== بوردر ===== */
  --border-thin: 1px solid var(--ink-light);
  --border-mid: 1.5px solid var(--color-primary);
  --border-bold: 3px solid var(--color-primary);
  --border-card: 2px solid var(--ink);

  /* ===== سایه (توکن‌های داکیومنتیشن رنگی — شکل واقعی همیشه دولایهٔ آفست است) ===== */
  --shadow-ecosystem: 2.75px 2.75px 0 var(--ecosystem-normal);
  --shadow-male:      2.75px 2.75px 0 var(--male-normal);
  --shadow-female:    2.75px 2.75px 0 var(--female-normal);
  --shadow-college:   2.75px 2.75px 0 var(--college-normal);
  --shadow-club:      2.75px 2.75px 0 var(--club-normal);
  --shadow-neutral:   2.75px 2.75px 0 var(--ink);

  --shadow-soft: 0 1.25rem 3.75rem -1.25rem rgba(33,41,90,0.25);
  --shadow-navbar: 0 0.0625rem 0.1875rem rgba(0,0,0,0.04), 0 0.5rem 1.25rem rgba(33,41,90,0.05), 0 1.25rem 2.5rem -0.25rem rgba(33,41,90,0.06);
}
```

---

## ۱۱. پیکربندی Tailwind (نهایی)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#59BBAF', sec: '#202A5A', girl: '#E0195B', third: '#F8A41D',
        ecosystem: { light:'#EEF8F7', normal:'#59BBAF', dark:'#438C83', darker:'#1F413D' },
        male:      { light:'#E9EAEF', normal:'#202A5A', dark:'#182044', darker:'#0B0F1F' },
        female:    { light:'#FCE8EF', normal:'#E0195B', dark:'#A81344', darker:'#4E0920' },
        college:   { light:'#FEF6E8', normal:'#F8A41D', dark:'#BA7B16', darker:'#57390A' },
        club:      { light:'#F0EAF4', normal:'#652D90', dark:'#4C226C', darker:'#231032' },
        ink:       { light:'#EAEAE9', DEFAULT:'#292827', dark:'#1F1E1D', darker:'#0E0E0E', faq:'#3d3b3a', subtle:'#777777', soft:'#333230' },
        gold: '#f8a41d', silver: '#525252', bronze: '#a56216', yellow: { label: '#ffd641' },
        bg: { mint:'#f2faf9', blush:'#fefafb', lavender:'#f4f5fb', neutral:'#f6f6f6' },
      },
      fontFamily: { sans: ['IRANSansX', 'Montserrat', 'sans-serif'] },
      fontSize: {
        xs:['10px','15px'], sm:['13px','19.5px'], base:['16px','24px'],
        md:['20px','30px'], lg:['25px','37.5px'], xl:['39px','58.5px'],
        '2xl':['49px','73.5px'], '3xl':['61px','91.5px'],
        'hero-h1': ['59.4px', { lineHeight: '1.1', fontWeight: '950' }],
        'h2': ['53.2px', { lineHeight: '1.2', fontWeight: '950' }],
        'stat': ['70.5px', { lineHeight: '1.0', fontWeight: '950' }],
      },
      borderRadius: {
        xs:'5px', sm:'8px', md:'12px', lg:'17px', xl:'24px', '2xl':'34px', pill:'40px',
      },
      boxShadow: {
        ecosystem:'2.75px 2.75px 0 #59BBAF', male:'2.75px 2.75px 0 #202A5A',
        female:'2.75px 2.75px 0 #E0195B', college:'2.75px 2.75px 0 #F8A41D',
        club:'2.75px 2.75px 0 #652D90', neutral:'2.75px 2.75px 0 #292827',
        soft: '0 1.25rem 3.75rem -1.25rem rgba(33,41,90,0.25)',
        navbar: '0 0.0625rem 0.1875rem rgba(0,0,0,0.04), 0 0.5rem 1.25rem rgba(33,41,90,0.05), 0 1.25rem 2.5rem -0.25rem rgba(33,41,90,0.06)',
      },
      spacing: {
        section: '4rem', 'section-sm': '3rem', 'section-lg': '5rem', 'section-xl': '6rem',
        gutter: '3rem', 'gutter-md': '4rem', 'gutter-lg': '6rem', 'gutter-xl': '7.5rem',
      },
      maxWidth: { content: '75rem' },
    },
  },
}
```

---

## ۱۲. راهنمای استفاده (Do's and Don'ts نهایی)

### باید
- همیشه از توکن استفاده شود، نه هگز سخت داخل JSX/CSS.
- انتخاب تم بر اساس بخش: اکوسیستم=عمومی/برند، پسر/دختر=محتوای جنسیت‌محور، کالج=دانشگاهی، کلوپ=انجمن‌ها (پس از پیاده‌سازی).
- `dir="rtl"` روی `<html>` و `direction: rtl` صریح روی `html`/`body` — نه `dir="auto"`.
- آرایه‌های داده با فرض RTL مرتب شوند (اولین آیتم = لبهٔ راست).
- برای سایهٔ کارت‌های استیکر همیشه تکنیک دولایهٔ آفست؛ هرگز CSS `box-shadow`.
- چرخش‌ها فقط از مقیاس اسنپ‌شده (`-3, -1.5, 0, 1.5, 2, 2.5, 3` درجه).
- خاصیت `[corner-shape:squircle]` روی هر المان با شعاع نامتقارن.
- ماسک گرادیانی محو (`mask-image: linear-gradient(...)`) روی هر پترن پس‌زمینه.
- فونت‌ها self-host شوند (IRANSansX ۱۱ وزن + Montserrat variable)؛ هرگز Google Fonts.
- دو هگز نزدیک‌به‌هم navy (`#21295a`/`#202a5a`) و teal (`#58bdaf`/`#59bbaf`) در کد به مقادیر نهایی بخش ۹ یکدست شوند.

### نباید
- شخصیت‌های تصویری (منتور هیرو، دانش‌آموز پسر/دختر) به‌صورت SVG دستی کد نشوند — این‌ها composite چندبخشی هستند و باید به‌صورت تصویر فلت اکسپورت شوند.
- از `box-shadow` برای سایهٔ آفست کارت استفاده نشود.
- هگز اینلاین در JSX وقتی توکن Tailwind موجود است استفاده نشود.
- لینک‌های دانلود Figma در کد نهایی نمانند (حدود ۷ روز منقضی می‌شوند) — باید فوراً دانلود و کامیت شوند.
- از `overflow: hidden` روی کانتینر کاروسل استفاده نشود؛ به‌جایش `overflow-x: clip`.
- فراموش نشود شعاع کارت Comments بین موبایل و دسکتاپ عمداً فلیپ می‌شود — این رفتار حفظ شود.

---

## ۱۳. کتابخانهٔ کامل کامپوننت‌ها (Component Library Reference — از DESIGN.md)

این بخش، مرجع دقیق پیاده‌سازی هر کامپوننت تولیدی سایت است؛ همهٔ مقادیر باید طبق توکن‌های بخش‌های ۲ تا ۷ نگاشت شوند (مثلاً `#292827` → `var(--ink)`، `#58bdaf`/`#59bbaf` → `var(--color-primary)`، `#21295a`/`#202a5a` → `var(--color-sec)`).

### ۱۳.۱ StatCard
| ویژگی | مقدار |
|---|---|
| بوردر | `border-[0.1875rem]` (۳px) رنگ تم |
| شعاع | `rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-none rounded-bl-none [corner-shape:squircle]` |
| سایهٔ پشتی | `top-2 left-2 -right-[0.25rem] -bottom-[0.25rem]` رنگ تخت تم، همان شعاع |
| بج Eyebrow | bg سفید، بوردر 0.0625rem، `rounded-xl [corner-shape:squircle]`، چرخش `+3deg` (نارنجی/مجنتا) یا `-2.5deg` (سرمه‌ای/تیل) |
| عدد | `text-[2.75rem] xs:text-[3rem] lg:text-[4.375rem]`، `font-black`، رنگ تم |
| کپشن پررنگ | `font-black`، رنگ تم |
| کپشن بقیه | `font-medium`، رنگ تم |
| چرخش کارت | `+1deg / +2.5deg` (نارنجی/مجنتا)، `-1deg / -2deg` (سرمه‌ای/تیل) |
| تم‌ها | نارنجی(tertiary)، سرمه‌ای(primary)، مجنتا(accent)، تیل(secondary) — هرکدام رنگ زمینه/بوردر/متن/بج مستقل |

### ۱۳.۲ SchoolCard
| ویژگی | مقدار |
|---|---|
| ابعاد | `min-h-[20rem] sm:min-h-[18rem] lg:min-h-[22rem]`، padding `p-5 sm:p-8 lg:p-10` |
| شعاع | `rounded-[1.5rem] sm:rounded-[2.75rem] lg:rounded-[3.25rem] [corner-shape:squircle]` |
| تم پسران | bg سرمه‌ای، متن CTA سرمه‌ای |
| تم دختران | bg مجنتا، متن CTA مجنتا |
| بوردر | `border-2 border-white/10` |
| هاور | `rotate-0 -translate-y-1.5 shadow-2xl`، `500ms ease-out` |
| تصویر | مطلق، پایین-چپ، `w-[85%]` تا `max-w-[16.25rem]` |
| تیتر H3 | `font-black text-[1.5rem] sm:text-[2rem]`، سفید |
| چیپ ویژگی | `-rotate-2`، bg `white/15`، `rounded-chip` |
| دکمهٔ CTA | چرخش `+1.5deg`، bg سفید، `font-extrabold`، هاور `scale-105 rotate-0` |

### ۱۳.۳ FeatureChip (دو-نقطه‌ای)
کانتینر `w-3 h-3`، نقطهٔ بیرونی `bg-white/60` تمام‌قاب، نقطهٔ درونی `w-[0.4375rem] h-[0.4375rem] bg-white/75` با آفست `left-0.5 top-0.5`.

### ۱۳.۴ PillarCard
| ویژگی | نسخهٔ روشن | نسخهٔ تیره | نسخهٔ ویژه (Featured) |
|---|---|---|---|
| شعاع | `rounded-[0_2rem_0_2rem]` نامتقارن | `rounded-[1.25rem]` متقارن | مثل تیره |
| bg | `#F6F6F6` | `white/6%` | تیل، بوردر تیل |
| بوردر | `border-2 border-[#292827]` | `white/12%` | — |
| سایهٔ پشتی | `top-[0.3rem] left-[0.3rem]` تخت `#292827` | ندارد | ندارد |
| آیکون‌چیپ | `w-7~11` بوردر `#292827`، `rounded-[0.68625rem_0_0.68625rem_0]` squircle | `w-11 h-11 rounded-xl bg-white/15` | `bg-white/25` |
| تیتر | `font-black`، ink | `font-extrabold`، سفید | سفید |
| بدنه | ink/60٪ | white/70٪ | white/90٪ |
| شمارهٔ ایندکس | گوشهٔ بالا-چپ، بسیار کمرنگ | مشابه، white/20٪ | — |
| چرخش | متغیرهای CSS `--rotation-sm`/`--rotation-lg`، معمولاً ±۲° | | |

### ۱۳.۵ TrustRibbon (روبان اعتماد هیرو)
شکل تک‌گوشه (`rounded-br` پلکانی از 0.875rem تا 2.25rem)، لایهٔ پشتی `#4EB9AB` با آفست، لایهٔ جلو `#E9F6F4` با پترن opacity 15٪، متن `#21295A` (یا `#4AB7AA` در دسکتاپ)، محتوا: «اولین هنرستان استارتاپی ایران…».

### ۱۳.۶ BranchCard (اکوسیستم)
| ویژگی | مقدار |
|---|---|
| ابعاد | `lg:max-w-[527px]` |
| بوردر | `border-2` رنگ برند شاخه |
| شعاع | `0 12px 0 12px` (اینلاین، نامتقارن) |
| سایه | `6px 8px 0 0` رنگ بوردر |
| تیتر | `font-black`، رنگ بوردر |
| دکمهٔ CTA | `h-10 rounded-xl px-6`، پرشده با رنگ برند، هاور `brightness-110` |
| خطوط اتصال (دسکتاپ) | SVG با `stroke-dasharray="10 8"` رنگ برند |
| دایرهٔ هاب | `200×200px`، گرادیان رادیال `#7ED3C6→#58BDAF→#347E75`، بوردر `3px solid #347E75`، سایه `6px 8px 0 0 #347E75` |

### ۱۳.۷ HonorsCard
| ویژگی | مقدار |
|---|---|
| شعاع | `rounded-[0_2rem_0_2rem]` نامتقارن (بالا-راست + پایین-چپ) |
| بوردر | `0.140625rem` رنگ رتبه |
| سایهٔ پشتی | `top/left 0.1875rem` رنگ accent رتبه |
| رتبه‌ها | اول=`gold #F8A41D`/تینت `#FFFDFA`، دوم=`silver #525252`/`#F2F2F2`، سوم=`bronze #A56216`/`#FEFDFA`، منطقه‌ای=`navy #21295A`/`#F4F5FB` |
| بج مدال | مطلق، بالای کارت، `w/h 14~20`، چرخش `±6deg` بسته به ایندکس |

### ۱۳.۸ FAQ Accordion Item + Consultation Box
| ویژگی | مقدار |
|---|---|
| شعاع بسته/باز | `rounded-tr-[1.375rem] rounded-bl-[1.375rem]` (نامتقارن معکوس) |
| بوردر | `border-2 border-[#292827]` |
| bg بسته/باز | سفید / تیل |
| آیکون دکمه | `rounded-[0_0.978125rem_0_0.978125rem]`، bg `#3D3B3A`، چرخش در حالت باز `rotate-180` |
| انیمیشن باز‌شدن | grid-rows `0fr→1fr` + opacity، `500ms ease-in-out` |
| باکس مشاوره | شعاع `rounded-tl-[2.5rem] rounded-br-[2.5rem]`، بوردر `0.21875rem #292827`، bg تیل، عنوان با رنگ‌آمیزی دوگانه سفید/ink |

### ۱۳.۹ BlogCard
شعاع `rounded-[1.875rem_0_1.875rem_0]` نامتقارن، بوردر `#292827`، سایهٔ پشتی تخت هم‌رنگ، divider نقطه‌چین، تگ سیاه با متن سفید، هاور `rotate-0`.

### ۱۳.۱۰ StudentCard (Rokadians)
ابعاد واکنش‌گرا از `w-[calc(100vw-5.5rem)]` (موبایل) تا `w-[15.75rem] h-[22.375rem]` (2xl)، شعاع `rounded-[0_1.25rem_0_1.25rem]` (موبایل) / `[0_0.875rem_0_0.875rem]` (دسکتاپ)، هدر گرادیان تیل، آواتار دایره‌ای با بوردر و سایهٔ مستقل، بج نقش با چرخش `-1deg`/`-1.55deg`، فوتر با ۳ آیکون لینکدین، ریل استک‌شدهٔ ۵ لایه در دسکتاپ با ماسک گرادیانی محو در لبه‌ها.

### ۱۳.۱۱ CommentsCard
شعاع **فلیپ‌شونده**: موبایل `rounded-[0_1.375rem_0_1.375rem]` ↔ دسکتاپ `rounded-[2.5rem_0_2.5rem_0]` — این رفتار عمدی است و نباید حذف شود. بوردر و سایهٔ پشتی رنگ تم، آواتار مربعیِ squircle با حروف اول سفید.

### ۱۳.۱۲ EventsCarousel Card
شعاع `rounded-[0_2.75rem_0_2.75rem]`، بوردر `0.140625rem` رنگ تم، تیتر کلمه‌به‌کلمه با چرخش متناوب `-3deg`/`+1deg`، تم‌ها: پسران=سرمه‌ای، دختران=مجنتا.

### ۱۳.۱۳ FinalCTA
bg تیل، پترن `scale-125 opacity-100` (فقط دسکتاپ)، تیتر سفید با چرخش متناوب کلمات `±3deg`، دکمهٔ CTA سرمه‌ای‌فام (`#21295A`) با شعاع squircle، تصاویر دختر/پسر در دو طرف (دسکتاپ).

### ۱۳.۱۴ Story Section — لیبل شناور و لینک CTA
لیبل: bg `#FFD641`، بوردر مشکی، شعاع تک‌گوشه، سایهٔ سخت بدون بلور `0.1875rem 0.1875rem 0 #000`، چرخش `+3deg`.
لینک CTA: چرخش `+2deg` (هاور صفر)، لایهٔ سایهٔ تیل-آلت با آفست، دکمهٔ بوردردار تیل با متن تیل.

### ۱۳.۱۵ الگوهای انیمیشن مشترک
| المان | ترنزیشن |
|---|---|
| لینک ناوبری | رنگ ۲۰۰ms + خط زیرین گسترش‌یابنده |
| پیل CTA ناوبری | چرخش/مقیاس ۲۰۰ms هاور |
| دکمه‌های CTA هیرو | سایه + جابه‌جایی عمودی ۳۰۰ms |
| SchoolCard | چرخش/جابه‌جایی/سایهٔ بزرگ ۵۰۰ms ease-out |
| دکمهٔ آکاردئون FAQ | جابه‌جایی عمودی ۳۰۰ms |
| BlogCard | چرخش ۵۰۰ms ease-out |
| دکمه‌های آیکونی (فلش‌های کاروسل) | جابه‌جایی عمودی ۳۰۰ms |

**پیکربندی Swiper:** Honors (autoplay 3500ms، ۲–۳ اسلاید در breakpoint، centered، loop) · Comments (autoplay 3500ms، ۱ تا ۳ اسلاید بسته به breakpoint، centered، loop) · Events (فقط ناوبری دستی) · Blogs (۲ تا ۳ اسلاید، loop، بدون autoplay).

**ماسک پترن پس‌زمینه (در همهٔ سکشن‌ها):**
```css
[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
```

**نوار پیشرفت:** ترک `bg-[#EDECEC]` (= `var(--progress-bg)`)، پرکننده `bg-[#333230]` (= `var(--ink-soft)`)، عرض انیمیشن‌دار `500ms ease-out`.

### ۱۳.۱۶ نقشهٔ ترتیب سکشن‌های صفحه (Sections Map)

```
۱. Hero          — bg تیل، پترن
۲. Stats         — bg سفید، پترن، ۴× StatCard (۲ستونه موبایل → ۴ستونه xl)
۳. DualSchool    — bg سفید، پترن، ۲× SchoolCard
۴. Story         — bg #f6f6f6
۵. Pillars       — bg سفید، پترن، ۴× PillarCard
۶. Ecosystem     — bg سفید، پترن، ۳ BranchCard + دیاگرام هاب
۷. EventsCarousel— bg سفید، پترن، Swiper ۳کارتی
۸. Faq           — bg #e4f4f2، پترن، ۲ستونه
۹. Honors        — bg سفید، پترن، Swiper مدال
۱۰. Rokadians    — bg سفید، پترن، ریل افقی
۱۱. Comments     — bg #e4f4f2، پترن، Swiper نظرات
۱۲. Blogs        — bg سفید، پترن، Swiper بلاگ
۱۳. FinalCTA     — bg تیل، پترن (فقط دسکتاپ)
```
**فوتر** (سراسری): bg سرمه‌ای، گرید ۳ستونه لینک + لوگو + آیکون‌های اجتماعی.

---

## ۱۴. منابع

- `Rokad-design-system.md` — مستخرج از فایل Figma `rokadschool.ir`، صفحهٔ Design System (node `1:2`، key `cblkXUCIFtCkDmNOLq9dHz`).
- `DESIGN.md` — مستخرج از کد واقعی سایت (Vite + React 18 + Tailwind CSS 3 + Swiper 14 + React Router DOM 6).
