"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Gauge, ArrowRight, Wrench, Shield } from "lucide-react";
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
    <section className="relative overflow-hidden bg-carbon-900">
      {/* SPEED LINES BACKGROUND */}
      <div className="speed-lines absolute inset-0 opacity-30" />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-900 via-carbon-900/95 to-carbon-900/80 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon-900 to-transparent z-10" />

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-red-600/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="relative min-h-[520px] md:min-h-[580px] flex items-center">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                "absolute inset-0 flex items-center transition-all duration-700 ease-out",
                index === current
                  ? "translate-x-0 opacity-100"
                  : index < current
                  ? "-translate-x-16 opacity-0"
                  : "translate-x-16 opacity-0"
              )}
            >
              <div className="max-w-2xl py-16 animate-slide-up">
                {/* BADGE */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-600/15 border border-red-600/30 px-4 py-1.5 text-xs font-semibold text-red-400 tracking-wider uppercase backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse-glow" />
                  Promo Terbatas — Periode Juli 2026
                </div>

                {/* TITLE */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
                  {banner.title.split(" ").map((word, i) =>
                    word === "Gratis" || word === "Diskon" || word === "Ongkir" ? (
                      <span key={i} className="text-red-500 text-glow">{word} </span>
                    ) : (
                      <span key={i}>{word} </span>
                    )
                  )}
                </h2>

                <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                  {banner.subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href={banner.link}>
                    <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-600/30 px-7 py-3.5 text-sm font-bold rounded-xl transition-all hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98]">
                      Lihat Promo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/produk">
                    <Button className="bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 px-7 py-3.5 text-sm font-semibold rounded-xl backdrop-blur-sm transition-all hover:border-red-600/50">
                      <Gauge className="h-4 w-4 mr-2" />
                      Katalog Produk
                    </Button>
                  </Link>
                </div>

                {/* TRUST INDICATORS */}
                <div className="mt-10 flex items-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Produk Original 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-blue-500" />
                    <span>Garansi Servis</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-3 text-white/60 hover:text-white hover:bg-red-600/30 hover:border-red-600/50 transition-all hidden md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-3 text-white/60 hover:text-white hover:bg-red-600/30 hover:border-red-600/50 transition-all hidden md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "rounded-full transition-all duration-300",
              index === current
                ? "h-2.5 w-10 bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-600/30"
                : "h-2.5 w-2.5 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}
