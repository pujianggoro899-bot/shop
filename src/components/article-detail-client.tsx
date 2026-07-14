"use client";

import Link from "next/link";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/utils";

export function ArticleDetailClient({ slug }: { slug: string }) {
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Artikel Tidak Ditemukan</h2>
          <p className="mt-2 text-gray-600">Halaman yang Anda cari tidak tersedia.</p>
          <Link href="/artikel">
            <Button className="mt-4">Kembali ke Artikel</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/artikel" className="hover:text-red-600">Artikel</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/artikel" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Artikel
        </Link>

        <div className="mb-8">
          <Badge variant="info" className="mb-3">{article.categoryName}</Badge>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.publishedAt ? formatDate(article.publishedAt) : ""}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 3 menit baca</span>
            <span>Oleh {article.author}</span>
          </div>
        </div>

        <div className="mb-8 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-red-100 to-red-200">
          <div className="flex h-full items-center justify-center text-8xl text-red-300">📄</div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="default" className="bg-gray-100 text-gray-700">#{tag}</Badge>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
