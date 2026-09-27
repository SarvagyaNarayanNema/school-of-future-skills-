import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
  Zap,
  Terminal,
  Calendar,
  Layers,
  BookOpen,
  Award
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
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Notices", path: "/notices" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Achievements", path: "/achievements" },
    { name: "Tech Zone", path: "/tech-zone", highlight: true }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-500 to-indigo-500 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                  Future Skills
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 hidden md:inline">
                  PORTAL
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden sm:block tracking-wide">
                Learn. Build. Innovate. Lead.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    link.highlight
                      ? isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                        : 'text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20'
                      : isActive
                      ? 'bg-slate-800 text-sky-400 border border-slate-700 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs transition-colors"
              title="Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden lg:inline text-slate-400">Search</span>
              <kbd className="hidden lg:inline font-mono text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">
                Ctrl K
              </kbd>
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setNotifDrawerOpen(true)}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </button>

            {/* Student Profile & XP Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-200 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow">
                {user.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-semibold block leading-tight text-white group-hover:text-sky-300 truncate max-w-[80px]">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-sky-400 font-mono">
                  {user.points} XP
                </span>
              </div>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl xl:hidden text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 mb-3 border-b border-slate-800 text-xs">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 text-slate-200 hover:bg-slate-800"
              >
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/timetable"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 text-slate-200 hover:bg-slate-800"
              >
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Timetable</span>
              </Link>
              <Link
                to="/assignments"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 text-slate-200 hover:bg-slate-800"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Assignments</span>
              </Link>
              <Link
                to="/labs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 text-slate-200 hover:bg-slate-800"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Labs Sandbox</span>
              </Link>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3.5 py-2 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
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
