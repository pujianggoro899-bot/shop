"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Produk Unggulan</h2>
            <p className="mt-2 text-gray-600">Sedang tren dan banyak dicari</p>
          </div>
          <Link href="/produk" className="hidden text-sm font-medium text-red-600 hover:text-red-700 sm:block">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <Link key={product.id} href={`/produk/${product.slug}`}>
              <Card hover className="flex h-full flex-col">
                <div className="relative aspect-square bg-gray-100">
                  <div className="flex h-full items-center justify-center text-4xl text-gray-400">
                    {product.name.charAt(0)}
                  </div>
                  {product.originalPrice && (
                    <Badge variant="danger" className="absolute left-3 top-3">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-xs text-gray-500">{product.brand}</p>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div>
                      <span className="text-lg font-bold text-red-600">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <Button size="sm" className="flex-shrink-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/produk">
            <Button variant="outline">Lihat Semua Produk</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
