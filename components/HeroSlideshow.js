'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { themeConfig } from '@/lib/config';
import { ChevronLeft, ChevronRight } from './Icons';

export default function HeroSlideshow({ slides }) {
  const cfg = themeConfig.slideshow;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback((i) => {
    setCurrent(((i % total) + total) % total);
    setProgress(0);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!cfg.autoplay || total <= 1) return;
    timerRef.current = setInterval(next, cfg.speed);
    return () => clearInterval(timerRef.current);
  }, [current, cfg.autoplay, cfg.speed, next, total]);

  // Touch swipe
  const touchStart = useRef(0);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) diff < 0 ? next() : prev();
  };

  // Progress bar
  useEffect(() => {
    if (!cfg.autoplay) return;
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / cfg.speed) * 100, 100));
      if (elapsed < cfg.speed) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [current, cfg.autoplay, cfg.speed]);

  return (
    <div className="hero-slideshow" data-transition={cfg.transition}
         onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="hero-slideshow__track" style={{ height: cfg.desktopHeight }}>
        {slides.map((slide, i) => (
          <div key={i} className={`hero-slide${i === current ? ' is-active' : ''}`}>
            <div className="hero-slide__media">
              <img className="hero-slide__image hero-slide__image--desktop"
                   src={slide.desktopImage} alt={slide.heading || 'Slide'} />
              <img className="hero-slide__image hero-slide__image--mobile"
                   src={slide.mobileImage || slide.desktopImage} alt={slide.heading || 'Slide'} />
            </div>
            <div className="hero-slide__overlay" style={{ '--overlay-opacity': cfg.overlayOpacity }} />
            {(slide.heading || slide.subheading || slide.buttonText) && (
              <div className="hero-slide__content" data-align={slide.textAlign || 'center'}>
                {slide.heading && <h2 className="hero-slide__heading neon-text">{slide.heading}</h2>}
                {slide.subheading && <p className="hero-slide__subheading">{slide.subheading}</p>}
                {slide.buttonText && (
                  <div className="hero-slide__cta">
                    <Link href={slide.buttonLink || '#'} className="btn btn--primary btn--glow">{slide.buttonText}</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {total > 1 && cfg.showArrows && (
        <div className="hero-slideshow__arrows">
          <button className="hero-slideshow__arrow" onClick={prev} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-slideshow__arrow" onClick={next} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {total > 1 && cfg.showDots && (
        <div className="hero-slideshow__dots">
          {slides.map((_, i) => (
            <button key={i} className={`hero-slideshow__dot${i === current ? ' is-active' : ''}`}
                    onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      )}

      {cfg.autoplay && total > 1 && (
        <div className="hero-slideshow__progress" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
}
