import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  Sparkles,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAssetUrl, getLogoFallback } from '../../utils/assets';

export const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, setCommandPaletteOpen } = useApp();
  const location = useLocation();

  const moreDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  // Click-outside and Escape key handlers for "More" dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Primary navigation links visible directly across desktop viewports
  const primaryNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programmes', path: '/courses' },
    { label: 'Faculty', path: '/about#faculty' },
    { label: 'Research & Labs', path: '/labs' },
    { label: 'Projects', path: '/projects' },
    { label: 'Achievements', path: '/achievements' },
  ];

  // Secondary navigation links adaptive: inline on ultra-wide (>=1536px), in "More" on standard desktop
  const secondaryNavLinks = [
    { label: 'Student Clubs', path: '/clubs-and-projects', icon: Users },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Alumni', path: '/alumni', icon: GraduationCap },
  ];

  // All navigation links combined for mobile drawer
  const allNavLinks = [
    ...primaryNavLinks,
    ...secondaryNavLinks,
    { label: 'Contact', path: '/about#contact', icon: Mail },
  ];

  const isCurrentActive = (linkPath) => {
    if (linkPath === '/') return location.pathname === '/';
    if (linkPath.includes('#')) {
      const [base, hash] = linkPath.split('#');
      return location.pathname === base && location.hash === `#${hash}`;
    }
    return location.pathname.startsWith(linkPath);
  };

  const isSecondaryActive = secondaryNavLinks.some((item) => isCurrentActive(item.path));

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#080C16]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md'
          : 'bg-white/80 dark:bg-[#080C16]/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      {/* Outer fluid container supporting up to 1920px desktop viewports without clipping */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between gap-2 lg:gap-4 h-16 sm:h-20 w-full">
          
          {/* ========================================================= */}
          {/* REGION 1: LEFT — OFFICIAL BRAND IDENTITY                  */}
          {/* ========================================================= */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
            aria-label="School of Future Skills Home"
          >
            {/* Logo Mark with Neon Glow */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.6)] transition-all duration-300 shrink-0 bg-slate-900 border border-cyan-500/30 flex items-center justify-center p-0.5">
              <img
                src={getAssetUrl("/fsit-neon-logo.png")}
                alt="School of Future Skills Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getLogoFallback();
                }}
              />
            </div>
            
            {/* Department & University Typography */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base lg:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors uppercase whitespace-nowrap">
                  School of Future Skills
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-wider font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25">
                  FSIT
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden sm:block whitespace-nowrap">
                Scope Global Skills University
              </span>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* REGION 2: CENTER — RESPONSIVE ADAPTIVE NAVIGATION         */}
          {/* ========================================================= */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-1 xl:px-2 gap-1 xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {/* Primary Nav Links (Visible across all desktop widths >=1024px) */}
            {primaryNavLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
                    active
                      ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Secondary Nav Links: Inline on Ultra-Wide (>=1536px: 1600px, 1898px, 1920px) */}
            <div className="hidden 2xl:flex items-center gap-1 xl:gap-1.5">
              {secondaryNavLinks.map((item) => {
                const active = isCurrentActive(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
                      active
                        ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Adaptive "More" Dropdown: Active on Standard Desktop (1024px to 1535px) */}
            <div ref={moreDropdownRef} className="relative block 2xl:hidden shrink-0">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                type="button"
                className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
                  isSecondaryActive || moreDropdownOpen
                    ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
                aria-label="More navigation items"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-cyan-500' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu Popover */}
              {moreDropdownOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {secondaryNavLinks.map((item) => {
                    const active = isCurrentActive(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        role="menuitem"
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/15 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {Icon && (
                          <Icon
                            className={`w-4 h-4 ${
                              active ? 'text-cyan-500' : 'text-slate-400'
                            }`}
                          />
                        )}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ========================================================= */}
          {/* REGION 3: RIGHT — ACTION CONTROLS & UTILITIES             */}
          {/* ========================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 xl:gap-3 shrink-0">
            
            {/* Quick Command Palette Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shrink-0"
              aria-label="Open Command Palette Search (Ctrl+K)"
              title="Search courses, faculty, events (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span className="font-medium hidden xl:inline">Quick Search...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-sm">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Theme Toggle Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors shrink-0"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Explore Programmes Primary Action Button */}
            <Link
              to="/courses"
              className="group hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_26px_rgba(6,182,212,0.55)] transition-all hover:scale-[1.02] whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>Explore Programmes</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors shrink-0"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE & TABLET NAVIGATION DRAWER                         */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0B0F19]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          
          {/* Quick Search Action inside Mobile Drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setCommandPaletteOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-500" />
              <span>Search courses, faculty, events...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Full Navigation Links List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
            {allNavLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                    active
                      ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </Link>
              );
            })}
          </div>

          {/* Mobile Footer Utility Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            {/* Theme Toggle in Mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* Mobile Explore Programmes Button */}
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Programmes</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
