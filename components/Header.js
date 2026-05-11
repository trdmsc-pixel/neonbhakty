'use client';
import Link from 'next/link';
import { themeConfig } from '@/lib/config';
import { SearchIcon, CartIcon, MenuIcon, AccountIcon } from './Icons';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const st = window.pageYOffset;
      setScrolled(st > 70);
      setHidden(st > 140 && st > lastScroll);
      lastScroll = st;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { title: 'T-Shirts', href: '/collections/t-shirts' },
    { title: 'Fresh Season', href: '/collections/fresh-season' },
    { title: 'Crazy Deals', href: '/collections/crazy-deals' },
    { title: 'About', href: '#' },
    { title: 'Contact', href: '#' },
  ];

  return (
    <>
      <header className={`header glass-nav${scrolled ? ' header--scrolled' : ''}${hidden ? ' header--hidden' : ''}`}>
        <div className="header__inner container">
          <button className="header__menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <MenuIcon size={24} />
          </button>
          <div className="header__logo">
            <Link href="/" className="header__logo-link">
              <span className="header__logo-text neon-text">{themeConfig.brand.name}</span>
            </Link>
          </div>
          <nav className="header__nav">
            {navLinks.map((link) => (
              <div className="header__nav-item" key={link.title}>
                <Link href={link.href} className="header__nav-link neon-text-hover">{link.title}</Link>
              </div>
            ))}
          </nav>
          <div className="header__actions">
            <button className="header__action" onClick={() => setSearchOpen(true)} aria-label="Search">
              <SearchIcon size={20} />
            </button>
            <Link href="#" className="header__action" aria-label="Account">
              <AccountIcon size={20} />
            </Link>
            <Link href="/cart" className="header__action header__cart" aria-label="Cart">
              <CartIcon size={20} />
              <span className="header__cart-count" data-cart-count>0</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)} />
        <div className="mobile-menu__panel glass">
          <div className="mobile-menu__header">
            <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close">
              <span style={{ fontSize: '1.5rem' }}>✕</span>
            </button>
          </div>
          <nav className="mobile-menu__nav">
            {navLinks.map((link) => (
              <Link key={link.title} href={link.href} className="mobile-menu__link neon-text-hover"
                    onClick={() => setMenuOpen(false)}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay glass is-open" onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
          <div className="search-overlay__inner">
            <button className="search-overlay__close" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <span style={{ fontSize: '1.5rem' }}>✕</span>
            </button>
            <form className="search-overlay__form" action="/search" method="get">
              <input type="search" name="q" className="search-overlay__input neon-border" placeholder="Search products..." autoFocus />
              <button type="submit" className="btn btn--primary">
                <SearchIcon size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
