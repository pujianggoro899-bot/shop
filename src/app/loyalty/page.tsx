"use client";

import { Star, Gift, ChevronRight, Award, TrendingUp, History, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLoyalty } from "@/store/loyalty";

const tierColors = {
  Silver: { bg: "bg-gray-100", text: "text-gray-700", icon: "🥈" },
  Gold: { bg: "bg-yellow-100", text: "text-yellow-700", icon: "🥇" },
  Platinum: { bg: "bg-purple-100", text: "text-purple-700", icon: "💎" },
};

const tierBenefits = {
  Silver: ["1 poin per Rp 10,000 belanja", "Voucher spesial ulang tahun", "Gratis ongkir min. Rp 300,000"],
  Gold: ["1.5 poin per Rp 10,000 belanja", "Voucher ulang tahun Rp 50,000", "Gratis ongkir min. Rp 200,000", "Diskon 5% jasa servis"],
  Platinum: ["2 poin per Rp 10,000 belanja", "Voucher ulang tahun Rp 100,000", "Gratis ongkir tanpa minimum", "Diskon 10% jasa servis", "Prioritas booking servis"],
};

export default function LoyaltyPage() {
  const { points, tier, tierProgress, nextTier, transactions, getPointsEquivalent } = useLoyalty();
  const tierColor = tierColors[tier];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 pb-24 pt-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Award className="mx-auto h-12 w-12 mb-4" />
          <h1 className="text-3xl font-bold">Program Loyalty</h1>
          <p className="mt-2 text-red-100">Dapatkan poin dari setiap transaksi dan nikmati berbagai keuntungan eksklusif</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 -mt-16">
        {/* Current Points & Tier */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{tierColor.icon}</span>
                <div>
                  <p className="text-sm text-gray-500">Tier Anda</p>
                  <p className={`text-2xl font-bold ${tierColor.text}`}>{tier}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Poin Anda</p>
                <p className="text-3xl font-bold text-red-600">{points.toLocaleString()}</p>
                <p className="text-xs text-gray-400">
                  ≈ {getPointsEquivalent(points) > 0 ? `Rp ${getPointsEquivalent(points).toLocaleString()}` : "Belum bisa ditukar"}
                </p>
              </div>
            </div>

            {/* Progress to next tier */}
            {nextTier && (
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress ke {nextTier}</span>
                  <span className="font-medium">{Math.min(100, Math.round(tierProgress))}%</span>
                </div>
                <div className="mt-1 h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500 transition-all"
                    style={{ width: `${Math.min(100, tierProgress)}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How to earn */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="font-bold text-gray-900">Cara Mendapatkan Poin</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">• Belanja produk: 1 poin per Rp 10,000</li>
                <li className="flex items-start gap-2">• Booking servis: 2 poin per Rp 10,000</li>
                <li className="flex items-start gap-2">• Ulasan produk: 50 poin per ulasan</li>
                <li className="flex items-start gap-2">• Registrasi akun: 200 poin bonus</li>
                <li className="flex items-start gap-2">• Poin berlipat di hari ulang tahun</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="h-6 w-6 text-purple-600" />
                <h3 className="font-bold text-gray-900">Cara Menukarkan Poin</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">• 100 poin = Rp 1,000 voucher</li>
                <li className="flex items-start gap-2">• 500 poin = Rp 5,000 voucher</li>
                <li className="flex items-start gap-2">• 1,000 poin = Rp 10,000 voucher</li>
                <li className="flex items-start gap-2">• 2,500 poin = Gratis servis ringan</li>
                <li className="flex items-start gap-2">• Poin tidak bisa ditukar dengan uang tunai</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tier Benefits Comparison */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Perbandingan Benefit Tier</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 pr-4 font-medium text-gray-600">Benefit</th>
                    {Object.entries(tierColors).map(([name, color]) => (
                      <th key={name} className={`pb-3 pr-4 font-medium ${color.text}`}>
                        {color.icon} {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { benefit: "Poin per Rp 10,000", values: ["1 poin", "1.5 poin", "2 poin"] },
                    { benefit: "Gratis Ongkir", values: ["Min. Rp 300rb", "Min. Rp 200rb", "Tanpa minimum"] },
                    { benefit: "Voucher Ulang Tahun", values: ["Rp 25,000", "Rp 50,000", "Rp 100,000"] },
                    { benefit: "Diskon Jasa Servis", values: ["-", "5%", "10%"] },
                    { benefit: "Prioritas Booking", values: ["-", "-", "✅"] },
                  ].map((row) => (
                    <tr key={row.benefit} className="border-b last:border-0">
                      <td className="py-3 pr-4 text-gray-700">{row.benefit}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className="py-3 pr-4 text-gray-600">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-gray-500" />
                <h3 className="font-bold text-gray-900">Riwayat Poin</h3>
              </div>
              <Badge variant="info">{transactions.length} transaksi</Badge>
            </div>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <span className={tx.type === "earn" ? "text-green-500 text-xl" : "text-red-500 text-xl"}>
                      {tx.type === "earn" ? "⬆" : "⬇"}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${tx.type === "earn" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "earn" ? "+" : "-"}{tx.points.toLocaleString()} poin
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mt-6 mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-gray-500" />
              <h3 className="font-bold text-gray-900">FAQ Program Loyalty</h3>
            </div>
            <div className="space-y-3">
              {[
                { q: "Apakah poin punya masa berlaku?", a: "Ya, poin berlaku selama 12 bulan sejak tanggal diperoleh." },
                { q: "Bisakah poin digabung dengan anggota keluarga?", a: "Tidak, poin bersifat individual dan tidak bisa digabungkan." },
                { q: "Bagaimana cara cek poin?", a: "Poin dapat dicek di halaman Akun Saya -> Loyalty atau melalui struk belanja." },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-900">{faq.q}</p>
                  <p className="mt-1 text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
