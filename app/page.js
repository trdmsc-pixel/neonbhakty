import HeroSlideshow from '@/components/HeroSlideshow';
import ProductGrid from '@/components/ProductGrid';
import ImageWithText from '@/components/ImageWithText';
import Newsletter from '@/components/Newsletter';
import { ArrowRight } from '@/components/Icons';
import Link from 'next/link';
import { getAllProducts, getHeroSlides } from '@/lib/data';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [products, slides] = await Promise.all([
    getAllProducts(),
    getHeroSlides(),
  ]);

  const dealsProducts = products.filter(p =>
    parseFloat(p.compareAtPriceRange?.minVariantPrice?.amount || 0) > 0
  );

  return (
    <>
      <HeroSlideshow slides={slides} />

      {/* Featured Collection: Latest Drops */}
      <section className="section-padding" data-animate="true">
        <div className="container">
          <div className="section-title">
            <h2 className="section-title__heading neon-text">Latest Drops</h2>
            <p className="section-title__sub">Fresh from the divine workshop</p>
          </div>
          <ProductGrid products={products.slice(0, 8)} />
          <div style={{ textAlign: 'center', marginTop: 'clamp(24px,4vw,40px)' }}>
            <Link href="/collections/t-shirts" className="btn btn--secondary btn--glow">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ImageWithText
        subheading="Our Story"
        heading="Born in Devotion"
        text="Bhakty Life is a sacred streetwear brand rooted in devotion. Every piece carries the essence of ancient wisdom, reimagined for the modern soul. We believe fashion can be a form of worship — a daily reminder to wear your devotion."
        buttonText="About Us"
        buttonLink="#"
        imageUrl="https://placehold.co/800x600/12121a/00f0ff?text=BORN+IN+DEVOTION"
        imagePosition="left"
      />

      {/* Crazy Deals */}
      {dealsProducts.length > 0 && (
        <section className="section-padding" data-animate="true">
          <div className="container">
            <div className="section-title">
              <h2 className="section-title__heading neon-text">Crazy Deals</h2>
              <p className="section-title__sub">Sacred savings you don&apos;t want to miss</p>
            </div>
            <ProductGrid products={dealsProducts.slice(0, 4)} columns={4} />
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}
