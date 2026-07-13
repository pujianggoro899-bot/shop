import Link from "next/link";
import { Wrench, Droplets, Move3d, Snowflake, CircleDot, Settings, Clock, Shield, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceTypes } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="h-10 w-10" />,
  Settings: <Settings className="h-10 w-10" />,
  Droplets: <Droplets className="h-10 w-10" />,
  Move3d: <Move3d className="h-10 w-10" />,
  Snowflake: <Snowflake className="h-10 w-10" />,
  CircleDot: <CircleDot className="h-10 w-10" />,
};

const benefits = [
  { icon: <Clock className="h-6 w-6" />, title: "Tepat Waktu", desc: "Servis sesuai jadwal booking, tanpa antri lama" },
  { icon: <Shield className="h-6 w-6" />, title: "Garansi Servis", desc: "Semua servis bergaransi 30 hari atau 1.000 km" },
  { icon: <ThumbsUp className="h-6 w-6" />, title: "Mekanik Profesional", desc: "Tim berpengalaman dengan sertifikasi resmi" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Layanan Servis Bengkel</h1>
          <p className="mx-auto mt-3 max-w-2xl text-red-100">
            Dari servis ringan hingga perbaikan besar, tim mekanik profesional kami siap menjaga kendaraan Anda tetap prima.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/booking-servis">
              <Button className="bg-white text-red-600 hover:bg-red-50">Booking Servis</Button>
            </Link>
            <a href="https://wa.me/621234567890">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceTypes.map((service) => (
              <div key={service.id} id={service.slug} className="scroll-mt-24">
              <Card hover>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                    {iconMap[service.icon] || <Wrench className="h-10 w-10" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-sm text-gray-500">Mulai dari</span>
                      <p className="text-xl font-bold text-red-600">{formatCurrency(service.estimatedPrice)}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      {service.estimatedDuration}
                    </span>
                  </div>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Kenapa Pilih Shop & Drive?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Siap Booking Servis?</h2>
          <p className="mt-2 text-gray-600">Pilih layanan, pilih jam, dan kami akan siap menyambut Anda.</p>
          <Link href="/booking-servis">
            <Button size="lg" className="mt-6">Booking Sekarang</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
