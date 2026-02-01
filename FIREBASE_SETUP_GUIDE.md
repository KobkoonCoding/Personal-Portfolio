# 🔥 Firebase + Cloudinary Setup Guide

## 📋 Overview
คู่มือนี้จะพาคุณ migrate จาก localStorage ไปใช้ Firebase + Cloudinary เพื่อให้:
- ✅ ข้อมูลเก็บบน cloud (เข้าถึงได้จากทุกที่)
- ✅ รูปภาพและวิดีโอเก็บบน Cloudinary (25 GB ฟรี)
- ✅ Authentication ที่ปลอดภัย
- ✅ Real-time updates

---

## 🎯 Part 1: Firebase Setup

### Step 1: สร้าง Firebase Project

1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. คลิก **"Add project"** หรือ **"เพิ่มโปรเจ็กต์"**
3. ตั้งชื่อโปรเจ็กต์: `personal-portfolio` (หรือชื่อที่ต้องการ)
4. ปิด Google Analytics (ไม่จำเป็นสำหรับ portfolio)
5. คลิก **"Create project"**

### Step 2: เปิดใช้งาน Firestore Database

1. ในเมนูด้านซ้าย คลิก **"Firestore Database"**
2. คลิก **"Create database"**
3. เลือก **"Start in production mode"** (เราจะตั้งค่า rules ทีหลัง)
4. เลือก location: **asia-southeast1 (Singapore)** - ใกล้ไทยที่สุด
5. คลิก **"Enable"**

### Step 3: เปิดใช้งาน Firebase Storage

1. ในเมนูด้านซ้าย คลิก **"Storage"**
2. คลิก **"Get started"**
3. เลือก **"Start in production mode"**
4. ใช้ location เดียวกับ Firestore
5. คลิก **"Done"**

### Step 4: เปิดใช้งาน Authentication

1. ในเมนูด้านซ้าย คลิก **"Authentication"**
2. คลิก **"Get started"**
3. ไปที่แท็บ **"Sign-in method"**
4. เปิดใช้งาน **"Email/Password"**
5. คลิก **"Save"**

### Step 5: สร้าง Admin User

1. ไปที่แท็บ **"Users"**
2. คลิก **"Add user"**
3. ใส่:
   - Email: `admin@yourportfolio.com` (หรืออีเมลที่ต้องการ)
   - Password: `YourSecurePassword123!` (อย่าลืม!)
4. คลิก **"Add user"**
5. **บันทึก email และ password ไว้!**

### Step 6: ดึง Firebase Config

1. ไปที่ **Project Settings** (ไอคอนเฟือง ⚙️)
2. เลื่อนลงไปที่ **"Your apps"**
3. คลิก **"Web"** (ไอคอน `</>`  )
4. ตั้งชื่อ app: `portfolio-web`
5. **ไม่ต้อง** เลือก Firebase Hosting
6. คลิก **"Register app"**
7. **คัดลอก config object** ที่ได้ (จะใช้ใน Step 7)

ตัวอย่าง config ที่จะได้:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 7: ตั้งค่า Firestore Security Rules

1. ไปที่ **Firestore Database** → **Rules**
2. แทนที่ด้วย rules นี้:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all activities (public)
    match /activities/{activityId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Admin settings (only authenticated users)
    match /settings/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. คลิก **"Publish"**

### Step 8: ตั้งค่า Storage Security Rules

1. ไปที่ **Storage** → **Rules**
2. แทนที่ด้วย rules นี้:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /activities/{allPaths=**} {
      allow read: if true; // Anyone can read
      allow write: if request.auth != null; // Only authenticated users can upload
    }
  }
}
```

3. คลิก **"Publish"**

---

## ☁️ Part 2: Cloudinary Setup

### Step 1: สร้าง Cloudinary Account

1. ไปที่ [Cloudinary](https://cloudinary.com/users/register/free)
2. สมัครด้วย email หรือ Google account
3. ยืนยัน email
4. เลือก plan: **Free** (25 GB)

### Step 2: ดึง Cloudinary Credentials

1. ไปที่ [Dashboard](https://console.cloudinary.com/)
2. คุณจะเห็น:
   - **Cloud Name**: `dxxxxxx` (บันทึกไว้)
   - **API Key**: `123456789012345` (บันทึกไว้)
   - **API Secret**: `xxxxxxxxxxxxxxxxxxxx` (บันทึกไว้)

### Step 3: สร้าง Upload Preset (สำคัญ!)

1. ไปที่ **Settings** → **Upload**
2. เลื่อนลงไปที่ **"Upload presets"**
3. คลิก **"Add upload preset"**
4. ตั้งค่า:
   - **Preset name**: `portfolio_activities`
   - **Signing mode**: **Unsigned** (สำคัญ! เพื่อให้ upload จาก browser ได้)
   - **Folder**: `activities` (จะจัดเก็บรูปไว้ใน folder นี้)
   - **Access mode**: **Public**
5. คลิก **"Save"**

---

## 🔐 Part 3: ตั้งค่า Environment Variables

### Step 1: สร้างไฟล์ `.env`

สร้างไฟล์ `.env` ใน root ของโปรเจ็กต์:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_activities
```

### Step 2: เพิ่ม `.env` ใน `.gitignore`

ตรวจสอบว่าไฟล์ `.gitignore` มีบรรทัดนี้:
```
.env
.env.local
```

---

## 📦 Part 4: ติดตั้ง Dependencies

เปิด terminal และรันคำสั่ง:

```bash
npm install firebase
```

**หมายเหตุ**: Cloudinary ไม่ต้องติดตั้ง library เพราะเราจะใช้ Upload API โดยตรง

---

## ✅ Checklist ก่อนไปขั้นตอนถัดไป

- [ ] สร้าง Firebase project แล้ว
- [ ] เปิดใช้ Firestore Database แล้ว
- [ ] เปิดใช้ Firebase Storage แล้ว
- [ ] เปิดใช้ Authentication แล้ว
- [ ] สร้าง Admin user แล้ว (และบันทึก email/password)
- [ ] คัดลอก Firebase config แล้ว
- [ ] ตั้งค่า Firestore rules แล้ว
- [ ] ตั้งค่า Storage rules แล้ว
- [ ] สร้าง Cloudinary account แล้ว
- [ ] คัดลอก Cloudinary credentials แล้ว
- [ ] สร้าง Upload preset แล้ว
- [ ] สร้างไฟล์ `.env` และใส่ค่าแล้ว
- [ ] ติดตั้ง firebase package แล้ว

---

## 🚀 Next Steps

หลังจากทำทุกขั้นตอนเสร็จแล้ว:
1. บอกผมว่าเสร็จแล้ว
2. ผมจะสร้างไฟล์ Firebase config และแก้ไข code ให้
3. Migrate ข้อมูลจาก localStorage ไป Firebase

---

## 💡 Tips

- **เก็บ credentials ให้ดี**: อย่าแชร์ API keys กับใคร
- **Backup localStorage**: ก่อน migrate ให้ export ข้อมูลเก่าไว้
- **Test ก่อน deploy**: ทดสอบให้ดีก่อนขึ้น production

---

## 🆘 หากมีปัญหา

- Firebase Console ภาษาไทย: เปลี่ยนภาษาได้ที่ Settings
- ลืม password: ใช้ Firebase Console reset ได้
- ติดตรงไหน: ถามผมได้เลย!
