"use client";

import Link from "next/link";
import { Gift, Clock, Tag, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { vouchers } from "@/data/banners";
import { formatCurrency, formatDate } from "@/lib/utils";
import { articles } from "@/data/articles";
import { useState } from "react";

export default function PromoPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const promoArticles = articles.filter((a) => a.categoryId === "cat-promo");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Gift className="mx-auto h-12 w-12 mb-4" />
          <h1 className="text-3xl font-bold md:text-4xl">Promo & Voucher</h1>
          <p className="mx-auto mt-3 max-w-xl text-red-100">
            Dapatkan penawaran spesial dan hemat lebih banyak untuk setiap pembelian dan servis di Shop & Drive.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Active Vouchers */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Voucher Aktif</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vouchers.filter(v => v.isActive).map((voucher) => (
              <Card key={voucher.id} className="overflow-hidden border-2 border-dashed border-red-200">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="bg-white/20 text-white">
                        {voucher.type === "percentage" ? "Diskon Persen" : "Diskon Nominal"}
                      </Badge>
                      <Tag className="h-5 w-5 opacity-75" />
                    </div>
                    <p className="mt-2 text-2xl font-bold">
                      {voucher.type === "percentage" ? `${voucher.value}%` : formatCurrency(voucher.value)}
                    </p>
                    <p className="text-sm text-red-200">Maks. potongan {formatCurrency(voucher.maxDiscount)}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">
                      Min. belanja {formatCurrency(voucher.minPurchase)}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      Berlaku hingga {formatDate(voucher.validUntil)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-100 px-3 py-1 font-mono text-sm font-bold text-gray-900">
                          {voucher.code}
                        </code>
                        <button
                          onClick={() => copyCode(voucher.code)}
                          className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
                        >
                          {copiedCode === voucher.code ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Link href="/produk">
                        <Button size="sm">Gunakan</Button>
                      </Link>
                    </div>
                    {copiedCode === voucher.code && (
                      <p className="mt-1 text-xs text-green-600">Kode voucher disalin!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Promo Articles */}
        {promoArticles.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Info Promo Terbaru</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {promoArticles.map((article) => (
                <Link key={article.id} href={`/artikel/${article.slug}`}>
                  <Card hover className="flex overflow-hidden">
                    <div className="flex w-32 items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 text-4xl text-red-300 flex-shrink-0">
                      🏷️
                    </div>
                    <div className="flex-1 p-4">
                      <Badge variant="danger" className="mb-2">Promo</Badge>
                      <h3 className="font-semibold text-gray-900">{article.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
