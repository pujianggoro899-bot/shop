"use client";

import { useState } from "react";
import { ShoppingCart, Search, Eye, Truck, Check, X, Clock, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/store/datamanager";
import { formatCurrency } from "@/lib/utils";

const statusConfig: Record<string, { label: string; variant: "warning" | "info" | "default" | "success" | "danger" }> = {
  pending: { label: "Menunggu", variant: "warning" },
  confirmed: { label: "Dikonfirmasi", variant: "info" },
  processing: { label: "Diproses", variant: "info" },
  shipped: { label: "Dikirim", variant: "default" },
  delivered: { label: "Selesai", variant: "success" },
  cancelled: { label: "Dibatalkan", variant: "danger" },
};

const statusFlow = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q);
    }
    return true;
  });

  const advanceStatus = (id: string, currentStatus: string) => {
    const idx = statusFlow.indexOf(currentStatus);
    if (idx < statusFlow.length - 1) {
      updateOrderStatus(id, statusFlow[idx + 1] as any);
    }
  };

  const cancelOrder = (id: string) => {
    updateOrderStatus(id, "cancelled");
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing" || o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Order</h1>
        <p className="text-gray-600">{orders.length} total pesanan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(statusCounts).map(([key, val]) => (
          <button key={key} onClick={() => setStatusFilter(key)}
            className={`rounded-lg border-2 p-3 text-center transition-all ${statusFilter === key ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
            <p className="text-xl font-bold text-gray-900">{val}</p>
            <p className="text-xs text-gray-500 capitalize">{key === "all" ? "Semua" : key}</p>
          </button>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Cari pesanan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-gray-500">Tidak ada pesanan.</CardContent></Card>
        ) : (
          filtered.map((order) => {
            const config = statusConfig[order.status] || statusConfig.pending;
            return (
              <Card key={order.id}>
                <div className="cursor-pointer p-5" onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.id} • {new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
                        <p className="text-xs text-gray-400">{order.items.length} item • {order.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </div>

                  {selectedOrder === order.id && (
                    <div className="mt-4 border-t pt-4">
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm bg-gray-50 rounded-lg p-2">
                            <span>{item.productName} {item.variantName && `(${item.variantName})`} x{item.quantity}</span>
                            <span className="font-medium">{formatCurrency(item.subtotal)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between text-sm border-t pt-3">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ongkir</span>
                        <span>{order.shippingCost === 0 ? "GRATIS" : formatCurrency(order.shippingCost)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Diskon</span>
                          <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-sm pt-1">
                        <span>Total</span>
                        <span className="text-red-600">{formatCurrency(order.total)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Pengiriman: {order.shippingMethod}</p>
                      <p className="text-xs text-gray-400">Alamat: {order.shippingAddress}</p>
                      {order.notes && <p className="text-xs text-gray-500 mt-1">Catatan: {order.notes}</p>}

                      <div className="mt-4 flex gap-2">
                        {order.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => advanceStatus(order.id, order.status)}>
                              <Check className="h-4 w-4" /> Konfirmasi
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => cancelOrder(order.id)}>
                              <X className="h-4 w-4" /> Batalkan
                            </Button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <Button size="sm" onClick={() => advanceStatus(order.id, order.status)}>
                            <Package className="h-4 w-4" /> Proses
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button size="sm" onClick={() => advanceStatus(order.id, order.status)}>
                            <Truck className="h-4 w-4" /> Kirim
                          </Button>
                        )}
                        {order.status === "shipped" && (
                          <Button size="sm" onClick={() => advanceStatus(order.id, order.status)}>
                            <Check className="h-4 w-4" /> Selesaikan
                          </Button>
                        )}
                        {order.status === "delivered" && (
                          <Badge variant="success">Pesanan Selesai ✓</Badge>
                        )}
                        {order.status === "cancelled" && (
                          <Badge variant="danger">Dibatalkan</Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
