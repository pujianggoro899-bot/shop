import { products } from "@/data/products";
import { ProductDetailClient } from "@/components/product-detail-client";

export async function generateStaticParams() {
  return products
    .filter((p) => p.isActive)
    .map((product) => ({
      slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
