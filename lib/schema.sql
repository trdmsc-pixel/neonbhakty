-- ============================================================
-- BHAKTY NEON — E-Commerce Database Schema
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Products ────────────────────────────────────────────────
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  description_html TEXT DEFAULT '',
  vendor TEXT DEFAULT 'Bhakty Life',
  product_type TEXT DEFAULT 'T-Shirts',
  tags TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_handle ON products(handle);
CREATE INDEX idx_products_available ON products(available);

-- ─── Variants (Sizes, Colors etc.) ──────────────────────────
CREATE TABLE variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  option_name TEXT DEFAULT 'Size',
  option_value TEXT NOT NULL,
  price INTEGER NOT NULL,            -- in paise (1599 rupees = 159900)
  compare_at_price INTEGER DEFAULT 0,
  inventory_count INTEGER DEFAULT 100,
  available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_variants_product ON variants(product_id);

-- ─── Customers ──────────────────────────────────────────────
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,              -- links to Supabase Auth user
  email TEXT UNIQUE NOT NULL,
  name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  addresses JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_customers_email ON customers(email);

-- ─── Orders ─────────────────────────────────────────────────
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  subtotal INTEGER NOT NULL DEFAULT 0,      -- paise
  shipping_cost INTEGER NOT NULL DEFAULT 0,
  discount INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',    -- pending, confirmed, processing, shipped, delivered, cancelled
  payment_status TEXT DEFAULT 'unpaid',      -- unpaid, paid, refunded
  shipping_address JSONB DEFAULT '{}',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ─── Order Items ────────────────────────────────────────────
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES variants(id),
  product_title TEXT NOT NULL,
  variant_title TEXT DEFAULT '',
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ─── Cart ───────────────────────────────────────────────────
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,           -- anonymous cart session
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_cart_session ON cart_items(session_id);

-- ─── Site Settings ──────────────────────────────────────────
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Admin Users ────────────────────────────────────────────
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE NOT NULL,       -- links to Supabase Auth
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Auto-update timestamps ─────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER cart_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Auto-generate order numbers ────────────────────────────
CREATE SEQUENCE order_number_seq START 1001;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'BHK-' || nextval('order_number_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_auto_number BEFORE INSERT ON orders FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();

-- ─── Row Level Security ─────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access to products & variants
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Variants are viewable by everyone" ON variants FOR SELECT USING (true);
CREATE POLICY "Site settings are viewable by everyone" ON site_settings FOR SELECT USING (true);

-- Cart: users can manage their own cart items by session
CREATE POLICY "Cart items are manageable by session" ON cart_items FOR ALL USING (true) WITH CHECK (true);

-- Customers: can view own data
CREATE POLICY "Customers can view own data" ON customers FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Customers can update own data" ON customers FOR UPDATE USING (auth.uid() = auth_id);

-- Orders: customers can view own orders
CREATE POLICY "Customers can view own orders" ON orders FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid())
);
CREATE POLICY "Order items viewable by order owner" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid()))
);

-- Admin: full access via service role key (bypasses RLS)

-- ─── Seed Default Settings ─────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('announcement', '{"text": "FRESH SEASON! ✦ FREE SHIPPING ON ₹999+ ✦ WEAR YOUR DEVOTION", "bgColor": "#f5a623", "textColor": "#0a0a0f", "speed": 20}'),
  ('hero_slides', '[{"heading": "WEAR YOUR DEVOTION", "subheading": "Sacred streetwear for the modern soul", "buttonText": "Shop Now", "buttonLink": "/collections/t-shirts", "desktopImage": "", "mobileImage": ""}]'),
  ('shipping', '{"freeShippingThreshold": 99900, "flatRate": 4900, "estimatedDays": "5-7"}'),
  ('store_info', '{"name": "BHAKTY LIFE", "tagline": "Wear Your Devotion", "email": "contact@bhakty.life", "phone": "", "address": ""}')
ON CONFLICT (key) DO NOTHING;

-- ─── Seed Products ──────────────────────────────────────────
INSERT INTO products (title, handle, description_html, vendor, tags, image_urls, available) VALUES
  ('Bhakty.Life Acid Washed Oversized T-Shirt', 'bhakty-life-acid-washed', '<p>Premium acid-washed oversized t-shirt with devotional graphics. 240 GSM heavy cotton.</p><ul><li>100% Combed Cotton</li><li>240 GSM Heavy Weight</li><li>Oversized Relaxed Fit</li></ul>', 'Bhakty Life', ARRAY['badge:Bestseller'], ARRAY['https://placehold.co/600x800/12121a/ffffff?text=BHAKTY+LIFE', 'https://placehold.co/600x800/1a1a2e/00f0ff?text=BACK+VIEW'], true),
  ('CBH World Tour Acid Washed Oversized T-Shirt', 'cbh-world-tour', '<p>The CBH World Tour edition. Acid washed oversized fit.</p>', 'Bhakty Life', ARRAY[]::TEXT[], ARRAY['https://placehold.co/600x800/1a1a2e/f5a623?text=CBH+WORLD+TOUR'], true),
  ('Vaikuntha Athletics Oversized Heavy T-Shirt', 'vaikuntha-athletics', '<p>Vaikuntha Athletics — Govinda 00. Heavy 260 GSM cotton.</p>', 'Bhakty Life', ARRAY['badge:Limited Edition'], ARRAY['https://placehold.co/600x800/0a0a0f/00f0ff?text=VAIKUNTHA'], true),
  ('BG 18.66 Acid Washed Oversized T-Shirt', 'bg-18-66', '<p>Bhagavad Gita 18.66 — Surrender unto Me.</p>', 'Bhakty Life', ARRAY[]::TEXT[], ARRAY['https://placehold.co/600x800/1a1a2e/7b2fff?text=BG+18.66'], true),
  ('108 Oversized Acid Washed T-Shirt', '108-oversized', '<p>108 — The sacred number. Mahamantra edition.</p>', 'Bhakty Life', ARRAY[]::TEXT[], ARRAY['https://placehold.co/600x800/12121a/ff006e?text=108+OVERSIZED'], true),
  ('Messiah of Millennium Oversized T-Shirt', 'messiah-of-millennium', '<p>Messiah of Millennium — Lord Chaitanya edition.</p>', 'Bhakty Life', ARRAY['badge:Hot'], ARRAY['https://placehold.co/600x800/0a0a0f/ffffff?text=MESSIAH'], true),
  ('You Are Not This Body T-Shirt', 'you-are-not-this-body', '<p>A reminder of the eternal truth. Currently sold out.</p>', 'Bhakty Life', ARRAY[]::TEXT[], ARRAY['https://placehold.co/600x800/1a1a2e/ffffff?text=NOT+THIS+BODY'], false),
  ('Galinga Sacred Season Oversized T-Shirt', 'galinga-sacred-season', '<p>Galinga — The Golden Avatar. Sacred Season edition.</p>', 'Bhakty Life', ARRAY[]::TEXT[], ARRAY['https://placehold.co/600x800/12121a/00f0ff?text=GALINGA'], true);

-- Seed variants for each product
DO $$
DECLARE
  p RECORD;
  sizes TEXT[] := ARRAY['S', 'M', 'L', 'XL'];
  s TEXT;
  i INTEGER;
  base_price INTEGER;
  compare_price INTEGER;
BEGIN
  FOR p IN SELECT id, handle FROM products LOOP
    -- Set prices based on product
    CASE p.handle
      WHEN 'bhakty-life-acid-washed' THEN base_price := 159900; compare_price := 199900;
      WHEN 'vaikuntha-athletics' THEN base_price := 159900; compare_price := 219900;
      WHEN '108-oversized' THEN base_price := 149900; compare_price := 179900;
      WHEN 'bg-18-66' THEN base_price := 149900; compare_price := 0;
      ELSE base_price := 159900; compare_price := 0;
    END CASE;

    i := 0;
    FOREACH s IN ARRAY sizes LOOP
      INSERT INTO variants (product_id, title, option_name, option_value, price, compare_at_price, inventory_count, available, sort_order)
      VALUES (p.id, s, 'Size', s, base_price, compare_price,
        CASE WHEN p.handle = 'you-are-not-this-body' THEN 0 ELSE 50 END,
        CASE WHEN p.handle = 'you-are-not-this-body' THEN false ELSE true END,
        i);
      i := i + 1;
    END LOOP;
  END LOOP;
END $$;
