"use client";

import { Package, Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600">Total {products.length} produk</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Tambah Produk</Button>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari produk..." className="pl-10" />
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Produk</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3">Kategori</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 font-bold">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 max-w-[200px] truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{p.sku}</td>
                  <td className="px-5 py-3 text-gray-700">{p.brand}</td>
                  <td className="px-5 py-3 font-medium">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3">{p.rating} ⭐</td>
                  <td className="px-5 py-3">
                    <Badge variant={p.isActive ? "success" : "danger"}>{p.isActive ? "Aktif" : "Nonaktif"}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Button size="sm" variant="ghost">Edit</Button>
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
