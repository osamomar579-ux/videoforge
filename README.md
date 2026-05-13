# VideoForge AI — دليل الإعداد الكامل

## لماذا نحتاج Proxy؟

الفيديوهات تُنشأ عبر Replicate API، لكن المتصفح يمنع الطلبات المباشرة لـ APIs خارجية (CORS).
الحل: نضع سيرفر صغير (Proxy) بيستقبل طلبك ويرسله لـ Replicate، مجاناً تماماً.

---

## الطريقة الأسهل: Vercel (مجاني — 5 دقائق)

### الخطوة 1: أنشئ حساب على Vercel
1. اذهب إلى **vercel.com**
2. اضغط **Sign Up** وسجّل بحساب GitHub أو Gmail

### الخطوة 2: ارفع المشروع

**الطريقة A — عبر GitHub (الأسهل):**
1. أنشئ repository جديد على github.com
2. ارفع ملفات المجلد `videoforge` كلها
3. في Vercel، اضغط **New Project** → اختر الـ repository
4. اضغط **Deploy** — ينتهي في دقيقة!

**الطريقة B — عبر Vercel CLI:**
```bash
npm install -g vercel
cd videoforge
vercel --prod
```

### الخطوة 3: احصل على رابط Proxy
بعد النشر ستحصل على رابط مثل:
```
https://videoforge-abc123.vercel.app
```

### الخطوة 4: استخدم الموقع
1. افتح `index.html` من مجلد `public`
2. أدخل رابط Vercel في خانة **رابط الـ Proxy**
3. أدخل Replicate API Key من **replicate.com/account/api-tokens**
4. ابدأ في إنشاء الفيديوهات! 🎬

---

## الطريقة البديلة: Render.com

1. اذهب إلى **render.com** وأنشئ حساب
2. اضغط **New Web Service**
3. ارفع نفس ملفات المجلد
4. في إعدادات Build Command: `npm install`
5. Start Command: `npm start`
6. اختر **Free Tier**

---

## هيكل الملفات

```
videoforge/
├── pages/
│   └── api/
│       └── replicate/
│           └── [...path].js    ← الـ Proxy (لا تعدّله)
├── public/
│   └── index.html              ← الموقع الرئيسي
├── package.json
├── next.config.js
└── README.md
```

---

## الأسئلة الشائعة

**س: هل هو مجاني تماماً؟**
ج: نعم، Vercel مجاني للاستخدام الشخصي. الدفع الوحيد هو لـ Replicate بضع سنتات لكل فيديو.

**س: كيف أحصل على Replicate API Key؟**
ج: اذهب إلى replicate.com → سجّل حساب → Account → API Tokens → Create Token

**س: ما الحد الأقصى لمدة الفيديو؟**
ج: يعتمد على النموذج — Seedance وKling حتى 10 ثواني، MiniMax حتى 6 ثواني (في التوليد المدفوع ممكن أطول)

**س: هل بياناتي آمنة؟**
ج: المفتاح لا يُخزَّن في أي مكان، يُرسَل مباشرة مع كل طلب فقط.

---

## النماذج المدعومة

| النموذج | الجودة | الحد الأقصى | يدعم الصور |
|---------|--------|------------|------------|
| Seedance 2.0 | ⭐⭐⭐⭐⭐ | 10ث | ✅ |
| Kling 3.0 | ⭐⭐⭐⭐⭐ | 10ث | ✅ |
| MiniMax Hailuo | ⭐⭐⭐⭐ | 6ث | ✅ |
