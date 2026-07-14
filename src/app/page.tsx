import { HeroBanner } from "@/components/sections/hero-banner";
import { CategoryGrid } from "@/components/sections/category-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { ServicesPreview } from "@/components/sections/services-preview";
import { LatestArticles } from "@/components/sections/latest-articles";
import { CTASection } from "@/components/sections/cta-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <ServicesPreview />
      <LatestArticles />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
