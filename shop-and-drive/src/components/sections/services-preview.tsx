import Link from "next/link";
import { Wrench, Droplets, Move3d, Snowflake, CircleDot, Settings } from "lucide-react";
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
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Layanan Servis Bengkel</h2>
          <p className="mt-2 text-gray-600">Ditangani oleh mekanik profesional dan berpengalaman</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceTypes.map((service) => (
            <Link key={service.id} href={`/layanan#${service.slug}`}>
              <Card hover className="h-full">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    {iconMap[service.icon] || <Wrench className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{service.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-red-600">{formatCurrency(service.estimatedPrice)}</span>
                      <span className="text-xs text-gray-400">{service.estimatedDuration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/booking-servis">
            <Button size="lg">Booking Servis Sekarang</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
