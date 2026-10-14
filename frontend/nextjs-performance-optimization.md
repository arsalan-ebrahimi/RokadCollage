# راهنمای بهینه‌سازی عملکرد سایت Next.js

> هدف: کاهش زمان بارگذاری، بهبود Core Web Vitals (LCP, CLS, INP) و حس سرعت در هر دو حالت Development و Production.

---

## فهرست اولویت‌ها

| اولویت | اقدام | اثر روی سرعت | هزینه پیاده‌سازی |
|:---:|---|:---:|:---:|
| ۱ | سنجش با `build` + `start` (نه `dev`) | مبنای تصمیم‌گیری | خیلی کم |
| ۲ | بهینه‌سازی فونت‌ها (`woff2` + `next/font/local`) | خیلی زیاد | کم |
| ۳ | `next/image` برای همه تصاویر | خیلی زیاد | متوسط |
| ۴ | `next/link` به‌جای `<a>` داخلی | زیاد | کم |
| ۵ | `next/dynamic` برای مدال‌ها و Swiper | زیاد | کم |
| ۶ | کاهش `"use client"` و استفاده از Server Components | زیاد | متوسط |
| ۷ | کش و ISR/SSG | زیاد | متوسط |
| ۸ | مدیریت اسکریپت‌های ثالث | متوسط | کم |
| ۹ | تحلیل باندل (`bundle-analyzer`) | تشخیصی | کم |

---

## ۱. Development در برابر Production

در حالت `next dev` کدها به‌صورت on-demand کامپایل می‌شوند، HMR فعال است و هیچ بهینه‌سازی‌ای (minify، tree-shaking، کش) اعمال نمی‌شود. بنابراین **هرگز سرعت سایت را با `dev` قضاوت نکنید.**

```bash
npm run build
npm start
```

نکات:
- خروجی `build` جدول حجم هر Route و First Load JS را نشان می‌دهد؛ این جدول اولین منبع شناسایی صفحات سنگین است.
- سرعت واقعی به هاست، CDN، حجم تصاویر و کش هم بستگی دارد؛ عدد مشخصی مثل «زیر ۰.۲ ثانیه» تضمینی نیست و باید با Lighthouse و ابزار واقعی سنجیده شود.
- برای تست دقیق از حالت Incognito و Lighthouse (Mobile + Throttling) استفاده کنید.
- برای بهبود تجربه `dev` می‌توان از Turbopack استفاده کرد:

```bash
next dev --turbopack
```

---

## ۲. بهینه‌سازی فونت‌ها (Font Optimization)

### مشکل
لود هم‌زمان ۱۱ وزن IRANSansX با فرمت `.ttf` در `globals.css`؛ هر وزن صدها کیلوبایت است و رندر متن را بلاک می‌کند (FOIT/FOUT و LCP بد).

### راهکار

**الف) تبدیل به `woff2`** (حجم معمولاً ۵۰ تا ۷۰٪ کمتر از TTF):

```bash
# با ابزار fonttools
pip install fonttools brotli
pyftsubset IRANSansX-Regular.ttf --flavor=woff2 --output-file=IRANSansX-Regular.woff2 \
  --unicodes="U+0600-06FF,U+200C-200D,U+FB50-FDFF,U+FE70-FEFF,U+0020-007E,U+06F0-06F9"
```

> ساب‌ستینگ با محدوده یونیکد فارسی/عربی + لاتین پایه + اعداد فارسی، حجم را بسیار کاهش می‌دهد. اگر سایت محتوای لاتین زیادی دارد، محدوده لاتین را کامل‌تر بگیرید.

**ب) فقط وزن‌های لازم** (معمولاً Regular، Medium، Bold کافی است).

**ج) استفاده از `next/font/local`** (فونت self-host، preload خودکار، بدون CLS):

```js
// app/fonts.js
import localFont from 'next/font/local';

export const iransans = localFont({
  src: [
    { path: '../public/fonts/IRANSansX-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/IRANSansX-Medium.woff2',  weight: '500', style: 'normal' },
    { path: '../public/fonts/IRANSansX-Bold.woff2',    weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-iransans',
  preload: true,
});
```

```js
// app/layout.js
import { iransans } from './fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={iransans.variable}>
      <body>{children}</body>
    </html>
  );
}
```

```css
/* globals.css — حذف همه @font-face های قبلی */
body {
  font-family: var(--font-iransans), system-ui, sans-serif;
}
```

**د) اگر از نسخه Variable فونت استفاده می‌کنید** (IRANSansX نسخه variable دارد)، یک فایل واحد جای ۱۱ فایل را می‌گیرد:

```js
export const iransans = localFont({
  src: '../public/fonts/IRANSansX-Variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-iransans',
});
```

> قبل از استفاده، مجوز استفاده و توزیع وب‌فونت را بررسی کنید.

---

## ۳. استفاده از `next/image`

### مزایا
- تبدیل خودکار به WebP/AVIF
- ریسایز بر اساس دستگاه (`srcset`)
- Lazy-load پیش‌فرض
- جلوگیری از CLS با تعیین ابعاد

```jsx
import Image from 'next/image';

// تصویر معمولی
<Image src="/assets/team.jpg" alt="تیم ما" width={800} height={600} />

// تصویر اصلی بالای صفحه (LCP) — حتماً priority
<Image src="/assets/hero.jpg" alt="..." fill priority sizes="100vw" style={{ objectFit: 'cover' }} />

// تصویر ریسپانسیو
<Image src={cover} alt="..." sizes="(max-width: 768px) 100vw, 50vw" />
```

نکات مهم:
- **`priority`** فقط برای تصویر بالای فولد (LCP)؛ روی همه تصاویر نزنید.
- **`sizes`** را درست تعیین کنید؛ بدون آن مرورگر بزرگ‌ترین نسخه را دانلود می‌کند.
- همیشه `alt` معنادار فارسی بنویسید (سئو + دسترسی‌پذیری).
- فرمت‌های مدرن را فعال کنید:

```js
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' },
    ],
  },
};
```

- پیش از قرار دادن در پروژه، تصاویر خام را فشرده کنید (Squoosh / sharp). تصویر ۵ مگابایتی حتی با `next/image` هزینه پردازش سرور را بالا می‌برد.
- ویدیوها را با `preload="none"` یا `poster` لود کنید و فقط هنگام نیاز پخش کنید.

---

## ۴. Dynamic Import (Lazy Loading)

کامپوننت‌هایی که در ثانیه اول لازم نیستند باید از باندل اولیه جدا شوند: مدال‌ها (`ConsultationModal`، `VideoPlayerModal`)، اسلایدرها (`Swiper`)، نقشه، ادیتور، چارت و ...

```jsx
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ConsultationModal = dynamic(() => import('@/components/ConsultationModal'), {
  ssr: false,
});
const VideoPlayerModal = dynamic(() => import('@/components/VideoPlayerModal'), {
  ssr: false,
});

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>درخواست مشاوره</button>
      {/* فقط وقتی لازم شد رندر (و دانلود) می‌شود */}
      {open && <ConsultationModal onClose={() => setOpen(false)} />}
    </>
  );
}
```

نکات:
- `ssr: false` فقط داخل **Client Component** مجاز است.
- مدال را حتماً شرطی رندر کنید (`{open && ...}`)؛ در غیر این صورت dynamic import فایده چندانی ندارد.
- برای Swiper فقط ماژول‌های استفاده‌شده را import کنید:

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// ایمپورت کل 'swiper/css/bundle' را انجام ندهید
```

- برای اسلایدرهای پایین صفحه می‌توان از Intersection Observer استفاده کرد تا فقط هنگام نزدیک شدن به viewport لود شوند.

---

## ۵. استفاده از `next/link`

```jsx
import Link from 'next/link';

// ❌ ناوبری کامل صفحه (reload)
<a href="/services">خدمات</a>

// ✅ ناوبری کلاینت + Prefetch خودکار
<Link href="/services">خدمات</Link>
```

نکات:
- Prefetch در Production هنگام ورود لینک به viewport انجام می‌شود (در `dev` فعال نیست).
- برای لینک‌های سنگین یا کم‌اهمیت (مثلاً فوتر) می‌توان `prefetch={false}` گذاشت.
- لینک‌های **خارجی** و فایل‌های دانلودی همچنان با `<a>` معمولی (و `rel="noopener noreferrer"`) بنویسید.
- برای ناوبری برنامه‌نویسی‌شده از `useRouter().push` استفاده کنید، نه `window.location`.

---

## ۶. Server Components و کاهش JavaScript کلاینت (بسیار مهم)

اگر از App Router استفاده می‌کنید:

- پیش‌فرض همه کامپوننت‌ها Server Component هستند و JS به کلاینت نمی‌فرستند.
- `'use client'` را فقط روی **کوچک‌ترین** کامپوننت تعاملی بگذارید، نه روی کل صفحه یا layout.

```jsx
// ❌ کل صفحه کلاینت
'use client';
export default function Page() { ... }

// ✅ صفحه سروری + جزیره‌های کوچک کلاینتی
export default async function Page() {
  const data = await getData();       // fetch در سرور
  return (
    <main>
      <StaticContent data={data} />   {/* Server */}
      <LikeButton />                  {/* فقط این Client است */}
    </main>
  );
}
```

- کتابخانه‌های سنگین (مثلاً پردازش markdown، فرمت تاریخ، lodash) را در سرور استفاده کنید.
- از `import _ from 'lodash'` پرهیز کنید؛ `import debounce from 'lodash/debounce'`.
- آیکون‌ها را از بسته‌های tree-shakable بگیرید و کل کتابخانه را import نکنید.

---

## ۷. کش و استراتژی رندر

| نوع صفحه | استراتژی پیشنهادی |
|---|---|
| لندینگ، درباره ما، خدمات | SSG (استاتیک) |
| بلاگ و محتوای کم‌تغییر | ISR با `revalidate` |
| داشبورد/داده شخصی | SSR یا کلاینت‌فچ |

```js
// App Router
export const revalidate = 3600; // هر ساعت بازتولید

// یا در fetch
const res = await fetch(url, { next: { revalidate: 3600 } });
```

برای مسیرهای داینامیک (مثل `/blog/[slug]`) از `generateStaticParams` استفاده کنید.

هدرهای کش برای فایل‌های ثابت:

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
};
```

> `immutable` فقط برای فایل‌هایی امن است که نامشان با تغییر محتوا عوض می‌شود. اگر فایلی را با همان نام جایگزین می‌کنید، مدت کش را کوتاه‌تر کنید.

اگر پشت CDN (مثل Cloudflare یا ابر داخلی) هستید، کش لبه (Edge Cache) و فشرده‌سازی Brotli را فعال کنید.

---

## ۸. اسکریپت‌های ثالث

Google Analytics، Tag Manager، چت آنلاین، Hotjar و ... از عوامل اصلی افت INP و LCP هستند.

```jsx
import Script from 'next/script';

<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" strategy="afterInteractive" />

// برای موارد کم‌اهمیت (چت، ویجت‌ها)
<Script src="https://example.com/widget.js" strategy="lazyOnload" />
```

- هر اسکریپتی که لازم نیست را حذف کنید.
- ویجت‌های سنگین را با تعامل کاربر (کلیک/اسکرول) لود کنید.
- از `<iframe>` های سنگین (یوتیوب، نقشه) با `loading="lazy"` یا الگوی «click to load» استفاده کنید.

---

## ۹. CSS و Layout

- در `globals.css` فقط استایل‌های واقعاً سراسری نگه دارید؛ بقیه را CSS Modules یا Tailwind کنید.
- اگر Tailwind دارید، `content` را دقیق تنظیم کنید تا CSS مصرف‌نشده حذف شود.
- از انیمیشن روی `top/left/width/height` پرهیز کنید؛ `transform` و `opacity` ارزان‌ترند.
- برای تصاویر و ویدیوها همیشه `aspect-ratio` یا ابعاد ثابت تعیین کنید (جلوگیری از CLS).
- در RTL از ویژگی‌های منطقی استفاده کنید (`margin-inline-start`، `padding-inline-end`) تا نیاز به استایل جداگانه نباشد.

---

## ۱۰. تحلیل باندل

```bash
npm i -D @next/bundle-analyzer
```

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({ /* ...config */ });
```

```bash
ANALYZE=true npm run build
```

به دنبال این موارد بگردید: کتابخانه‌های تکراری، بسته‌های بزرگ که فقط بخش کوچکی از آن‌ها استفاده می‌شود، و کامپوننت‌های کلاینتی که می‌توانستند سروری باشند.

---

## ۱۱. متادیتا و سئوی فنی (هم‌راستا با سرعت)

```js
// app/layout.js یا page.js
export const metadata = {
  title: '...',
  description: '...',
  alternates: { canonical: '/' },
};
```

- از `app/sitemap.js` و `app/robots.js` برای تولید خودکار نقشه سایت استفاده کنید.
- Heading ها را سلسله‌مراتبی بنویسید (فقط یک `h1`).
- `lang="fa"` و `dir="rtl"` را روی `<html>` تنظیم کنید.
- داده ساختاریافته (JSON-LD) را به‌صورت `<script type="application/ld+json">` در Server Component اضافه کنید.

---

## ۱۲. چک‌لیست نهایی

### فونت
- [ ] تبدیل همه فونت‌ها به `woff2` (و ساب‌ست فارسی)
- [ ] کاهش وزن‌ها یا استفاده از Variable Font
- [ ] استفاده از `next/font/local` با `display: 'swap'`
- [ ] حذف `@font-face` های قدیمی از `globals.css`

### تصاویر
- [ ] همه `<img>` ها به `<Image>` تبدیل شدند
- [ ] `priority` فقط روی تصویر LCP
- [ ] `sizes` درست تنظیم شده
- [ ] تصاویر خام قبل از آپلود فشرده شدند

### JavaScript
- [ ] مدال‌ها و Swiper با `next/dynamic` لود می‌شوند
- [ ] `'use client'` فقط روی کامپوننت‌های تعاملی
- [ ] ایمپورت‌های کتابخانه‌ها tree-shakable هستند
- [ ] باندل با analyzer بررسی شد

### ناوبری و کش
- [ ] همه لینک‌های داخلی `<Link>` هستند
- [ ] صفحات مناسب SSG/ISR شدند
- [ ] هدرهای کش برای `/fonts` و `/assets` تنظیم شد
- [ ] فشرده‌سازی Brotli/Gzip فعال است

### سنجش
- [ ] تست روی `npm run build && npm start`
- [ ] Lighthouse موبایل قبل و بعد ثبت شد
- [ ] LCP < 2.5s ، CLS < 0.1 ، INP < 200ms
- [ ] پایش مداوم با PageSpeed Insights / Search Console (Core Web Vitals)

---

## ترتیب پیشنهادی اجرا

1. ابتدا یک **Lighthouse پایه** از وضعیت فعلی (روی build پروداکشن) ثبت کنید.
2. **فونت‌ها** را اصلاح کنید (بیشترین اثر، کمترین ریسک).
3. **لینک‌ها** را به `<Link>` تبدیل کنید.
4. **تصاویر** را به `<Image>` منتقل کنید (اول تصویر Hero).
5. **مدال‌ها و Swiper** را Dynamic کنید.
6. Bundle Analyzer را اجرا و باقی گلوگاه‌ها را شناسایی کنید.
7. دوباره Lighthouse بگیرید و نتایج را مقایسه کنید.

> بعد از هر مرحله یک بار اندازه‌گیری کنید تا اثر هر تغییر مشخص باشد و ریسک پسرفت کنترل شود.
