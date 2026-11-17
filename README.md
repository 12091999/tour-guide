# Tour Guide Banyuwangi

Website pemandu wisata lokal Banyuwangi — tour listing, detail destinasi, dan pemesanan via WhatsApp. Dibangun dengan Next.js 15 App Router, Supabase, dan Cloudinary.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| Database & Auth | Supabase (Postgres + Row Level Security) |
| Image Storage | Cloudinary |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Bahasa | TypeScript |
| Deploy | Vercel |

---

## Prerequisites

- Node.js **≥ 18**
- npm / pnpm / yarn
- Akun [Supabase](https://supabase.com) (free tier cukup)
- Akun [Cloudinary](https://cloudinary.com) (free tier cukup)

---

## Setup

### 1. Clone & install dependencies

```bash
git clone https://github.com/<your-username>/tour-guide.git
cd tour-guide
npm install
```

### 2. Environment variables

Buat file `.env.local` di root project:

```env
# Supabase — dari Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service role key — JANGAN expose ke browser, server-side only
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudinary — dari Dashboard > Settings > API Keys
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# URL produksi — untuk sitemap & canonical URLs
NEXT_PUBLIC_SITE_URL=https://tourguide-banyuwangi.com
```

> **Catatan:** `SUPABASE_SERVICE_ROLE_KEY`, `CLOUDINARY_API_KEY`, dan `CLOUDINARY_API_SECRET` adalah kredensial server-side. Jangan pernah prefix dengan `NEXT_PUBLIC_`.

### 3. Supabase — jalankan migrations

Buka **Supabase Dashboard → SQL Editor**, lalu jalankan file berikut secara berurutan:

#### Migration 1 — Buat tabel tours

```sql
-- File: supabase/migrations/0001_tours.sql
```

Salin dan jalankan isi file tersebut.

#### Migration 2 — Grant permissions

```sql
-- File: supabase/migrations/0002_grants.sql
```

#### Migration 3 — Tabel site_config (kontak bisnis)

```sql
-- File: supabase/migrations/0003_site_config.sql
```

Migration ini juga mengisi data default:
- `business_whatsapp` → nomor WhatsApp bisnis
- `business_email` → email bisnis

> Setelah deploy, ubah nilainya di **Admin Panel → Settings**.

#### Buat admin user

Di **Supabase Dashboard → Authentication → Users**, klik **Add user** dan buat akun dengan email + password. Akun ini digunakan untuk login ke `/admin`.

### 4. Seed data tours (opsional)

Jika ingin mengisi data tour awal ke Supabase:

```bash
npx tsx scripts/seed-tours.ts
```

Script ini akan:
1. Upload gambar tour ke Cloudinary (konversi ke WebP otomatis)
2. Insert semua data tour ke Supabase

> Pastikan `.env.local` sudah terisi sebelum menjalankan script ini.

### 5. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Struktur Project

```
tour-guide/
├── app/
│   ├── [lang]/               # Route dengan prefix bahasa (/en, /id)
│   │   ├── page.tsx          # Homepage
│   │   ├── explore/
│   │   │   ├── page.tsx      # Daftar semua destinasi
│   │   │   └── [id]/page.tsx # Detail tour (slug-based)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── partners/
│   │   ├── help/
│   │   ├── feedback/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── cancellation/
│   ├── admin/
│   │   ├── login/page.tsx    # Login admin (standalone, tanpa sidebar)
│   │   └── (panel)/          # Route group — semua halaman pakai sidebar
│   │       ├── layout.tsx    # Admin sidebar layout
│   │       ├── page.tsx      # Daftar tours
│   │       ├── settings/     # Kelola kontak bisnis
│   │       └── tours/
│   │           ├── new/      # Tambah tour baru
│   │           └── [slug]/   # Edit tour
│   ├── sitemap.ts            # /sitemap.xml (auto-generated)
│   ├── robots.ts             # /robots.txt
│   └── llms.txt/route.ts     # /llms.txt untuk LLM crawlers
├── components/
│   ├── admin/                # Komponen khusus admin panel
│   ├── ui/                   # shadcn/ui components
│   └── ...                   # Komponen halaman publik
├── lib/
│   ├── actions/              # Server Actions (Supabase mutations)
│   ├── currency.ts           # Format harga IDR/USD
│   ├── metadata.ts           # SEO metadata helper
│   └── whatsapp.ts           # Generate WhatsApp URL
├── supabase/
│   └── migrations/           # SQL migration files
├── scripts/
│   └── seed-tours.ts         # Seed script (jalankan sekali)
└── utils/
    ├── supabase/             # Supabase client (server & browser)
    └── cloudinary.ts         # Cloudinary upload helper
```

---

## Admin Panel

Akses di `/admin` (redirect ke `/admin/login` jika belum login).

| Halaman | URL | Fungsi |
|---|---|---|
| Login | `/admin/login` | Login dengan email + password |
| Tours | `/admin` | Daftar, edit, hapus tour |
| Add Tour | `/admin/tours/new` | Tambah tour baru |
| Edit Tour | `/admin/tours/[slug]` | Edit konten tour |
| Settings | `/admin/settings` | Ubah nomor WhatsApp & email bisnis |

---

## Multilingual

Semua halaman publik tersedia dalam dua bahasa:

| Bahasa | URL prefix |
|---|---|
| English | `/en/...` |
| Indonesia | `/id/...` |

Root `/` otomatis redirect ke `/en`.

---

## Database Schema

### `tours`
Menyimpan data dasar tour (slug, harga, durasi, rating, gambar).

### `tour_translations`
Judul dan deskripsi tour per bahasa (`en`, `id`).

### `tour_itinerary_items`
Langkah-langkah itinerary per tour per bahasa, diurutkan berdasarkan `step_order`.

### `tour_included_items`
Item yang sudah termasuk dalam harga, per tour per bahasa.

### `site_config`
Key-value store untuk konfigurasi bisnis (nomor WhatsApp, email). Bisa diubah dari Admin → Settings tanpa redeploy.

---

## Deployment (Vercel)

1. Push ke GitHub
2. Import repository di [vercel.com](https://vercel.com)
3. Tambahkan semua environment variables dari `.env.local` di **Project Settings → Environment Variables**
4. Deploy

> Pastikan `NEXT_PUBLIC_SITE_URL` diisi dengan domain produksi yang benar agar sitemap dan canonical URL berfungsi dengan tepat.

---

## Scripts

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Jalankan production build secara lokal
npm run lint     # Lint dengan ESLint
```

```bash
npx tsx scripts/seed-tours.ts   # Seed data tours ke Supabase
```
