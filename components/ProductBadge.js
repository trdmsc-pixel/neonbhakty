'use client';
import { themeConfig } from '@/lib/config';

export default function ProductBadge({ product }) {
  const badges = [];
  const cfg = themeConfig.badges;

  // Sold out
  if (cfg.soldOut.enabled && !product.availableForSale) {
    badges.push(<span key="soldout" className="product-badge product-badge--soldout">Sold Out</span>);
  }

  // Sale
  const compare = parseFloat(product.compareAtPriceRange?.minVariantPrice?.amount || 0);
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0);
  if (cfg.sale.enabled && compare > price && product.availableForSale) {
    const pct = Math.round(((compare - price) / compare) * 100);
    badges.push(
      <span key="sale" className="product-badge product-badge--sale" data-style={cfg.sale.style}
            style={{ '--badge-color': cfg.sale.color }}>
        {cfg.sale.showPercentage ? `-${pct}%` : 'Sale'}
      </span>
    );
  }

  // New (created within X days)
  if (cfg.new.enabled && product.availableForSale && product.createdAt) {
    const days = (Date.now() - new Date(product.createdAt).getTime()) / 86400000;
    if (days <= cfg.new.days) {
      badges.push(
        <span key="new" className="product-badge product-badge--new" style={{ '--badge-color': cfg.new.color }}>New</span>
      );
    }
  }

  // Custom badges from tags
  if (cfg.custom.enabled && product.tags) {
    product.tags.forEach((tag, i) => {
      if (tag.startsWith('badge:')) {
        badges.push(
          <span key={`custom-${i}`} className="product-badge product-badge--custom"
                style={{ '--badge-color': cfg.custom.color }}>
            {tag.replace('badge:', '')}
          </span>
        );
      }
    });
  }

  if (!badges.length) return null;
  return <div className="product-badges">{badges}</div>;
}
