"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, shippingCost, total, totalItems, applyVoucher, appliedVoucher, discount, removeVoucher } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApplyVoucher = () => {
    if (!couponInput.trim()) return;
    const ok = applyVoucher(couponInput.trim());
    setCouponMsg(ok ? { ok: true, text: "Voucher berhasil diterapkan!" } : { ok: false, text: "Kode voucher tidak valid atau tidak memenuhi minimum belanja." });
    setTimeout(() => setCouponMsg(null), 3000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900">Keranjang</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Keranjang Belanja Kosong</h2>
            <p className="mt-2 text-gray-600">Mulai belanja kebutuhan kendaraan Anda</p>
            <Link href="/produk">
              <Button className="mt-6">Mulai Belanja</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Keranjang Belanja ({totalItems} item)</h1>
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-2xl font-bold text-red-600">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/produk/${item.slug}`} className="text-sm font-semibold text-gray-900 hover:text-red-600 line-clamp-1">
                          {item.name}
                        </Link>
                        {item.variant && <p className="text-xs text-gray-500">Varian: {item.variant}</p>}
                        <p className="mt-1 text-sm font-bold text-red-600">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-l-lg border border-gray-300 p-2 hover:bg-gray-50"><Minus className="h-3.5 w-3.5" /></button>
                        <input type="number" value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 border-y border-gray-300 px-2 py-2 text-center text-sm focus:outline-none" min={1} />
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-r-lg border border-gray-300 p-2 hover:bg-gray-50"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                        <button onClick={() => removeItem(item.id)} className="mt-1 text-xs text-red-500 hover:text-red-700">
                          <Trash2 className="h-3.5 w-3.5 inline" /> Hapus
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-28">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-gray-900">Ringkasan Belanja</h2>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({totalItems} item)</span>
                      <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ongkos Kirim</span>
                      <span className={`font-medium ${shippingCost === 0 ? "text-green-600" : ""}`}>
                        {shippingCost === 0 ? "GRATIS" : formatCurrency(shippingCost)}
                      </span>
                    </div>
                    {appliedVoucher && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Diskon ({appliedVoucher})</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    {subtotal < 200000 && (
                      <p className="text-xs text-orange-600">Belanja {formatCurrency(200000 - subtotal)} lagi untuk gratis ongkir!</p>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-red-600">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Voucher */}
                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Kode Voucher</label>
                    <div className="flex gap-2">
                      <Input placeholder="Masukkan kode" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} />
                      {appliedVoucher ? (
                        <Button variant="outline" size="sm" onClick={removeVoucher}>Hapus</Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={handleApplyVoucher}>Pakai</Button>
                      )}
                    </div>
                    {couponMsg && (
                      <p className={`mt-1 text-xs ${couponMsg.ok ? "text-green-600" : "text-red-600"}`}>{couponMsg.text}</p>
                    )}
                  </div>

                  {/* Available Vouchers */}
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-500">Voucher tersedia:</p>
                    {["BARU10", "HEMAT30", "SERVIS50"].map((code) => (
                      <div key={code} className="flex items-center justify-between rounded bg-gray-50 px-2 py-1">
                        <code className="text-xs font-bold font-mono">{code}</code>
                        <button onClick={() => copyCode(code)} className="text-xs text-red-600 hover:underline">
                          {copiedCode === code ? "✓ Tersalin" : "Salin"}
                        </button>
                      </div>
                    ))}
                  </div>

                  <Link href="/checkout">
                    <Button className="mt-4 w-full" size="lg">Lanjut ke Pembayaran</Button>
                  </Link>
                  <Link href="/produk">
                    <Button variant="ghost" className="mt-2 w-full">Lanjut Belanja</Button>
                  </Link>
                  <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
                    <p className="font-medium">💳 Pembayaran Aman</p>
                    <p>Didukung oleh Midtrans (VA, e-Wallet, Kartu Kredit, QRIS)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
