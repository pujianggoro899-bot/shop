"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Plus, Search, Edit, Eye, Calendar, Clock, Globe, MoreHorizontal, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles, articleCategories } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export default function CMSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    if (selectedCategory && a.categoryId !== selectedCategory) return false;
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
    }
    return true;
  });

  const publishedCount = articles.filter(a => a.status === "published").length;
  const draftCount = articles.filter(a => a.status === "draft").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CMS - Manajemen Konten</h1>
          <p className="text-gray-600">Kelola artikel, halaman statis, dan konten website</p>
        </div>
        <Button onClick={() => { setShowEditor(true); setEditingArticle(null); }}>
          <Plus className="h-4 w-4" /> + Artikel Baru
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4 text-center">
          <p className="text-lg font-bold text-gray-900">{articles.length}</p>
          <p className="text-sm text-gray-500">Total Artikel</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-lg font-bold text-green-600">{publishedCount}</p>
          <p className="text-sm text-gray-500">Published</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-lg font-bold text-yellow-600">{draftCount}</p>
          <p className="text-sm text-gray-500">Draft</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-lg font-bold text-blue-600">{articleCategories.length}</p>
          <p className="text-sm text-gray-500">Kategori</p>
        </CardContent></Card>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-10">
          <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingArticle ? "Edit Artikel" : "Buat Artikel Baru"}
                </h2>
                <button onClick={() => setShowEditor(false)} className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Judul Artikel" placeholder="Masukkan judul artikel" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Kategori</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
                      {articleCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <Input label="Slug URL" placeholder="judul-artikel" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Konten</label>
                  <div className="rounded-lg border border-gray-300">
                    <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 px-3 py-2">
                      {["Bold", "Italic", "H2", "H3", "List", "Link", "Image"].map((tool) => (
                        <button key={tool} className="rounded px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200">{tool}</button>
                      ))}
                    </div>
                    <textarea rows={12} className="w-full rounded-b-lg px-3 py-3 text-sm focus:outline-none"
                      placeholder="Tulis konten artikel di sini..." />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Meta Title (SEO)" placeholder="Judul untuk SEO" />
                  <Input label="Meta Description" placeholder="Deskripsi untuk SEO" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input label="Tags (pisahkan koma)" placeholder="oli, tips, perawatan" />
                  <Input label="Featured Image URL" placeholder="URL gambar" />
                  <Input label="Penulis" placeholder="Nama penulis" />
                </div>
                <div className="flex items-center gap-4 pt-2 border-t">
                  <Button variant="outline">Simpan sebagai Draft</Button>
                  <Button>Publish Sekarang</Button>
                  <Button variant="ghost" className="ml-auto" onClick={() => setShowEditor(false)}>Batal</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari artikel..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <select value={selectedCategory || ""} onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
          <option value="">Semua Kategori</option>
          {articleCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
          <option value="all">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="review">Review</option>
        </select>
      </div>

      {/* Articles Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Judul</th>
                <th className="px-5 py-3">Kategori</th>
                <th className="px-5 py-3">Penulis</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">SEO</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr key={article.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="max-w-[250px]">
                      <Link href={`/artikel/${article.slug}`} className="font-medium text-gray-900 hover:text-red-600 line-clamp-1">
                        {article.title}
                      </Link>
                      <p className="text-xs text-gray-400">{article.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="info">{article.categoryName}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-700">{article.author}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">
                    {article.publishedAt ? formatDate(article.publishedAt) : "-"}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={
                      article.status === "published" ? "success" :
                      article.status === "review" ? "warning" : "default"
                    }>
                      {article.status === "published" ? "Published" :
                       article.status === "review" ? "Review" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Globe className="h-3 w-3" />
                      <span className={article.metaTitle ? "text-green-600" : "text-red-400"}>
                        {article.metaTitle ? "OK" : "Lengkapkan"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => { setEditingArticle(article.id); setShowEditor(true); }}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Link href={`/artikel/${article.slug}`}>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
