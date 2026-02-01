# Deployment Guide - คู่มือการ Deploy

## 🚀 Deploy ด้วย Vercel (แนะนำ)

### ขั้นตอนที่ 1: เตรียม GitHub Repository

1. สร้าง GitHub repository ใหม่
2. Push โค้ดขึ้น GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### ขั้นตอนที่ 2: Deploy บน Vercel

1. ไปที่ [vercel.com](https://vercel.com)
2. Sign up/Login ด้วย GitHub account
3. คลิก **"Add New Project"**
4. เลือก repository ของคุณ
5. ตั้งค่าดังนี้:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. เพิ่ม **Environment Variables** (สำคัญมาก!):
   - คลิก "Environment Variables"
   - เพิ่มตัวแปรจาก `.env` ของคุณ:
     ```
     VITE_FIREBASE_API_KEY=<your-api-key>
     VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
     VITE_FIREBASE_PROJECT_ID=<your-project-id>
     VITE_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
     VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
     VITE_FIREBASE_APP_ID=<your-app-id>
     VITE_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
     VITE_CLOUDINARY_UPLOAD_PRESET=<your-upload-preset>
     ```

7. คลิก **"Deploy"**

### ขั้นตอนที่ 3: อัพเดท Firebase Configuration

หลัง deploy แล้ว คุณจะได้ URL เช่น `https://your-portfolio.vercel.app`

ต้องเพิ่ม domain นี้ใน Firebase:

1. ไปที่ [Firebase Console](https://console.firebase.google.com)
2. เลือกโปรเจคของคุณ
3. ไปที่ **Authentication** → **Settings** → **Authorized domains**
4. คลิก **"Add domain"** และเพิ่ม `your-portfolio.vercel.app`

---

## 🌐 ทางเลือกอื่น: Netlify

### Deploy บน Netlify

1. ไปที่ [netlify.com](https://netlify.com)
2. Sign up/Login ด้วย GitHub
3. คลิก **"Add new site"** → **"Import an existing project"**
4. เลือก GitHub repository
5. ตั้งค่า:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. เพิ่ม Environment Variables เหมือนกับ Vercel
7. คลิก **"Deploy site"**

---

## 📝 Checklist ก่อน Deploy

- [ ] ตรวจสอบว่า `.env` ไม่ได้ถูก commit ขึ้น GitHub
- [ ] เพิ่ม `.env` ใน `.gitignore`
- [ ] ทดสอบ build ใน local: `npm run build`
- [ ] ตรวจสอบว่า Firebase config ถูกต้อง
- [ ] เตรียม Environment Variables สำหรับ Vercel/Netlify

---

## 🔒 Security Tips

1. **อย่า commit `.env`** - ใช้ Environment Variables บน Vercel/Netlify แทน
2. **Firebase Security Rules** - ตรวจสอบว่า rules ปลอดภัย
3. **Cloudinary** - ตั้งค่า upload preset ให้ปลอดภัย

---

## 🔄 Auto-Deploy

หลังจาก deploy แล้ว:
- ทุกครั้งที่ push ไป GitHub → Vercel/Netlify จะ auto-deploy ให้อัตโนมัติ
- ไม่ต้องทำอะไรเพิ่ม!

---

## ⚠️ หมายเหตุ

**ไม่ต้องเปิด MCP เพิ่ม** - Firebase MCP ที่คุณใช้อยู่แล้วเพียงพอ

การ deploy ไม่ต้องใช้ MCP เพราะ:
- Vercel/Netlify ทำงานผ่าน GitHub
- Firebase ทำงานผ่าน SDK ที่อยู่ในโค้ดแล้ว
- ทุกอย่างทำผ่าน Web UI ได้หมด
