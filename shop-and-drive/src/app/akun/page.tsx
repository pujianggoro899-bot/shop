"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, Wrench, Heart, LogOut, ChevronRight, Settings, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-gray-300" />
              <h1 className="mt-4 text-2xl font-bold text-gray-900">Masuk ke Akun</h1>
              <p className="mt-2 text-gray-600">Masuk untuk melihat pesanan, servis, dan wishlist Anda</p>
            </div>
            <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Masuk</Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Belum punya akun? <button className="font-medium text-red-600 hover:underline">Daftar</button>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Andi Pratama</h1>
              <p className="text-sm text-gray-500">andi@email.com</p>
            </div>
            <Link href="/akun" className="ml-auto">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" /> Edit Profil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stats Cards */}
          <Card hover onClick={() => {}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pesanan</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Package className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card hover onClick={() => {}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Servis Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card hover onClick={() => {}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Poin Reward</p>
                  <p className="text-2xl font-bold text-gray-900">2,450</p>
                </div>
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card hover onClick={() => {}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wishlist</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <Heart className="h-8 w-8 text-pink-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link href="/akun/pesanan">
            <Card hover>
              <CardContent className="flex items-center gap-4 p-5">
                <Package className="h-8 w-8 text-red-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Riwayat Pesanan</p>
                  <p className="text-sm text-gray-500">Lihat status dan riwayat pembelian</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/akun/servis">
            <Card hover>
              <CardContent className="flex items-center gap-4 p-5">
                <Wrench className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Riwayat Servis</p>
                  <p className="text-sm text-gray-500">Lihat histori servis kendaraan Anda</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/akun/wishlist">
            <Card hover>
              <CardContent className="flex items-center gap-4 p-5">
                <Heart className="h-8 w-8 text-pink-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Wishlist</p>
                  <p className="text-sm text-gray-500">Produk favorit yang Anda simpan</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardContent>
            </Card>
          </Link>
          <Card hover>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                <LogOut className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Keluar</p>
                <p className="text-sm text-gray-500">Logout dari akun Anda</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pesanan Terbaru</h2>
            <Link href="/akun/pesanan" className="text-sm text-red-600 hover:underline">Lihat Semua</Link>
          </div>
          <Card>
            <div className="divide-y">
              {[
                { id: "#INV-001", date: "10 Jul 2026", status: "delivered", total: 395000, items: 1 },
                { id: "#INV-002", date: "5 Jul 2026", status: "shipped", total: 565000, items: 3 },
                { id: "#INV-003", date: "28 Jun 2026", status: "delivered", total: 1250000, items: 1 },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date} • {order.items} item</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                    <Badge variant={order.status === "delivered" ? "success" : "warning"}>
                      {order.status === "delivered" ? "Selesai" : "Dikirim"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
