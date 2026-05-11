import ProductGrid from '@/components/ProductGrid';
import { demoCollections } from '@/lib/demo-data';
import { shopifyFetch, isShopifyConfigured } from '@/lib/shopify';
import { COLLECTION_BY_HANDLE_QUERY } from '@/lib/queries';
import { notFound } from 'next/navigation';

async function getCollection(handle) {
  if (isShopifyConfigured) {
    const data = await shopifyFetch(COLLECTION_BY_HANDLE_QUERY, { handle, first: 50 });
    if (data?.collection) return data.collection;
  }
  const col = demoCollections.find(c => c.handle === handle);
  return col || null;
}

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
