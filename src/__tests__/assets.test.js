import { describe, it, expect } from 'vitest';
import { getAssetUrl, getAvatarFallback, getLogoFallback, getBotAvatarFallback, getImageFallback } from '../utils/assets';

describe('Asset Resolution & Fallbacks', () => {
  it('correctly prepends base URL to local asset paths', () => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const url = getAssetUrl('/fsit-neon-logo.png');
    expect(url).toBe(`${cleanBase}fsit-neon-logo.png`);
  });

  it('preserves absolute HTTP and HTTPS URLs', () => {
    const external = 'https://images.unsplash.com/photo-12345';
    expect(getAssetUrl(external)).toBe(external);
  });

  it('preserves existing data URIs without modification', () => {
    const dataUri = 'data:image/svg+xml;charset=utf-8,%3Csvg%3E%3C/svg%3E';
    expect(getAssetUrl(dataUri)).toBe(dataUri);
  });

  it('generates valid RFC 2397 compliant SVG avatar data URIs', () => {
    const avatar = getAvatarFallback('Dr. Pooja Bijlani', 'Head of School');
    expect(avatar.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
    expect(avatar).toContain('%3Csvg');
    expect(avatar).toContain('PB'); // Initials
  });

  it('generates valid brand logo fallback data URI', () => {
    const logo = getLogoFallback();
    expect(logo.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
    expect(logo).toContain('%3Csvg');
  });

  it('generates valid FutureBot avatar fallback data URI', () => {
    const bot = getBotAvatarFallback();
    expect(bot.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
    expect(bot).toContain('%3Csvg');
  });

  it('generates valid banner placeholder data URI', () => {
    const banner = getImageFallback('Cyber Defense War Room');
    expect(banner.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
    expect(banner).toContain('%3Csvg');
  });
});
