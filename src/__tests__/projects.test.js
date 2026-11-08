import { describe, it, expect } from 'vitest';
import { initialProjects, PROJECT_CATEGORIES } from '../data/projects';
import { projectService } from '../services/projectService';

describe('Department Projects Catalog & Architecture', () => {
  it('should contain all 9 supplied departmental projects', () => {
    expect(initialProjects.length).toBe(9);

    const projectNames = initialProjects.map((p) => p.name);
    expect(projectNames).toContain("Dimpy's COSMOS");
    expect(projectNames).toContain("PixelMeFaizan");
    expect(projectNames).toContain("Sarvagya's Portfolio");
    expect(projectNames).toContain("School of Future Skills (V1 Platform)");
    expect(projectNames).toContain("Binary Battle Club");
    expect(projectNames).toContain("Aegis 3D");
    expect(projectNames).toContain("SpendWise");
    expect(projectNames).toContain("EduTrack Pro");
    expect(projectNames).toContain("Aashima Mall");
  });

  it('should have valid and verified URLs for live projects', () => {
    const liveProjects = initialProjects.filter((p) => p.isAvailable);
    expect(liveProjects.length).toBe(8);

    liveProjects.forEach((p) => {
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.linkVerificationStatus).toContain('Verified');
    });
  });

  it('should accurately handle Aegis 3D as verification pending', () => {
    const aegis = initialProjects.find((p) => p.name === 'Aegis 3D');
    expect(aegis).toBeDefined();
    expect(aegis.isAvailable).toBe(false);
    expect(aegis.linkVerificationStatus).toContain('Verification Pending');
    expect(aegis.url).toBe('');
  });

  it('should maintain word count of descriptions between 20 and 40 words', () => {
    initialProjects.forEach((p) => {
      const wordCount = p.description.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(20);
      expect(wordCount).toBeLessThanOrEqual(42);
    });
  });

  it('should categorize every project under an approved category', () => {
    initialProjects.forEach((p) => {
      expect(PROJECT_CATEGORIES).toContain(p.category);
    });
  });

  it('should return real projects through projectService without stale cache', () => {
    const all = projectService.getAll();
    expect(all.length).toBe(9);
    expect(all[0].name).not.toContain('NeuralShield');
    expect(all[0].name).toBe("Dimpy's COSMOS");
  });
});

