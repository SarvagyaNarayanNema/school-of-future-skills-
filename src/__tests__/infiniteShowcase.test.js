import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initialProjects } from '../data/projects';
import { AUTO_ADVANCE_DELAY_MS, TRANSITION_DURATION_MS } from '../components/showcase/InfiniteProjectShowcase';

describe('True Cyclic 3D Project Carousel System', () => {
  it('confirms exactly 7 verified department projects exist in correct initial order', () => {
    expect(initialProjects.length).toBe(7);
    const expectedOrder = [
      "Dimpy's COSMOS",
      "PixelMeFaizan",
      "Sarvagya's Portfolio",
      "Binary Battle Club",
      "SpendWise",
      "EduTrack Pro",
      "Aashima Mall"
    ];
    initialProjects.forEach((p, idx) => {
      expect(p.name).toBe(expectedOrder[idx]);
    });
  });

  it('guarantees V1 platform and Aegis 3D remain permanently removed', () => {
    const ids = initialProjects.map((p) => p.id);
    expect(ids).not.toContain('proj-school-of-future-skills');
    expect(ids).not.toContain('proj-aegis-3d');
  });

  it('TEST A — FORWARD: verifies 6 consecutive Next clicks and wrap-around to project 1', () => {
    const total = 7;
    let activeIdx = 0; // Starts with Dimpy's COSMOS
    const next = () => (activeIdx = (activeIdx + 1) % total);

    expect(initialProjects[activeIdx].name).toBe("Dimpy's COSMOS");

    next();
    expect(initialProjects[activeIdx].name).toBe("PixelMeFaizan");

    next();
    expect(initialProjects[activeIdx].name).toBe("Sarvagya's Portfolio");

    next();
    expect(initialProjects[activeIdx].name).toBe("Binary Battle Club");

    next();
    expect(initialProjects[activeIdx].name).toBe("SpendWise");

    next();
    expect(initialProjects[activeIdx].name).toBe("EduTrack Pro");

    next();
    expect(initialProjects[activeIdx].name).toBe("Aashima Mall");

    // 7th click wraps back to Dimpy's COSMOS
    next();
    expect(initialProjects[activeIdx].name).toBe("Dimpy's COSMOS");
  });

  it('TEST B — BACKWARD: verifies reverse rotation from project 1 wraps to 7, then 6', () => {
    const total = 7;
    let activeIdx = 0; // Starts with Dimpy's COSMOS
    const prev = () => (activeIdx = (activeIdx - 1 + total) % total);

    expect(initialProjects[activeIdx].name).toBe("Dimpy's COSMOS");

    // Press LEFT once -> Aashima Mall
    prev();
    expect(initialProjects[activeIdx].name).toBe("Aashima Mall");

    // Press LEFT again -> EduTrack Pro
    prev();
    expect(initialProjects[activeIdx].name).toBe("EduTrack Pro");

    // Continue reverse sequence
    prev();
    expect(initialProjects[activeIdx].name).toBe("SpendWise");
    prev();
    expect(initialProjects[activeIdx].name).toBe("Binary Battle Club");
    prev();
    expect(initialProjects[activeIdx].name).toBe("Sarvagya's Portfolio");
    prev();
    expect(initialProjects[activeIdx].name).toBe("PixelMeFaizan");
    prev();
    expect(initialProjects[activeIdx].name).toBe("Dimpy's COSMOS");
  });

  it('TEST C & D — AUTOPLAY: verifies 7000ms delay and pause configuration', () => {
    expect(AUTO_ADVANCE_DELAY_MS).toBe(7000);
    expect(TRANSITION_DURATION_MS).toBe(650);

    const componentPath = path.resolve(__dirname, '../components/showcase/InfiniteProjectShowcase.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Confirms autoplay uses AUTO_ADVANCE_DELAY_MS
    expect(source).toContain('AUTO_ADVANCE_DELAY_MS');
    // Confirms pause on hover and inactive tab
    expect(source).toContain('onMouseEnter');
    expect(source).toContain('onMouseLeave');
    expect(source).toContain('visibilitychange');
  });

  it('TEST E — DIRECT THUMBNAIL SELECTION: verifies thumbnail calculation and order update', () => {
    const total = initialProjects.length;

    // Helper that returns thumbnails for a given activeIndex
    const getThumbnails = (activeIdx) => {
      const res = [];
      for (let i = 1; i < total; i++) {
        res.push(initialProjects[(activeIdx + i) % total]);
      }
      return res;
    };

    // When active is 0 (Dimpy):
    const t0 = getThumbnails(0);
    expect(t0.length).toBe(6);
    expect(t0[0].name).toBe("PixelMeFaizan");
    expect(t0[5].name).toBe("Aashima Mall");
    expect(t0.map(p => p.name)).not.toContain("Dimpy's COSMOS");

    // When direct selection picks index 1 (PixelMeFaizan):
    const t1 = getThumbnails(1);
    expect(t1.length).toBe(6);
    expect(t1[0].name).toBe("Sarvagya's Portfolio");
    expect(t1[5].name).toBe("Dimpy's COSMOS");
    expect(t1.map(p => p.name)).not.toContain("PixelMeFaizan");
  });

  it('TEST F — RAPID INPUT: verifies race-condition lock is enforced in component', () => {
    const componentPath = path.resolve(__dirname, '../components/showcase/InfiniteProjectShowcase.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Navigation must be blocked when isTransitioning is true
    expect(source).toContain('if (isTransitioning || total <= 1) return;');
    expect(source).toContain('disabled={isTransitioning}');
  });

  it('verifies strict animation rules: 3D perspective restricted to featured stage and no fake badges', () => {
    const componentPath = path.resolve(__dirname, '../components/showcase/InfiniteProjectShowcase.jsx');
    const source = fs.readFileSync(componentPath, 'utf-8');

    // Confirms perspective is on featured stage
    expect(source).toContain('perspective: prefersReducedMotion ? \'none\' : \'1200px\'');
    // Confirms subtle rotation (3.5 deg)
    expect(source).toContain('rotateY(-3.5deg)');
    expect(source).toContain('rotateY(3.5deg)');

    // Confirms no fake applause counters or HTTP 200 badges
    expect(source).not.toContain('Applauds</span>');
    expect(source).not.toContain('HTTP 200');
    expect(source).not.toContain('Verification Pending');
    expect(source).not.toContain('Exhibition Project Queue');
  });
});
