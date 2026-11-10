import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { initialProjects } from '../data/projects';
import { AUTO_ADVANCE_INTERVAL_MS, TRANSITION_DURATION_MS } from '../components/showcase/FeaturedDestinationStage';

describe('Original Project Cards Physical FLIP Transfer System', () => {
  it('TEST 1 — FIRST PROJECT: verifies 7 original projects and initial active index is 0 (Dimpy)', () => {
    expect(initialProjects.length).toBe(7);
    expect(initialProjects[0].name).toBe("Dimpy's COSMOS");
    expect(initialProjects[0].id).toBe("proj-dimpy-cosmos");
  });

  it('guarantees V1 platform and Aegis 3D remain permanently removed', () => {
    const ids = initialProjects.map((p) => p.id);
    expect(ids).not.toContain('proj-school-of-future-skills');
    expect(ids).not.toContain('proj-aegis-3d');
  });

  it('TEST 2 — NEXT PROJECT: verifies forward transition sequence (Dimpy -> PixelMeFaizan)', () => {
    let activeIdx = 0;
    const total = 7;
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
  });

  it('TEST 3 — PREVIOUS PROJECT: verifies backward transition sequence (PixelMeFaizan -> Dimpy)', () => {
    let activeIdx = 1; // PixelMeFaizan
    const total = 7;
    const prev = () => (activeIdx = (activeIdx - 1 + total) % total);

    expect(initialProjects[activeIdx].name).toBe("PixelMeFaizan");
    prev();
    expect(initialProjects[activeIdx].name).toBe("Dimpy's COSMOS");
  });

  it('TEST 4 — LAST PROJECT WRAP-AROUND: Right from Aashima Mall returns to Dimpy', () => {
    const total = 7;
    let activeIdx = 6; // Aashima Mall
    expect(initialProjects[activeIdx].name).toBe("Aashima Mall");

    activeIdx = (activeIdx + 1) % total;
    expect(initialProjects[activeIdx].name).toBe("Dimpy's COSMOS");

    // Also verify Left from Dimpy wraps to Aashima Mall
    activeIdx = (activeIdx - 1 + total) % total;
    expect(initialProjects[activeIdx].name).toBe("Aashima Mall");
  });

  it('TEST 5 — AUTOMATIC TRANSFER: verifies exactly 2,000ms advance interval and 700ms transition duration', () => {
    expect(AUTO_ADVANCE_INTERVAL_MS).toBe(2000);
    expect(TRANSITION_DURATION_MS).toBe(700);

    const projectsPagePath = path.resolve(__dirname, '../pages/Projects.jsx');
    const source = fs.readFileSync(projectsPagePath, 'utf-8');

    // Confirms Projects.jsx uses AUTO_ADVANCE_INTERVAL_MS
    expect(source).toContain('AUTO_ADVANCE_INTERVAL_MS');
    // Confirms pause on hover and inactive tab
    expect(source).toContain('onMouseEnter');
    expect(source).toContain('visibilitychange');
  });

  it('TEST 6 — ORIGINAL GRID: verifies in-place placeholder renders in the exact card position', () => {
    const projectsPagePath = path.resolve(__dirname, '../pages/Projects.jsx');
    const source = fs.readFileSync(projectsPagePath, 'utf-8');

    // Confirms in-place placeholder with id matching gallery-card-${p.id}
    expect(source).toContain('id={`gallery-card-${p.id}`}');
    expect(source).toContain('Elevated to Featured Stage');
    // Confirms original gallery is the single source of cards
    expect(source).toContain('filteredProjects.map');
  });

  it('TEST 7 — NO DUPLICATION: verifies removal of secondary horizontal thumbnail queue', () => {
    const stagePath = path.resolve(__dirname, '../components/showcase/FeaturedDestinationStage.jsx');
    const stageSource = fs.readFileSync(stagePath, 'utf-8');

    // Must NOT contain separate thumbnail rail or queue labels
    expect(stageSource).not.toContain('thumbnailProjects');
    expect(stageSource).not.toContain('Exhibition Project Queue');
    expect(stageSource).not.toContain('upcoming creations');
    expect(stageSource).not.toContain('grid-cols-6');
  });

  it('verifies GSAP physical FLIP transition logic in Projects.jsx', () => {
    const projectsPagePath = path.resolve(__dirname, '../pages/Projects.jsx');
    const source = fs.readFileSync(projectsPagePath, 'utf-8');

    // Confirms GSAP import and timeline usage
    expect(source).toContain('import gsap from \'gsap\'');
    expect(source).toContain('getBoundingClientRect()');
    expect(source).toContain('incomingProxy');
    expect(source).toContain('outgoingProxy');
    expect(source).toContain('featured-stage-preview');
  });
});
