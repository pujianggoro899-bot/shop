"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface Transaction {
  id: string;
  type: "earn" | "redeem";
  points: number;
  description: string;
  date: string;
}

interface LoyaltyContextType {
  points: number;
  tier: "Silver" | "Gold" | "Platinum";
  tierProgress: number; // 0-100
  nextTier: string | null;
  transactions: Transaction[];
  earnPoints: (amount: number, description: string) => void;
  redeemPoints: (points: number, description: string) => boolean;
  getPointsEquivalent: (points: number) => number;
}

const POINTS_PER_RUPIAH = 0.1; // 1 point per Rp 10.000 spent
const REDEEM_RATE = 100; // 100 points = Rp 1.000

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(2450);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "tx-1", type: "earn", points: 250, description: "Pembelian Oli Shell 4L", date: "2026-07-10" },
    { id: "tx-2", type: "earn", points: 180, description: "Servis Berkala Ringan", date: "2026-07-05" },
    { id: "tx-3", type: "redeem", points: 500, description: "Voucher Diskon Rp 5.000", date: "2026-06-28" },
    { id: "tx-4", type: "earn", points: 320, description: "Pembelian Ban Michelin", date: "2026-06-20" },
  ]);

  const tier: "Silver" | "Gold" | "Platinum" = points >= 5000 ? "Platinum" : points >= 2000 ? "Gold" : "Silver";
  const nextTier = tier === "Silver" ? "Gold" : tier === "Gold" ? "Platinum" : null;
  const tierProgress = tier === "Silver" ? (points / 2000) * 100 : tier === "Gold" ? (points / 5000) * 100 : 100;

  const earnPoints = useCallback((amount: number, description: string) => {
    const earned = Math.floor(amount * POINTS_PER_RUPIAH);
    setPoints((prev) => prev + earned);
    setTransactions((prev) => [
      { id: `tx-${Date.now()}`, type: "earn", points: earned, description, date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
  }, []);

  const redeemPoints = useCallback(
    (pts: number, description: string): boolean => {
      if (pts > points) return false;
      setPoints((prev) => prev - pts);
      setTransactions((prev) => [
        { id: `tx-${Date.now()}`, type: "redeem", points: pts, description, date: new Date().toISOString().split("T")[0] },
        ...prev,
      ]);
      return true;
    },
    [points]
  );

  const getPointsEquivalent = useCallback((pts: number): number => {
    return Math.floor(pts / REDEEM_RATE) * 1000;
  }, []);

  return (
    <LoyaltyContext.Provider
      value={{ points, tier, tierProgress, nextTier, transactions, earnPoints, redeemPoints, getPointsEquivalent }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error("useLoyalty must be used within LoyaltyProvider");
  return context;
}
