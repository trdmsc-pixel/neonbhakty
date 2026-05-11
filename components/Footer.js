'use client';
import Link from 'next/link';
import { themeConfig } from '@/lib/config';
import { InstagramIcon, WhatsAppIcon } from './Icons';

export default function Footer() {
  const cfg = themeConfig;
  return (
    <footer className="footer section-padding">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__logo-text neon-text">{cfg.brand.name}</span>
            <p className="footer__about">{cfg.brand.tagline}. Sacred streetwear for the modern soul.</p>
            <div className="footer__social">
              {cfg.social.instagram && (
                <a href={cfg.social.instagram} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                  <InstagramIcon size={20} />
                </a>
              )}
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Shop</h4>
            <ul className="footer__links">
              <li><Link href="/collections/t-shirts" className="footer__link neon-text-hover">T-Shirts</Link></li>
              <li><Link href="/collections/fresh-season" className="footer__link neon-text-hover">Fresh Season</Link></li>
              <li><Link href="/collections/crazy-deals" className="footer__link neon-text-hover">Crazy Deals</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Help</h4>
            <ul className="footer__links">
              <li><Link href="#" className="footer__link neon-text-hover">About Us</Link></li>
              <li><Link href="#" className="footer__link neon-text-hover">Contact</Link></li>
              <li><Link href="#" className="footer__link neon-text-hover">Shipping & Returns</Link></li>
              <li><Link href="#" className="footer__link neon-text-hover">Size Guide</Link></li>
            </ul>
          </div>
          <div className="footer__newsletter">
            <h4 className="footer__heading">Join the Tribe</h4>
            <p className="footer__newsletter-text">Get early access to drops and exclusive deals.</p>
            <div className="footer__newsletter-row">
              <input type="email" placeholder="Enter your email" className="neon-border" aria-label="Email" />
              <button className="btn btn--primary">→</button>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} {cfg.brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
