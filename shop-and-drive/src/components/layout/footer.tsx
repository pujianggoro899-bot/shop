import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe, Camera, Video } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-lg font-bold text-white">
                S&D
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Shop & Drive</h3>
                <p className="text-xs text-gray-400">Taman Tekno • BSD City</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed">
              Toko sparepart, aksesoris, dan jasa servis mobil & motor terpercaya di kawasan Taman Tekno, BSD City.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-red-600 hover:text-white">
                <Camera className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-red-600 hover:text-white">
                <Video className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-red-600 hover:text-white">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Menu Cepat</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/produk" className="transition-colors hover:text-red-400">Katalog Produk</Link></li>
              <li><Link href="/layanan" className="transition-colors hover:text-red-400">Layanan Servis</Link></li>
              <li><Link href="/booking-servis" className="transition-colors hover:text-red-400">Booking Servis</Link></li>
              <li><Link href="/artikel" className="transition-colors hover:text-red-400">Artikel & Tips</Link></li>
              <li><Link href="/promo" className="transition-colors hover:text-red-400">Promo Terkini</Link></li>
              <li><Link href="/karir" className="transition-colors hover:text-red-400">Karir</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Layanan</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/layanan#servis-berkala" className="transition-colors hover:text-red-400">Servis Berkala</Link></li>
              <li><Link href="/layanan#ganti-oli" className="transition-colors hover:text-red-400">Ganti Oli & Filter</Link></li>
              <li><Link href="/layanan#spooring" className="transition-colors hover:text-red-400">Spooring & Balancing</Link></li>
              <li><Link href="/layanan#ac" className="transition-colors hover:text-red-400">Servis AC Mobil</Link></li>
              <li><Link href="/layanan#ganti-ban" className="transition-colors hover:text-red-400">Ganti Ban</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                <span>Jl. Taman Tekno No. 88, BSD City, Tangerang Selatan 15314</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-red-400" />
                <a href="tel:02112345678" className="transition-colors hover:text-red-400">(021) 1234 5678</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-red-400" />
                <a href="mailto:info@shopandrive-tamantekno.com" className="transition-colors hover:text-red-400">info@shopandrive-tamantekno.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-red-400" />
                <span>Sen-Sab: 08:00 - 20:00 | Min: 09:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shop & Drive Taman Tekno. All rights reserved.</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-red-400">Kebijakan Privasi</Link>
            <span>•</span>
            <Link href="#" className="hover:text-red-400">Syarat & Ketentuan</Link>
            <span>•</span>
            <Link href="#" className="hover:text-red-400">FAQ</Link>
          </div>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">Pembayaran: Midtrans Secure</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">Pengiriman: JNE, J&T, SiCepat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
