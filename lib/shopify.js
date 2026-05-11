/**
 * Shopify Storefront API client.
 * Falls back to demo data when no credentials are configured.
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2024-10';

export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);

export async function shopifyFetch(query, variables = {}) {
  if (!isShopifyConfigured) return null;

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Shopify API error:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    return null;
  }
}

export function formatPrice(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
