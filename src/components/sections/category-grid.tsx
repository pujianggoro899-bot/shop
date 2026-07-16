import Link from "next/link";
import { categories } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Wrench, Droplets, Sparkles, CircleDot, Battery, Wind, Zap, Wrench as ToolIcon } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "cat-1": <Wrench className="h-7 w-7" />,
  "cat-2": <Droplets className="h-7 w-7" />,
  "cat-3": <Sparkles className="h-7 w-7" />,
  "cat-4": <CircleDot className="h-7 w-7" />,
  "cat-5": <Battery className="h-7 w-7" />,
  "cat-6": <Wind className="h-7 w-7" />,
  "cat-7": <Zap className="h-7 w-7" />,
  "cat-8": <ToolIcon className="h-7 w-7" />,
};

export function CategoryGrid() {
  return (
    <section className="py-20 bg-carbon-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-6 w-1 bg-red-600 rounded-full" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-red-500">Kategori Produk</span>
            <span className="h-6 w-1 bg-red-600 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Cari <span className="text-red-500">Kebutuhan</span> Kendaraan Anda
          </h2>
          <p className="mt-2 text-gray-400">8 kategori dengan 145+ produk original</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
          {categories.map((category) => {
            const IconComponent = iconMap[category.id] || <ToolIcon className="h-7 w-7" />;
            return (
              <Link key={category.id} href={`/produk?kategori=${category.slug}`}>
                <Card dark hover className="flex flex-col items-center p-5 text-center h-full group">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600/15 to-transparent text-red-400 border border-red-600/10 group-hover:border-red-600/30 group-hover:from-red-600/25 transition-all">
                    {IconComponent}
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">{category.name}</h3>
                  <p className="mt-1 text-[10px] text-gray-500">{category.productCount} produk</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
