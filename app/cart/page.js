import Link from 'next/link';

export const metadata = {
  title: 'Your Cart — BHAKTY LIFE',
};

export default function CartPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <h1 className="neon-text" style={{ textAlign: 'center', marginBottom: 32 }}>Your Cart</h1>
        <div className="cart-page__empty">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: 24 }}>Your cart is empty</p>
          <Link href="/collections/t-shirts" className="btn btn--primary btn--glow">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}
