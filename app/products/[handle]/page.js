import ProductInfo from '@/components/ProductInfo';
import ProductGrid from '@/components/ProductGrid';
import { demoProducts } from '@/lib/demo-data';
import { shopifyFetch, isShopifyConfigured } from '@/lib/shopify';
import { PRODUCT_BY_HANDLE_QUERY } from '@/lib/queries';
import { notFound } from 'next/navigation';

async function getProduct(handle) {
  if (isShopifyConfigured) {
    const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
    if (data?.product) return data.product;
  }
  return demoProducts.find(p => p.handle === handle) || null;
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} — BHAKTY LIFE`,
    description: product.descriptionHtml?.replace(/<[^>]*>/g, '').slice(0, 160) || `Shop ${product.title}`,
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const relatedProducts = demoProducts.filter(p => p.handle !== handle).slice(0, 4);

  return (
    <>
      <ProductInfo product={product} />

      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2 className="section-title__heading neon-text">You May Also Like</h2>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      </section>
    </>
  );
}
