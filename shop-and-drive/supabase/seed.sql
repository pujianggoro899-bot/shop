-- ============================================================
-- SHOP & DRIVE — SEED DATA
-- Jalankan SETELAH migration.sql di Supabase SQL Editor
-- ============================================================

-- 1. CABANG
INSERT INTO public.branches (code, name, address, city, province, phone, email, is_head_office, features) VALUES
('TTK', 'Taman Tekno (Pusat)', 'Jl. Taman Tekno No. 88, BSD City', 'Tangerang Selatan', 'Banten', '(021) 1234 5678', 'tamantekno@shopandrive.com', true, '["ecommerce","service","pickup"]'::jsonb),
('SERPONG', 'Serpong Utara', 'Jl. Raya Serpong KM 12, BSD City', 'Tangerang Selatan', 'Banten', '(021) 2345 6789', 'serpong@shopandrive.com', false, '["ecommerce","service"]'::jsonb);

-- 2. KATEGORI PRODUK
INSERT INTO public.categories (name, slug, sort_order) VALUES
('Sparepart Mesin', 'sparepart-mesin', 1),
('Oli & Cairan', 'oli-cairan', 2),
('Aksesoris', 'aksesoris', 3),
('Ban', 'ban', 4),
('Aki', 'aki', 5),
('Filter', 'filter', 6),
('Kelistrikan', 'kelistrikan', 7),
('Tools & Peralatan', 'tools-peralatan', 8);

-- 3. DEPARTEMEN
INSERT INTO public.departments (name, code) VALUES
('Manajemen', 'MGT'),
('Penjualan & Marketing', 'MKT'),
('Operasional Bengkel', 'OPS'),
('Gudang & Logistik', 'GDG'),
('HR & Keuangan', 'HRF'),
('Customer Service', 'CS');

-- 4. POSISI
INSERT INTO public.positions (name, department_id, level) VALUES
('Kepala Toko', (SELECT id FROM public.departments WHERE code = 'MGT'), 1),
('Wakil Kepala Toko', (SELECT id FROM public.departments WHERE code = 'MGT'), 2),
('Supervisor Marketing', (SELECT id FROM public.departments WHERE code = 'MKT'), 3),
('Kepala Mekanik', (SELECT id FROM public.departments WHERE code = 'OPS'), 3),
('Staff HR', (SELECT id FROM public.departments WHERE code = 'HRF'), 4);

-- 5. BANNER DEFAULT
INSERT INTO public.banners (title, subtitle, image_url, link_url, sort_order) VALUES
('Servis Berkala Gratis Oli', 'Lakukan servis berkala dan dapatkan oli mesin gratis*', '/images/banners/servis.jpg', '/booking-servis', 1),
('Diskon 30% Aki GS Astra', 'Ganti aki sekarang! Promo terbatas untuk semua tipe', '/images/banners/aki.jpg', '/produk?kategori=aki', 2),
('Gratis Ongkir Seluruh Indonesia', 'Minimal belanja Rp 200.000', '/images/banners/ongkir.jpg', '/produk', 3);
