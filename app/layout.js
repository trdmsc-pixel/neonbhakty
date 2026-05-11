import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import { ScanlineOverlay, CursorGlow, WhatsAppFloat, ScrollReveal } from '@/components/Effects';

export const metadata = {
  title: 'BHAKTY LIFE — Wear Your Devotion | Sacred Streetwear',
  description: 'Premium sacred streetwear brand. Acid-washed oversized tees with devotional graphics. Free shipping on ₹999+.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'BHAKTY LIFE — Wear Your Devotion',
    description: 'Sacred streetwear for the modern soul.',
    url: 'https://bhakty.life',
    siteName: 'BHAKTY LIFE',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-glow="true">
      <body>
        <a className="skip-link visually-hidden" href="#main">Skip to content</a>
        <ScanlineOverlay />
        <CursorGlow />
        <ScrollReveal />
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
