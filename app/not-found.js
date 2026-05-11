import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | BHAKTY LIFE',
};

export default function NotFound() {
  return (
    <section className="section-padding" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 className="neon-text" style={{ fontSize: 'clamp(4rem,10vw,8rem)', marginBottom: 16 }}>404</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: 32 }}>Page not found in this dimension.</p>
      <Link href="/" className="btn btn--primary btn--glow">Return Home</Link>
    </section>
  );
}
