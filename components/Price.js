'use client';
import { formatPrice } from '@/lib/shopify';

export default function Price({ amount, compareAt, currency = 'INR' }) {
  const price = parseFloat(amount);
  const compare = compareAt ? parseFloat(compareAt) : 0;
  const isOnSale = compare > price;
  const savePct = isOnSale ? Math.round(((compare - price) / compare) * 100) : 0;

  return (
    <div className="price-wrapper">
      {isOnSale && (
        <span className="price price--compare">{formatPrice(compare, currency)}</span>
      )}
      <span className={`price price--current${isOnSale ? ' price--sale' : ''}`}>
        {formatPrice(price, currency)}
      </span>
      {isOnSale && (
        <span className="price-badge--save">-{savePct}%</span>
      )}
    </div>
  );
}
