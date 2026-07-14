"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  shippingCost: number;
  total: number;
  applyVoucher: (code: string) => boolean;
  appliedVoucher: string | null;
  discount: number;
  removeVoucher: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.variant === item.variant
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.variant === item.variant
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxStock) }
            : i
        );
      }
      return [...prev, { ...item, id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedVoucher(null);
    setDiscount(0);
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const shippingCost = subtotal >= 200000 ? 0 : 15000;

  const applyVoucher = useCallback(
    (code: string) => {
      // Mock voucher validation
      const validVouchers: Record<string, { type: "percentage" | "nominal"; value: number; maxDiscount: number; minPurchase: number }> = {
        BARU10: { type: "percentage", value: 10, maxDiscount: 50000, minPurchase: 100000 },
        HEMAT30: { type: "percentage", value: 30, maxDiscount: 150000, minPurchase: 500000 },
        SERVIS50: { type: "nominal", value: 50000, maxDiscount: 50000, minPurchase: 200000 },
      };

      const voucher = validVouchers[code.toUpperCase()];
      if (!voucher) return false;
      if (subtotal < voucher.minPurchase) return false;

      let disc = 0;
      if (voucher.type === "percentage") {
        disc = Math.min(subtotal * (voucher.value / 100), voucher.maxDiscount);
      } else {
        disc = Math.min(voucher.value, voucher.maxDiscount);
      }

      setAppliedVoucher(code.toUpperCase());
      setDiscount(disc);
      return true;
    },
    [subtotal]
  );

  const removeVoucher = useCallback(() => {
    setAppliedVoucher(null);
    setDiscount(0);
  }, []);

  const total = Math.max(0, subtotal + shippingCost - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        shippingCost,
        total,
        applyVoucher,
        appliedVoucher,
        discount,
        removeVoucher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
