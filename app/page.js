import HeroSlideshow from '@/components/HeroSlideshow';
import ProductGrid from '@/components/ProductGrid';
import ImageWithText from '@/components/ImageWithText';
import Newsletter from '@/components/Newsletter';
import { ArrowRight } from '@/components/Icons';
import Link from 'next/link';
import { demoProducts, demoSlides, demoCollections } from '@/lib/demo-data';
import { shopifyFetch, isShopifyConfigured } from '@/lib/shopify';
import { PRODUCTS_QUERY } from '@/lib/queries';

async function getProducts() {
  if (isShopifyConfigured) {
    const data = await shopifyFetch(PRODUCTS_QUERY, { first: 20 });
    if (data?.products?.edges) return data.products.edges.map(e => e.node);
  }
  return demoProducts;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroSlideshow slides={demoSlides} />

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
      <section className="section-padding" data-animate="true">
        <div className="container">
          <div className="section-title">
            <h2 className="section-title__heading neon-text">Crazy Deals</h2>
            <p className="section-title__sub">Sacred savings you don&apos;t want to miss</p>
          </div>
          <ProductGrid products={products.filter(p => parseFloat(p.compareAtPriceRange?.minVariantPrice?.amount || 0) > 0).slice(0, 4)} columns={4} />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
