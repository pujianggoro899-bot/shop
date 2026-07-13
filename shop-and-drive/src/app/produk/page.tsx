"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Star, ShoppingCart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products
    .filter((p) => p.isActive)
    .filter((p) => {
      if (selectedCategory && p.categoryId !== selectedCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
          <p className="mt-1 text-gray-600">
            {filtered.length} produk tersedia untuk kendaraan Anda
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Cari Produk</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nama produk, brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Kategori</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      !selectedCategory ? "bg-red-50 text-red-600 font-medium" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Semua Produk
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedCategory === cat.id ? "bg-red-50 text-red-600 font-medium" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat.name} ({cat.productCount})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & Mobile Filter */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </button>
                {(selectedCategory || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                  >
                    <X className="h-3 w-3" />
                    Reset
                  </Button>
                )}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
              >
                <option value="default">Urutkan: Default</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            {/* Mobile Filter Drawer */}
            {showFilters && (
              <div className="mb-6 rounded-lg border bg-white p-4 lg:hidden">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold">Cari Produk</h3>
                  <Input
                    placeholder="Nama produk, brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        !selectedCategory ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Semua
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          selectedCategory === cat.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900">Produk Tidak Ditemukan</h3>
                <p className="mt-1 text-gray-600">Coba kata kunci atau filter lain</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
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
                        {product.variants.length > 0 && product.variants.every(v => v.stock === 0) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Badge variant="default" className="bg-gray-900 text-white">Stok Habis</Badge>
                          </div>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
