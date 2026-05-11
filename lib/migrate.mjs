/**
 * Database migration script — run with: node lib/migrate.mjs
 * Creates all tables and seeds initial data.
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xjfijnhgcgbmavqdgpua.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZmlqbmhnY2dibWF2cWRncHVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODUzNzkzMywiZXhwIjoyMDk0MTEzOTMzfQ.vqzdZUWdysti-xla5zN7tqtA--w19COxI7Ez0WUvA34';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  db: { schema: 'public' },
  auth: { persistSession: false },
});

// We'll create tables via individual REST insert calls since the JS client
// can't run raw DDL. Instead, let's just insert data via the REST API
// and you'll run the DDL (CREATE TABLE) in the Supabase SQL Editor.

// Alternatively, use the pg REST endpoint
async function runSQL(sql) {
  const response = await fetch(`${SUPABASE_URL}/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SQL Error (${response.status}): ${text}`);
  }
  return response.json();
}

async function main() {
  console.log('🚀 Running database migration...\n');

  // Test connection first
  const { data, error } = await supabase.from('_test_').select('*').limit(1);
  console.log('✓ Connected to Supabase\n');

  console.log('⚠️  To run the full migration, please:');
  console.log('1. Go to: https://supabase.com/dashboard/project/xjfijnhgcgbmavqdgpua/sql/new');
  console.log('2. Paste the contents of lib/schema.sql');
  console.log('3. Click "Run"\n');
  console.log('Or alternatively, I can seed data via the REST API if tables exist.\n');

  // Check if products table exists
  const { data: products, error: pErr } = await supabase.from('products').select('id').limit(1);

  if (pErr && pErr.code === 'PGRST205') {
    console.log('❌ Tables do not exist yet. Please run the SQL migration first.');
    console.log('   Copy lib/schema.sql → paste in Supabase SQL Editor → Run');
    process.exit(1);
  }

  if (!pErr) {
    console.log('✓ Tables exist! Checking data...');
    const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
    console.log(`  Found ${count || 0} products`);

    if (!count || count === 0) {
      console.log('\n📦 Seeding products...');
      await seedProducts();
    } else {
      console.log('\n✓ Products already seeded. All good!');
    }
  }
}

async function seedProducts() {
  const products = [
    { title: 'Bhakty.Life Acid Washed Oversized T-Shirt', handle: 'bhakty-life-acid-washed', description_html: '<p>Premium acid-washed oversized t-shirt. 240 GSM heavy cotton.</p><ul><li>100% Combed Cotton</li><li>Oversized Relaxed Fit</li></ul>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: ['badge:Bestseller'], image_urls: ['https://placehold.co/600x800/12121a/ffffff?text=BHAKTY+LIFE','https://placehold.co/600x800/1a1a2e/00f0ff?text=BACK+VIEW'], available: true, sort_order: 1, prices: { price: 159900, compare: 199900 } },
    { title: 'CBH World Tour Acid Washed Oversized T-Shirt', handle: 'cbh-world-tour', description_html: '<p>CBH World Tour edition. Acid washed oversized fit.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: [], image_urls: ['https://placehold.co/600x800/1a1a2e/f5a623?text=CBH+WORLD+TOUR'], available: true, sort_order: 2, prices: { price: 159900, compare: 0 } },
    { title: 'Vaikuntha Athletics Oversized Heavy T-Shirt', handle: 'vaikuntha-athletics', description_html: '<p>Vaikuntha Athletics — Govinda 00. Heavy 260 GSM cotton.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: ['badge:Limited Edition'], image_urls: ['https://placehold.co/600x800/0a0a0f/00f0ff?text=VAIKUNTHA'], available: true, sort_order: 3, prices: { price: 159900, compare: 219900 } },
    { title: 'BG 18.66 Acid Washed Oversized T-Shirt', handle: 'bg-18-66', description_html: '<p>Bhagavad Gita 18.66 — Surrender unto Me.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: [], image_urls: ['https://placehold.co/600x800/1a1a2e/7b2fff?text=BG+18.66'], available: true, sort_order: 4, prices: { price: 149900, compare: 0 } },
    { title: '108 Oversized Acid Washed T-Shirt', handle: '108-oversized', description_html: '<p>108 — The sacred number. Mahamantra edition.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: [], image_urls: ['https://placehold.co/600x800/12121a/ff006e?text=108+OVERSIZED'], available: true, sort_order: 5, prices: { price: 149900, compare: 179900 } },
    { title: 'Messiah of Millennium Oversized T-Shirt', handle: 'messiah-of-millennium', description_html: '<p>Lord Chaitanya edition. Premium heavyweight cotton.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: ['badge:Hot'], image_urls: ['https://placehold.co/600x800/0a0a0f/ffffff?text=MESSIAH'], available: true, sort_order: 6, prices: { price: 159900, compare: 0 } },
    { title: 'You Are Not This Body T-Shirt', handle: 'you-are-not-this-body', description_html: '<p>A reminder of the eternal truth. Currently sold out.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: [], image_urls: ['https://placehold.co/600x800/1a1a2e/ffffff?text=NOT+THIS+BODY'], available: false, sort_order: 7, prices: { price: 149900, compare: 0 } },
    { title: 'Galinga Sacred Season Oversized T-Shirt', handle: 'galinga-sacred-season', description_html: '<p>Galinga — The Golden Avatar. Sacred Season edition.</p>', vendor: 'Bhakty Life', product_type: 'T-Shirts', tags: [], image_urls: ['https://placehold.co/600x800/12121a/00f0ff?text=GALINGA'], available: true, sort_order: 8, prices: { price: 159900, compare: 0 } },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  for (const p of products) {
    const { prices, ...productData } = p;
    const { data: inserted, error } = await supabase.from('products').insert(productData).select('id').single();
    if (error) { console.error(`  ❌ ${p.title}: ${error.message}`); continue; }
    console.log(`  ✓ ${p.title}`);

    // Create variants
    const variants = sizes.map((s, i) => ({
      product_id: inserted.id,
      title: s,
      option_name: 'Size',
      option_value: s,
      price: prices.price,
      compare_at_price: prices.compare,
      inventory_count: p.available ? 50 : 0,
      available: p.available,
      sort_order: i,
    }));
    await supabase.from('variants').insert(variants);
  }

  // Seed settings
  const settings = [
    { key: 'announcement', value: { text: 'FRESH SEASON! ✦ FREE SHIPPING ON ₹999+ ✦ WEAR YOUR DEVOTION', bgColor: '#f5a623', textColor: '#0a0a0f', speed: 20 } },
    { key: 'hero_slides', value: [{ heading: 'WEAR YOUR DEVOTION', subheading: 'Sacred streetwear for the modern soul', buttonText: 'Shop Now', buttonLink: '/collections/t-shirts', desktopImage: 'https://placehold.co/1920x1080/0a0a0f/00f0ff?text=BHAKTY+LIFE', mobileImage: 'https://placehold.co/800x1200/0a0a0f/00f0ff?text=BHAKTY+LIFE' }] },
    { key: 'shipping', value: { freeShippingThreshold: 99900, flatRate: 4900, estimatedDays: '5-7' } },
    { key: 'store_info', value: { name: 'BHAKTY LIFE', tagline: 'Wear Your Devotion', email: 'contact@bhakty.life' } },
  ];

  for (const s of settings) {
    await supabase.from('site_settings').upsert(s);
  }
  console.log('\n✓ Settings seeded');
  console.log('\n🎉 Migration complete!');
}

main().catch(console.error);
