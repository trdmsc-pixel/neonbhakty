'use client';
import { themeConfig } from '@/lib/config';

export default function AnnouncementBar() {
  const cfg = themeConfig.announcement;
  return (
    <div className="announcement-bar" style={{ background: cfg.bgColor, color: cfg.textColor }}>
      <div className="announcement-bar__track" style={{ '--marquee-speed': `${cfg.speed}s` }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="announcement-bar__item">{cfg.text}</span>
        ))}
      </div>
    </div>
  );
}
