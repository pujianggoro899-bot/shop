import { articles } from "@/data/articles";
import { ArticleDetailClient } from "@/components/article-detail-client";

export async function generateStaticParams() {
  return articles
    .filter((a) => a.status === "published")
    .map((article) => ({
      slug: article.slug,
    }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleDetailClient slug={slug} />;
}
