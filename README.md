# ⚽ كورة ماتش (Kora Match)

منصة عربية لعرض جداول ونتائج مباريات كرة القدم. الموقع ثابت ويُنشر على GitHub Pages، والبيانات تتحدث تلقائياً عبر GitHub Actions.

## الرفع على GitHub

1. أنشئ مستودع جديد على GitHub (يفضل الاسم `kora-match`).
2. ارفع المشروع **بدون** ملف `.env` (الملف مستثنى تلقائياً).
3. من المستودع: **Settings → Secrets and variables → Actions → New repository secret**
   - الاسم: `API_FOOTBALL_KEY`
   - القيمة: مفتاح [API-Football](https://www.api-football.com/)
4. من المستودع: **Settings → Pages**
   - Source: **GitHub Actions**
5. من تبويب **Actions** شغّل يدويًا: **Sync Football Fixtures**
6. بعد نجاح التشغيل، رابط الموقع يظهر في **Settings → Pages**  
   مثال: `https://USERNAME.github.io/kora-match/`

المزامنة تعمل كل 6 ساعات، أو يدويًا من Actions في أي وقت.

## التشغيل المحلي

```bash
npm install
```

انسخ `.env.example` إلى `.env` وضع مفتاح الـ API:

```
API_FOOTBALL_KEY=your_key
```

ثم:

```bash
npm run sync
npm start
```

افتح: `http://localhost:3000`

## ملاحظات

- لا ترفع ملف `.env` أبدًا. المفتاح على GitHub يكون Secret فقط.
- `data/matches.json` يتولد من المزامنة. `data/broadcasts.json` للنواقل التلفزيونية ويُعدّل يدويًا.
- مسار الملفات نسبي حتى يعمل الموقع على `username.github.io/kora-match/`.
