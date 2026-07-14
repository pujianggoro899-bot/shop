// Wishlist store menggunakan React Context
"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  const toggleItem = useCallback(
    (item: WishlistItem) => {
      if (isInWishlist(item.productId)) {
        removeItem(item.productId);
      } else {
        addItem(item);
      }
    },
    [isInWishlist, removeItem, addItem]
  );

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, isInWishlist, toggleItem, clearWishlist, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
