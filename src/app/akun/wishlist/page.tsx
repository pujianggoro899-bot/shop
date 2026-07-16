"use client";

import Link from "next/link";
import { ChevronRight, Heart, Trash2, ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (item: typeof items[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      variant: "",
      price: item.price,
      quantity: 1,
      image: "",
      slug: item.slug,
      maxStock: 99,
    });
    removeItem(item.productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/akun" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" /> Kembali ke Akun
        </Link>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
          {items.length > 0 && (
            <Button variant="ghost" size="sm" className="text-red-600" onClick={clearWishlist}>
              <Trash2 className="h-4 w-4" /> Hapus Semua
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Wishlist Kosong</h2>
            <p className="mt-2 text-gray-600">Simpan produk favorit Anda di sini</p>
            <Link href="/produk">
              <Button className="mt-4">Jelajahi Produk</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.productId}>
                <CardContent className="p-4">
                  <Link href={`/produk/${item.slug}`}>
                    <div className="aspect-square rounded-lg bg-red-50 flex items-center justify-center text-3xl font-bold text-red-300 mb-3">
                      {item.name.charAt(0)}
                    </div>
                  </Link>
                  <Link href={`/produk/${item.slug}`} className="text-sm font-semibold text-gray-900 hover:text-red-600 line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-lg font-bold text-red-600">{formatCurrency(item.price)}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => moveToCart(item)}>
                      <ShoppingCart className="h-3.5 w-3.5" /> Keranjang
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600" onClick={() => removeItem(item.productId)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
