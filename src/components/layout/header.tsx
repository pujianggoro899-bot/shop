"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Beranda", href: "/" },
  {
    name: "Produk",
    href: "/produk",
    children: [
      { name: "Sparepart Mesin", href: "/produk?kategori=sparepart-mesin" },
      { name: "Oli & Cairan", href: "/produk?kategori=oli-cairan" },
      { name: "Aksesoris", href: "/produk?kategori=aksesoris" },
      { name: "Ban", href: "/produk?kategori=ban" },
      { name: "Aki", href: "/produk?kategori=aki" },
      { name: "Semua Produk", href: "/produk" },
    ],
  },
  {
    name: "Layanan",
    href: "/layanan",
    children: [
      { name: "Servis Berkala", href: "/layanan#servis-berkala" },
      { name: "Ganti Oli", href: "/layanan#ganti-oli" },
      { name: "Spooring & Balancing", href: "/layanan#spooring" },
      { name: "Servis AC", href: "/layanan#ac" },
      { name: "Booking Servis", href: "/booking-servis" },
    ],
  },
  { name: "Artikel", href: "/artikel" },
  { name: "Promo", href: "/promo" },
  { name: "Kontak", href: "/kontak" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      {/* Top Bar */}
      <div className="hidden bg-gray-900 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:02112345678" className="flex items-center gap-1 hover:text-red-300">
              <Phone className="h-3 w-3" /> (021) 1234 5678
            </a>
            <span>Shop & Drive Taman Tekno — BSD City</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/tentang-kami" className="hover:text-red-300">Tentang Kami</Link>
            <Link href="/karir" className="hover:text-red-300">Karir</Link>
            <Link href="/admin/dashboard" className="hover:text-red-300">Admin Panel</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-lg font-bold text-white">
            S&D
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight text-gray-900">Shop & Drive</h1>
            <p className="text-[10px] leading-tight text-gray-500">Taman Tekno • BSD City</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 xl:flex">
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
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600",
                  activeDropdown === item.name && "text-red-600"
                )}
              >
                {item.name}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {item.children && activeDropdown === item.name && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/akun"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/keranjang"
            className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              3
            </span>
          </Link>
          <Link href="/booking-servis">
            <Button size="sm" className="hidden sm:flex">
              Booking Servis
            </Button>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 xl:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk, artikel, atau layanan..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white xl:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    if (!item.children) setIsOpen(false);
                  }}
                >
                  {item.name}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 border-l-2 border-red-100 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:text-red-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3">
              <Link href="/tentang-kami" className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:text-red-600">Tentang Kami</Link>
              <Link href="/karir" className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:text-red-600">Karir</Link>
              <Link href="/kontak" className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:text-red-600">Kontak</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
