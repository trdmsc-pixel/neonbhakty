'use client';
export default function Newsletter() {
  return (
    <section className="newsletter section-padding" data-animate="true">
      <div className="container" style={{ maxWidth: 700, textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: 'clamp(32px,5vw,60px)' }}>
          <h2 className="neon-text" style={{ marginBottom: 12 }}>Stay Sacred</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Subscribe for exclusive drops, early access, and divine deals.</p>
          <div style={{ display: 'flex', gap: 12, maxWidth: 460, margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email" className="neon-border" aria-label="Email" style={{ flex: 1 }} />
            <button className="btn btn--primary btn--glow">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
