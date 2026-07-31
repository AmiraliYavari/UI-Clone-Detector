<div align="left">

**🌐 English: [README.md](./README.md) | فارسی**

</div>

<div align="center">

# 🧬 UI Cloner

### از عکس تا کد — در چند ثانیه

یه اسکرین‌شات از هر رابط کاربری بده (مثلاً گیت‌هاب)، هوش مصنوعی تحلیلش می‌کنه و کد **React** واقعیش رو با **پیش‌نمایش زنده** تحویلت می‌ده.

[![Node](https://img.shields.io/badge/Node-18%2B-3fb950?style=flat-square&logo=node.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-18-58a6ff?style=flat-square&logo=react&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-5-d29922?style=flat-square&logo=vite&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-4-8b949e?style=flat-square&logo=express&logoColor=white)](#)
[![Multi--Provider](https://img.shields.io/badge/AI-OpenAI%20%7C%20Z.AI%20%7C%20Anthropic-f85149?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-30363d?style=flat-square)](#)

</div>

---

## ✨ ویژگی‌ها

| | |
|---|---|
| 📸 **آپلود با Drag & Drop** | عکس رو بکش و رها کن، همین |
| 🧠 **تحلیل چند-provider‌ی** | بین OpenAI، Z.AI یا Anthropic سوییچ کن — هرکدوم که کلیدش رو داری |
| ⚛️ **خروجی React واقعی** | نه توضیح، نه نیمه‌کاره — کد کامل JSX + CSS |
| 👁️ **پیش‌نمایش زنده** | همون لحظه کد تولیدشده رو اجرا و رندر می‌کنه |
| 🕘 **تاریخچه** | همه‌ی کلون‌های قبلی‌ت لوکال ذخیره می‌شن |
| 🌐 **رابط دوزبانه** | انگلیسی / فارسی، قابل تعویض از نوار بالا |
| 🔒 **کلید API امن** | فقط روی بک‌اند، هیچ‌وقت توی مرورگر لو نمی‌ره |

---

## 🏗️ معماری

```
┌─────────────┐         base64 image          ┌──────────────┐        vision + json         ┌─────────────────────┐
│  Frontend   │ ─────────────────────────────► │   Backend    │ ────────────────────────────► │  OpenAI / Z.AI /     │
│ React + Vite│                                 │Express + SDK │                                │  Anthropic (vision)  │
│             │ ◄───────────────────────────── │              │ ◄──────────────────────────── │                       │
└─────────────┘        { analysis, jsx, css }   └──────────────┘        structured JSON         └─────────────────────┘
```

```
github-ui-cloner/
├── backend/                 # 🔧 Express server — پراکسی امن به provider هوش مصنوعی
│   ├── server.js            #    POST /api/analyze · GET /api/providers
│   ├── providers.js         #    تنظیمات OpenAI / Z.AI / Anthropic
│   └── .env.example
│
└── frontend/                # 🎨 React + Vite + React Router
    └── src/
        ├── pages/
        │   ├── Home.jsx      # آپلود و شروع تحلیل
        │   ├── Result.jsx    # کد + پیش‌نمایش زنده
        │   └── History.jsx   # تاریخچه‌ی کلون‌ها
        ├── components/
        │   ├── Dropzone.jsx
        │   ├── CodeViewer.jsx
        │   ├── PreviewFrame.jsx
        │   └── Navbar.jsx     # ناوبری + سوییچ زبان + وضعیت بک‌اند
        ├── i18n/translations.js
        ├── context/LanguageContext.jsx
        └── api.js
```

---

## 🚀 شروع سریع

### پیش‌نیاز
- Node.js نسخه‌ی ۱۸ یا بالاتر
- کلید API حداقل یکی از این provider ها: [OpenAI](https://platform.openai.com/api-keys)، [Z.AI](https://z.ai/model-api) یا [Anthropic](https://console.anthropic.com/)

### ۱) بک‌اند رو بالا بیار

```bash
cd backend
npm install
cp .env.example .env      # کلید هرکدوم از provider هایی که داری رو بذار
npm run dev
```

> 🟢 سرور روی `http://localhost:8787` گوش می‌ده

### ۲) فرانت‌اند رو بالا بیار

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

> 🟢 اپ روی `http://localhost:5173` در دسترسه

### ۳) امتحانش کن
یه اسکرین‌شات از یه صفحه‌ی گیت‌هاب بگیر، توی صفحه‌ی خانه رهاش کن، دکمه‌ی «تحلیل و تولید کد» رو بزن و چند ثانیه بعد کد + پیش‌نمایش زنده‌ش رو ببین. 🎉

---

## 🔄 جریان کار

```mermaid
sequenceDiagram
    participant U as کاربر
    participant F as Frontend
    participant B as Backend
    participant AI as AI Provider

    U->>F: آپلود اسکرین‌شات
    F->>B: POST /api/analyze (base64 + provider)
    B->>AI: تصویر + پرامپت ساختاریافته
    AI-->>B: { analysis, jsx, css }
    B-->>F: JSON پاسخ
    F->>F: ذخیره در localStorage
    F-->>U: نمایش کد + پیش‌نمایش زنده
```

---

## 🌍 Provider های پشتیبانی‌شده

| Provider | متغیر env | مدل پیش‌فرض |
|---|---|---|
| OpenAI | `OPENAI_API_KEY` | `gpt-4o` |
| Z.AI | `ZAI_API_KEY` | `glm-4.6v` |
| Anthropic | `ANTHROPIC_API_KEY` | `claude-sonnet-4-6` |

فقط لازمه اونایی که می‌خوای استفاده کنی رو کانفیگ کنی — اپ خودش provider های موجود رو تشخیص می‌ده و می‌ذاره از رابط کاربری انتخاب کنی.

---

## 🛠️ استک فنی

- **Frontend:** React 18 · React Router 6 · Vite 5
- **Backend:** Express 4 · SDK سازگار با OpenAI (روی هر سه provider کار می‌کنه)
- **پیش‌نمایش زنده:** Babel Standalone داخل `iframe` سندباکس‌شده
- **چندزبانگی:** context سبک و سفارشی برای ترجمه، پیش‌فرض انگلیسی / قابل تعویض به فارسی

---

## ⚠️ نکات مهم قبل از Production

- [ ] نتایج رو به‌جای `localStorage` توی یه دیتابیس واقعی (Postgres / SQLite) ذخیره کن
- [ ] Rate limiting و احراز هویت اضافه کن — هر تحلیل هزینه‌ی API داره
- [ ] برای پاسخ‌های نامعتبر JSON از مدل، retry logic بذار
- [ ] `.env` واقعی رو هیچ‌وقت commit نکن (توی `.gitignore` پوشش داده شده)

---

<div align="center">

ساخته‌شده با ❤️ و کلی فنجون قهوه ☕

</div>