"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, AlertTriangle, Target, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { dailySales, monthlyTrends } from "@/data/analytics/sales-data";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

const employeeStatus = [
  { status: "Hadir", count: 12, color: "bg-green-500", pct: 85.7 },
  { status: "Terlambat", count: 1, color: "bg-yellow-500", pct: 7.1 },
  { status: "Cuti", count: 1, color: "bg-blue-500", pct: 7.1 },
  { status: "Alpha", count: 0, color: "bg-red-500", pct: 0 },
];

export default function AdminDashboardPage() {
  const todayRevenue = dailySales[12]?.revenue || 8500000;
  const monthRevenue = dailySales.reduce((s, d) => s + d.revenue, 0);
  const monthOrders = dailySales.reduce((s, d) => s + d.orders, 0);
  const targetRevenue = 260000000;
  const targetPct = Math.min(100, (monthRevenue / targetRevenue) * 100);
  const prevMonthRevenue = monthlyTrends[5]?.revenue || 252000000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Eksekutif</h1>
          <p className="text-gray-600">Ringkasan performa bisnis • {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <Link href="/admin/laporan">
          <Button variant="outline" size="sm"><BarChart3 className="h-4 w-4" /> Laporan Lengkap</Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pendapatan Hari Ini</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(todayRevenue)}</p>
                <span className="mt-1 inline-flex items-center gap-0.5 text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3" />+12.5% dari kemarin
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pesanan Masuk</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">24</p>
                <span className="mt-1 inline-flex items-center gap-0.5 text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3" />+8% dari kemarin
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pengunjung</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">156</p>
                <span className="mt-1 inline-flex items-center gap-0.5 text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3" />+23% dari kemarin
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Progress Target Bulan Ini</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{targetPct.toFixed(1)}%</p>
                <span className="mt-1 inline-flex items-center gap-0.5 text-xs text-orange-600 font-medium">
                  <Target className="h-3 w-3" />{formatCurrency(monthRevenue)} / {formatCurrency(targetRevenue)}
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Mini Chart */}
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Tren Revenue Bulan Ini</h2>
                <p className="text-xs text-gray-500">{formatCurrency(monthRevenue)} dari target {formatCurrency(targetRevenue)}</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-gray-500">Realisasi</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <span className="text-gray-500">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailySales.slice(0, 13)}>
                <XAxis dataKey="label" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={(value: any) => [formatCurrency(Number(value)), "Revenue"]} />
                <Bar dataKey="revenue" fill="#dc2626" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Target Progress */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Capaian Target</h2>
                <Badge variant={targetPct >= 100 ? "success" : targetPct >= 75 ? "warning" : "danger"}>
                  {targetPct >= 100 ? "Tercapai" : `${(100 - targetPct).toFixed(1)}% lagi`}
                </Badge>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-200">
                <div className={`h-3 rounded-full transition-all ${targetPct >= 100 ? "bg-green-500" : targetPct >= 75 ? "bg-blue-500" : "bg-yellow-500"}`}
                  style={{ width: `${Math.min(100, targetPct)}%` }} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
                <div className="rounded-lg bg-gray-50 p-2">
                  <p className="text-xs text-gray-500">vs Bulan Lalu</p>
                  <p className="font-bold text-gray-900">{(monthRevenue / prevMonthRevenue * 100 - 100).toFixed(1)}%</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                  <p className="text-xs text-gray-500">Rata-rata Harian</p>
                  <p className="font-bold text-gray-900">{formatCurrency(Math.round(monthRevenue / 13))}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Today */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Kehadiran Hari Ini</h2>
                <span className="text-xs text-gray-500">{employeeStatus.reduce((s, e) => s + e.count, 0)} karyawan</span>
              </div>
              <div className="flex h-2 w-full gap-0.5 rounded-full overflow-hidden">
                {employeeStatus.map((item) => (
                  <div key={item.status} className={`${item.color} h-full transition-all`}
                    style={{ width: `${item.pct}%` }} />
                ))}
              </div>
              <div className="mt-3 space-y-1.5">
                {employeeStatus.map((item) => (
                  <div key={item.status} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-gray-700">{item.status}</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
              <Link href="/admin/hris/absensi">
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                  Lihat Detail Absensi <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Performance */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Revenue Bulanan</h2>
              <Link href="/admin/laporan">
                <Button variant="ghost" size="sm" className="text-xs">Lihat Semua <ArrowRight className="h-3 w-3 ml-1" /></Button>
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrends}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={(value: any) => [formatCurrency(Number(value)), "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={2} dot={{ fill: "#dc2626", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="text-xs text-gray-500">Tertinggi</p>
                <p className="font-bold text-green-600">{formatCurrency(Math.max(...monthlyTrends.map(m => m.revenue)))}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Terendah</p>
                <p className="font-bold text-red-600">{formatCurrency(Math.min(...monthlyTrends.map(m => m.revenue)))}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rata-rata</p>
                <p className="font-bold text-blue-600">{formatCurrency(Math.round(monthlyTrends.reduce((s, m) => s + m.revenue, 0) / monthlyTrends.length))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/produk">
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 text-center hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer">
                  <Package className="mx-auto h-6 w-6 text-red-500 mb-1" />
                  <p className="text-sm font-medium text-gray-900">Tambah Produk</p>
                </div>
              </Link>
              <Link href="/admin/cms">
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                  <svg className="mx-auto h-6 w-6 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                  <p className="text-sm font-medium text-gray-900">Tulis Artikel</p>
                </div>
              </Link>
              <Link href="/admin/marketing">
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 text-center hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                  <svg className="mx-auto h-6 w-6 text-purple-500 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
                  <p className="text-sm font-medium text-gray-900">Buat Promo</p>
                </div>
              </Link>
              <Link href="/admin/hris/karyawan">
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 text-center hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer">
                  <Users className="mx-auto h-6 w-6 text-green-500 mb-1" />
                  <p className="text-sm font-medium text-gray-900">HRIS Cepat</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
