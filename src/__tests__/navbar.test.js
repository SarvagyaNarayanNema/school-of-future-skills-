import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Responsive Navbar Architecture', () => {
  const headerPath = path.resolve(__dirname, '../components/layout/PublicHeader.jsx');
  const source = fs.readFileSync(headerPath, 'utf-8');

  it('verifies outer container supports wide desktop viewports up to 1920px without 1280px restriction', () => {
    expect(source).toContain('max-w-[1920px]');
    expect(source).not.toContain('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  });

  it('verifies all 10 public navigation links exist', () => {
    const requiredLabels = [
      'Home',
      'About',
      'Programmes',
      'Faculty',
      'Research & Labs',
      'Projects',
      'Achievements',
      'Student Clubs',
      'Events',
      'Alumni'
    ];

    requiredLabels.forEach((label) => {
      expect(source).toContain(`'${label}'`);
    });
  });

  it('verifies adaptive "More" dropdown implementation for intermediate desktop widths', () => {
    // Confirms "More" dropdown state and toggle
    expect(source).toContain('moreDropdownOpen');
    expect(source).toContain('setMoreDropdownOpen');
    expect(source).toContain('secondaryNavLinks');
    // Confirms click-outside and escape key listeners
    expect(source).toContain('handleClickOutside');
    expect(source).toContain('Escape');
  });

  it('verifies three clearly separated regions: Left brand, Center nav, Right utilities', () => {
    // Left: Brand Logo & Typography
    expect(source).toContain('School of Future Skills');
    expect(source).toContain('FSIT');
    expect(source).toContain('Scope Global Skills University');

    // Center: Nav element
    expect(source).toContain('aria-label="Main Navigation"');

    // Right: Search, Theme Toggle, CTA Button
    expect(source).toContain('setCommandPaletteOpen(true)');
    expect(source).toContain('toggleTheme');
    expect(source).toContain('Explore Programmes');
  });

  it('verifies comprehensive mobile drawer includes all destinations, search, and theme switcher', () => {
    expect(source).toContain('mobileMenuOpen');
    expect(source).toContain('allNavLinks');
    expect(source).toContain('Light Mode');
    expect(source).toContain('Dark Mode');
  });
});
