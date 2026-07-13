"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const orders = [
  { id: "#INV-20260713-001", date: "13 Jul 2026", status: "pending", total: 395000, items: [{ name: "Oli Shell Helix HX7 4L", qty: 1, price: 395000 }] },
  { id: "#INV-20260710-002", date: "10 Jul 2026", status: "delivered", total: 565000, items: [{ name: "Filter Udara Honda Brio", qty: 2, price: 170000 }, { name: "Busi NGK Iridium Set", qty: 1, price: 395000 }] },
  { id: "#INV-20260628-003", date: "28 Jun 2026", status: "delivered", total: 1250000, items: [{ name: "Ban Michelin Primacy 4", qty: 1, price: 1250000 }] },
];

export default function OrdersHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/akun" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" /> Kembali ke Akun
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Pesanan</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <Badge variant={order.status === "delivered" ? "success" : "warning"}>
                    {order.status === "delivered" ? "Selesai" : "Menunggu Pembayaran"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name} x{item.qty}</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between border-t pt-3">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-red-600">{formatCurrency(order.total)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
