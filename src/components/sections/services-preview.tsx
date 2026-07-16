import Link from "next/link";
import { Wrench, Droplets, Move3d, Snowflake, CircleDot, Settings, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceTypes } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="h-8 w-8" />,
  Settings: <Settings className="h-8 w-8" />,
  Droplets: <Droplets className="h-8 w-8" />,
  Move3d: <Move3d className="h-8 w-8" />,
  Snowflake: <Snowflake className="h-8 w-8" />,
  CircleDot: <CircleDot className="h-8 w-8" />,
};

export function ServicesPreview() {
  return (
    <section className="py-20 bg-carbon-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-6 w-1 bg-red-600 rounded-full" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-red-500">Layanan Bengkel</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Servis <span className="text-red-500">Professional</span>
            </h2>
            <p className="mt-2 text-gray-400">Mekanik berpengalaman dengan peralatan modern</p>
          </div>
          <Link href="/booking-servis" className="hidden text-sm font-medium text-red-400 hover:text-red-300 transition-colors sm:flex items-center gap-1 group">
            Booking Servis
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceTypes.map((service) => (
            <Link key={service.id} href={`/booking-servis?service=${service.slug}`}>
              <Card dark hover className="h-full group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600/20 to-red-600/5 text-red-400 border border-red-600/10 group-hover:border-red-600/30 group-hover:from-red-600/30 transition-all">
                      {iconMap[service.icon] || <Wrench className="h-8 w-8" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{service.name}</h3>
                      <p className="mt-1.5 text-sm text-gray-400 line-clamp-2 leading-relaxed">{service.description}</p>
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-carbon-600/30">
                        <span className="text-lg font-bold text-red-500">{formatCurrency(service.estimatedPrice)}</span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="h-3.5 w-3.5" />
                          {service.estimatedDuration}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/booking-servis">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-600/20 px-8 py-3.5 text-sm font-bold rounded-xl transition-all hover:shadow-red-600/40 uppercase tracking-wider">
              Booking Servis Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
