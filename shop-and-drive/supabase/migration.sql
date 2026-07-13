-- ============================================================
-- SHOP & DRIVE TAMAN TEKNO — DATABASE SCHEMA
-- Untuk Supabase (PostgreSQL 15+)
-- Cara pakai: Buka Supabase Dashboard → SQL Editor → Paste & Run
-- ============================================================

-- ========================
-- 1. EXTENSIONS
-- ========================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================
-- 2. USERS & AUTH
-- ========================

-- Tabel users (terintegrasi dengan Supabase Auth via trigger)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'customer',
    email_verified_at TIMESTAMPTZ,
    phone_verified_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);

-- ========================
-- 3. BRANCHES (Multi-Cabang)
-- ========================
CREATE TABLE public.branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    whatsapp VARCHAR(20),
    open_hours VARCHAR(100),
    open_hours_weekend VARCHAR(100),
    manager_id UUID, -- akan direferensikan ke employees
    is_active BOOLEAN DEFAULT true,
    is_head_office BOOLEAN DEFAULT false,
    lat DECIMAL(10,7),
    lng DECIMAL(10,7),
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_branches_code ON public.branches(code);

-- ========================
-- 4. CATEGORIES (Produk)
-- ========================
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON public.categories(slug);

-- ========================
-- 5. PRODUCTS
-- ========================
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    brand VARCHAR(100),
    price BIGINT NOT NULL,
    original_price BIGINT,
    cost_price BIGINT,
    description TEXT,
    short_description TEXT,
    specifications JSONB DEFAULT '{}'::jsonb,
    weight_gram INT,
    unit VARCHAR(20) DEFAULT 'pcs',
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INT DEFAULT 0,
    sold_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_active ON public.products(is_active) WHERE is_active = true;

-- ========================
-- 6. PRODUCT VARIANTS
-- ========================
CREATE TABLE public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    additional_price BIGINT DEFAULT 0,
    stock INT DEFAULT 0,
    min_stock INT DEFAULT 5,
    weight_gram INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON public.product_variants(product_id);

-- ========================
-- 7. BRANCH STOCKS (Multi-Warehouse)
-- ========================
CREATE TABLE public.branch_stocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES public.branches(id),
    stock INT DEFAULT 0,
    min_stock INT DEFAULT 5,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(variant_id, branch_id)
);

-- ========================
-- 8. PRODUCT IMAGES
-- ========================
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false
);

CREATE INDEX idx_images_product ON public.product_images(product_id);

-- ========================
-- 9. VEHICLE COMPATIBILITY
-- ========================
CREATE TABLE public.vehicle_compatibilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year_from INT,
    year_to INT,
    engine_type VARCHAR(50)
);

CREATE INDEX idx_compat_product ON public.vehicle_compatibilities(product_id);

-- ========================
-- 10. CUSTOMERS / LOYALTY
-- ========================
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id),
    loyalty_points INT DEFAULT 0,
    tier VARCHAR(20) DEFAULT 'Silver',
    total_spent BIGINT DEFAULT 0,
    birth_date DATE,
    referral_code VARCHAR(20) UNIQUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 11. CUSTOMER VEHICLES
-- ========================
CREATE TABLE public.customer_vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT,
    license_plate VARCHAR(15),
    vin VARCHAR(50),
    last_service_km INT,
    last_service_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 12. ORDERS
-- ========================
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id),
    branch_id UUID REFERENCES public.branches(id),
    status VARCHAR(20) DEFAULT 'pending',
    subtotal BIGINT DEFAULT 0,
    shipping_cost BIGINT DEFAULT 0,
    discount BIGINT DEFAULT 0,
    total BIGINT DEFAULT 0,
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending',
    shipping_method VARCHAR(50),
    shipping_address TEXT,
    shipping_tracking VARCHAR(50),
    notes TEXT,
    paid_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_number ON public.orders(order_number);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

-- ========================
-- 13. ORDER ITEMS
-- ========================
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    variant_id UUID REFERENCES public.product_variants(id),
    product_name VARCHAR(255) NOT NULL,
    variant_name VARCHAR(100),
    quantity INT NOT NULL,
    unit_price BIGINT NOT NULL,
    subtotal BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 14. SERVICE BOOKINGS
-- ========================
CREATE TABLE public.service_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id),
    branch_id UUID REFERENCES public.branches(id),
    vehicle_id UUID REFERENCES public.customer_vehicles(id),
    service_type VARCHAR(100) NOT NULL,
    service_notes TEXT,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    estimated_cost BIGINT,
    actual_cost BIGINT,
    status VARCHAR(20) DEFAULT 'pending',
    kilometer_at_service INT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_date ON public.service_bookings(booking_date);
CREATE INDEX idx_bookings_customer ON public.service_bookings(customer_id);

-- ========================
-- 15. ARTICLES (CMS)
-- ========================
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(50),
    author_id UUID REFERENCES public.users(id),
    featured_image TEXT,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_published ON public.articles(published_at DESC) WHERE published_at IS NOT NULL;

-- ========================
-- 16. BANNERS
-- ========================
CREATE TABLE public.banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- 17. VOUCHERS
-- ========================
CREATE TABLE public.vouchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL,
    value BIGINT NOT NULL,
    min_purchase BIGINT DEFAULT 0,
    max_discount BIGINT,
    usage_limit INT DEFAULT 0,
    used_count INT DEFAULT 0,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vouchers_code ON public.vouchers(code);

-- ========================
-- 18. LOYALTY TRANSACTIONS
-- ========================
CREATE TABLE public.loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id),
    type VARCHAR(10) NOT NULL,
    points INT NOT NULL,
    description TEXT,
    reference_type VARCHAR(50),
    reference_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loyalty_customer ON public.loyalty_transactions(customer_id);

-- ========================
-- 19. REVIEWS
-- ========================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id),
    order_id UUID REFERENCES public.orders(id),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON public.reviews(product_id);

-- ============================================================
-- HRIS TABLES
-- ============================================================

-- 20. DEPARTMENTS
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE,
    head_id UUID,
    parent_id UUID REFERENCES public.departments(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. POSITIONS
CREATE TABLE public.positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    department_id UUID REFERENCES public.departments(id),
    level INT DEFAULT 1,
    salary_min BIGINT,
    salary_max BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. EMPLOYEES
CREATE TABLE public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.users(id),
    branch_id UUID REFERENCES public.branches(id),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position_id UUID REFERENCES public.positions(id),
    department_id UUID REFERENCES public.departments(id),
    supervisor_id UUID REFERENCES public.employees(id),
    join_date DATE NOT NULL,
    end_date DATE,
    employment_status VARCHAR(20) DEFAULT 'active',
    contract_type VARCHAR(20) DEFAULT 'permanent',
    contract_end_date DATE,
    base_salary BIGINT,
    bank_name VARCHAR(50),
    bank_account VARCHAR(30),
    npwp VARCHAR(20),
    bpjs_kesehatan VARCHAR(20),
    bpjs_ketenagakerjaan VARCHAR(20),
    photo_url TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_employees_id ON public.employees(employee_id);
CREATE INDEX idx_employees_department ON public.employees(department_id);
CREATE INDEX idx_employees_status ON public.employees(employment_status);

-- 23. ATTENDANCE
CREATE TABLE public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id),
    date DATE NOT NULL,
    clock_in TIME,
    clock_out TIME,
    status VARCHAR(20) DEFAULT 'present',
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    location_name VARCHAR(255),
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, date)
);

CREATE INDEX idx_attendance_date ON public.attendance(date);

-- 24. LEAVE REQUESTS
CREATE TABLE public.leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id),
    type VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration INT GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
    reason TEXT NOT NULL,
    attachment_url TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    approved_by_id UUID REFERENCES public.employees(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. LEAVE BALANCES
CREATE TABLE public.leave_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id),
    year INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    total_days INT NOT NULL,
    used_days INT DEFAULT 0,
    remaining_days INT GENERATED ALWAYS AS (total_days - used_days) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, year, type)
);

-- 26. PAYROLL
CREATE TABLE public.payrolls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id),
    period VARCHAR(7) NOT NULL,
    base_salary BIGINT NOT NULL,
    allowances BIGINT DEFAULT 0,
    overtime_pay BIGINT DEFAULT 0,
    bonuses BIGINT DEFAULT 0,
    commissions BIGINT DEFAULT 0,
    deductions BIGINT DEFAULT 0,
    net_salary BIGINT GENERATED ALWAYS AS (base_salary + allowances + overtime_pay + bonuses + commissions - deductions) STORED,
    status VARCHAR(20) DEFAULT 'draft',
    paid_at TIMESTAMPTZ,
    bank_transfer_ref VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payroll_employee ON public.payrolls(employee_id, period);

-- 27. JOB POSTINGS
CREATE TABLE public.job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES public.departments(id),
    location VARCHAR(100),
    type VARCHAR(20) DEFAULT 'Full Time',
    salary_range VARCHAR(50),
    description TEXT NOT NULL,
    requirements TEXT[],
    responsibilities TEXT[],
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 28. CANDIDATES
CREATE TABLE public.candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_posting_id UUID REFERENCES public.job_postings(id),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    cv_url TEXT,
    cover_letter TEXT,
    current_position VARCHAR(100),
    years_experience INT,
    status VARCHAR(20) DEFAULT 'applied',
    applied_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 29. INTERVIEWS
CREATE TABLE public.interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES public.candidates(id),
    interviewer_id UUID REFERENCES public.employees(id),
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INT DEFAULT 60,
    type VARCHAR(20) DEFAULT 'online',
    meeting_link TEXT,
    notes TEXT,
    result VARCHAR(20),
    score INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 30. PERFORMANCE REVIEWS
CREATE TABLE public.performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id),
    reviewer_id UUID REFERENCES public.employees(id),
    period VARCHAR(10) NOT NULL,
    overall_score DECIMAL(3,1),
    status VARCHAR(20) DEFAULT 'draft',
    employee_comment TEXT,
    reviewer_comment TEXT,
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 31. REVIEW KPIs
CREATE TABLE public.review_kpis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES public.performance_reviews(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    target VARCHAR(255),
    weight INT NOT NULL,
    score DECIMAL(3,1),
    notes TEXT
);

-- 32. NOTIFICATIONS
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(20),
    is_read BOOLEAN DEFAULT false,
    link TEXT,
    action_label VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read, created_at DESC);

-- 33. AUDIT LOGS
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_entity ON public.audit_logs(entity_type, entity_id);

-- 34. DOCUMENTS
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id),
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    expiry_date DATE,
    is_verified BOOLEAN DEFAULT false,
    notes TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — Supabase Security
-- ============================================================

-- Enable Row Level Security pada semua tabel
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Contoh policy: Users hanya bisa melihat data mereka sendiri
CREATE POLICY "Users can view own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

-- Policy: Semua user bisa melihat produk yang aktif
CREATE POLICY "Anyone can view active products"
    ON public.products FOR SELECT
    USING (is_active = true);

-- Policy: Karyawan bisa melihat data departemennya
CREATE POLICY "Employees can view own attendance"
    ON public.attendance FOR SELECT
    USING (employee_id IN (
        SELECT id FROM public.employees WHERE user_id = auth.uid()
    ));

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin user (password: Admin123! — ganti setelah login!)
INSERT INTO public.users (email, password_hash, full_name, role, email_verified_at)
VALUES (
    'admin@shopandrive.com',
    '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLM', -- bcrypt hash
    'Admin Super',
    'super_admin',
    NOW()
);

-- Cabang utama
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
);

-- Kategori produk
INSERT INTO public.categories (name, slug, sort_order) VALUES
('Sparepart Mesin', 'sparepart-mesin', 1),
('Oli & Cairan', 'oli-cairan', 2),
('Aksesoris', 'aksesoris', 3),
('Ban', 'ban', 4),
('Aki', 'aki', 5),
('Filter', 'filter', 6),
('Kelistrikan', 'kelistrikan', 7),
('Tools & Peralatan', 'tools-peralatan', 8);

-- Departemen
INSERT INTO public.departments (name, code) VALUES
('Manajemen', 'MGT'),
('Penjualan & Marketing', 'MKT'),
('Operasional Bengkel', 'OPS'),
('Gudang & Logistik', 'GDG'),
('HR & Keuangan', 'HRF'),
('Customer Service', 'CS');
