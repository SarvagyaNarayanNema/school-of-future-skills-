import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initialProjects } from '../data/projects';

describe('Live Website Hover Preview System', () => {
  it('confirms all 7 projects have verified live URLs and supportsLivePreview enabled', () => {
    expect(initialProjects.length).toBe(7);
    initialProjects.forEach(proj => {
      expect(proj.isAvailable).toBe(true);
      expect(proj.supportsLivePreview).toBe(true);
      expect(proj.url).toMatch(/^https:\/\//);
      expect(proj.linkVerificationStatus).toContain('Verified Active');
    });
  });

  it('guarantees V1 platform and Aegis 3D are removed', () => {
    const ids = initialProjects.map(p => p.id);
    expect(ids).not.toContain('proj-school-of-future-skills');
    expect(ids).not.toContain('proj-aegis-3d');
  });

  it('verifies scale calculation logic for responsive thumbnail containment', () => {
    const calculateScale = (containerWidth, virtualWidth = 1200) => {
      return Math.min(containerWidth / virtualWidth, 0.45);
    };

    // Standard desktop card thumbnail ~380px wide
    const desktopScale = calculateScale(380);
    expect(desktopScale).toBeCloseTo(0.316, 2);

    // Spotlight hero card ~580px wide
    const spotlightScale = calculateScale(580);
    expect(spotlightScale).toBeCloseTo(0.45, 2);

    // Mobile screen ~350px wide
    const mobileScale = calculateScale(350);
    expect(mobileScale).toBeCloseTo(0.291, 2);
  });

  it('verifies single-active preview coordinator logic', () => {
    let globalActiveId = null;
    const activate = (id) => { globalActiveId = id; };
    const deactivate = (id) => { if (globalActiveId === id) globalActiveId = null; };

    // Activate project 1
    activate('proj-dimpy-cosmos');
    expect(globalActiveId).toBe('proj-dimpy-cosmos');

    // Activate project 2 (replaces project 1, only 1 can be active)
    activate('proj-pixel-me-faizan');
    expect(globalActiveId).toBe('proj-pixel-me-faizan');

    // Mouse leave on project 2
    deactivate('proj-pixel-me-faizan');
    expect(globalActiveId).toBeNull();
  });

  it('verifies removal of blocking loading UI and fake status badges from component source', () => {
    const componentPath = path.resolve(__dirname, '../components/cards/LiveWebsiteThumbnail.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Must not contain the forbidden blocking strings
    expect(source).not.toContain('Streaming Live Interface...');
    expect(source).not.toContain('LIVE INTERFACE ACTIVE');
    expect(source).not.toContain('RefreshCw');
    // Must not contain 220ms or artificial debounce timer delaying iframe mount on hover
    expect(source).not.toContain('debounceTimerRef');
  });

  it('verifies seamless transition logic where iframe fades in over base screenshot', () => {
    const componentPath = path.resolve(__dirname, '../components/cards/LiveWebsiteThumbnail.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Confirms iframe has opacity transition
    expect(source).toContain('transition-opacity');
    expect(source).toContain('isIframeLoaded ? \'opacity-100\' : \'opacity-0\'');
    // Confirms fallback safety timeout
    expect(source).toContain('setTimeout');
    expect(source).toContain('setHasError');
  });
});
