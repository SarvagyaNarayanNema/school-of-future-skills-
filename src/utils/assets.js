/**
 * Asset resolution and offline SVG fallback system.
 * Ensures images and icons load correctly whether running locally,
 * at domain root, or under a GitHub Pages subpath (e.g. /school-of-future-skills/).
 *
 * Provides instant Data-URI SVG fallbacks so broken-image icons never appear.
 */

export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  // Idempotency check: if path already starts with the base URL, return directly
  if (path.startsWith(cleanBase)) {
    return path;
  }
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${encodeURI(cleanPath)}`;
}

/**
 * Generates an elegant, zero-network SVG Data URI avatar placeholder.
 * Never fails, never returns 404, never depends on external CDN.
 */
export function getAvatarFallback(name = 'FSIT', role = 'Faculty') {
  const initials = name
    .replace(/(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)/gi, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('') || 'FS';

  const cleanRole = (role || 'TECH').toUpperCase().slice(0, 20);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B132B"/>
        <stop offset="50%" stop-color="#1C2541"/>
        <stop offset="100%" stop-color="#0A0E1A"/>
      </linearGradient>
      <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#06B6D4"/>
        <stop offset="100%" stop-color="#3B82F6"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="200" cy="190" r="85" fill="#0EA5E9" fill-opacity="0.12" stroke="#06B6D4" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="200" y="205" text-anchor="middle" fill="url(#neon)" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="64" letter-spacing="2">${initials}</text>
    <rect x="75" y="310" width="250" height="28" rx="14" fill="#06B6D4" fill-opacity="0.15" stroke="#06B6D4" stroke-width="1"/>
    <text x="200" y="328" text-anchor="middle" fill="#67E8F9" font-family="monospace" font-weight="700" font-size="11" letter-spacing="1.5">${cleanRole}</text>
    <text x="200" y="460" text-anchor="middle" fill="#64748B" font-family="monospace" font-size="10" letter-spacing="1">SCHOOL OF FUTURE SKILLS</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an inline SVG Data URI for the FSIT brand logo.
 */
export function getLogoFallback() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="50%" stop-color="#0284C7"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#lg)"/>
    <path d="M30 25 L70 25 L70 35 L45 35 L45 45 L65 45 L65 55 L45 55 L45 75 L30 75 Z" fill="#38BDF8"/>
    <circle cx="72" cy="72" r="8" fill="#F43F5E"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an inline SVG Data URI for the FutureBot Robot Avatar.
 */
export function getBotAvatarFallback() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="botG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#0284C7"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="100" fill="url(#botG)"/>
    <circle cx="100" cy="95" r="45" fill="#1E293B" stroke="#00D2FF" stroke-width="4"/>
    <rect x="75" y="80" width="18" height="12" rx="6" fill="#00D2FF"/>
    <rect x="107" y="80" width="18" height="12" rx="6" fill="#00D2FF"/>
    <path d="M85 115 Q100 125 115 115" stroke="#00D2FF" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="100" cy="38" r="8" fill="#F43F5E"/>
    <line x1="100" y1="46" x2="100" y2="52" stroke="#00D2FF" stroke-width="3"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an inline banner placeholder SVG for courses, projects, or achievements.
 */
export function getImageFallback(title = 'Future Skills') {
  const cleanTitle = title.slice(0, 32).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B0F19"/>
        <stop offset="50%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0B0F19"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect x="40" y="40" width="720" height="370" rx="16" fill="none" stroke="#0EA5E9" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.3"/>
    <text x="50%" y="48%" text-anchor="middle" dominant-baseline="central" fill="#38BDF8" font-family="system-ui, sans-serif" font-weight="700" font-size="28" letter-spacing="1.5">${cleanTitle}</text>
    <text x="50%" y="60%" text-anchor="middle" fill="#94A3B8" font-family="monospace" font-size="14">SCHOOL OF FUTURE SKILLS &amp; IT</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default getAssetUrl;
