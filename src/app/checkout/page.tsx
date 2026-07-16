"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Check, CreditCard, Wallet, Building2, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";

const paymentMethods = [
  { id: "va", name: "Virtual Account", icon: <Building2 className="h-5 w-5" />, desc: "BCA, Mandiri, BNI, BRI" },
  { id: "ewallet", name: "E-Wallet", icon: <Wallet className="h-5 w-5" />, desc: "GoPay, OVO, DANA, LinkAja" },
  { id: "cc", name: "Kartu Kredit", icon: <CreditCard className="h-5 w-5" />, desc: "Visa, Mastercard" },
  { id: "qris", name: "QRIS", icon: <QrCode className="h-5 w-5" />, desc: "Scan QR dari aplikasi pembayaran" },
];

const shippingMethods = [
  { id: "jne", name: "JNE Reguler", cost: 15000, est: "2-3 hari" },
  { id: "jnt", name: "J&T Express", cost: 13000, est: "2-3 hari" },
  { id: "sicepat", name: "SiCepat BEST", cost: 18000, est: "1-2 hari" },
  { id: "grab", name: "GrabExpress Same Day", cost: 35000, est: "Hari ini" },
  { id: "pickup", name: "Ambil di Toko (Click & Collect)", cost: 0, est: "-" },
];

export default function CheckoutPage() {
  const { items, subtotal, discount, appliedVoucher, total, totalItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("va");
  const [shippingMethod, setShippingMethod] = useState("jne");
  const [submitted, setSubmitted] = useState(false);

  const selectedShipping = shippingMethods.find((s) => s.id === shippingMethod);
  const shippingCost = selectedShipping?.cost || 0;
  const finalTotal = subtotal + shippingCost - discount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Pesanan Berhasil!</h1>
          <p className="mt-2 text-gray-600">Terima kasih, pesanan Anda telah diterima. Kami akan mengirimkan konfirmasi via WhatsApp.</p>
          <div className="mt-4 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
            <p>No. Pesanan: <strong>#INV-{new Date().toISOString().slice(0,10).replace(/-/g,"")}-{String(Math.floor(Math.random()*999)).padStart(3,"0")}</strong></p>
            <p>Silakan selesaikan pembayaran sebelum batas waktu.</p>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/"><Button>Kembali ke Beranda</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Keranjang Kosong</h1>
          <p className="mt-2 text-gray-600">Tambahkan produk terlebih dahulu.</p>
          <Link href="/produk"><Button className="mt-4">Belanja Sekarang</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/keranjang" className="hover:text-red-600">Keranjang</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900">Checkout</span>
          </nav>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900">1. Alamat Pengiriman</h2>
                <div className="mt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input label="Nama Penerima" placeholder="Nama lengkap" required />
                    <Input label="Nomor Telepon" placeholder="08xxxxxxxxxx" required />
                  </div>
                  <Input label="Alamat Lengkap" placeholder="Jalan, nomor, RT/RW, kelurahan, kecamatan" required />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Input label="Kota/Kabupaten" placeholder="Kota" required />
                    <Input label="Kecamatan" placeholder="Kecamatan" required />
                    <Input label="Kode Pos" placeholder="Kode pos" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900">2. Metode Pengiriman</h2>
                <div className="mt-4 space-y-3">
                  {shippingMethods.map((method) => (
                    <label key={method.id} className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all ${shippingMethod === method.id ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" value={method.id} checked={shippingMethod === method.id} onChange={() => setShippingMethod(method.id)} className="h-4 w-4 accent-red-600" />
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-xs text-gray-500">Estimasi {method.est}</p>
                        </div>
                      </div>
                      <span className="font-medium">{method.cost === 0 ? "GRATIS" : formatCurrency(method.cost)}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900">3. Metode Pembayaran</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${paymentMethod === method.id ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="text-red-600">{method.icon}</div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{method.name}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="sticky top-28">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900">Ringkasan Pesanan</h2>
                <div className="space-y-2 divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-2 first:pt-0">
                      <span className="text-gray-700">{item.name} x{item.quantity}</span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} item)</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="font-medium">{shippingCost === 0 ? "GRATIS" : formatCurrency(shippingCost)}</span>
                  </div>
                  {appliedVoucher && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Diskon ({appliedVoucher})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-red-600">{formatCurrency(Math.max(0, finalTotal))}</span>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="mt-6 w-full" size="lg" disabled={items.length === 0}>
                  Bayar {formatCurrency(Math.max(0, finalTotal))}
                </Button>
                <p className="mt-2 text-center text-xs text-gray-400">Data Anda aman dan terenkripsi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
