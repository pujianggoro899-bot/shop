import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Siap Merawat Kendaraan Anda?
              </h2>
              <p className="mt-3 text-red-100">
                Booking servis sekarang atau hubungi kami untuk konsultasi gratis. Tim mekanik profesional kami siap membantu.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/booking-servis">
                  <Button className="bg-white text-red-600 hover:bg-red-50">
                    <CalendarCheck className="h-4 w-4" />
                    Booking Servis
                  </Button>
                </Link>
                <a href="https://wa.me/621234567890" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <MessageCircle className="h-4 w-4" />
                    Chat WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-red-200">Hubungi Kami Langsung</p>
                    <p className="text-xl font-bold">(021) 1234 5678</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-red-200">
                  Senin - Sabtu: 08.00 - 20.00 | Minggu: 09.00 - 17.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
