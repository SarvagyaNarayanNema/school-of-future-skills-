import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAssetUrl, getLogoFallback } from '../../utils/assets';

export const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, user, setCommandPaletteOpen } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programmes', path: '/courses' },
    { label: 'Faculty', path: '/about#faculty' },
    { label: 'Research & Labs', path: '/labs' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Student Life', path: '/clubs-and-projects' },
    { label: 'Events', path: '/events' },
    { label: 'Alumni', path: '/alumni' },
  ];

  const isCurrentActive = (linkPath) => {
    if (linkPath === '/') return location.pathname === '/';
    if (linkPath.includes('#')) {
      const base = linkPath.split('#')[0];
      return location.pathname === base && location.hash === `#${linkPath.split('#')[1]}`;
    }
    return location.pathname.startsWith(linkPath);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#080C16]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md'
          : 'bg-white/80 dark:bg-[#080C16]/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
            aria-label="School of Future Skills Home"
          >
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
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base lg:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors uppercase">
                  School of Future Skills
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-wider font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25">
                  FSIT
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden sm:block">
                Scope Global Skills University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Command Palette Search */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              aria-label="Open Command Palette"
              title="Search courses, faculty, events (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-500" />
              <span className="font-medium hidden md:inline">Quick Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-sm">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* EXPLORE PROGRAMMES CTA BUTTON */}
            <Link
              to="/courses"
              className="relative group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_26px_rgba(6,182,212,0.55)] transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>Explore Programmes</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
                  isCurrentActive(item.path)
                    ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Link
              to="/courses"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Academic Programmes</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;

