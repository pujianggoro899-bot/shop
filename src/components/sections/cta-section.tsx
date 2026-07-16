import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck, MessageCircle, ArrowRight, Gauge } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 carbon-fiber opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-900 via-carbon-900/95 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 to-transparent" />

      {/* DECORATIVE */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-red-600/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/15 border border-red-600/30 px-4 py-1.5 text-xs font-semibold text-red-400 tracking-wider uppercase mb-6">
            <Gauge className="h-3.5 w-3.5" />
            Siap Performa Terbaik?
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Rawat Kendaraan Anda<br />
            <span className="text-red-500 text-glow">Bersama Specialist</span>
          </h2>

          <p className="mt-4 text-lg text-gray-400 max-w-lg leading-relaxed">
            Booking servis sekarang dan dapatkan pemeriksaan gratis 30 titik. Mekanik profesional siap membantu Anda.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/booking-servis">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-600/30 px-8 py-3.5 text-sm font-bold rounded-xl transition-all hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98]">
                <CalendarCheck className="h-4 w-4" />
                Booking Servis
              </Button>
            </Link>
            <a href="https://wa.me/621234567890" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 px-7 py-3.5 text-sm font-semibold rounded-xl backdrop-blur-sm transition-all hover:border-green-500/50 hover:text-green-400">
                <MessageCircle className="h-4 w-4" />
                Chat WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Phone className="h-4 w-4 text-red-500" />
              <a href="tel:02112345678" className="hover:text-red-400 transition-colors">(021) 1234 5678</a>
            </div>
            <span className="text-gray-700">|</span>
            <span className="text-gray-500">Sen—Sab 08:00—20:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
