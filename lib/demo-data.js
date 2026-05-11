/**
 * Demo product data — used when Shopify API is not configured.
 * Replace with real data by adding SHOPIFY_STORE_DOMAIN and
 * SHOPIFY_STOREFRONT_ACCESS_TOKEN to your .env.local
 */

export const demoProducts = [
  {
    id: 'demo-1', title: 'Bhakty.Life Acid Washed Oversized T-Shirt', handle: 'bhakty-life-acid-washed',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: ['badge:Bestseller'],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1599', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '1999', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/12121a/ffffff?text=BHAKTY+LIFE', altText: 'Bhakty Life Tee', width: 600, height: 800 } },
      { node: { url: 'https://placehold.co/600x800/1a1a2e/00f0ff?text=BACK+VIEW', altText: 'Back', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v1', title: 'S', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: { amount: '1999', currencyCode: 'INR' }, selectedOptions: [{ name: 'Size', value: 'S' }] }},
      { node: { id: 'v2', title: 'M', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: { amount: '1999', currencyCode: 'INR' }, selectedOptions: [{ name: 'Size', value: 'M' }] }},
      { node: { id: 'v3', title: 'L', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: { amount: '1999', currencyCode: 'INR' }, selectedOptions: [{ name: 'Size', value: 'L' }] }},
      { node: { id: 'v4', title: 'XL', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: { amount: '1999', currencyCode: 'INR' }, selectedOptions: [{ name: 'Size', value: 'XL' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>Premium acid-washed oversized t-shirt with devotional graphics. 240 GSM heavy cotton. Drop shoulders. Relaxed fit.</p><ul><li>100% Combed Cotton</li><li>240 GSM Heavy Weight</li><li>Oversized Relaxed Fit</li><li>Acid Washed Finish</li></ul>',
  },
  {
    id: 'demo-2', title: 'CBH World Tour Acid Washed Oversized T-Shirt', handle: 'cbh-world-tour',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: [],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1599', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/1a1a2e/f5a623?text=CBH+WORLD+TOUR', altText: 'CBH World Tour', width: 600, height: 800 } },
      { node: { url: 'https://placehold.co/600x800/12121a/ff006e?text=CHANT+AT+HOME', altText: 'Back', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v5', title: 'M', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [{ name: 'Size', value: 'M' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>The CBH World Tour edition. Acid washed oversized fit with premium devotional graphics.</p>',
  },
  {
    id: 'demo-3', title: 'Vaikuntha Athletics Oversized Heavy T-Shirt', handle: 'vaikuntha-athletics',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: ['badge:Limited Edition'],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1599', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '2199', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/0a0a0f/00f0ff?text=VAIKUNTHA+ATHLETICS', altText: 'Vaikuntha Athletics', width: 600, height: 800 } },
      { node: { url: 'https://placehold.co/600x800/1a1a2e/ffffff?text=GOVINDA+00', altText: 'Back', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v6', title: 'S', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: { amount: '2199', currencyCode: 'INR' }, selectedOptions: [{ name: 'Size', value: 'S' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'] }],
    descriptionHtml: '<p>Vaikuntha Athletics — Govinda 00. Heavy 260 GSM cotton with divine sports graphics.</p>',
  },
  {
    id: 'demo-4', title: 'BG 18.66 Acid Washed Oversized T-Shirt', handle: 'bg-18-66',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: [],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1499', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/1a1a2e/7b2fff?text=BG+18.66', altText: 'BG 18.66', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v7', title: 'Default', availableForSale: true, price: { amount: '1499', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [{ name: 'Size', value: 'M' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>Bhagavad Gita 18.66 — Surrender unto Me. Acid washed oversized fit.</p>',
  },
  {
    id: 'demo-5', title: '108 Oversized Acid Washed T-Shirt', handle: '108-oversized',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: [],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1499', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '1799', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/12121a/ff006e?text=108+OVERSIZED', altText: '108', width: 600, height: 800 } },
      { node: { url: 'https://placehold.co/600x800/0a0a0f/f5a623?text=HARE+KRISHNA', altText: 'Back', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v8', title: 'Default', availableForSale: true, price: { amount: '1499', currencyCode: 'INR' }, compareAtPrice: { amount: '1799', currencyCode: 'INR' }, selectedOptions: [{ name: 'Size', value: 'M' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>108 — The sacred number. Mahamantra edition with 16 rounds design.</p>',
  },
  {
    id: 'demo-6', title: 'Messiah of Millennium Oversized T-Shirt', handle: 'messiah-of-millennium',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: ['badge:Hot'],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1599', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/0a0a0f/ffffff?text=MESSIAH+OF+MILLENNIUM', altText: 'Messiah', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v9', title: 'Default', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [{ name: 'Size', value: 'M' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>Messiah of Millennium — Lord Chaitanya edition. Premium heavyweight cotton.</p>',
  },
  {
    id: 'demo-7', title: 'You Are Not This Body T-Shirt', handle: 'you-are-not-this-body',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: [],
    createdAt: new Date().toISOString(), availableForSale: false,
    priceRange: { minVariantPrice: { amount: '1499', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/1a1a2e/ffffff?text=YOU+ARE+NOT+THIS+BODY', altText: 'Not This Body', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v10', title: 'Default', availableForSale: false, price: { amount: '1499', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [{ name: 'Size', value: 'M' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>You Are Not This Body — A reminder of the eternal truth. Currently sold out.</p>',
  },
  {
    id: 'demo-8', title: 'Galinga Sacred Season Oversized T-Shirt', handle: 'galinga-sacred-season',
    vendor: 'Bhakty Life', productType: 'T-Shirts', tags: [],
    createdAt: new Date().toISOString(), availableForSale: true,
    priceRange: { minVariantPrice: { amount: '1599', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' } },
    images: { edges: [
      { node: { url: 'https://placehold.co/600x800/12121a/00f0ff?text=GALINGA', altText: 'Galinga', width: 600, height: 800 } },
    ]},
    variants: { edges: [
      { node: { id: 'v11', title: 'Default', availableForSale: true, price: { amount: '1599', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [{ name: 'Size', value: 'M' }] }},
    ]},
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    descriptionHtml: '<p>Galinga — The Golden Avatar. Sacred Season edition oversized t-shirt.</p>',
  },
];

export const demoCollections = [
  {
    id: 'col-1', title: 'All T-Shirts', handle: 't-shirts',
    description: 'Sacred streetwear collection. Oversized, acid-washed, devotional.',
    image: { url: 'https://placehold.co/800x600/0a0a0f/00f0ff?text=ALL+T-SHIRTS', altText: 'T-Shirts' },
    products: { edges: demoProducts.map(p => ({ node: p })) },
  },
  {
    id: 'col-2', title: 'Fresh Season', handle: 'fresh-season',
    description: 'The latest drops. Limited edition. Sacred. Gone soon.',
    image: { url: 'https://placehold.co/800x600/12121a/ff006e?text=FRESH+SEASON', altText: 'Fresh Season' },
    products: { edges: demoProducts.slice(0, 4).map(p => ({ node: p })) },
  },
  {
    id: 'col-3', title: 'Crazy Deals', handle: 'crazy-deals',
    description: 'Up to 30% OFF — Limited. Sacred. Gone Soon.',
    image: { url: 'https://placehold.co/800x600/1a1a2e/f5a623?text=CRAZY+DEALS', altText: 'Deals' },
    products: { edges: demoProducts.filter(p => parseFloat(p.compareAtPriceRange.minVariantPrice.amount) > 0).map(p => ({ node: p })) },
  },
];

export const demoSlides = [
  {
    heading: 'WEAR YOUR DEVOTION',
    subheading: 'Sacred streetwear for the modern soul',
    buttonText: 'Shop Now',
    buttonLink: '/collections/t-shirts',
    desktopImage: 'https://placehold.co/1920x1080/0a0a0f/00f0ff?text=BHAKTY+LIFE',
    mobileImage: 'https://placehold.co/800x1200/0a0a0f/00f0ff?text=BHAKTY+LIFE',
    textAlign: 'center',
  },
  {
    heading: 'FRESH SEASON DROP',
    subheading: 'Limited edition. Sacred. Gone soon.',
    buttonText: 'Explore',
    buttonLink: '/collections/fresh-season',
    desktopImage: 'https://placehold.co/1920x1080/12121a/ff006e?text=FRESH+SEASON',
    mobileImage: 'https://placehold.co/800x1200/12121a/ff006e?text=FRESH+SEASON',
    textAlign: 'center',
  },
  {
    heading: 'THE DIVINE DECODE',
    subheading: 'Founders Edition — Exclusive Release',
    buttonText: 'Get Yours',
    buttonLink: '/collections/t-shirts',
    desktopImage: 'https://placehold.co/1920x1080/1a1a2e/f5a623?text=DIVINE+DECODE',
    mobileImage: 'https://placehold.co/800x1200/1a1a2e/f5a623?text=DIVINE+DECODE',
    textAlign: 'center',
  },
];
