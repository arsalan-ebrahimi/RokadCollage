# راهنمای اصول Clean Code (مرجع تیم و پرامپت راهنما)

این سند به‌عنوان مرجع مشترک تیم و همچنین راهنمای ریویوی کد (چه توسط انسان، چه توسط ابزار AI) استفاده می‌شود. هدف نوشتن کدی است که **خوانا، قابل تغییر، قابل تست و قابل پیش‌بینی** باشد.

---

## ۱. اصول نام‌گذاری (Naming)

- نام‌ها باید **قصد** (intent) را نشان دهند، نه پیاده‌سازی.
  - بد: `const d = getData()`
  - خوب: `const enrolledStudents = getEnrolledStudents()`
- از نام‌های عمومی و مبهم پرهیز شود: `data`, `info`, `temp`, `obj`, `handleStuff`.
- توابع با فعل شروع شوند: `getUser`, `calculateTotal`, `isValidEmail`.
- Boolean ها با `is` / `has` / `should` / `can` شروع شوند: `isLoading`, `hasPermission`.
- ثابت‌ها UPPER_SNAKE_CASE: `MAX_RETRY_COUNT`.
- از اختصار غیرضروری پرهیز شود (`usr` به‌جای `user` قابل‌قبول نیست)، مگر اختصارات رایج صنعت (`id`, `url`, `api`).
- نام یکسان برای مفهوم یکسان در کل پروژه — اگر یک‌جا `fetchUser` است، جای دیگر نباید `getUserData` باشد.

---

## ۲. توابع (Functions)

- **یک تابع، یک کار.** اگر برای توضیح تابع از "و" استفاده می‌کنی (`validate and save`)، باید بشکند.
- حداکثر ۳۰-۵۰ خط برای هر تابع؛ بالای ۷۰ خط اجباراً refactor.
- حداکثر ۳ آرگومان ورودی؛ بیشتر از آن → پاس‌دادن یک آبجکت (`options object`).
- از side effect غیرمنتظره پرهیز شود — تابعی به نام `getUser` نباید داده را تغییر دهد یا API صدا بزند.
- سطح انتزاع (abstraction level) در یک تابع یکسان باشد؛ جزئیات سطح پایین (مثل فرمت تاریخ خام) را داخل تابعی که منطق سطح بالا دارد ننویس.
- به‌جای پرچم‌های boolean به‌عنوان آرگومان (`createUser(true)`), از نام واضح یا enum استفاده شود.

```ts
// بد
function createUser(name: string, isAdmin: boolean) {}

// خوب
function createUser(name: string, role: UserRole) {}
```

---

## ۳. شرط‌ها و پیچیدگی (Conditionals & Complexity)

- Cyclomatic complexity هر تابع حداکثر ۱۰ (پیکربندی ESLint: `complexity: ["warn", 10]`).
- عمق nesting شرط‌ها حداکثر ۳ سطح.
- به‌جای nested if، از **early return / guard clause** استفاده شود:

```ts
// بد
function processOrder(order) {
  if (order) {
    if (order.isValid) {
      if (order.items.length > 0) {
        // ...
      }
    }
  }
}

// خوب
function processOrder(order) {
  if (!order) return;
  if (!order.isValid) return;
  if (order.items.length === 0) return;
  // ...
}
```

- شرط‌های پیچیده و ترکیبی را در یک متغیر یا تابع با نام معنادار استخراج کن:

```ts
// بد
if (user.age >= 18 && user.country === 'IR' && !user.isBanned) { ... }

// خوب
const isEligibleUser = user.age >= 18 && user.country === 'IR' && !user.isBanned;
if (isEligibleUser) { ... }
```

- از `switch` بزرگ یا زنجیره‌ی طولانی `else if` برای منطق دامنه پرهیز شود؛ به‌جایش از map/lookup object یا polymorphism استفاده شود.

---

## ۴. DRY (Don't Repeat Yourself) — با احتیاط

- تکرار کد بیش از ۲-۳ بار → استخراج به تابع/کامپوننت/هوک مشترک.
- اما: **DRY را روی abstraction اشتباه اعمال نکن.** اگر دو بخش امروز شبیه‌اند ولی از نظر منطقی مستقل‌اند (مثلاً فرم لاگین و فرم ثبت‌نام)، یکی‌کردن زودهنگام باعث coupling غلط می‌شود. قانون Rule of Three: تا بار سوم تکرار صبر کن، بعد انتزاع کن.

---

## ۵. کامنت‌ها

- کد باید خودش گویا باشد؛ کامنت برای توضیح **چرا**، نه **چی**.
  - بد: `// افزایش شمارنده` بالای `counter++`
  - خوب: `// جبران آفست صفحه‌بندی چون API از ۱ شروع می‌شود`
- کامنت‌های مرده (کد کامنت‌شده‌ی قدیمی) حذف شوند — Git تاریخچه را نگه می‌دارد.
- TODO ها باید شماره تیکت یا نام نویسنده داشته باشند: `// TODO(artin): #234 - handle edge case`

---

## ۶. مدیریت خطا (Error Handling)

- خطاها را silent swallow نکن (`catch (e) {}` ممنوع).
- پیام خطا باید context بدهد: `throw new Error('Failed to fetch course ${id}: ${res.status}')`.
- از exception برای control flow عادی استفاده نکن؛ فقط برای حالت‌های واقعاً استثنایی.
- خطاهای مورد انتظار (مثل validation) را با نوع بازگشتی صریح مدیریت کن (`Result<T, Error>` یا مشابه)، نه throw.

---

## ۷. Immutability و State

- از mutation مستقیم روی props/state پرهیز شود؛ همیشه کپی جدید بساز (`spread`, `map`, `filter`).
- متغیرها ترجیحاً `const`؛ `let` فقط وقتی واقعاً reassign لازم است.
- از mutable global state دوری کن مگر در store مدیریت‌شده (zustand/redux).

---

## ۸. تایپ‌ها (TypeScript)

- `any` ممنوع؛ در موارد اضطراری `unknown` + type guard.
- تایپ‌های دامنه در `types.ts` مربوط به همان فیچر تعریف شوند، نه پراکنده.
- از type inference به‌جای annotation اضافی استفاده کن، ولی روی امضای تابع (ورودی/خروجی) همیشه تایپ صریح بگذار.
- Union type و enum به‌جای string خام برای حالت‌های محدود:

```ts
// بد
function setStatus(status: string) {}

// خوب
type OrderStatus = 'pending' | 'paid' | 'cancelled';
function setStatus(status: OrderStatus) {}
```

---

## ۹. تست‌پذیری

- تابع/کامپوننتی که تست‌نویسی برایش سخت است، معمولاً نشانه‌ی طراحی بد است (مسئولیت زیاد، coupling بالا).
- منطق pure (بدون side effect) را از منطق I/O جدا کن تا بدون mock قابل تست باشد.
- هر باگ‌فیکس باید یک تست رگرسیون همراه داشته باشد.

---

## ۱۰. Code Smells رایج (نشانه‌ی نیاز به Refactor)

| نشانه | راه‌حل |
|---|---|
| تابع/کامپوننت با بیش از ۵۰-۲۰۰ خط | شکستن به واحدهای کوچک‌تر |
| بیش از ۵-۶ پارامتر ورودی | پاس‌دادن آبجکت یا context |
| نام مبهم (`data`, `handleClick2`) | نام‌گذاری مجدد با قصد واضح |
| کپی-پیست کد در چند جا | استخراج به تابع/هوک مشترک |
| کامنت طولانی برای توضیح کد پیچیده | ساده‌سازی خود کد |
| چند مسئولیت در یک فایل | جداسازی بر اساس Single Responsibility |
| shotgun surgery (یک تغییر، چند فایل نامرتبط را دست می‌زند) | بازبینی مرزبندی ماژول‌ها |
| زنجیره‌ی طولانی `if/else` روی type | جایگزینی با polymorphism یا lookup map |

---

## ۱۱. چک‌لیست سریع Code Review

- [ ] نام متغیر/تابع قصد را روشن می‌گوید؟
- [ ] تابع فقط یک کار انجام می‌دهد؟
- [ ] nesting بیش از ۳ سطح نیست؟
- [ ] خطاها silent catch نشده‌اند؟
- [ ] هیچ `any` بی‌دلیل نیست؟
- [ ] کد تکراری در ۳+ جا وجود ندارد؟
- [ ] کامنت‌ها «چرا» را توضیح می‌دهند نه «چی»؟
- [ ] تست برای منطق پیچیده/باگ‌فیکس وجود دارد؟
