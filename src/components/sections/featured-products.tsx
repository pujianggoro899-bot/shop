"use client";

import Link from "next/link";
import { Star, ShoppingCart, Gauge, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <section className="py-20 bg-carbon-800/50">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-6 w-1 bg-red-600 rounded-full" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-red-500">Best Seller</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Produk <span className="text-red-500">Unggulan</span>
            </h2>
            <p className="mt-2 text-gray-400">Produk paling laris dan sedang tren bulan ini</p>
          </div>
          <Link href="/produk" className="hidden text-sm font-medium text-red-400 hover:text-red-300 transition-colors sm:flex items-center gap-1 group">
            Lihat Semua
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, idx) => (
            <Link key={product.id} href={`/produk/${product.slug}`}>
              <Card dark hover className="group h-full flex flex-col overflow-hidden">
                {/* IMAGE */}
                <div className="relative aspect-square bg-gradient-to-br from-carbon-700 to-carbon-800 overflow-hidden">
                  <div className="flex h-full items-center justify-center text-6xl font-black text-carbon-500 group-hover:scale-110 transition-transform duration-500">
                    {product.name.charAt(0)}
                  </div>
                  {product.originalPrice && (
                    <Badge variant="danger" className="absolute left-3 top-3 text-xs font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                  {/* OVERLAY ON HOVER */}
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <CardContent className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-gray-500 tracking-wide uppercase">{product.brand}</p>
                  <h3 className="mt-1 text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">{product.name}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs text-gray-400">{product.rating}</span>
                    <span className="text-xs text-gray-600">({product.reviewCount})</span>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div>
                      <span className="text-xl font-bold text-red-500">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-gray-600 line-through">{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <ShoppingCart className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* MOBILE MORE */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/produk">
            <Button variant="outline" className="w-full max-w-xs">
              Lihat Semua Produk <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
