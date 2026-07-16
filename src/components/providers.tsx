"use client";

import { type ReactNode } from "react";
import { WishlistProvider } from "@/store/wishlist";
import { CartProvider } from "@/store/cart";
import { LoyaltyProvider } from "@/store/loyalty";
import { NotificationProvider } from "@/store/notifications";
import { ApprovalProvider } from "@/store/approval-workflow";
import { DataProvider } from "@/store/datamanager";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <ApprovalProvider>
        <DataProvider>
          <WishlistProvider>
            <CartProvider>
              <LoyaltyProvider>
                {children}
              </LoyaltyProvider>
            </CartProvider>
          </WishlistProvider>
        </DataProvider>
      </ApprovalProvider>
    </NotificationProvider>
  );
}
