-- ============================================================
-- SHOP & DRIVE TAMAN TEKNO — SEED DATA
-- Jalankan SETELAH migration.sql di Supabase SQL Editor
-- Aman dijalankan berulang kali (pakai ON CONFLICT DO NOTHING)
-- ============================================================

-- 1. ADMIN USER (password: Admin123!)
-- GANTI password setelah login pertama!
INSERT INTO public.users (email, password_hash, full_name, role, email_verified_at)
VALUES (
    'admin@shopandrive.com',
    '$2a$12$LJ3m4ys3Lk0TSwHnbfOMf.T9qZqMypYx4PBcFCGqB9vW0h0ViVXK', -- bcrypt hash of Admin123!
    'Admin Super',
    'super_admin',
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- 2. CABANG
INSERT INTO public.branches (code, name, address, city, province, phone, email, is_head_office, features)
VALUES (
    'TTK',
    'Taman Tekno (Pusat)',
    'Jl. Taman Tekno No. 88, BSD City',
    'Tangerang Selatan',
    'Banten',
    '(021) 1234 5678',
    'tamantekno@shopandrive.com',
    true,
    '["ecommerce", "service", "pickup"]'::jsonb
) ON CONFLICT (code) DO NOTHING;

INSERT INTO public.branches (code, name, address, city, province, phone, email, is_head_office, features)
VALUES (
    'SERPONG',
    'Serpong Utara',
    'Jl. Raya Serpong KM 12, BSD City',
    'Tangerang Selatan',
    'Banten',
    '(021) 2345 6789',
    'serpong@shopandrive.com',
    false,
    '["ecommerce", "service"]'::jsonb
) ON CONFLICT (code) DO NOTHING;

-- 3. KATEGORI PRODUK
INSERT INTO public.categories (name, slug, sort_order) VALUES
('Sparepart Mesin', 'sparepart-mesin', 1),
('Oli & Cairan', 'oli-cairan', 2),
('Aksesoris', 'aksesoris', 3),
('Ban', 'ban', 4),
('Aki', 'aki', 5),
('Filter', 'filter', 6),
('Kelistrikan', 'kelistrikan', 7),
('Tools & Peralatan', 'tools-peralatan', 8)
ON CONFLICT (slug) DO NOTHING;

-- 4. DEPARTEMEN
INSERT INTO public.departments (name, code) VALUES
('Manajemen', 'MGT'),
('Penjualan & Marketing', 'MKT'),
('Operasional Bengkel', 'OPS'),
('Gudang & Logistik', 'GDG'),
('HR & Keuangan', 'HRF'),
('Customer Service', 'CS')
ON CONFLICT (code) DO NOTHING;

-- 5. BANNER DEFAULT
INSERT INTO public.banners (title, subtitle, image_url, link_url, sort_order) VALUES
('Servis Berkala Gratis Oli', 'Lakukan servis berkala dan dapatkan oli mesin gratis*', '/images/banners/servis.jpg', '/booking-servis', 1),
('Diskon 30% Aki GS Astra', 'Ganti aki sekarang! Promo terbatas untuk semua tipe', '/images/banners/aki.jpg', '/produk?kategori=aki', 2),
('Gratis Ongkir Seluruh Indonesia', 'Minimal belanja Rp 200.000', '/images/banners/ongkir.jpg', '/produk', 3);

-- 6. VOUCHER DEFAULT
INSERT INTO public.vouchers (code, type, value, min_purchase, max_discount, usage_limit, valid_from, valid_until, is_active) VALUES
('BARU10', 'percentage', 10, 100000, 50000, 100, NOW(), NOW() + INTERVAL '30 days', true),
('SERVIS50', 'nominal', 50000, 200000, 50000, 50, NOW(), NOW() + INTERVAL '60 days', true),
('HEMAT30', 'percentage', 30, 500000, 150000, 200, NOW(), NOW() + INTERVAL '14 days', true)
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- VERIFIKASI
-- ============================================================
-- Jalankan query berikut untuk cek:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT * FROM public.branches;
-- SELECT * FROM public.categories;
-- SELECT * FROM public.departments;
