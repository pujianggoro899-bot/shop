"use client";

import { type ReactNode } from "react";
import { WishlistProvider } from "@/store/wishlist";
import { CartProvider } from "@/store/cart";
import { LoyaltyProvider } from "@/store/loyalty";
import { NotificationProvider } from "@/store/notifications";
import { ServiceReminderProvider } from "@/store/notifications";
import { ApprovalProvider } from "@/store/approval-workflow";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <ServiceReminderProvider>
        <ApprovalProvider>
          <WishlistProvider>
            <CartProvider>
              <LoyaltyProvider>
                {children}
              </LoyaltyProvider>
            </CartProvider>
          </WishlistProvider>
        </ApprovalProvider>
      </ServiceReminderProvider>
    </NotificationProvider>
  );
}
