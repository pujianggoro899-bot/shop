"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Store, Shield, Globe, CreditCard, Truck, Bell, Palette, ChevronRight, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const menuItems = [
    { id: "general", label: "Umum", icon: Settings, desc: "Nama toko, alamat, kontak" },
    { id: "branches", label: "Cabang", icon: Store, desc: "Kelola cabang & multi-store" },
    { id: "payment", label: "Pembayaran", icon: CreditCard, desc: "Gateway & metode bayar" },
    { id: "shipping", label: "Pengiriman", icon: Truck, desc: "Ekspedisi & ongkos kirim" },
    { id: "notification", label: "Notifikasi", icon: Bell, desc: "Email, WhatsApp, SMS" },
    { id: "security", label: "Keamanan", icon: Shield, desc: "RBAC, 2FA, audit log" },
    { id: "seo", label: "SEO & Domain", icon: Globe, desc: "Meta, sitemap, domain" },
    { id: "appearance", label: "Tampilan", icon: Palette, desc: "Theme, logo, brand" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600">Konfigurasi toko, cabang, dan integrasi sistem</p>
        </div>
        <Button onClick={saveSettings} className={saved ? "bg-green-600" : ""}>
          <Save className="h-4 w-4" /> {saved ? "Tersimpan!" : "Simpan Pengaturan"}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-2 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    activeSection === item.id ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === "general" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Pengaturan Umum</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Nama Toko" defaultValue="Shop & Drive Taman Tekno" />
                  <Input label="Kode Cabang" defaultValue="TTK" />
                  <Input label="Email Info" defaultValue="info@shopandrive.com" />
                  <Input label="Nomor Telepon" defaultValue="(021) 1234 5678" />
                  <Input label="WhatsApp Business" defaultValue="6281234567890" className="md:col-span-2" />
                  <Input label="Alamat" defaultValue="Jl. Taman Tekno No. 88, BSD City" className="md:col-span-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "branches" && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Multi Cabang</h2>
                  <Link href="/admin/pengaturan/cabang">
                    <Button variant="outline" size="sm"><Store className="h-4 w-4" /> Kelola Cabang</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Multi-Cabang Aktif</p>
                        <p className="text-sm text-gray-500">Aktifkan fitur multi-cabang untuk sistem terpusat</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-600 peer-checked:after:translate-x-full" />
                      </label>
                    </label>
                  </div>
                  <div className="rounded-lg border p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Pesanan Lintas Cabang</p>
                        <p className="text-sm text-gray-500">Izinkan pelanggan mengambil barang di cabang berbeda</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-600 peer-checked:after:translate-x-full" />
                      </label>
                    </label>
                  </div>
                  <div className="rounded-lg border p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Transfer Stok Antar Cabang</p>
                        <p className="text-sm text-gray-500">Aktifkan fitur transfer stok antar gudang cabang</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-600 peer-checked:after:translate-x-full" />
                      </label>
                    </label>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Visibilitas Stok</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
                      <option>Tampilkan stok semua cabang</option>
                      <option>Tampilkan stok cabang lokal</option>
                      <option>Tampilkan stok cabang utama saja</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "payment" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Pembayaran</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-xs">VA</div>
                      <div>
                        <p className="font-medium text-gray-900">Virtual Account</p>
                        <p className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI, Permata</p>
                      </div>
                    </div>
                    <Badge variant="success">Terintegrasi</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 font-bold text-xs">EW</div>
                      <div>
                        <p className="font-medium text-gray-900">E-Wallet</p>
                        <p className="text-sm text-gray-500">GoPay, OVO, DANA, LinkAja</p>
                      </div>
                    </div>
                    <Badge variant="success">Terintegrasi</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 font-bold text-xs">CC</div>
                      <div>
                        <p className="font-medium text-gray-900">Kartu Kredit</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, JCB</p>
                      </div>
                    </div>
                    <Badge variant="success">Terintegrasi</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-dashed p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400 font-bold text-xs">COD</div>
                      <div>
                        <p className="font-medium text-gray-900">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-500">Bayar di tempat saat barang diterima</p>
                      </div>
                    </div>
                    <Badge variant="warning">Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "shipping" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Pengiriman</h2>
                <div className="space-y-4">
                  {[
                    { name: "JNE Reguler", code: "jne", active: true, cost: "15000", est: "2-3 hari" },
                    { name: "J&T Express", code: "jnt", active: true, cost: "13000", est: "2-3 hari" },
                    { name: "SiCepat BEST", code: "sicepat", active: true, cost: "18000", est: "1-2 hari" },
                    { name: "GrabExpress", code: "grab", active: true, cost: "35000", est: "Same Day" },
                    { name: "GoSend", code: "gosend", active: false, cost: "30000", est: "Same Day" },
                  ].map((eks) => (
                    <div key={eks.code} className={`flex items-center justify-between rounded-lg border p-4 ${!eks.active ? "opacity-50" : ""}`}>
                      <div>
                        <p className="font-medium text-gray-900">{eks.name}</p>
                        <p className="text-sm text-gray-500">{eks.est} • Ongkir mulai Rp {eks.cost}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked={eks.active} className="peer sr-only" />
                          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-600 peer-checked:after:translate-x-full" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Input label="Ongkos Kirim Gratis Minimal Belanja" type="number" defaultValue="200000" />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "notification" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Notifikasi</h2>
                <div className="space-y-3">
                  {[
                    { title: "Notifikasi Pesanan Baru", desc: "Kirim notifikasi ke admin saat ada pesanan masuk" },
                    { title: "Notifikasi Status Pesanan", desc: "Update status pesanan ke pelanggan via WhatsApp" },
                    { title: "Konfirmasi Booking Servis", desc: "Kirim konfirmasi booking servis ke pelanggan" },
                    { title: "Pengingat Servis Berkala", desc: "Kirim reminder servis otomatis ke pelanggan" },
                    { title: "Approval Cuti Karyawan", desc: "Notifikasi ke atasan saat ada pengajuan cuti" },
                    { title: "Pengingat Payroll", desc: "Reminder ke HR untuk proses payroll" },
                    { title: "Alert Stok Menipis", desc: "Notifikasi stok di bawah minimum" },
                    { title: "Laporan Harian", desc: "Ringkasan penjualan dan operasional harian" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-600 peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Keamanan</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-gray-900">Daftar Role & Hak Akses</p>
                      <Badge variant="info">RBAC Aktif</Badge>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {["Super Admin", "Admin Toko", "Staff Marketing", "Staff HR", "Manager", "Customer Service"].map((role) => (
                        <div key={role} className="rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">{role}</div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
                        <p className="text-sm text-gray-500">Keamanan tambahan untuk akun admin</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-600 peer-checked:after:translate-x-full" />
                      </label>
                    </label>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="font-medium text-gray-900">Audit Trail</p>
                    <p className="text-sm text-gray-500">Semua aktivitas kritis tercatat dalam log</p>
                    <div className="mt-2 space-y-1 text-xs text-gray-500">
                      <p>✅ Login & logout admin</p>
                      <p>✅ Perubahan data produk & harga</p>
                      <p>✅ Approval cuti & payroll</p>
                      <p>✅ Perubahan role & hak akses</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fallback for other sections */}
          {!["general", "branches", "payment", "shipping", "notification", "security"].includes(activeSection) && (
            <Card>
              <CardContent className="p-6 text-center py-12">
                <Settings className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">Pengaturan {menuItems.find(m => m.id === activeSection)?.label}</h3>
                <p className="text-gray-500 mt-1">Halaman ini sedang dalam pengembangan.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
