# BHAKTY NEON — Next.js Headless Storefront

A premium dark gaming aesthetic storefront for **BHAKTY LIFE** sacred streetwear.

Built with Next.js 14, featuring glassmorphism, neon glow effects, jelly animations, and fully customizable product cards.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🎨 Customize

Edit `lib/config.js` to change:
- **Product card sizes & aspect ratios**
- **Colors** (neon primary, secondary, accent)
- **Effects** (glow intensity, scanlines, cursor glow)
- **Typography** (Orbitron + Inter by default)
- **Slideshow** settings
- **Badge** styles

## 🔗 Connect Shopify

1. In Shopify Admin → Settings → Apps → Develop apps
2. Create a custom app with Storefront API access
3. Add to `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

Without Shopify credentials, the site uses built-in demo data.

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add environment variables
4. Deploy!

## 📁 Structure

```
app/          → Pages (Home, Collection, Product, Cart, 404)
components/   → React components (Header, Footer, ProductCard, etc.)
lib/          → API client, queries, config, demo data
```

## Built by [Antigravity AI](https://github.com/trdmsc-pixel/neonbhakty)

