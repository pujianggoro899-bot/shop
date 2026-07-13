"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, TrendingUp, Download, Calendar, ChevronRight, FileSpreadsheet, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RevenueChart, OrdersChart, TargetAchievementChart,
  CategoryPieChart, TrafficChart, TopProductsTable, AnalyticsSummaryCards,
} from "@/components/charts/sales-chart";
import { hrAnalytics, inventoryAnalytics } from "@/data/analytics/sales-data";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  const [period, setPeriod] = useState("2026");
  const [activeTab, setActiveTab] = useState<"sales" | "inventory" | "hr" | "financial">("sales");

  const tabItems = [
    { id: "sales" as const, label: "Penjualan", icon: TrendingUp },
    { id: "inventory" as const, label: "Stok & Inventori", icon: BarChart3 },
    { id: "hr" as const, label: "SDM", icon: BarChart3 },
    { id: "financial" as const, label: "Keuangan", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="text-gray-600">Data real-time untuk pengambilan keputusan bisnis</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none">
            <option value="2026">Tahun 2026</option>
            <option value="2025">Tahun 2025</option>
          </select>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b gap-0">
        {tabItems.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "border-red-600 text-red-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* === TAB SALES === */}
      {activeTab === "sales" && (
        <div className="space-y-6">
          <AnalyticsSummaryCards />

          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueChart />
            <TargetAchievementChart />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OrdersChart />
            </div>
            <CategoryPieChart />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TrafficChart />
            <TopProductsTable />
          </div>
        </div>
      )}

      {/* === TAB INVENTORY === */}
      {activeTab === "inventory" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{inventoryAnalytics.totalSKU}</p>
              <p className="text-sm text-gray-500">Total SKU</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(inventoryAnalytics.totalStockValue)}</p>
              <p className="text-sm text-gray-500">Nilai Stok</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{inventoryAnalytics.outOfStock}</p>
              <p className="text-sm text-gray-500">Stok Habis</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{inventoryAnalytics.lowStock}</p>
              <p className="text-sm text-gray-500">Stok Menipis</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{inventoryAnalytics.monthlyTurnover}x</p>
              <p className="text-sm text-gray-500">Inventory Turnover</p>
            </CardContent></Card>
          </div>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">Kategori dengan Turnover Tertinggi</h3>
              <div className="space-y-3">
                {inventoryAnalytics.topSellingCategories.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat.name}</span>
                      <span className="font-medium">{cat.turnover}x turnover</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(cat.turnover / 4) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* === TAB HR === */}
      {activeTab === "hr" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{hrAnalytics.reduce((s, d) => s + d.headcount, 0)}</p>
              <p className="text-sm text-gray-500">Total Karyawan</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {(hrAnalytics.reduce((s, d) => s + d.avgAttendance, 0) / hrAnalytics.length).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">Rata-rata Kehadiran</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(hrAnalytics.reduce((s, d) => s + d.payrollThisMonth, 0))}
              </p>
              <p className="text-sm text-gray-500">Total Payroll Bulan Ini</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {(hrAnalytics.reduce((s, d) => s + d.avgTenureMonths, 0) / hrAnalytics.length).toFixed(0)} bulan
              </p>
              <p className="text-sm text-gray-500">Rata-rata Masa Kerja</p>
            </CardContent></Card>
          </div>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">SDM per Departemen</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium text-gray-500">
                      <th className="pb-3 pr-4">Departemen</th>
                      <th className="pb-3 pr-4 text-right">Headcount</th>
                      <th className="pb-3 pr-4 text-right">Kehadiran</th>
                      <th className="pb-3 pr-4 text-right">Jam Lembur</th>
                      <th className="pb-3 pr-4 text-right">Turnover</th>
                      <th className="pb-3 pr-4 text-right">Masa Kerja</th>
                      <th className="pb-3 text-right">Payroll</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrAnalytics.map((dept) => (
                      <tr key={dept.department} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium text-gray-900">{dept.department}</td>
                        <td className="py-3 pr-4 text-right">{dept.headcount}</td>
                        <td className="py-3 pr-4 text-right">
                          <span className={dept.avgAttendance >= 95 ? "text-green-600" : dept.avgAttendance >= 90 ? "text-yellow-600" : "text-red-600"}>
                            {dept.avgAttendance}%
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-right">{dept.avgOvertimeHours} jam</td>
                        <td className="py-3 pr-4 text-right">{dept.turnoverRate}%</td>
                        <td className="py-3 pr-4 text-right">{dept.avgTenureMonths} bln</td>
                        <td className="py-3 text-right font-medium">{formatCurrency(dept.payrollThisMonth)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* === TAB FINANCIAL === */}
      {activeTab === "financial" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(1520000000)}</p>
              <p className="text-sm text-gray-500">Total Revenue (YTD)</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{formatCurrency(985000000)}</p>
              <p className="text-sm text-gray-500">Total HPP</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(385000000)}</p>
              <p className="text-sm text-gray-500">Beban Operasional</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(150000000)}</p>
              <p className="text-sm text-gray-500">Laba Bersih (YTD)</p>
            </CardContent></Card>
          </div>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">Ringkasan Laporan Keuangan</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium text-gray-500">
                      <th className="pb-3 pr-4">Bulan</th>
                      <th className="pb-3 pr-4 text-right">Revenue</th>
                      <th className="pb-3 pr-4 text-right">HPP</th>
                      <th className="pb-3 pr-4 text-right">Gross Profit</th>
                      <th className="pb-3 pr-4 text-right">Margin</th>
                      <th className="pb-3 pr-4 text-right">Operasional</th>
                      <th className="pb-3 text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { month: "Jan", revenue: 185000000, hpp: 120000000, operational: 45000000 },
                      { month: "Feb", revenue: 172000000, hpp: 112000000, operational: 42000000 },
                      { month: "Mar", revenue: 210000000, hpp: 136000000, operational: 48000000 },
                      { month: "Apr", revenue: 198000000, hpp: 129000000, operational: 46000000 },
                      { month: "Mei", revenue: 235000000, hpp: 153000000, operational: 52000000 },
                      { month: "Jun", revenue: 252000000, hpp: 164000000, operational: 55000000 },
                    ].map((row) => {
                      const grossProfit = row.revenue - row.hpp;
                      const margin = (grossProfit / row.revenue) * 100;
                      const netProfit = grossProfit - row.operational;
                      return (
                        <tr key={row.month} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium text-gray-900">{row.month}</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(row.revenue)}</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(row.hpp)}</td>
                          <td className="py-3 pr-4 text-right font-medium text-green-600">{formatCurrency(grossProfit)}</td>
                          <td className="py-3 pr-4 text-right font-medium">{margin.toFixed(1)}%</td>
                          <td className="py-3 pr-4 text-right">{formatCurrency(row.operational)}</td>
                          <td className="py-3 text-right font-bold">{formatCurrency(netProfit)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
