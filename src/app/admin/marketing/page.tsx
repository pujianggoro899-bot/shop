"use client";

import { useState } from "react";
import { Gift, Tag, Plus, Copy, Check, Percent, Search, TrendingUp, Users, Star, Edit, Trash2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/lib/utils";

// Mock vouchers
const initialVouchers = [
  { id: "v-1", code: "BARU10", type: "percentage" as const, value: 10, minPurchase: 100000, maxDiscount: 50000, usageLimit: 100, usedCount: 34, validFrom: "2026-07-01", validUntil: "2026-07-31", isActive: true },
  { id: "v-2", code: "SERVIS50", type: "nominal" as const, value: 50000, minPurchase: 200000, maxDiscount: 50000, usageLimit: 50, usedCount: 12, validFrom: "2026-07-01", validUntil: "2026-08-31", isActive: true },
  { id: "v-3", code: "HEMAT30", type: "percentage" as const, value: 30, minPurchase: 500000, maxDiscount: 150000, usageLimit: 200, usedCount: 87, validFrom: "2026-06-01", validUntil: "2026-07-15", isActive: true },
  { id: "v-4", code: "GRATISONGKIR", type: "nominal" as const, value: 15000, minPurchase: 200000, maxDiscount: 15000, usageLimit: 150, usedCount: 150, validFrom: "2026-06-01", validUntil: "2026-06-30", isActive: false },
  { id: "v-5", code: "LOYALTY50K", type: "nominal" as const, value: 50000, minPurchase: 0, maxDiscount: 50000, usageLimit: 0, usedCount: 23, validFrom: "2026-07-01", validUntil: "2026-12-31", isActive: true },
];

const loyaltyTiers = [
  { name: "Silver", minPoints: 0, color: "bg-gray-200 text-gray-700", benefits: ["1 poin per Rp 10,000", "Voucher ulang tahun", "Gratis ongkir min Rp 300,000"] },
  { name: "Gold", minPoints: 2000, color: "bg-yellow-100 text-yellow-700", benefits: ["1.5 poin per Rp 10,000", "Voucher ulang tahun Rp 50,000", "Gratis ongkir min Rp 200,000", "Diskon 5% jasa servis"] },
  { name: "Platinum", minPoints: 5000, color: "bg-purple-100 text-purple-700", benefits: ["2 poin per Rp 10,000", "Voucher ulang tahun Rp 100,000", "Gratis ongkir tanpa minimum", "Diskon 10% jasa servis", "Prioritas booking servis", "Free pemeriksaan AC tahunan"] },
];

export default function MarketingPage() {
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"voucher" | "loyalty">("voucher");
  const [newVoucher, setNewVoucher] = useState({
    code: "", type: "percentage" as "percentage" | "nominal", value: "", minPurchase: "", maxDiscount: "", validFrom: "", validUntil: "", usageLimit: "",
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const addVoucher = () => {
    const voucher = {
      id: `v-${Date.now()}`,
      code: newVoucher.code.toUpperCase(),
      type: newVoucher.type,
      value: parseInt(newVoucher.value) || 0,
      minPurchase: parseInt(newVoucher.minPurchase) || 0,
      maxDiscount: parseInt(newVoucher.maxDiscount) || 0,
      usageLimit: parseInt(newVoucher.usageLimit) || 0,
      usedCount: 0,
      validFrom: newVoucher.validFrom,
      validUntil: newVoucher.validUntil,
      isActive: true,
    };
    setVouchers([voucher, ...vouchers]);
    setShowAddForm(false);
    setNewVoucher({ code: "", type: "percentage", value: "", minPurchase: "", maxDiscount: "", validFrom: "", validUntil: "", usageLimit: "" });
  };

  const toggleVoucherStatus = (id: string) => {
    setVouchers(vouchers.map(v => v.id === id ? { ...v, isActive: !v.isActive } : v));
  };

  const totalRevenue = 245800000;
  const totalDiscount = 12450000;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing & Promo</h1>
          <p className="text-gray-600">Kelola voucher, diskon, dan program loyalty</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Gift className="h-4 w-4" /> + Buat Promo
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("voucher")}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "voucher" ? "border-red-600 text-red-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Voucher & Diskon
        </button>
        <button
          onClick={() => setActiveTab("loyalty")}
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "loyalty" ? "border-red-600 text-red-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Program Loyalty
        </button>
      </div>

      {activeTab === "voucher" ? (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card><CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">Voucher Aktif</p>
              <p className="text-2xl font-bold text-green-600">{vouchers.filter(v => v.isActive).length}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">Total Digunakan</p>
              <p className="text-2xl font-bold text-blue-600">{vouchers.reduce((s, v) => s + v.usedCount, 0)}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">Total Diskon</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDiscount)}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">Revenue Terdampak</p>
              <p className="text-2xl font-bold text-gray-900">{((totalDiscount / totalRevenue) * 100).toFixed(1)}%</p>
            </CardContent></Card>
          </div>

          {/* Add Voucher Form */}
          {showAddForm && (
            <Card className="border-2 border-red-200">
              <CardContent className="p-5">
                <h3 className="font-bold text-gray-900 mb-4">Buat Voucher Baru</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Input label="Kode Voucher" placeholder="Contoh: PROMO50" value={newVoucher.code}
                    onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value.toUpperCase() })} />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tipe</label>
                    <select value={newVoucher.type} onChange={(e) => setNewVoucher({ ...newVoucher, type: e.target.value as "percentage" | "nominal" })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
                      <option value="percentage">Persentase (%)</option>
                      <option value="nominal">Nominal (Rp)</option>
                    </select>
                  </div>
                  <Input label={newVoucher.type === "percentage" ? "Nilai Diskon (%)" : "Nilai Diskon (Rp)"} type="number"
                    value={newVoucher.value} onChange={(e) => setNewVoucher({ ...newVoucher, value: e.target.value })} />
                  <Input label="Min. Belanja (Rp)" type="number" value={newVoucher.minPurchase}
                    onChange={(e) => setNewVoucher({ ...newVoucher, minPurchase: e.target.value })} />
                  <Input label="Maks. Diskon (Rp)" type="number" value={newVoucher.maxDiscount}
                    onChange={(e) => setNewVoucher({ ...newVoucher, maxDiscount: e.target.value })} />
                  <Input label="Batas Pemakaian" type="number" placeholder="0 = unlimited" value={newVoucher.usageLimit}
                    onChange={(e) => setNewVoucher({ ...newVoucher, usageLimit: e.target.value })} />
                  <Input label="Tanggal Mulai" type="date" value={newVoucher.validFrom}
                    onChange={(e) => setNewVoucher({ ...newVoucher, validFrom: e.target.value })} />
                  <Input label="Tanggal Berakhir" type="date" value={newVoucher.validUntil}
                    onChange={(e) => setNewVoucher({ ...newVoucher, validUntil: e.target.value })} />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button onClick={addVoucher} disabled={!newVoucher.code || !newVoucher.value}>
                    <Plus className="h-4 w-4" /> Buat Voucher
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Batal</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voucher List */}
          <div className="grid gap-4 md:grid-cols-2">
            {vouchers.map((voucher) => (
              <Card key={voucher.id} className={`overflow-hidden ${!voucher.isActive ? "opacity-60" : ""}`}>
                <div className={`p-4 text-white ${voucher.type === "percentage" ? "bg-gradient-to-r from-red-600 to-red-700" : "bg-gradient-to-r from-blue-600 to-blue-700"}`}>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="bg-white/20 text-white">
                      {voucher.type === "percentage" ? "Diskon Persen" : "Diskon Nominal"}
                    </Badge>
                    <Tag className="h-5 w-5 opacity-75" />
                  </div>
                  <p className="mt-2 text-3xl font-bold tracking-tight">{voucher.code}</p>
                  <p className="text-sm opacity-90">
                    {voucher.type === "percentage" ? `${voucher.value}% OFF` : formatCurrency(voucher.value)}
                    {voucher.maxDiscount > 0 && ` (maks ${formatCurrency(voucher.maxDiscount)})`}
                  </p>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Min. Belanja</span>
                    <span className="font-medium">{voucher.minPurchase > 0 ? formatCurrency(voucher.minPurchase) : "Tidak ada"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pemakaian</span>
                    <span className="font-medium">{voucher.usedCount}/{voucher.usageLimit > 0 ? voucher.usageLimit : "∞"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Periode</span>
                    <span className="font-medium">{formatDate(voucher.validFrom)} - {formatDate(voucher.validUntil)}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button onClick={() => copyCode(voucher.code)} className="flex items-center gap-1 rounded bg-gray-100 px-3 py-1.5 text-xs font-mono font-bold text-gray-900 hover:bg-gray-200">
                      {copiedCode === voucher.code ? (
                        <><Check className="h-3 w-3 text-green-600" /> Tersalin</>
                      ) : (
                        <><Copy className="h-3 w-3" /> {voucher.code}</>
                      )}
                    </button>
                    <div className="ml-auto flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => toggleVoucherStatus(voucher.id)}>
                        {voucher.isActive ? "Nonaktifkan" : "Aktifkan"}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Loyalty Tab */
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {loyaltyTiers.map((tier) => (
              <Card key={tier.name}>
                <CardContent className="p-5 text-center">
                  <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${tier.color}`}>
                    <Star className="h-7 w-7" />
                  </div>
                  <h3 className={`text-lg font-bold ${tier.name === "Silver" ? "text-gray-600" : tier.name === "Gold" ? "text-yellow-600" : "text-purple-600"}`}>
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-500">Min. {tier.minPoints.toLocaleString()} poin</p>
                  <div className="mt-3 space-y-1.5 text-left">
                    {tier.benefits.map((b, i) => (
                      <p key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                        {b}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loyalty Stats */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">Statistik Program Loyalty</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <Users className="mx-auto h-6 w-6 text-blue-500 mb-1" />
                  <p className="text-2xl font-bold text-gray-900">486</p>
                  <p className="text-sm text-gray-500">Member Aktif</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <TrendingUp className="mx-auto h-6 w-6 text-green-500 mb-1" />
                  <p className="text-2xl font-bold text-gray-900">12,450</p>
                  <p className="text-sm text-gray-500">Poin Dibagikan (Bulan Ini)</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <Gift className="mx-auto h-6 w-6 text-purple-500 mb-1" />
                  <p className="text-2xl font-bold text-gray-900">3,200</p>
                  <p className="text-sm text-gray-500">Poin Ditukarkan</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Distribusi Member per Tier</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Silver (320 member)</span>
                      <span className="font-medium">65.8%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-gray-400" style={{ width: "65.8%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gold (124 member)</span>
                      <span className="font-medium">25.5%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "25.5%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Platinum (42 member)</span>
                      <span className="font-medium">8.7%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "8.7%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
