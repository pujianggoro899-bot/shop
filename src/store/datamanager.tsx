"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { products as initialProducts } from "@/data/products";
import { orders } from "@/data/orders";
import { employees as initialEmployees } from "@/data/employees";
import type { Product, Order, Employee, Category } from "@/data/types";
import { categories } from "@/data/products";

// ============ TYPES ============
export interface DataContextType {
  // Products
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "createdAt" | "slug">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  
  // Categories
  categories: Category[];
  addCategory: (c: Omit<Category, "id">) => void;
  
  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addOrder: (o: Omit<Order, "id" | "createdAt" | "updatedAt">) => void;
  getOrder: (id: string) => Order | undefined;
  
  // Employees
  employees: Employee[];
  addEmployee: (e: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
}

const PROD_KEY = "shopandrive_products";
const CAT_KEY = "shopandrive_categories";
const ORD_KEY = "shopandrive_orders";
const EMP_KEY = "shopandrive_employees";

const DataContext = createContext<DataContextType | undefined>(undefined);

function clientId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cats, setCats] = useState<Category[]>(categories);
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const p = localStorage.getItem(PROD_KEY); if (p) setProducts(JSON.parse(p));
      const c = localStorage.getItem(CAT_KEY); if (c) setCats(JSON.parse(c));
      const o = localStorage.getItem(ORD_KEY); if (o) setOrderList(JSON.parse(o));
      const e = localStorage.getItem(EMP_KEY); if (e) setEmployees(JSON.parse(e));
    } catch {}
  }, []);

  // Save changes
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(PROD_KEY, JSON.stringify(products)); }, [products]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(CAT_KEY, JSON.stringify(cats)); }, [cats]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(ORD_KEY, JSON.stringify(orderList)); }, [orderList]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(EMP_KEY, JSON.stringify(employees)); }, [employees]);

  // ========== PRODUCT CRUD ==========
  const addProduct = useCallback((p: Omit<Product, "id" | "createdAt" | "slug">) => {
    const newProd: Product = {
      ...p,
      id: clientId(),
      slug: slugify(p.name),
      createdAt: new Date().toISOString(),
      variants: p.variants || [],
      compatibilities: p.compatibilities || [],
      images: p.images || [],
    } as Product;
    setProducts(prev => [newProd, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProduct = useCallback((id: string) => products.find(p => p.id === id), [products]);

  // ========== CATEGORY CRUD ==========
  const addCategory = useCallback((c: Omit<Category, "id">) => {
    const newCat: Category = { ...c, id: clientId() };
    setCats(prev => [...prev, newCat]);
  }, []);

  // ========== ORDER CRUD ==========
  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  }, []);

  const addOrder = useCallback((o: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
    const newOrder: Order = {
      ...o,
      id: clientId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Order;
    setOrderList(prev => [newOrder, ...prev]);
  }, []);

  const getOrder = useCallback((id: string) => orderList.find(o => o.id === id), [orderList]);

  // ========== EMPLOYEE CRUD ==========
  const addEmployee = useCallback((e: Omit<Employee, "id">) => {
    const newEmp: Employee = { ...e, id: clientId() };
    setEmployees(prev => [...prev, newEmp]);
  }, []);

  const updateEmployee = useCallback((id: string, data: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }, []);

  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, getProduct,
      categories: cats, addCategory,
      orders: orderList, updateOrderStatus, addOrder, getOrder,
      employees, addEmployee, updateEmployee, deleteEmployee,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
