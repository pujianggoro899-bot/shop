import Link from "next/link";
import { categories } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Wrench, Droplets, Sparkles, CircleDot, Battery, Wind, Zap, Wrench as ToolIcon } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "cat-1": <Wrench className="h-8 w-8" />,
  "cat-2": <Droplets className="h-8 w-8" />,
  "cat-3": <Sparkles className="h-8 w-8" />,
  "cat-4": <CircleDot className="h-8 w-8" />,
  "cat-5": <Battery className="h-8 w-8" />,
  "cat-6": <Wind className="h-8 w-8" />,
  "cat-7": <Zap className="h-8 w-8" />,
  "cat-8": <ToolIcon className="h-8 w-8" />,
};

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Kategori Produk</h2>
          <p className="mt-2 text-gray-600">Temukan kebutuhan kendaraan Anda</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/produk?kategori=${category.slug}`}>
              <Card hover className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                  {iconMap[category.id] || <ToolIcon className="h-8 w-8" />}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{category.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{category.productCount} produk</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
