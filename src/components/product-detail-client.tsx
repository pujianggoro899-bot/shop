"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Share2, Check, Minus, Plus, ChevronRight, HeartOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, reviews as allReviews } from "@/data/products";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

export function ProductDetailClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]?.id || null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Produk Tidak Ditemukan</h2>
          <p className="mt-2 text-gray-600">Halaman yang Anda cari tidak tersedia.</p>
          <Link href="/produk">
            <Button className="mt-4">Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariantData = product.variants.find((v) => v.id === selectedVariant);
  const currentPrice = product.price + (selectedVariantData?.additionalPrice || 0);
  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      variant: selectedVariantData?.name || "",
      price: currentPrice,
      quantity,
      image: "",
      slug: product.slug,
      maxStock: selectedVariantData?.stock || 99,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: "",
      slug: product.slug,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link produk disalin!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/produk" className="hover:text-red-600">Produk</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="sticky top-28">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex h-full items-center justify-center text-8xl text-gray-200">
                {product.name.charAt(0)}
              </div>
              {product.originalPrice && (
                <Badge variant="danger" className="absolute left-4 top-4 text-sm">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>
          </div>

          <div>
            <Badge variant="info" className="mb-2">{product.brand}</Badge>
            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} ulasan)</span>
            </div>

            <div className="mt-6">
              <span className="text-3xl font-bold text-red-600">{formatCurrency(currentPrice)}</span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-gray-700">{product.description}</p>

            {product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">Pilih Varian</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button key={variant.id} onClick={() => { setSelectedVariant(variant.id); setAddedToCart(false); }}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${selectedVariant === variant.id ? "border-red-600 bg-red-50 text-red-600" : "border-gray-300 text-gray-700 hover:border-gray-400"} ${variant.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={variant.stock === 0}>
                      {variant.name}
                      {variant.additionalPrice > 0 && ` (+${formatCurrency(variant.additionalPrice)})`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Kompatibilitas Kendaraan</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatibilities.map((comp, i) => (
                  <Badge key={i} variant="default" className="bg-gray-100 text-gray-700">{comp}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-gray-600 hover:bg-gray-50"><Minus className="h-4 w-4" /></button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-14 border-x border-gray-300 px-2 py-2.5 text-center text-sm focus:outline-none" min={1} />
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-gray-600 hover:bg-gray-50"><Plus className="h-4 w-4" /></button>
              </div>
              <Button size="lg" className="flex-1 sm:flex-initial" onClick={handleAddToCart}
                disabled={addedToCart}>
                {addedToCart ? (
                  <><Check className="h-5 w-5" /> Ditambahkan ✓</>
                ) : (
                  <><ShoppingCart className="h-5 w-5" /> Tambah ke Keranjang</>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                {inWishlist ? <HeartOff className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="lg" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {addedToCart && (
              <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                ✅ Produk ditambahkan ke keranjang! <Link href="/keranjang" className="font-medium underline">Lihat Keranjang</Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Ulasan Pembeli ({productReviews.length})</h2>
          {productReviews.length === 0 ? (
            <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
          ) : (
            <div className="space-y-4">
              {productReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">{review.userName.charAt(0)}</div>
                          <div>
                            <p className="font-medium text-gray-900">{review.userName}</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.verified && <Badge variant="success" className="text-[10px]"><Check className="mr-0.5 h-2.5 w-2.5" /> Terverifikasi</Badge>}
                        <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
