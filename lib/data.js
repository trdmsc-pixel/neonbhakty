/**
 * Data access layer — reads from Supabase if configured, falls back to demo data.
 * This is the single source of truth for product/collection data across the app.
 */
import { supabase, isSupabaseConfigured } from './supabase';
import { demoProducts, demoCollections, demoSlides } from './demo-data';

// ─── Transform Supabase row → Shopify-like shape ────────────
function transformProduct(row, variants = []) {
  const images = (row.image_urls || []).map((url, i) => ({
    node: { url, altText: row.title, width: 600, height: 800 }
  }));

  const prices = variants.map(v => v.price);
  const comparePrices = variants.map(v => v.compare_at_price).filter(p => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const minCompare = comparePrices.length ? Math.min(...comparePrices) : 0;

  return {
    id: row.id,
    title: row.title,
    handle: row.handle,
    descriptionHtml: row.description_html || '',
    vendor: row.vendor || 'Bhakty Life',
    productType: row.product_type || '',
    tags: row.tags || [],
    createdAt: row.created_at,
    availableForSale: row.available,
    priceRange: {
      minVariantPrice: { amount: String(minPrice / 100), currencyCode: 'INR' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: String(minCompare / 100), currencyCode: 'INR' },
    },
    images: { edges: images },
    variants: {
      edges: variants.map(v => ({
        node: {
          id: v.id,
          title: v.title,
          availableForSale: v.available,
          price: { amount: String(v.price / 100), currencyCode: 'INR' },
          compareAtPrice: v.compare_at_price > 0
            ? { amount: String(v.compare_at_price / 100), currencyCode: 'INR' }
            : null,
          selectedOptions: [{ name: v.option_name, value: v.option_value }],
        }
      }))
    },
    options: groupVariantOptions(variants),
  };
}

function groupVariantOptions(variants) {
  const groups = {};
  for (const v of variants) {
    if (!groups[v.option_name]) groups[v.option_name] = new Set();
    groups[v.option_name].add(v.option_value);
  }
  return Object.entries(groups).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
}

// ─── Public API ─────────────────────────────────────────────

export async function getAllProducts() {
  if (!isSupabaseConfigured) return demoProducts;

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error || !products?.length) return demoProducts;

  const { data: variants } = await supabase
    .from('variants')
    .select('*')
    .order('sort_order', { ascending: true });

  const variantMap = {};
  for (const v of (variants || [])) {
    if (!variantMap[v.product_id]) variantMap[v.product_id] = [];
    variantMap[v.product_id].push(v);
  }

  return products.map(p => transformProduct(p, variantMap[p.id] || []));
}

export async function getProductByHandle(handle) {
  if (!isSupabaseConfigured) {
    return demoProducts.find(p => p.handle === handle) || null;
  }

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error || !product) {
    return demoProducts.find(p => p.handle === handle) || null;
  }

  const { data: variants } = await supabase
    .from('variants')
    .select('*')
    .eq('product_id', product.id)
    .order('sort_order', { ascending: true });

  return transformProduct(product, variants || []);
}

export async function getCollection(handle) {
  if (!isSupabaseConfigured) {
    return demoCollections.find(c => c.handle === handle) || null;
  }

  // For now, collections are virtual — based on product tags/availability
  const allProducts = await getAllProducts();

  const collections = {
    't-shirts': {
      id: 'col-all', title: 'All T-Shirts', handle: 't-shirts',
      description: 'Sacred streetwear collection. Oversized, acid-washed, devotional.',
      products: allProducts,
    },
    'fresh-season': {
      id: 'col-fresh', title: 'Fresh Season', handle: 'fresh-season',
      description: 'The latest drops. Limited edition. Sacred. Gone soon.',
      products: allProducts.slice(0, 4),
    },
    'crazy-deals': {
      id: 'col-deals', title: 'Crazy Deals', handle: 'crazy-deals',
      description: 'Up to 30% OFF — Limited. Sacred. Gone Soon.',
      products: allProducts.filter(p => parseFloat(p.compareAtPriceRange?.minVariantPrice?.amount || 0) > 0),
    },
  };

  const col = collections[handle];
  if (!col) return null;

  return {
    ...col,
    image: { url: `https://placehold.co/800x600/0a0a0f/00f0ff?text=${encodeURIComponent(col.title)}`, altText: col.title },
    products: { edges: col.products.map(p => ({ node: p })) },
  };
}

export async function getHeroSlides() {
  if (!isSupabaseConfigured) return demoSlides;

  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'hero_slides')
    .single();

  if (data?.value && Array.isArray(data.value) && data.value.length > 0) {
    return data.value;
  }
  return demoSlides;
}

export async function getSiteSetting(key) {
  if (!isSupabaseConfigured) return null;

  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single();

  return data?.value || null;
}
