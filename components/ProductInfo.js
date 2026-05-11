'use client';
import { useState } from 'react';
import Link from 'next/link';
import Price from './Price';
import ProductBadge from './ProductBadge';
import { MinusIcon, PlusIcon } from './Icons';

export default function ProductInfo({ product }) {
  const images = product.images?.edges?.map(e => e.node) || [];
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const price = product.priceRange?.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;

  return (
    <section className="product-page section-padding">
      <div className="container">
        <div className="product-page__layout">
          {/* Gallery */}
          <div className="product-gallery" data-animate="true">
            <div className="product-gallery__main">
              {images.map((img, i) => (
                <div key={i} className={`product-gallery__slide${i === activeImage ? ' is-active' : ''}`}>
                  <img src={img.url} alt={img.altText || product.title} className="product-gallery__image" />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="product-gallery__thumbs">
                {images.map((img, i) => (
                  <button key={i} className={`product-gallery__thumb${i === activeImage ? ' is-active' : ''}`}
                          onClick={() => setActiveImage(i)}>
                    <img src={img.url} alt={img.altText || ''} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-info" data-animate="true">
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <ProductBadge product={product} />
            </div>
            {product.vendor && <p className="product-info__vendor">{product.vendor}</p>}
            <h1 className="product-info__title">{product.title}</h1>
            <div className="product-info__price">
              <Price amount={price?.amount} compareAt={parseFloat(compareAt?.amount || 0) > 0 ? compareAt.amount : null} currency={price?.currencyCode} />
            </div>

            {/* Options */}
            {product.options?.map((option) => (
              <div key={option.name} className="product-option">
                <label className="product-option__label">{option.name}</label>
                <div className="product-option__values">
                  {option.values.map((val) => (
                    <label key={val} className="product-option__pill-wrap">
                      <input type="radio" name={option.name} value={val}
                             checked={selectedOptions[option.name] === val || (!selectedOptions[option.name] && option.values[0] === val)}
                             onChange={() => setSelectedOptions(p => ({ ...p, [option.name]: val }))}
                             className="visually-hidden product-option__input" />
                      <span className="product-option__pill neon-border">{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="product-quantity">
              <label className="product-option__label">Quantity</label>
              <div className="product-quantity__controls neon-border">
                <button className="product-quantity__btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <MinusIcon size={16} />
                </button>
                <input type="number" value={quantity} min={1} readOnly className="product-quantity__input" />
                <button className="product-quantity__btn" onClick={() => setQuantity(q => q + 1)}>
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="product-actions">
              <button className="btn btn--primary btn--full btn--glow product-atc" disabled={!product.availableForSale}>
                {product.availableForSale ? `Add to Cart — ${price?.amount ? `₹${parseFloat(price.amount).toLocaleString('en-IN')}` : ''}` : 'Sold Out'}
              </button>
            </div>

            {/* Description */}
            {product.descriptionHtml && (
              <details className="product-accordion__item glass-card" open>
                <summary className="product-accordion__trigger">
                  <span>Description</span>
                  <span style={{ transition: 'transform 0.3s' }}>▾</span>
                </summary>
                <div className="product-accordion__content rte" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
