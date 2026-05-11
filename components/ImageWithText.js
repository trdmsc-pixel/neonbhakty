'use client';
import Link from 'next/link';

export default function ImageWithText({ subheading, heading, text, buttonText, buttonLink, imageUrl, imagePosition = 'left' }) {
  return (
    <section className="image-text section-padding" data-animate="true">
      <div className="container">
        <div className={`image-text__grid${imagePosition === 'right' ? ' image-text__grid--reversed' : ''}`}>
          <div className="image-text__media">
            {imageUrl ? (
              <img src={imageUrl} alt={heading || ''} className="image-text__image" loading="lazy" />
            ) : (
              <div style={{ aspectRatio: '4/3', background: 'var(--bg-elevated)', borderRadius: 'var(--card-radius)' }} />
            )}
          </div>
          <div className="image-text__content">
            {subheading && <span className="image-text__sub">{subheading}</span>}
            {heading && <h2 className="image-text__heading" style={{ marginBottom: 16 }}>{heading}</h2>}
            {text && <div style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.8 }}>{text}</div>}
            {buttonText && (
              <Link href={buttonLink || '#'} className="btn btn--primary btn--glow">{buttonText}</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
