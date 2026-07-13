"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { articles, articleCategories } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const published = articles.filter((a) => a.status === "published");
  const filtered = published.filter((a) => {
    if (selectedCategory && a.categoryId !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Artikel & Tips Otomotif</h1>
          <p className="mt-2 text-gray-600">Dapatkan informasi dan tips bermanfaat seputar perawatan kendaraan</p>
          <div className="mx-auto mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !selectedCategory ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border"
            }`}
          >
            Semua
          </button>
          {articleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat.id ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <Link key={article.id} href={`/artikel/${article.slug}`}>
                <Card hover className="flex h-full flex-col overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200">
                    <div className="flex h-full items-center justify-center text-6xl text-red-300">
                      📄
                    </div>
                  </div>
                  <CardContent className="flex flex-1 flex-col">
                    <Badge variant="info" className="mb-2 w-fit">{article.categoryName}</Badge>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{article.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.publishedAt ? formatDate(article.publishedAt) : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        3 menit baca
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
