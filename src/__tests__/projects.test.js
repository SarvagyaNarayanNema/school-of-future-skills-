import { describe, it, expect } from 'vitest';
import { initialProjects, PROJECT_CATEGORIES } from '../data/projects';
import { projectService } from '../services/projectService';

describe('Department Projects Catalog & Architecture', () => {
  it('should contain all 7 supplied departmental projects', () => {
    expect(initialProjects.length).toBe(7);

    const projectNames = initialProjects.map((p) => p.name);
    expect(projectNames).toContain("Dimpy's COSMOS");
    expect(projectNames).toContain("PixelMeFaizan");
    expect(projectNames).toContain("Sarvagya's Portfolio");
    expect(projectNames).toContain("Binary Battle Club");
    expect(projectNames).toContain("SpendWise");
    expect(projectNames).toContain("EduTrack Pro");
    expect(projectNames).toContain("Aashima Mall");

    // Strictly ensure V1 Platform and Aegis 3D are removed
    expect(projectNames).not.toContain("School of Future Skills (V1 Platform)");
    expect(projectNames).not.toContain("Aegis 3D");
  });

  it('should have valid and verified URLs and supportsLivePreview for all 7 live projects', () => {
    const liveProjects = initialProjects.filter((p) => p.isAvailable);
    expect(liveProjects.length).toBe(7);

    liveProjects.forEach((p) => {
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.linkVerificationStatus).toContain('Verified');
      expect(p.supportsLivePreview).toBe(true);
    });
  });

  it('should maintain word count of descriptions between 20 and 42 words', () => {
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
    expect(all.length).toBe(7);
    expect(all[0].name).toBe("Dimpy's COSMOS");
    expect(all.some(p => p.name === 'Aegis 3D')).toBe(false);
  });
});

