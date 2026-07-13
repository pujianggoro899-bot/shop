"use client";

import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/akun" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" /> Kembali ke Akun
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Wishlist Kosong</h2>
          <p className="mt-2 text-gray-600">Simpan produk favorit Anda di sini</p>
          <Link href="/produk">
            <Button className="mt-4">Jelajahi Produk</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
