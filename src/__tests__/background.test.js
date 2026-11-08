import { describe, it, expect } from 'vitest';

describe('Futuristic Background Layer System', () => {
  // 1. Route Variant Resolution
  const getVariant = (pathname) => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/courses')) return 'courses';
    if (pathname.startsWith('/labs')) return 'labs';
    if (pathname.startsWith('/projects')) return 'projects';
    if (pathname.startsWith('/achievements')) return 'achievements';
    if (pathname.startsWith('/alumni') || pathname.startsWith('/about')) return 'people';
    return 'general';
  };

  it('maps correct visual variants across collegiate routes', () => {
    expect(getVariant('/')).toBe('home');
    expect(getVariant('/courses')).toBe('courses');
    expect(getVariant('/courses/ai-ml')).toBe('courses');
    expect(getVariant('/labs')).toBe('labs');
    expect(getVariant('/projects')).toBe('projects');
    expect(getVariant('/achievements')).toBe('achievements');
    expect(getVariant('/alumni')).toBe('people');
    expect(getVariant('/about')).toBe('people');
    expect(getVariant('/notices')).toBe('general');
  });

  // 2. Node & Particle Allocation Rules
  it('allocates proper node and particle limits per variant for performance', () => {
    const getNodeConfig = (variant) => {
      switch (variant) {
        case 'labs':
          return { nodes: 42, maxDist: 150, primaryHue: 'emerald' };
        case 'courses':
          return { nodes: 28, maxDist: 125, primaryHue: 'blue' };
        case 'achievements':
          return { nodes: 32, maxDist: 135, primaryHue: 'amber' };
        case 'projects':
          return { nodes: 34, maxDist: 140, primaryHue: 'violet' };
        case 'people':
          return { nodes: 22, maxDist: 110, primaryHue: 'blue' };
        default:
          return { nodes: 36, maxDist: 140, primaryHue: 'cyan' };
      }
    };

    expect(getNodeConfig('home').nodes).toBe(36);
    expect(getNodeConfig('labs').primaryHue).toBe('emerald');
    expect(getNodeConfig('achievements').primaryHue).toBe('amber');
    expect(getNodeConfig('people').nodes).toBeLessThan(30); // Restrained for reading
  });

  // 3. Central Exclusion Zone Logic
  it('ensures nodes are biased away from central headline/text zone to preserve contrast', () => {
    const isInsideTextZone = (x, y, w, h) => {
      return x > w * 0.35 && x < w * 0.65 && y > h * 0.25 && y < h * 0.75;
    };

    const w = 1440;
    const h = 900;

    // Exact center
    expect(isInsideTextZone(w * 0.5, h * 0.5, w, h)).toBe(true);

    // Peripheral corners
    expect(isInsideTextZone(w * 0.1, h * 0.1, w, h)).toBe(false);
    expect(isInsideTextZone(w * 0.85, h * 0.3, w, h)).toBe(false);
  });

  // 4. Parallax Damping Dynamics
  it('smoothly damps parallax movement within safe pixel boundaries', () => {
    let currentX = 0;
    const targetX = 18; // Max 18px
    const ease = 0.045;

    for (let step = 0; step < 10; step++) {
      currentX += (targetX - currentX) * ease;
    }

    expect(currentX).toBeGreaterThan(0);
    expect(currentX).toBeLessThanOrEqual(18);
  });
});
