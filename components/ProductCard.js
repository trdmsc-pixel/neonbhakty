'use client';
import Link from 'next/link';
import Image from 'next/image';
import { themeConfig, getAspectRatio } from '@/lib/config';
import ProductBadge from './ProductBadge';
import Price from './Price';
import { PlusIcon, ArrowRight } from './Icons';

export default function ProductCard({ product, index = 0 }) {
  const cfg = themeConfig.productCard;
  const images = product.images?.edges || [];
  const firstImage = images[0]?.node;
  const secondImage = images[1]?.node;
  const imgRatio = getAspectRatio(cfg.imageRatio, cfg.customImageRatio);
  const price = product.priceRange?.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;

  return (
    <div
      className={`product-card glass-card`}
      data-card-style={cfg.style}
      data-hover={cfg.hoverEffect}
      data-animate="true"
      style={{
        '--card-delay': `${index * 80}ms`,
        '--card-radius': cfg.borderRadius,
        animationDelay: `${index * 80}ms`,
      }}
    >
      <Link href={`/products/${product.handle}`} className="product-card__link">
        <div className="product-card__media" style={{ aspectRatio: imgRatio }}>
          <ProductBadge product={product} />

          {firstImage ? (
            <img
              className="product-card__image product-card__image--primary"
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              loading="lazy"
            />
          ) : (
            <div className="product-card__placeholder">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No Image</span>
            </div>
          )}

          {cfg.showSecondImage && secondImage && (
            <img
              className="product-card__image product-card__image--hover"
              src={secondImage.url}
              alt={secondImage.altText || product.title}
              loading="lazy"
            />
          )}

          {!product.availableForSale && (
            <div className="product-card__sold-overlay">
              <span>SOLD OUT</span>
            </div>
          )}

          {cfg.showQuickAdd && product.availableForSale && (
            <div className="product-card__quick-add">
              <span className="btn btn--quick-add">
                <span>Quick View</span>
                <ArrowRight size={14} />
              </span>
            </div>
          )}
        </div>

        <div className="product-card__info">
          {cfg.showVendor && product.vendor && (
            <span className="product-card__vendor">{product.vendor}</span>
          )}
          <h3 className="product-card__title">{product.title}</h3>
          <Price
            amount={price?.amount}
            compareAt={parseFloat(compareAt?.amount || 0) > 0 ? compareAt?.amount : null}
            currency={price?.currencyCode}
          />
        </div>
      </Link>
      <div className="product-card__glow" />
    </div>
  );
}
