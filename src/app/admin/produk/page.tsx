"use client";

import { useState } from "react";
import { Package, Plus, Search, Edit, Trash2, Star, X, Check, Eye, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/store/datamanager";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", sku: "", brand: "", categoryId: "", price: "", originalPrice: "", description: "", shortDescription: "", stock: "10", isActive: true,
  });

  const filtered = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q);
  });

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", sku: "", brand: "", categoryId: categories[0]?.id || "", price: "", originalPrice: "", description: "", shortDescription: "", stock: "10", isActive: true });
    setShowModal(true);
  };

  const openEdit = (id: string) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    setEditId(id);
    setForm({
      name: p.name, sku: p.sku || "", brand: p.brand || "", categoryId: p.categoryId,
      price: p.price.toString(), originalPrice: p.originalPrice?.toString() || "",
      description: p.description || "", shortDescription: p.shortDescription || "",
      stock: p.variants[0]?.stock?.toString() || "10", isActive: p.isActive,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const data = {
      name: form.name, sku: form.sku, brand: form.brand, categoryId: form.categoryId,
      price: parseInt(form.price) || 0, originalPrice: form.originalPrice ? parseInt(form.originalPrice) : undefined,
      description: form.description, shortDescription: form.shortDescription,
      isActive: form.isActive,
      variants: [{ id: `v-${Date.now()}`, name: "Standar", additionalPrice: 0, stock: parseInt(form.stock) || 0, sku: form.sku }],
      compatibilities: [], images: [], rating: 0, reviewCount: 0,
    };
    if (editId) {
      updateProduct(editId, data);
    } else {
      addProduct(data as any);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600">Total {products.length} produk di {categories.length} kategori</p>
        </div>
        <Button onClick={openAdd}><Plus className="h-4 w-4" /> Tambah Produk</Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Cari produk, SKU, brand..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-10">
          <Card className="w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{editId ? "Edit Produk" : "Tambah Produk Baru"}</h2>
                <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Nama Produk *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama produk" />
                <Input label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="OLI-SH-HX7" />
                <Input label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Shell, Toyota, dll" />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Kategori</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <Input label="Harga *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="395000" />
                <Input label="Harga Asli (sebelum diskon)" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="450000" />
                <Input label="Stok" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                <textarea rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none" placeholder="Deskripsi singkat produk" />
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi Lengkap</label>
                <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none" placeholder="Deskripsi lengkap produk" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-red-600" />
                  Produk Aktif
                </label>
              </div>
              <div className="mt-6 flex gap-2">
                <Button onClick={handleSave} disabled={!form.name || !form.price}>
                  {editId ? <><Edit className="h-4 w-4" /> Update Produk</> : <><Plus className="h-4 w-4" /> Simpan Produk</>}
                </Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-sm mx-4">
            <CardContent className="p-6 text-center">
              <Trash2 className="mx-auto h-10 w-10 text-red-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-900">Hapus Produk?</h3>
              <p className="text-sm text-gray-600 mt-1">Tindakan ini tidak bisa dibatalkan.</p>
              <div className="mt-4 flex gap-2 justify-center">
                <Button variant="danger" onClick={() => handleDelete(confirmDelete)}><Trash2 className="h-4 w-4" /> Hapus</Button>
                <Button variant="outline" onClick={() => setConfirmDelete(null)}>Batal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Produk</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Stok</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-500">Belum ada produk. Klik "Tambah Produk" untuk memulai.</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-600">{p.name.charAt(0)}</div>
                        <div className="max-w-[200px]">
                          <p className="font-medium text-gray-900 truncate">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600 font-mono">{p.sku || "-"}</td>
                    <td className="px-5 py-3 font-medium">{formatCurrency(p.price)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{p.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={p.variants.reduce((s, v) => s + v.stock, 0) <= 5 ? "text-red-600 font-medium" : "text-gray-700"}>
                        {p.variants.reduce((s, v) => s + v.stock, 0)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={p.isActive ? "success" : "danger"}>{p.isActive ? "Aktif" : "Nonaktif"}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(p.id)}><Edit className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => setConfirmDelete(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
