# Sportify - Full Stack Sports Management System

Sportify adalah aplikasi web pencarian informasi olahraga (Liga, Tim, dan Pertandingan) yang terintegrasi dengan data real-time dari API pihak ketiga (TheSportsDB). Aplikasi ini memungkinkan pengguna untuk menjelajahi liga, melihat detail tim, jadwal pertandingan, serta menyimpan tim favorit ke dalam akun mereka.

## Fitur Utama

- **Public Features**:
  - Penjelajahan Liga dari berbagai cabang olahraga (Sepakbola, Basket, dll).
  - Daftar tim berdasarkan liga yang dipilih.
  - Detail tim lengkap dengan sejarah, list pertandingan terakhir, dan klasemen liga.
  - Konversi waktu pertandingan otomatis ke **Waktu Indonesia Barat (WIB)**.
- **Private Features (Wajib Login)**:
  - Manajemen Profil Pengguna.
  - Sistem Favorit: Menambah, menghapus, dan melihat daftar tim favorit yang tersimpan permanen di database.
- **Teknis**:
  - UI Premium (Antigravity Style) dengan Glassmorphism, ClickSpark, dan DotGrid background.
  - State Management terpusat menggunakan Redux Toolkit.
  - API Gateway dengan sistem Caching pada Backend (Laravel).

---

## Persyaratan Sistem

- PHP >= 8.2
- Node.js >= 18
- MySQL
- Composer
- npm atau yarn

---

## Panduan Instalasi

### 1. Kloning Repositori

```bash
git clone https://github.com/fermanferdaus/sportify.git
cd sportify
```

### 2. Konfigurasi Backend (Laravel)

```bash
cd server
cp .env.example .env
```

_Pastikan untuk mengedit file `.env` dan menyesuaikan konfigurasi database (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)._

Lalu jalankan perintah berikut:

```bash
composer install
php artisan key:generate
php artisan migrate
```

### 3. Konfigurasi Frontend (React)

```bash
cd ../frontend
cp .env.example .env
```

_Sesuaikan `VITE_API_URL` jika backend Anda berjalan di port yang berbeda (default: `http://localhost:8000/api/v1`)._

Lalu jalankan perintah berikut:

```bash
npm install
```

---

## Memasukkan Data & Menjalankan Aplikasi

### Menjalankan Backend

Di dalam folder `server`:

```bash
php artisan serve
```

### Menjalankan Frontend

Di dalam folder `frontend`:

```bash
npm run dev
```

Aplikasi dapat diakses melalui browser di: `http://localhost:5173`

---

## Arsitektur & Teknologi

- **Backend**: Laravel 12 (RESTful API), Laravel Sanctum (Auth), HTTP Client (API Bridge), Caching Layer.
- **Frontend**: React 19, Vite, Tailwind CSS, Redux Toolkit, React Router 7, Lucid Icons.
- **Database**: MySQL.
- **Prinsip**: Clean Code, Service Layer Pattern, Repository Pattern.

---
