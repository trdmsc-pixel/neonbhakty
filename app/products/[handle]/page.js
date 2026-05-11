import ProductInfo from '@/components/ProductInfo';
import ProductGrid from '@/components/ProductGrid';
import { getProductByHandle, getAllProducts } from '@/lib/data';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} — BHAKTY LIFE`,
    description: product.descriptionHtml?.replace(/<[^>]*>/g, '').slice(0, 160) || `Shop ${product.title}`,
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts.filter(p => p.handle !== handle).slice(0, 4);

  return (
    <>
      <ProductInfo product={product} />

      {relatedProducts.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <div className="section-title">
              <h2 className="section-title__heading neon-text">You May Also Like</h2>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        </section>
      )}
    </>
  );
}
