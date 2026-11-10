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
  FlaskConical,
  Award,
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

  // Click-outside and Escape key handlers for "More" dropdown and Mobile Drawer
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

  // Core navigation links always visible on desktop viewports (>=1200px)
  const coreNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programmes', path: '/courses' },
    { label: 'Faculty', path: '/about#faculty' },
    { label: 'Projects', path: '/projects' },
  ];

  // Extended navigation links: inline on >= 1536px (2xl), in "More" dropdown on 1200px–1535px
  const extendedNavLinks = [
    { label: 'Research & Labs', path: '/labs', icon: FlaskConical },
    { label: 'Achievements', path: '/achievements', icon: Award },
  ];

  // Primary navigation links (combining core and extended)
  const primaryNavLinks = [
    ...coreNavLinks,
    ...extendedNavLinks,
  ];

  // Secondary navigation links adaptive: inline on ultra-wide (>=1750px), in "More" on 1200px–1749px
  const secondaryNavLinks = [
    { label: 'Student Clubs', path: '/clubs-and-projects', icon: Users },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Alumni', path: '/alumni', icon: GraduationCap },
  ];

  // All navigation links combined for mobile drawer
  const allNavLinks = [
    ...coreNavLinks,
    ...extendedNavLinks,
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

  const isSecondaryActive =
    extendedNavLinks.some((item) => isCurrentActive(item.path)) ||
    secondaryNavLinks.some((item) => isCurrentActive(item.path));

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#080C16]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md'
          : 'bg-white/80 dark:bg-[#080C16]/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      {/* Outer fluid container supporting up to 1920px desktop viewports without clipping */}
      <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20 w-full">
          
          {/* ========================================================= */}
          {/* REGION 1: LEFT — OFFICIAL BRAND IDENTITY                  */}
          {/* Strict shrink-0 and max-width bounds prevent overlap      */}
          {/* ========================================================= */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 min-w-0 max-w-[calc(100%-52px)] min-[1200px]:max-w-none shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
            aria-label="School of Future Skills Home"
          >
            {/* Logo Mark with Neon Glow */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.6)] transition-all duration-300 shrink-0 bg-slate-900 border border-cyan-500/30 flex items-center justify-center p-0.5">
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
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-extrabold text-xs sm:text-sm md:text-base lg:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors uppercase truncate">
                  School of Future Skills
                </span>
                <span className="hidden sm:inline-block text-[8px] sm:text-[9px] font-mono tracking-wider font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25 shrink-0">
                  FSIT
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden md:block truncate">
                Scope Global Skills University
              </span>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* REGION 2: CENTER — DESKTOP NAVIGATION (>=1200px ONLY)     */}
          {/* Below 1200px (including 462px mobile), strictly hidden    */}
          {/* ========================================================= */}
          <nav
            className="hidden min-[1200px]:flex items-center justify-center flex-1 min-w-0 px-2 gap-1 xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {/* Core Nav Links (Always visible across desktop >=1200px) */}
            {coreNavLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
                    active
                      ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Extended Nav Links: Inline on >=1536px, otherwise inside "More" */}
            <div className="hidden min-[1536px]:flex items-center gap-1 xl:gap-1.5">
              {extendedNavLinks.map((item) => {
                const active = isCurrentActive(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
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

            {/* Secondary Nav Links: Inline on Ultra-Wide (>=1750px), otherwise inside "More" */}
            <div className="hidden min-[1750px]:flex items-center gap-1 xl:gap-1.5">
              {secondaryNavLinks.map((item) => {
                const active = isCurrentActive(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
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

            {/* Adaptive "More" Dropdown: Active on Desktop 1200px to 1749px */}
            <div ref={moreDropdownRef} className="relative block min-[1750px]:hidden shrink-0">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                type="button"
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all ${
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
                  {/* Extended links inside dropdown when < 1536px */}
                  <div className="block min-[1536px]:hidden">
                    {extendedNavLinks.map((item) => {
                      const active = isCurrentActive(item.path);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          to={item.path}
                          role="menuitem"
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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

                  {/* Secondary links inside dropdown when < 1750px */}
                  {secondaryNavLinks.map((item) => {
                    const active = isCurrentActive(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        role="menuitem"
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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
          {/* REGION 3: RIGHT — ACTION CONTROLS & MOBILE HAMBURGER      */}
          {/* Below 768px (mobile): ONLY Hamburger button is in header  */}
          {/* ========================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Quick Command Palette Search Button: visible on >= 768px */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shrink-0"
              aria-label="Open Command Palette Search (Ctrl+K)"
              title="Search courses, faculty, events (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span className="font-medium hidden min-[1600px]:inline">Quick Search...</span>
              <kbd className="hidden min-[1600px]:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-sm">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Theme Toggle Switcher: visible on >= 768px */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors shrink-0"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Explore Programmes Primary Action Button: visible on >= 1200px */}
            <Link
              to="/courses"
              className="group hidden min-[1200px]:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_26px_rgba(6,182,212,0.55)] transition-all hover:scale-[1.02] whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>Explore Programmes</span>
            </Link>

            {/* Mobile & Tablet Hamburger Toggle Button: visible on < 1200px */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex min-[1200px]:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors shrink-0 w-10 h-10 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE & TABLET NAVIGATION DRAWER (< 1200px)              */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="min-[1200px]:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0B0F19]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          
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
