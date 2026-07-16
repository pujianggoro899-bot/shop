import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export function LatestArticles() {
  const latest = articles.filter((a) => a.status === "published").slice(0, 3);

  return (
    <section className="py-20 bg-carbon-800/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-6 w-1 bg-red-600 rounded-full" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-red-500">Artikel & Tips</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Panduan <span className="text-red-500">Otomotif</span>
            </h2>
            <p className="mt-2 text-gray-400">Tips, panduan, dan berita terbaru dunia otomotif</p>
          </div>
          <Link href="/artikel" className="hidden text-sm font-medium text-red-400 hover:text-red-300 transition-colors sm:flex items-center gap-1 group">
            Lihat Semua
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((article) => (
            <Link key={article.id} href={`/artikel/${article.slug}`}>
              <Card dark hover className="group h-full flex flex-col overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-carbon-700 to-carbon-800 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🔧</span>
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                  <Badge variant="info" className="mb-2.5 w-fit text-[10px] tracking-wide">{article.categoryName}</Badge>
                  <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">{article.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-400 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.publishedAt ? formatDate(article.publishedAt) : ""}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      3 menit
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/artikel">
            <Button variant="outline" className="w-full max-w-xs">
              Lihat Semua Artikel <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
