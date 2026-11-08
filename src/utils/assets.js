/**
 * Resolves a public asset path against Vite's base URL.
 * Ensures images and icons load correctly whether running locally,
 * at domain root, or under a GitHub Pages subpath (e.g. /school-of-future-skills/).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${encodeURI(cleanPath)}`;
}

export default getAssetUrl;

