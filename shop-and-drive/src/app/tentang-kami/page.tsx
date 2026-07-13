import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Tentang Shop & Drive</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Mitra terpercaya untuk kebutuhan sparepart, aksesoris, dan servis kendaraan Anda di kawasan Taman Tekno, BSD City.
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Siapa Kami?</h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                Shop and Drive Taman Tekno berdiri sejak 2019 sebagai solusi lengkap perawatan kendaraan di kawasan 
                BSD City dan sekitarnya. Kami menyediakan sparepart original, aksesoris berkualitas, oli premium, 
                serta layanan servis bengkel yang ditangani oleh mekanik profesional dan berpengalaman.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Dengan motto <strong>"Trusted Partner for Your Vehicle"</strong>, kami berkomitmen memberikan 
                produk original dengan harga bersaing dan pelayanan terbaik untuk setiap pelanggan.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-3xl font-bold text-red-600">5+</p>
                  <p className="text-sm text-gray-600">Tahun Berdiri</p>
                </div>
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-3xl font-bold text-red-600">500+</p>
                  <p className="text-sm text-gray-600">Produk Tersedia</p>
                </div>
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-3xl font-bold text-red-600">3000+</p>
                  <p className="text-sm text-gray-600">Pelanggan Puas</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-100 p-8">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🔧</div>
                  <p className="text-xl font-bold text-red-600">Shop & Drive</p>
                  <p className="text-red-500">Taman Tekno • BSD City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Target className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Visi</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Menjadi platform digital otomotif terpercaya yang menghubungkan pelanggan dengan produk dan jasa 
                secara mudah dan cepat.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Eye className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Misi</h3>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">• Menyediakan produk original berkualitas</li>
                <li className="flex items-start gap-2">• Memberikan layanan servis profesional</li>
                <li className="flex items-start gap-2">• Mengembangkan platform digital inovatif</li>
                <li className="flex items-start gap-2">• Membangun hubungan jangka panjang dengan pelanggan</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <Heart className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Nilai Kami</h3>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">• Integritas dan kejujuran</li>
                <li className="flex items-start gap-2">• Pelayanan prima</li>
                <li className="flex items-start gap-2">• Profesionalisme</li>
                <li className="flex items-start gap-2">• Inovasi berkelanjutan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Lokasi Kami</h2>
          <div className="overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
            <div className="flex h-80 items-center justify-center bg-gray-300 text-gray-500">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 mb-2" />
                <p className="font-medium">Google Maps Integration</p>
                <p className="text-sm">Jl. Taman Tekno No. 88, BSD City</p>
                <a 
                  href="https://maps.google.com/?q=Shop+and+Drive+Taman+Tekno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-red-600 hover:underline"
                >
                  Buka di Google Maps →
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
              <MapPin className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">Alamat</p>
                <p className="text-sm text-gray-600">Jl. Taman Tekno No. 88, BSD City</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
              <Phone className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">Telepon</p>
                <p className="text-sm text-gray-600">(021) 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
              <Clock className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">Jam Operasional</p>
                <p className="text-sm text-gray-600">Sen-Sab 08-20 | Min 09-17</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
