# راهنمای ساختار پروژه Next.js در مقیاس بزرگ (Enterprise Scale)

این سند به‌عنوان مرجع و **پرامپت راهنما** برای پیاده‌سازی، ریویوی کد، یا آموزش تیم استفاده می‌شود. هدف این است که هر توسعه‌دهنده یا هر ابزار AI که با این پروژه کار می‌کند، دقیقاً بداند فایل‌ها کجا باید قرار بگیرند، هر کامپوننت چه محدودیت‌هایی دارد، و منطق دامنه از UI چطور جدا می‌شود.

---

## ۱. فلسفه‌ی کلی

> ساختار پروژه باید بر اساس **دامنه/فیچر (Feature-based)** باشد، نه بر اساس نوع فایل.

به‌جای این‌که همه‌ی `components/`، همه‌ی `hooks/` و همه‌ی `types/` در یک پوشه‌ی سراسری جمع شوند، هر بخش کسب‌وکار (مثلاً `courses`, `auth`, `enrollment`) پوشه‌ی مستقل خودش را دارد و شامل تمام لایه‌های موردنیازش (کامپوننت، هوک، API، تایپ) می‌شود.

مزایا:
- کاهش تداخل (merge conflict) بین اعضای تیم
- قابلیت حذف/جداسازی یک فیچر بدون دست‌زدن به بقیه‌ی پروژه
- خوانایی بالاتر برای عضو جدید تیم

---

## ۲. ساختار درختی root پروژه

```
project-root/
├── .github/
│   └── workflows/                  # CI/CD (lint, test, build)
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/                        # فقط Routing و Layout — بدون منطق سنگین
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── courses/
│   │   │   │   ├── [courseId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── courses/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── features/                   # هسته‌ی منطق دامنه‌محور (مهم‌ترین بخش)
│   │   ├── courses/
│   │   │   ├── components/
│   │   │   │   ├── CourseCard/
│   │   │   │   │   ├── CourseCard.tsx
│   │   │   │   │   ├── CourseCard.test.tsx
│   │   │   │   │   ├── CourseCard.module.css
│   │   │   │   │   └── index.ts
│   │   │   │   └── CourseList/
│   │   │   │       ├── CourseList.tsx
│   │   │   │       └── index.ts
│   │   │   ├── hooks/
│   │   │   │   └── useCourseFilters.ts
│   │   │   ├── api/
│   │   │   │   ├── queries.ts       # useQuery ها
│   │   │   │   ├── mutations.ts     # useMutation ها
│   │   │   │   └── schema.ts        # zod validation
│   │   │   ├── types.ts
│   │   │   ├── utils.ts
│   │   │   └── index.ts             # Public API این فیچر
│   │   ├── auth/
│   │   └── enrollment/
│   │
│   ├── components/                 # کامپوننت‌های UI مشترک و بدون منطق دامنه
│   │   ├── ui/                     # atomic — Button, Input, Card, Modal
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   └── Input/
│   │   └── layout/                 # Header, Footer, Sidebar, Navbar
│   │
│   ├── lib/                        # ابزارهای فنی عمومی
│   │   ├── db.ts
│   │   ├── auth-config.ts
│   │   └── fetcher.ts
│   ├── hooks/                      # هوک‌های عمومی (غیر دامنه‌محور)
│   │   └── useDebounce.ts
│   ├── stores/                     # zustand / redux / jotai
│   ├── styles/
│   ├── types/                      # تایپ‌های global و مشترک
│   ├── config/                     # ثابت‌ها، env validation
│   └── middleware.ts
│
├── tests/
│   └── e2e/                        # پلی‌رایت/سایپرس
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## ۳. ساختار تک‌کامپوننت (Component Folder Pattern)

هر کامپوننت غیرتریویال باید پوشه‌ی مستقل خودش را داشته باشد، نه یک فایل تنها در میان بقیه:

```
Button/
├── Button.tsx           # منطق و JSX اصلی
├── Button.test.tsx       # تست واحد
├── Button.module.css     # استایل (اگر CSS Modules استفاده می‌شود)
├── Button.stories.tsx    # Storybook (اختیاری)
└── index.ts              # export index.ts { Button } from './Button'
```

**قوانین کامپوننت تکی:**
- یک کامپوننت = یک مسئولیت. اگر دو کار مجزا انجام می‌دهد، باید بشکند.
- منطق business logic هرگز مستقیم داخل JSX نوشته نشود؛ برود در یک `hook` مجزا (`useXxx.ts`) کنار همان کامپوننت.
- کامپوننت‌های Server به‌صورت پیش‌فرض؛ `"use client"` فقط وقتی واقعاً نیاز به state/event/browser API است.
- Props بیش از ۶ تا → نشانه‌ی نیاز به شکستن یا گروه‌بندی در یک آبجکت/context.

---

## ۴. محدودیت تعداد خط (Line Limits)

هیچ عدد رسمی جهانی وجود ندارد، اما این پروژه از این استانداردها پیروی می‌کند:

| مورد | حد قابل‌قبول | حد هشدار | حد اجباری refactor |
|---|---|---|---|
| کل فایل کامپوننت | تا ۱۵۰ خط | ۱۵۰–۲۵۰ خط | بالای ۳۰۰ خط |
| هر تابع/فانکشن | تا ۳۰ خط | ۳۰–۵۰ خط | بالای ۷۰ خط |
| عمق nesting در JSX | تا ۳ سطح | ۴ سطح | بالای ۴ سطح |
| تعداد `useState`/`useEffect` در یک کامپوننت | تا ۳ | ۴–۵ | بالای ۵ (باید custom hook شود) |
| تعداد props | تا ۵ | ۶–۷ | بالای ۷ |

پیکربندی پیشنهادی ESLint:

```json
{
  "rules": {
    "max-lines": ["warn", { "max": 200, "skipBlankLines": true, "skipComments": true }],
    "max-lines-per-function": ["warn", { "max": 50 }],
    "max-depth": ["warn", 3],
    "complexity": ["warn", 10],
    "react/jsx-max-depth": ["warn", { "max": 4 }]
  }
}
```

> نکته: عدد خط به‌تنهایی معیار قطعی نیست. معیار واقعی «مسئولیت واحد» است — اگر کامپوننت زیر ۱۵۰ خط باشد ولی دو کار نامرتبط انجام دهد، همچنان باید شکسته شود.

---

## ۵. قوانین Import و مرزبندی بین لایه‌ها

- Import مطلق با alias مشخص:
  ```ts
  import { Button } from '@/components/ui/Button';
  import { useCourseFilters } from '@/features/courses/hooks/useCourseFilters';
  ```
- `features/*` هرگز نباید از `app/*` ایمپورت کند (جهت وابستگی فقط یک‌طرفه: `app → features → components/lib`).
- بین دو فیچر مختلف (مثلاً `courses` و `enrollment`) ایمپورت مستقیم داخلی ممنوع است؛ فقط از طریق `index.ts` (Public API) آن فیچر.
- برای اجرای این قوانین از `eslint-plugin-boundaries` یا `eslint-plugin-import` با تنظیم `no-restricted-imports` استفاده شود.

---

## ۶. لایه‌بندی داده (Data Layer)

```
features/courses/api/
├── queries.ts     # خواندن داده (react-query / SWR)
├── mutations.ts   # نوشتن/تغییر داده
└── schema.ts       # اعتبارسنجی با zod
```

- منطق فچ سنگین و دیتابیس در Server Components یا Server Actions باشد.
- هر endpoint باید schema اعتبارسنجی (zod) داشته باشد، هم برای ورودی و هم خروجی.

---

## ۷. نکات مقیاس‌پذیری تیمی

- اگر چند اپلیکیشن (وب، پنل ادمین، shared UI) دارید → **Monorepo** با Turborepo یا Nx.
- Barrel files (`index.ts`) فقط برای Public API هر فیچر؛ استفاده‌ی افراطی از آن باعث کندی build و افزایش bundle می‌شود.
- تمام conventionهای بالا در یک فایل `CONTRIBUTING.md` مستند شود تا اعضای جدید تیم و همچنین ابزارهای AI (مثل Claude Code) بتوانند به آن ارجاع دهند.

---

## ۸. چک‌لیست سریع قبل از Merge

- [ ] فایل زیر ۲۵۰ خط است؟
- [ ] کامپوننت فقط یک مسئولیت دارد؟
- [ ] منطق business logic در hook جداست، نه در JSX؟
- [ ] Props بیش از ۷ تا نیست؟
- [ ] از فیچر دیگر مستقیم ایمپورت نشده (فقط از `index.ts`)؟
- [ ] `"use client"` فقط جایی‌ست که واقعاً لازم است؟
- [ ] تست واحد برای منطق پیچیده نوشته شده؟
