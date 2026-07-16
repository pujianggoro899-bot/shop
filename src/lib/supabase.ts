"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
  db: { schema: "public" },
});

// ========== HELPER: Fallback ke localStorage jika Supabase belum connect ==========
const LOCAL_PREFIX = "shopandrive_";

function isSupabaseReady(): boolean {
  return !!(supabaseUrl && supabaseUrl.includes("supabase.co"));
}

// ========== PRODUCTS ==========
export async function getProducts() {
  if (!isSupabaseReady()) {
    const data = localStorage.getItem(LOCAL_PREFIX + "products");
    return data ? JSON.parse(data) : [];
  }
  const { data } = await supabase.from("products").select("*").eq("is_active", true);
  return data || [];
}

export async function addProduct(product: any) {
  if (!isSupabaseReady()) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_PREFIX + "products") || "[]");
    existing.unshift(product);
    localStorage.setItem(LOCAL_PREFIX + "products", JSON.stringify(existing));
    return product;
  }
  const { data } = await supabase.from("products").insert(product).select();
  return data?.[0];
}

export async function updateProduct(id: string, updates: any) {
  if (!isSupabaseReady()) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_PREFIX + "products") || "[]");
    const updated = existing.map((p: any) => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(LOCAL_PREFIX + "products", JSON.stringify(updated));
    return updates;
  }
  const { data } = await supabase.from("products").update(updates).eq("id", id).select();
  return data?.[0];
}

export async function deleteProduct(id: string) {
  if (!isSupabaseReady()) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_PREFIX + "products") || "[]");
    localStorage.setItem(LOCAL_PREFIX + "products", JSON.stringify(existing.filter((p: any) => p.id !== id)));
    return;
  }
  await supabase.from("products").delete().eq("id", id);
}

// ========== ORDERS ==========
export async function getOrders() {
  if (!isSupabaseReady()) {
    const data = localStorage.getItem(LOCAL_PREFIX + "orders");
    return data ? JSON.parse(data) : [];
  }
  const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function updateOrderStatus(id: string, status: string) {
  if (!isSupabaseReady()) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_PREFIX + "orders") || "[]");
    const updated = existing.map((o: any) =>
      o.id === id ? { ...o, status, updated_at: new Date().toISOString() } : o
    );
    localStorage.setItem(LOCAL_PREFIX + "orders", JSON.stringify(updated));
    return;
  }
  await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
}

// ========== BRANCHES ==========
export async function getBranches() {
  if (!isSupabaseReady()) {
    return [
      { id: "br-1", code: "TTK", name: "Taman Tekno (Pusat)", address: "Jl. Taman Tekno No. 88", city: "Tangerang Selatan", is_active: true, is_head_office: true },
      { id: "br-2", code: "SERPONG", name: "Serpong Utara", address: "Jl. Raya Serpong KM 12", city: "Tangerang Selatan", is_active: true, is_head_office: false },
    ];
  }
  const { data } = await supabase.from("branches").select("*");
  return data || [];
}

// ========== AUTH ==========
export async function signIn(email: string, password: string) {
  if (!isSupabaseReady()) {
    if (email === "admin@shopandrive.com" && password === "Admin123!") {
      localStorage.setItem(LOCAL_PREFIX + "session", JSON.stringify({ user: { email, role: "super_admin" } }));
      return { user: { email, role: "super_admin" } };
    }
    throw new Error("Email atau password salah");
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  localStorage.removeItem(LOCAL_PREFIX + "session");
  if (isSupabaseReady()) await supabase.auth.signOut();
}
