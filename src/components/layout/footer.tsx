import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Camera, Video, Globe, Gauge, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-carbon-900 border-t border-red-900/20">
      {/* CHECKERED DIVIDER */}
      <div className="checkered-divider" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="hex-badge flex h-12 w-12 items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-base font-black text-white shadow-lg">
                S&D
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">SHOP & DRIVE</h3>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">Taman Tekno</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              Automotive center &amp; sparepart specialist sejak 2019. Produk original, servis profesional, harga kompetitif.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Camera className="h-4 w-4" />, href: "#" },
                { icon: <Video className="h-4 w-4" />, href: "#" },
                { icon: <Globe className="h-4 w-4" />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-500 hover:border-red-600 hover:text-red-400 hover:bg-red-600/10 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* MENU */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 mb-5">Katalog</h4>
            <ul className="space-y-3 text-sm">
              {["Sparepart Mesin", "Oli & Cairan", "Aksesoris", "Ban", "Aki", "Semua Produk"].map((item) => (
                <li key={item}>
                  <Link href="/produk" className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <span className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-red-600 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LAYANAN */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 mb-5">Layanan</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Servis Berkala", href: "/layanan#servis-berkala" },
                { name: "Ganti Oli & Filter", href: "/layanan#ganti-oli" },
                { name: "Spooring & Balancing", href: "/layanan#spooring" },
                { name: "Servis AC Mobil", href: "/layanan#ac" },
                { name: "Booking Servis", href: "/booking-servis" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <span className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-red-600 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAK */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-300 mb-5">Kontak</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <span className="text-gray-400">Jl. Taman Tekno No. 88, BSD City, Tangerang Selatan 15314</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-red-500" />
                <a href="tel:02112345678" className="text-gray-400 hover:text-red-400 transition-colors">(021) 1234 5678</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-red-500" />
                <a href="mailto:info@shopandrive.com" className="text-gray-400 hover:text-red-400 transition-colors break-all">info@shopandrive.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <div className="text-gray-400">
                  <p>Sen—Sab: 08:00 - 20:00</p>
                  <p>Min: 09:00 - 17:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Shop &amp; Drive Taman Tekno. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-red-400 transition-colors">Kebijakan Privasi</Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="hover:text-red-400 transition-colors">Syarat &amp; Ketentuan</Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="hover:text-red-400 transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <span>💳 Midtrans</span>
            <span>🚚 JNE / J&T / SiCepat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
