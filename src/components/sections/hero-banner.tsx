"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { banners } from "@/data/banners";
import { cn } from "@/lib/utils";

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const next = () => goTo((current + 1) % banners.length);
  const prev = () => goTo((current - 1 + banners.length) % banners.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative min-h-[400px] md:min-h-[500px]">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                "absolute inset-0 flex items-center transition-all duration-500",
                index === current
                  ? "translate-x-0 opacity-100"
                  : index < current
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              )}
            >
              <div className="max-w-xl py-16">
                <div className="mb-2 inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur-sm">
                  🔥 Promo Terbatas
                </div>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                  {banner.title}
                </h2>
                <p className="mb-8 text-lg text-gray-300">{banner.subtitle}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={banner.link}>
                    <Button size="lg" className="bg-red-600 hover:bg-red-500">
                      Lihat Promo
                    </Button>
                  </Link>
                  <Link href="/produk">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      Belanja Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === current ? "w-8 bg-red-500" : "w-2 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
