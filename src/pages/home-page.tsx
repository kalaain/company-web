import { ProductCard } from "../components/cards/product-card";
import { CompanyOverviewShowcase } from "../components/sections/company-overview-showcase";
import { HeroBanner } from "../components/sections/hero-banner";
import { TestimonialCarousel } from "../components/sections/testimonial-carousel";
import { VideoShowcase } from "../components/sections/video-showcase";
import { SectionHeading } from "../components/shared/section-heading";
import { featuredProducts, heroSlides, testimonials } from "../data/company";
import { usePageSeo } from "../hooks/use-page-seo";

export function HomePage() {
  usePageSeo({
    title: "Beranda",
    description: "PT SMJ Agro — Distributor obat-obatan pertanian, pestisida, pupuk, dan pakan ternak berkualitas untuk petani dan peternak Indonesia.",
  });

  return (
    <div className="space-y-12">
      <div className="-mx-5 md:-mx-8">
        <HeroBanner slides={heroSlides} />
      </div>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Produk"
          title="Obat pertanian & pakan ternak unggulan"
          description="Temukan produk pestisida, pupuk, dan pakan ternak terbaik untuk mendukung hasil panen dan peternakan Anda."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      <CompanyOverviewShowcase />

      <VideoShowcase />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Testimoni"
          title="Dipercaya petani & peternak"
          description="Ulasan langsung dari petani, peternak, dan mitra yang menggunakan produk PT SMJ Agro."
        />
        <TestimonialCarousel items={testimonials} />
      </section>
    </div>
  );
}