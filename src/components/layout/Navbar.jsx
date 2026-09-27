import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Terminal,
  Calendar,
  Layers,
  BookOpen,
  Award,
  ExternalLink,
  Code2,
  Settings,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    user,
    unreadNotifCount,
    setCommandPaletteOpen,
    levelInfo
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection to subtly compact and deepen navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Notices", path: "/notices" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Achievements", path: "/achievements" }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-250 ease-out ${
          isScrolled
            ? 'h-[70px] bg-slate-950/90 dark:bg-[#080c16]/95 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'h-[76px] sm:h-[80px] bg-slate-950/70 dark:bg-[#080c16]/80 backdrop-blur-md border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
          
          {/* ========================================================= */}
          {/* 1. BRAND AREA                                             */}
          {/* ========================================================= */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl"
            aria-label="Future Skills Home"
          >
            {/* Logo Container */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/25 via-blue-600/10 to-indigo-600/20 p-[1px] border border-sky-400/30 group-hover:border-sky-400/70 shadow-sm transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.25)] flex items-center justify-center">
              <div className="w-full h-full bg-[#080c16] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 group-hover:text-cyan-300 transition-colors duration-200" />
              </div>
            </div>

            {/* Typography Hierarchy */}
            <div className="flex flex-col">
              <span className="font-extrabold text-[17px] sm:text-[18px] tracking-tight text-white group-hover:text-sky-100 transition-colors leading-tight">
                Future Skills
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-normal text-slate-400 tracking-normal hidden sm:inline">
                  Learn. Build. Innovate. Lead.
                </span>
                <span className="inline-flex items-center px-1.5 py-[2px] rounded-[5px] bg-sky-500/10 text-sky-400 border border-sky-500/25 text-[9px] font-mono tracking-wider font-semibold uppercase leading-none">
                  PORTAL
                </span>
              </div>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. DESKTOP NAVIGATION                                     */}
          {/* ========================================================= */}
          <nav
            className="hidden xl:flex items-center gap-1 lg:gap-1.5"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-lg group ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Tech Zone - Specially Highlighted */}
            <NavLink
              to="/tech-zone"
              className={({ isActive }) =>
                `relative ml-1 px-3 py-1.5 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-cyan-400/90 hover:text-cyan-200 bg-cyan-500/[0.06] hover:bg-cyan-500/[0.12] border border-cyan-500/25 hover:border-cyan-400/40'
                }`
              }
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tech Zone</span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              </span>
            </NavLink>
          </nav>

          {/* ========================================================= */}
          {/* 3. UTILITY CONTROLS & STUDENT PROFILE                     */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Search (Compact Command Search Component) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="group flex items-center gap-2.5 h-9 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-sky-500/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.12)] transition-all duration-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Open global search command palette"
              title="Search anything (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
              <span className="hidden md:inline font-normal text-slate-400 group-hover:text-slate-300">
                Search
              </span>
              <kbd className="hidden lg:inline-flex items-center font-mono text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60 leading-none">
                Ctrl K
              </kbd>
            </button>

            {/* Notification Button */}
            <button
              onClick={() => setNotifDrawerOpen(true)}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent hover:border-slate-800 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={`View notifications (${unreadNotifCount} unread)`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                </span>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-800 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Student Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700/80 hover:shadow-sm transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 group"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                aria-label="Student account menu"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 via-sky-600 to-indigo-600 p-[1px] shadow-sm flex items-center justify-center text-white text-xs font-bold tracking-tight shrink-0">
                  <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                </div>

                {/* Identity Info */}
                <div className="hidden sm:block">
                  <span className="text-xs font-semibold text-slate-100 group-hover:text-white leading-tight block truncate max-w-[96px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-sky-400 leading-tight block">
                    {user.points} XP
                  </span>
                </div>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180 text-sky-400' : ''
                  }`}
                />
              </button>

              {/* Profile Floating Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Student Header */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow shrink-0">
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate">{user.rollNo}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{levelInfo.title}</span>
                      <span className="font-mono font-bold text-amber-400">{user.points} XP</span>
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <div className="space-y-0.5 text-xs text-slate-300">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 text-sky-400" />
                      <span>View Profile</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors"
                    >
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Learning Dashboard</span>
                    </Link>

                    <Link
                      to="/timetable"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>Weekly Timetable</span>
                    </Link>

                    <Link
                      to="/assignments"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors"
                    >
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      <span>Assignments</span>
                    </Link>

                    <Link
                      to="/tech-zone"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Tech Zone & Quizzes</span>
                    </Link>
                  </div>

                  <div className="my-1.5 border-t border-slate-800" />

                  <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    <button
                      onClick={toggleTheme}
                      className="text-sky-400 hover:underline"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 4. MOBILE NAVIGATION DRAWER                               */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            
            {/* Student Quick Pill in Mobile Drawer */}
            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {user.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{user.name}</h4>
                  <p className="text-[10px] text-slate-400">{user.department}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-mono text-amber-400 block">{user.points} XP</span>
                <span className="text-[10px] text-sky-400">{levelInfo.title}</span>
              </div>
            </div>

            {/* Primary Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/20'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </>
                  )}
                </NavLink>
              ))}

              {/* Tech Zone highlighted */}
              <NavLink
                to="/tech-zone"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                      : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Tech Zone</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </NavLink>
            </div>

            {/* Student Hub Secondary Links */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-1 mb-2 block">
                Student Workspaces
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800"
                >
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/timetable"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800"
                >
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Timetable</span>
                </Link>
                <Link
                  to="/assignments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Assignments</span>
                </Link>
                <Link
                  to="/labs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800"
                >
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Labs Sandbox</span>
                </Link>
              </div>
            </div>

            {/* Bottom Controls inside Drawer */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 px-1">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white font-medium flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-sky-400" />
                <span>My Profile</span>
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 hover:text-white font-medium"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

          </div>
        )}
      </header>

      {/* Slide-out Notification Drawer */}
      <NotificationDrawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
      />
    </>
  );
};
