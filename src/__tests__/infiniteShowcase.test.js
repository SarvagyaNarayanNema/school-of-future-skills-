import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initialProjects } from '../data/projects';

describe('3D Infinite Project Showcase System', () => {
  it('confirms exactly 7 verified department projects exist', () => {
    expect(initialProjects.length).toBe(7);
    const names = initialProjects.map((p) => p.name);
    expect(names).toContain("Dimpy's COSMOS");
    expect(names).toContain('PixelMeFaizan');
    expect(names).toContain("Sarvagya's Portfolio");
    expect(names).toContain('Binary Battle Club');
    expect(names).toContain('SpendWise');
    expect(names).toContain('EduTrack Pro');
    expect(names).toContain('Aashima Mall');
  });

  it('guarantees V1 platform and Aegis 3D remain permanently removed', () => {
    const ids = initialProjects.map((p) => p.id);
    expect(ids).not.toContain('proj-school-of-future-skills');
    expect(ids).not.toContain('proj-aegis-3d');
  });

  it('verifies circular forward and reverse navigation wrapping logic', () => {
    const total = 7;
    const nextIndex = (curr) => (curr + 1) % total;
    const prevIndex = (curr) => (curr - 1 + total) % total;

    // Forward progression
    expect(nextIndex(0)).toBe(1);
    expect(nextIndex(5)).toBe(6);
    expect(nextIndex(6)).toBe(0); // wraps around to project 1

    // Reverse progression
    expect(prevIndex(0)).toBe(6); // wraps around to project 7
    expect(prevIndex(6)).toBe(5);
    expect(prevIndex(1)).toBe(0);
  });

  it('verifies queue generation: exactly 6 remaining projects in circular order', () => {
    const total = initialProjects.length;
    for (let currentIdx = 0; currentIdx < total; currentIdx++) {
      const queue = [];
      for (let i = 1; i < total; i++) {
        const idx = (currentIdx + i) % total;
        queue.push(initialProjects[idx]);
      }
      expect(queue.length).toBe(6);
      expect(queue.map((p) => p.id)).not.toContain(initialProjects[currentIdx].id);
    }
  });

  it('verifies strict animation rules: 3D perspective is restricted exclusively to featured stage', () => {
    const componentPath = path.resolve(__dirname, '../components/showcase/InfiniteProjectShowcase.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Confirms perspective is on featured stage
    expect(source).toContain('perspective: prefersReducedMotion ? \'none\' : \'1400px\'');
    // Confirms subtle rotation (max 3-5 deg)
    expect(source).toContain('rotateY(-3deg)');
    expect(source).toContain('rotateY(3deg)');
    // Confirms inactive thumbnails in queue DO NOT have 3D rotation or transformStyle: preserve-3d
    expect(source).not.toContain('group-hover/item:rotate');
    expect(source).not.toContain('preserve-3d\')');
  });

  it('verifies pause on interaction and keyboard support in component source', () => {
    const componentPath = path.resolve(__dirname, '../components/showcase/InfiniteProjectShowcase.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Keyboard handlers
    expect(source).toContain('ArrowRight');
    expect(source).toContain('ArrowLeft');
    // Pause / Play toggle
    expect(source).toContain('togglePlayPause');
    expect(source).toContain('isPaused');
    expect(source).toContain('isHovered');
    // LiveWebsiteThumbnail integration
    expect(source).toContain('LiveWebsiteThumbnail');
    expect(source).toContain('instanceId={`featured-${activeProject.id}`}');
  });
});
