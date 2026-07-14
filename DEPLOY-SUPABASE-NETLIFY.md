# 🚀 DEPLOY GUIDE: Supabase + Netlify
## Shop & Drive Taman Tekno — Platform Digital

**Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS v4  
**Database:** Supabase (PostgreSQL 15)  
**Hosting:** Netlify  
**File Storage:** Supabase Storage (S3-compatible)  

---

## 📋 DAFTAR ISI

1. [Buat Akun & Setup](#1-buat-akun--setup)
2. [Setup Supabase Database](#2-setup-supabase-database)
3. [Supabase Storage & Auth](#3-supabase-storage--auth)
4. [Setup Environment Variables](#4-setup-environment-variables)
5. [Deploy ke Netlify](#5-deploy-ke-netlify)
6. [Setup Domain Kustom](#6-setup-domain-kustom)
7. [Integrasi Pihak Ketiga](#7-integrasi-pihak-ketiga)
8. [Backup & Maintenance](#8-backup--maintenance)
9. [Checklist Go-Live](#9-checklist-go-live)

---

## 1. BUAT AKUN & SETUP

### 1.1 Buat Akun

| Platform | Link | Harga |
|----------|------|-------|
| **Supabase** | [supabase.com](https://supabase.com) | Gratis (500MB DB, 1GB Storage) |
| **Netlify** | [netlify.com](https://netlify.com) | Gratis (100GB bandwidth) |
| **GitHub** | [github.com](https://github.com) | Gratis |

### 1.2 Push Kode ke GitHub

```bash
# Inisialisasi git (jika belum)
cd /home/user/shop-and-drive
git init
git add .
git commit -m "Initial commit - Shop & Drive Taman Tekno"

# Buat repo di GitHub dulu, lalu:
git remote add origin https://github.com/[username]/shop-and-drive.git
git branch -M main
git push -u origin main
```

---

## 2. SETUP SUPABASE DATABASE

### 2.1 Buat Proyek Supabase

**Langkah-langkah:**
1. Login ke [supabase.com](https://supabase.com)
2. Klik **"New Project"**
3. Isi:

| Field | Isi |
|-------|-----|
| **Name** | `shop-and-drive-tamantekno` |
| **Database Password** | Buat password kuat & simpan! |
| **Region** | `Singapore` (paling dekat ke Indonesia) |
| **Pricing Plan** | Free (bisa upgrade nanti) |

4. Tunggu provisioning ~2 menit

### 2.2 Eksekusi Migration SQL

Setelah proyek jadi:

1. Di Supabase Dashboard → **SQL Editor**
2. Klik **"New Query"**
3. Buka file `supabase/migration.sql` dari repository
4. **Copy paste** seluruh isi file
5. Klik **"Run"** (atau `Ctrl+Enter`)
6. Tunggu semua query selesai (~30 detik)

**Verifikasi:**
```sql
-- Cek di SQL Editor:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;
```
Harus muncul 34 tabel!

### 2.3 Update Seed Data

Jalankan query berikut di SQL Editor setelah migration:

```sql
-- Update password admin dengan bcrypt hash
-- Password: Admin123!
UPDATE public.users 
SET password_hash = '$2a$12$LJ3m4ys3Lk0TSwHnbfOMf.T9qZqMypYx4PBcFCGqB9vW0h0ViVXK'
WHERE email = 'admin@shopandrive.com';
```

> **Catatan:** Di production, buat user lewat Supabase Auth UI, bukan via SQL langsung.

### 2.4 Ambil Koneksi String

1. Supabase Dashboard → **Project Settings** → **Database**
2. Cari **"Connection String"**
3. Pilih tab **"URI"**
4. Copy string, format:
   ```
   postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres
   ```
5. Simpan untuk environment variables

---

## 3. SUPABASE STORAGE & AUTH

### 3.1 Setup Storage (File Uploads)

1. Supabase Dashboard → **Storage**
2. Klik **"New Bucket"**
3. Buat 2 bucket:

| Bucket | Public | Ukuran Max |
|--------|--------|------------|
| `shopandrive-assets` | ✅ Yes | 10MB |
| `shopandrive-documents` | ❌ No | 5MB |

4. Set **Public Policies** untuk `shopandrive-assets`:

```sql
-- Di SQL Editor:
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'shopandrive-assets');

CREATE POLICY "Auth Upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'shopandrive-assets' AND auth.role() = 'authenticated');
```

### 3.2 Setup Auth (Opsional — untuk production)

1. Supabase Dashboard → **Authentication** → **Providers**
2. **Email/Password** — aktifkan
3. **Google** — (opsional) set Client ID & Secret
4. **Settings**:
   - Site URL: `https://shopandrive-tamantekno.netlify.app`
   - Redirect URLs: `https://shopandrive-tamantekno.netlify.app/auth/callback`

---

## 4. SETUP ENVIRONMENT VARIABLES

### 4.1 Kumpulkan Semua Key

Buka terminal dan siapkan:

```bash
# ============ SUPABASE KEYS ============
# Dari Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"            # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."                           # anon/public key
SUPABASE_SERVICE_ROLE_KEY="eyJ..."                               # service_role key (simpan rahasia!)
DATABASE_URL="postgresql://postgres:[PASS]@db.[REF].supabase.co:6543/postgres"  # Connection string

# ============ NETLIFY ============
NEXTAUTH_URL="https://shopandrive-tamantekno.netlify.app"

# ============ KEAMANAN ============
# Generate random string:
openssl rand -hex 64  # untuk NEXTAUTH_SECRET & JWT_SECRET
```

### 4.2 Integrasi Pihak Ketiga (Daftar Dulu)

| Service | Link Daftar | Yang Perlu Disiapkan |
|---------|-------------|----------------------|
| **Midtrans** | [midtrans.com](https://midtrans.com) | Client Key + Server Key |
| **RajaOngkir** | [rajaongkir.com](https://rajaongkir.com) | API Key (paket Pro) |
| **Resend** | [resend.com](https://resend.com) | API Key (alternatif SendGrid gratis) |
| **Google Cloud** | [console.cloud.google.com](https://console.cloud.google.com) | Maps API Key |

---

## 5. DEPLOY KE NETLIFY

### 5.1 Deploy via Netlify Dashboard (Termudah)

```bash
# Step-by-step:
1. Login ke https://app.netlify.com
2. Klik "Add new site" → "Import an existing project"
3. Pilih "GitHub" → Authorize → Pilih repo "shop-and-drive"
4. Build settings (otomatis terdeteksi dari netlify.toml):
   - Build command: npm run build
   - Publish directory: .next
5. Klik "Show advanced" → "New variable"
6. Masukkan semua environment variables dari file .env
7. Klik "Deploy site"
```

### 5.2 Deploy via Netlify CLI (Opsional)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Init di project
netlify init

# Deploy ke production
netlify deploy --prod --build
```

### 5.3 Set Environment Variables di Netlify

Setelah deploy, set environment variables:

1. Netlify Dashboard → **Site settings** → **Environment variables**
2. Tambahkan semua variabel dari `.env.example`
3. Klik **"Deploy"** untuk trigger rebuild

> **PENTING:** Semua environment variables harus di-set melalui Netlify Dashboard, bukan di file `.env.local` (karena file itu tidak ikut ter-deploy).

### 5.4 Deploy Ulang Setelah Update

```bash
# Opsi 1: Push ke GitHub (auto-deploy)
git add .
git commit -m "Update fitur X"
git push origin main

# Opsi 2: Deploy via CLI
netlify deploy --prod

# Opsi 3: Trigger manual di Netlify Dashboard
# Site → Deploys → "Trigger deploy"
```

---

## 6. SETUP DOMAIN KUSTOM

### 6.1 Beli Domain (jika belum punya)

Rekomendasi registrar Indonesia:
- **Niagahoster** — murah dan support cepat
- **Domainesia**
- **Exabytes**

Domain contoh: `shopandrive-tamantekno.com` (Rp 150.000/tahun)

### 6.2 Set Domain di Netlify

1. Netlify Dashboard → **Site settings** → **Domain management**
2. Klik **"Add custom domain"**
3. Masukkan: `shopandrive-tamantekno.com`
4. Ikuti instruksi setting DNS:

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `shopandrive-tamantekno.netlify.app` |
| A | `@` | `75.2.60.5` (Netlify load balancer) |

5. Tunggu propagasi DNS (5 menit - 24 jam)
6. SSL certificate akan terbit otomatis (Let's Encrypt)

### 6.3 Update Environment Variables

Setelah domain aktif, update:
```env
NEXTAUTH_URL="https://shopandrive-tamantekno.com"
NEXT_PUBLIC_SITE_URL="https://shopandrive-tamantekno.com"
```

Trigger deploy ulang!

---

## 7. INTEGRASI PIHAK KETIGA

### 7.1 Midtrans Payment Gateway

```bash
# Setup di Midtrans Dashboard:
1. Login ke https://dashboard.midtrans.com
2. Settings → Authentication → dapatkan Client Key & Server Key
3. Settings → Payment Methods → aktifkan yang diperlukan:
   [✅] Virtual Account (BCA, Mandiri, BNI, BRI)
   [✅] E-Wallet (GoPay, OVO, DANA, LinkAja)
   [✅] Kartu Kredit
   [✅] QRIS
4. Settings → Notification URL:
   https://shopandrive-tamantekno.com/api/payment/midtrans-callback
5. Mode: Production (setelah UAT selesai)
```

### 7.2 RajaOngkir (Ongkos Kirim)

```bash
1. Daftar di https://rajaongkir.com (pilih paket Pro = Rp 500rb/bln)
2. Masuk ke Dashboard → API → Copy "API Key"
3. Set di environment: RAJAONGKIR_API_KEY
```

### 7.3 WhatsApp Notification

Opsi gratis: **Fonnte** (fonnte.com) — Rp 0 untuk testing
Opsi resmi: **WhatsApp Business API** —但是 setup lebih kompleks

```bash
# Setup dengan Fonnte (alternatif murah):
1. Daftar di https://fonnte.com
2. Dapatkan Token
3. Set: WHATSAPP_API_TOKEN
```

### 7.4 Email (Resend — Gratis 100 email/hari)

```bash
1. Daftar di https://resend.com
2. Verify domain: shopandrive-tamantekno.com
3. Dapatkan API Key
4. Set: RESEND_API_KEY
```

### 7.5 Google Analytics & Search Console

```bash
# Google Analytics 4:
1. https://analytics.google.com → Buat properti
2. Dapatkan Measurement ID: G-XXXXXXXXXX
3. Set: NEXT_PUBLIC_GA_ID

# Google Search Console:
1. https://search.google.com/search-console
2. Verifikasi domain via DNS TXT record
3. Submit sitemap: https://shopandrive-tamantekno.com/sitemap.xml
```

---

## 8. BACKUP & MAINTENANCE

### 8.1 Supabase Backup (Otomatis)

Supabase Free Plan sudah termasuk:
- ✅ **Daily backup** otomatis (retensi 7 hari)
- ✅ **Point-in-time recovery** (24 jam ke belakang)

**Cara akses backup:**
1. Supabase Dashboard → **Database** → **Backups**
2. Download backup atau restore point-in-time

### 8.2 Manual Backup (Rekomendasi tambahan)

```bash
# Backup via terminal:
pg_dump --dbname="$DATABASE_URL" --schema=public --no-owner \
  | gzip > "backup-$(date +%Y%m%d).sql.gz"

# Atau via Supabase CLI:
npm install -g supabase
supabase login
supabase db dump -p shop-and-drive-tamantekno > backup.sql
```

### 8.3 Monitoring

```bash
# 1. Netlify Analytics (built-in)
# Dashboard → Analytics → lihat traffic, bandwidth, dll

# 2. Supabase Dashboard
# Dashboard → Database → lihat size, connections, query performance

# 3. Sentry (error tracking) — gratis 5.000 events/bulan
npm install @sentry/nextjs
npx sentry-wizard -i nextjs
# Set: NEXT_PUBLIC_SENTRY_DSN

# 4. Uptime monitoring gratis
# Daftar di https://uptimerobot.com → monitor shopandrive-tamantekno.com
```

### 8.4 Performance Optimization

```bash
# 1. Aktifkan Netlify Edge Functions untuk response lebih cepat
# 2. Image Optimization sudah otomatis dengan next/image
# 3. Aktifkan CDN caching di netlify.toml
# 4. Database query optimization:
#    - Pastikan index terpakai (EXPLAIN ANALYZE)
#    - Gunakan connection pooling (Supabase sudah include PgBouncer)
```

---

## 9. CHECKLIST GO-LIVE

### ✅ Pre-Deploy

- [ ] **Code ready** — `npm run build` sukses tanpa error
- [ ] **GitHub repo** — semua kode ter-push
- [ ] **Supabase project** — sudah dibuat, migration jalan
- [ ] **34 tabel** terverifikasi di Supabase SQL Editor
- [ ] **Seed data** — admin user & kategori sudah terisi
- [ ] **Environment variables** — semua diset di Netlify
- [ ] **netlify.toml** — file konfigurasi sudah benar

### ✅ Deploy

- [ ] **Netlify deploy** — build sukses, site live di URL Netlify
- [ ] **Domain kustom** — DNS pointing benar, SSL aktif
- [ ] **Homepage** — bisa diakses, tampil normal
- [ ] **Login admin** — bisa akses `/admin/dashboard`
- [ ] **Produk** — halaman katalog & detail tampil
- [ ] **Booking servis** — form multi-step bisa diisi

### ✅ Integrasi

- [ ] **Midtrans** — payment gateway mode sandbox dulu
- [ ] **RajaOngkir** — ongkir muncul di checkout
- [ ] **WhatsApp** — notifikasi terkirim ke nomor test
- [ ] **Email** — email terkirim (konfirmasi order)
- [ ] **Google Maps** — lokasi cabang tampil
- [ ] **Google Analytics** — data masuk di dashboard

### ✅ Security

- [ ] **Row Level Security (RLS)** — aktif di Supabase
- [ ] **Environment variables** — tidak bocor ke client
- [ ] **HTTPS** — aktif (otomatis dari Netlify)
- [ ] **Security headers** — terpasang (dari netlify.toml)
- [ ] **Rate limiting** — API endpoints dilindungi

### ✅ Monitoring

- [ ] **Sentry** — error tracking aktif
- [ ] **Uptime monitoring** — notifikasi jika down
- [ ] **Backup** — backup otomatis berjalan
- [ ] **Logs** — Netlify functions logs bisa diakses

---

## 📊 ESTIMASI BIAYA BULANAN

| Item | Paket Gratis | Paket Scaling |
|------|-------------|---------------|
| **Supabase** | Gratis (500MB DB) | $25/bln (8GB DB) |
| **Netlify** | Gratis (100GB BW) | $19/bln (400GB BW) |
| **Midtrans** | Gratis setup | Fee per transaksi ~2% |
| **RajaOngkir** | - | Rp 500.000/bln |
| **Domain** | - | Rp 150.000/tahun |
| **Resend** | Gratis (100/hr) | $20/bln (50k/bln) |
| **Fonnte WA** | Gratis (50/hr) | Rp 100.000/bln |
| **Sentry** | Gratis (5k events) | $26/bln |
| **TOTAL** | **~Rp 150.000/bln** | **~Rp 2.000.000/bln** |

---

## 🆘 TROUBLESHOOTING UMUM

### ❌ Build Error di Netlify
```bash
# Cek:
1. Apakah netlify.toml sudah benar?
2. Coba build lokal: npm run build
3. Cek Node.js version: harus 20.x
4. Environment variables: pastikan NODE_VERSION=20
```

### ❌ Database Connection Timeout
```bash
# Penyebab:
1. IP tidak diizinkan (Supabase free hanya allow all IP)
2. Password salah
3. Region mismatch

# Solusi:
- Cek di Supabase Dashboard → Database → Connection pooling
- Pastikan string connection benar
```

### ❌ Halaman 404 / Not Found
```bash
# Penyebab:
- Netlify butuh redirect rules untuk SPA

# Solusi:
- netlify.toml sudah include: [[redirects]] from = "/*" to = "/index.html"
- Cek file netlify.toml ada di root proyek
```

### ❌ Midtrans Callback Gagal
```bash
# Penyebab:
- URL callback salah
- Server key tidak match

# Solusi:
- Set URL di Midtrans Dashboard: 
  https://shopandrive-tamantekno.com/api/payment/midtrans-callback
- Cek environment MIDTRANS_SERVER_KEY
```

---

## 📞 KONTAK & DUKUNGAN

| Kebutuhan | Kontak |
|-----------|--------|
| **Technical Issue** | developer@anda.com |
| **Supabase Support** | support@supabase.io |
| **Netlify Support** | support@netlify.com |
| **Midtrans Issue** | support@midtrans.com |

---

> **Dokumen ini khusus untuk setup:**
> - 🗄️ **Database:** Supabase (PostgreSQL)
> - ☁️ **Hosting:** Netlify
>
> **Versi:** 1.0 — 13 Juli 2026
> **Project:** Shop & Drive Taman Tekno
