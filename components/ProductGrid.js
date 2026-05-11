'use client';
import ProductCard from './ProductCard';
import { themeConfig } from '@/lib/config';

export default function ProductGrid({ products, columns }) {
  const cfg = themeConfig.productCard;
  const cols = columns || cfg.columns.desktop;

  return (
    <div
      className={`grid grid--${cols}`}
      style={{ gap: cfg.gap }}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
