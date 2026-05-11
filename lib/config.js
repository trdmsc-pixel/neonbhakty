/**
 * BHAKTY NEON — Theme Configuration
 * Edit these values to customize your entire site.
 */

export const themeConfig = {
  /* ── Brand ──────────────────────────────────────────── */
  brand: {
    name: 'BHAKTY LIFE',
    tagline: 'Wear Your Devotion',
    domain: 'bhakty.life',
  },

  /* ── Colors ─────────────────────────────────────────── */
  colors: {
    neonPrimary: '#00f0ff',
    neonSecondary: '#ff006e',
    neonAccent: '#f5a623',
    neonTertiary: '#7b2fff',
    bgDeep: '#0a0a0f',
    bgSurface: '#12121a',
    bgElevated: '#1a1a2e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0b0',
    textMuted: '#666680',
  },

  /* ── Typography ─────────────────────────────────────── */
  typography: {
    headingFont: 'Orbitron',
    bodyFont: 'Inter',
    headingWeight: 700,
    headingTransform: 'uppercase',
  },

  /* ── Product Card ★ ─────────────────────────────────── */
  productCard: {
    // Card aspect ratios
    aspectRatio: 'portrait',        // 'portrait' | 'square' | 'landscape' | 'custom'
    customAspectRatio: '3/4',       // Used when aspectRatio is 'custom'

    // Image aspect ratio inside the card
    imageRatio: 'portrait',         // 'portrait' | 'square' | 'landscape' | 'natural' | 'custom'
    customImageRatio: '3/4',        // Used when imageRatio is 'custom'

    // Card sizing
    minWidth: '200px',
    maxWidth: '400px',

    // Grid columns per breakpoint
    columns: { desktop: 4, tablet: 3, mobile: 2 },

    // Gap between cards
    gap: '24px',

    // Card border radius
    borderRadius: '12px',

    // Card style
    style: 'glass',                 // 'glass' | 'solid' | 'gradient' | 'neon-outline'

    // Hover effect
    hoverEffect: 'jelly',           // 'jelly' | 'tilt' | 'glow' | 'lift' | 'none'

    // Features
    showSecondImage: true,
    showQuickAdd: true,
    showVendor: false,
  },

  /* ── Badges ─────────────────────────────────────────── */
  badges: {
    sale: { enabled: true, style: 'neon', showPercentage: true, color: '#ff006e' },
    new: { enabled: true, days: 30, color: '#00f0ff' },
    custom: { enabled: true, color: '#f5a623' },
    soldOut: { enabled: true, style: 'overlay' },
  },

  /* ── Effects ────────────────────────────────────────── */
  effects: {
    enableGlow: true,
    glowIntensity: 0.6,
    enableScanlines: true,
    scanlineOpacity: 0.03,
    enableCursorGlow: true,
    enableAnimations: true,
    enableScrollAnimations: true,
    enablePageTransitions: true,
    transitionSpeed: 300,
    hoverScale: 1.05,
  },

  /* ── Glass ──────────────────────────────────────────── */
  glass: {
    opacity: 0.06,
    blur: 20,
    borderOpacity: 0.1,
  },

  /* ── Slideshow ──────────────────────────────────────── */
  slideshow: {
    autoplay: true,
    speed: 5000,
    transition: 'fade',             // 'fade' | 'slide' | 'glitch' | 'zoom'
    desktopHeight: '90vh',
    mobileHeight: '100vh',
    overlayOpacity: 0.3,
    showDots: true,
    showArrows: true,
  },

  /* ── Social ─────────────────────────────────────────── */
  social: {
    instagram: 'https://instagram.com/bhakty.life',
    whatsapp: '',
    youtube: '',
    twitter: '',
    tiktok: '',
  },

  /* ── Announcement ───────────────────────────────────── */
  announcement: {
    text: 'FRESH SEASON! ✦ FREE SHIPPING ON ₹999+ ✦ WEAR YOUR DEVOTION',
    bgColor: '#f5a623',
    textColor: '#0a0a0f',
    speed: 20,
  },
};

/* Helper to get CSS aspect ratio value */
export function getAspectRatio(type, custom) {
  const ratios = { portrait: '3/4', square: '1/1', landscape: '4/3' };
  if (type === 'custom') return custom || '3/4';
  return ratios[type] || '3/4';
}
