# UI Cloner — از عکس تا کد

یک اپ فول‌استک: یه اسکرین‌شات از UI (مثلاً گیت‌هاب) آپلود می‌کنی، بک‌اند از طریق OpenAI (مدل gpt-4o با قابلیت vision) تحلیلش می‌کنه و کد React + CSS معادلش رو برمی‌گردونه، همراه با پیش‌نمایش زنده در فرانت‌اند.

## ساختار پروژه

```
github-ui-cloner/
  backend/     ← Express server، proxy امن به OpenAI API
  frontend/    ← React + Vite + React Router
```

کلید API فقط روی بک‌اند نگه داشته می‌شه و هیچ‌وقت به مرورگر کاربر ارسال نمی‌شه.

## راه‌اندازی

### ۱) بک‌اند

```bash
cd backend
npm install
cp .env.example .env
# مقدار OPENAI_API_KEY رو در .env قرار بده
npm run dev
```

سرور روی `http://localhost:8787` بالا میاد.

### ۲) فرانت‌اند

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

اپ روی `http://localhost:5173` در دسترسه.

## چطور کار می‌کنه

1. کاربر عکس رو در صفحه‌ی خانه آپلود می‌کنه (drag & drop یا کلیک).
2. فرانت‌اند عکس رو به‌صورت base64 به `POST /api/analyze` روی بک‌اند می‌فرسته.
3. بک‌اند با OpenAI SDK و مدل `gpt-4o` (قابلیت vision + خروجی تضمینی JSON با `response_format: json_object`) تصویر رو تحلیل می‌کنه و یک JSON شامل تحلیل متنی + کد JSX + کد CSS برمی‌گردونه.
4. نتیجه در `localStorage` مرورگر ذخیره می‌شه (صفحه‌ی تاریخچه) و کاربر به صفحه‌ی نتیجه هدایت می‌شه.
5. صفحه‌ی نتیجه کد رو با تب‌های JSX/CSS نشون می‌ده و یک پیش‌نمایش زنده (با Babel standalone داخل iframe sandboxed) رندر می‌کنه.

## نکات

- برای production، به‌جای localStorage بهتره نتایج رو در یک دیتابیس واقعی (Postgres/SQLite/…) روی بک‌اند ذخیره کنی.
- محدودیت نرخ (rate limit) و احراز هویت کاربر برای استفاده‌ی عمومی توصیه می‌شه، چون هر تحلیل هزینه‌ی API داره.
- مدل ممکنه گاهی JSON نامعتبر برگردونه؛ بک‌اند این حالت رو با خطای 500 مدیریت می‌کنه — می‌تونی retry logic هم اضافه کنی.