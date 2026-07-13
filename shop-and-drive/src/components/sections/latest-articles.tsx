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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Artikel & Tips</h2>
            <p className="mt-2 text-gray-600">Informasi dan tips otomotif terkini</p>
          </div>
          <Link href="/artikel" className="hidden text-sm font-medium text-red-600 hover:text-red-700 sm:block">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((article) => (
            <Link key={article.id} href={`/artikel/${article.slug}`}>
              <Card hover className="flex h-full flex-col overflow-hidden">
                <div className="aspect-video bg-gray-200">
                  <div className="flex h-full items-center justify-center text-gray-400 text-4xl">
                    {article.title.charAt(0)}
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col">
                  <Badge variant="info" className="mb-2 w-fit">{article.categoryName}</Badge>
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{article.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.publishedAt ? formatDate(article.publishedAt) : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      3 menit baca
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/artikel">
            <Button variant="outline">Lihat Semua Artikel</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
