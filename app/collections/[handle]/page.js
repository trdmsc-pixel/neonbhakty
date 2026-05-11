import ProductGrid from '@/components/ProductGrid';
import { getCollection } from '@/lib/data';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: `${collection.title} — BHAKTY LIFE`,
    description: collection.description || `Shop ${collection.title} at BHAKTY LIFE`,
  };
}

export default async function CollectionPage({ params }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();

  const products = collection.products?.edges?.map(e => e.node) || [];

  return (
    <>
      <section className="collection-banner" style={collection.image ? { backgroundImage: `url(${collection.image.url})` } : {}}>
        <div className="collection-banner__overlay" />
        <div className="collection-banner__content container">
          <h1 className="collection-banner__title neon-text" data-animate="true">{collection.title}</h1>
          {collection.description && <div className="collection-banner__desc" data-animate="true">{collection.description}</div>}
          <div className="collection-banner__count" data-animate="true">{products.length} products</div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
