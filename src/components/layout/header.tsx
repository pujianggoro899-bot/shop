"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Phone, Gauge, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";

const navItems = [
  { name: "Beranda", href: "/" },
  {
    name: "Produk",
    href: "/produk",
    children: [
      { name: "🏎️ Sparepart Mesin", href: "/produk?kategori=sparepart-mesin" },
      { name: "🛢️ Oli & Cairan", href: "/produk?kategori=oli-cairan" },
      { name: "✨ Aksesoris", href: "/produk?kategori=aksesoris" },
      { name: "🔄 Ban", href: "/produk?kategori=ban" },
      { name: "🔋 Aki", href: "/produk?kategori=aki" },
      { name: "— Semua Produk", href: "/produk" },
    ],
  },
  {
    name: "Layanan",
    href: "/layanan",
    children: [
      { name: "🔧 Servis Berkala", href: "/layanan#servis-berkala" },
      { name: "🛢️ Ganti Oli", href: "/layanan#ganti-oli" },
      { name: "⚙️ Spooring & Balancing", href: "/layanan#spooring" },
      { name: "❄️ Servis AC", href: "/layanan#ac" },
      { name: "📅 Booking Servis", href: "/booking-servis" },
    ],
  },
  { name: "Artikel", href: "/artikel" },
  { name: "🔥 Promo", href: "/promo" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "bg-carbon-900/98 backdrop-blur-xl border-b border-red-900/30 shadow-lg shadow-red-900/10"
        : "bg-carbon-900 border-b border-red-900/20"
    )}>
      {/* TOP BAR */}
      <div className="hidden lg:block border-b border-white/5 bg-carbon-800/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <div className="flex items-center gap-6 text-gray-400">
            <a href="tel:02112345678" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <Phone className="h-3 w-3" />
              <span className="tracking-wide">(021) 1234 5678</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Taman Tekno, BSD City
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse-glow" />
              Buka • 08:00 - 20:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tentang-kami" className="text-gray-400 hover:text-red-400 transition-colors">Tentang</Link>
            <Link href="/karir" className="text-gray-400 hover:text-red-400 transition-colors">Karir</Link>
            <span className="text-gray-700">|</span>
            <Link href="/admin/dashboard" className="text-red-400 hover:text-red-300 transition-colors font-medium tracking-wider text-[11px] uppercase">
              ⚡ Admin
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6 py-3">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-base font-black text-white hex-badge shadow-lg group-hover:shadow-red-600/30 transition-shadow">
              S&D
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-carbon-900 animate-pulse-glow" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">SHOP & DRIVE</h1>
              <span className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase bg-red-900/30 px-2 py-0.5 rounded">BSD</span>
            </div>
            <p className="text-[10px] text-gray-500 tracking-wider uppercase font-medium">Taman Tekno • Automotive Center</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  activeDropdown === item.name
                    ? "bg-red-600/20 text-red-400"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {item.name}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
              {item.children && activeDropdown === item.name && (
                <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-red-900/30 bg-carbon-800/98 backdrop-blur-xl p-2 shadow-2xl shadow-red-900/20">
                  <div className="absolute -top-1 left-6 h-3 w-3 rotate-45 bg-carbon-800 border-l border-t border-red-900/30" />
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-red-600/20 transition-all"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <Link href="/akun" className="rounded-lg p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <User className="h-4.5 w-4.5" />
          </Link>
          <Link href="/keranjang" className="relative rounded-lg p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <ShoppingCart className="h-4.5 w-4.5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-lg shadow-red-600/30">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <div className="hidden sm:block ml-2 border-l border-white/10 pl-3">
            <Link href="/booking-servis">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/20 text-xs font-semibold tracking-wider px-5 py-2.5 rounded-lg transition-all hover:shadow-red-600/40 uppercase">
                <Gauge className="h-3.5 w-3.5 mr-1.5" />
                Booking Servis
              </Button>
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all xl:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {searchOpen && (
        <div className="border-t border-white/5 px-4 py-3 bg-carbon-800/50">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Cari produk, artikel, layanan..."
              className="w-full rounded-xl bg-carbon-700 border border-carbon-500 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50 transition-all"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-white/5 bg-carbon-800/98 backdrop-blur-xl xl:hidden">
          <div className="space-y-0.5 px-4 py-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-600/10 transition-all"
                  onClick={() => { if (!item.children) setIsOpen(false); }}
                >
                  {item.name}
                  {item.children && <ChevronDown className="h-4 w-4 opacity-50" />}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-0.5 border-l-2 border-red-900/30 pl-3 mb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:text-red-400 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-white/5 pt-3 mt-3 space-y-1">
              <Link href="/tentang-kami" className="block rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:text-white transition-all">Tentang Kami</Link>
              <Link href="/karir" className="block rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:text-white transition-all">Karir</Link>
              <Link href="/kontak" className="block rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:text-white transition-all">Kontak</Link>
              <Link href="/booking-servis" className="mt-2 block w-full text-center rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg">
                📅 Booking Servis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
