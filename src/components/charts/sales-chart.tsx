"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";
import { dailySales, monthlyTrends, salesByCategory, trafficSources, topProducts, type MonthlyTrend } from "@/data/analytics/sales-data";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#dc2626", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"];

// ====== Revenue Line Chart ======
export function RevenueChart() {
  const [view, setView] = useState<"daily" | "monthly">("monthly");

  const data = view === "daily" ? dailySales.slice(0, 13) : monthlyTrends;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900">Tren Pendapatan</h3>
            <p className="text-sm text-gray-500">Perbandingan revenue harian/bulanan</p>
          </div>
          <div className="flex rounded-lg border p-0.5">
            <button onClick={() => setView("daily")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${view === "daily" ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>
              Harian
            </button>
            <button onClick={() => setView("monthly")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${view === "monthly" ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>
              Bulanan
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data as any}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={view === "daily" ? "label" : "month"} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
            <Tooltip formatter={(value: any) => [formatCurrency(value), "Pendapatan"]} />
            <Area type="monotone" dataKey="revenue" stroke="#dc2626" fill="url(#revenueGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ====== Orders Bar Chart ======
export function OrdersChart() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Jumlah Pesanan Bulanan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="orders" fill="#dc2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ====== Target Achievement Chart ======
export function TargetAchievementChart() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Pencapaian Target</h3>
        <div className="space-y-3">
          {monthlyTrends.map((m) => {
            const achieved = (m.revenue / m.target) * 100;
            const color = achieved >= 100 ? "bg-green-500" : achieved >= 90 ? "bg-blue-500" : achieved >= 75 ? "bg-yellow-500" : "bg-red-500";
            return (
              <div key={m.month}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{m.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{formatCurrency(m.revenue)} / {formatCurrency(m.target)}</span>
                    <span className={`font-bold ${achieved >= 100 ? "text-green-600" : achieved >= 90 ? "text-blue-600" : "text-yellow-600"}`}>
                      {achieved.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${Math.min(100, achieved)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ====== Category Pie Chart ======
export function CategoryPieChart() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Penjualan per Kategori</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={salesByCategory} dataKey="percentage" nameKey="category" cx="50%" cy="50%" outerRadius={90}
              innerRadius={50} label={({ percent }) => `${(Number(percent) * 100).toFixed(0)}%`}>
              {salesByCategory.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => [`${Number(value).toFixed(1)}%`, "Persentase"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {salesByCategory.map((cat, idx) => (
            <div key={cat.category} className="flex items-center gap-2 text-xs">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
              <span className="text-gray-700">{cat.category}</span>
              <span className="ml-auto font-medium">{cat.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ====== Traffic Sources Chart ======
export function TrafficChart() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Sumber Trafik</h3>
        <div className="space-y-3">
          {trafficSources.map((source) => (
            <div key={source.source}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{source.source}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{source.visitors.toLocaleString()} pengunjung</span>
                  <span className="font-medium text-blue-600">{source.percentage}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: `${source.percentage}%` }} />
                </div>
                <span className="text-xs text-green-600 font-medium">{source.conversion}% konv.</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ====== Top Products Table ======
export function TopProductsTable() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Produk Terlaris (Bulan Ini)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-medium text-gray-500">
                <th className="pb-2 pr-3">#</th>
                <th className="pb-2 pr-3">Produk</th>
                <th className="pb-2 pr-3 text-right">Revenue</th>
                <th className="pb-2 pr-3 text-right">Pesanan</th>
                <th className="pb-2 pr-3 text-right">Stok</th>
                <th className="pb-2 text-right">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.sku} className="border-b last:border-0">
                  <td className="py-2.5 pr-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                      i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-500" : "bg-gray-300"
                    }`}>{i + 1}</span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <p className="font-medium text-gray-900 max-w-[180px] truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sku}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-right font-medium">{formatCurrency(p.revenue)}</td>
                  <td className="py-2.5 pr-3 text-right">{p.orders}</td>
                  <td className="py-2.5 pr-3 text-right">
                    <span className={p.stock <= 10 ? "text-red-600 font-medium" : "text-gray-700"}>{p.stock}</span>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className={`font-medium ${p.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {p.growth >= 0 ? "+" : ""}{p.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ====== Summary Cards ======
export function AnalyticsSummaryCards() {
  const totals = {
    revenue: monthlyTrends.reduce((s, m) => s + m.revenue, 0),
    orders: monthlyTrends.reduce((s, m) => s + m.orders, 0),
    avgConversion: 3.8,
    averageOrderValue: 445000,
  };

  const cards = [
    { label: "Total Revenue (2026)", value: formatCurrency(totals.revenue), change: "+18.5%", color: "text-green-600", bg: "bg-green-100" },
    { label: "Total Pesanan", value: totals.orders.toLocaleString(), change: "+12.3%", color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Rata-rata Konversi", value: `${totals.avgConversion}%`, change: "+0.5%", color: "text-purple-600", bg: "bg-purple-100" },
    { label: "AOV (Average Order)", value: formatCurrency(totals.averageOrderValue), change: "+3.2%", color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{card.value}</p>
            <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${card.color}`}>
              <TrendingUp className="h-3 w-3" /> {card.change} dari tahun lalu
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}
