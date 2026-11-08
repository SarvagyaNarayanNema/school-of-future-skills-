import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Terminal,
  Cpu,
  Trophy,
  User,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAssetUrl, getLogoFallback } from '../../utils/assets';
import { Breadcrumbs } from '../common/Breadcrumbs';

export const PortalLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const {
    user,
    levelInfo,
    theme,
    toggleTheme,
    notifications,
    setNotificationDrawerOpen,
    setCommandPaletteOpen
  } = useApp();
  
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const portalNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Courses & Curriculum', path: '/courses', icon: BookOpen },
    { label: 'Assignments', path: '/assignments', icon: FileText, badge: 'Due' },
    { label: 'Timetable', path: '/timetable', icon: Calendar },
    { label: 'Virtual Labs', path: '/labs', icon: Terminal },
    { label: 'Tech Zone', path: '/tech-zone', icon: Cpu },
    { label: 'Events & Contests', path: '/events', icon: Trophy },
    { label: 'Student Profile', path: '/profile', icon: User },
  ];

  const getPageTitle = () => {
    const current = portalNav.find(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
    return current ? current.label : 'Student Portal';
  };

  const breadcrumbItems = [
    { label: 'Student Portal', to: '/dashboard' },
    { label: getPageTitle() }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080C16] text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      
      <div className="flex-1 flex overflow-hidden">
        
        {/* ========================================================= */}
        {/* DESKTOP SIDEBAR                                           */}
        {/* ========================================================= */}
        <aside
          className={`hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F19] transition-all duration-300 z-30 shrink-0 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Sidebar Header & Brand */}
          <div className="h-16 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-cyan-500/40 p-0.5 shrink-0 flex items-center justify-center">
                <img
                  src={getAssetUrl("/fsit-neon-logo.png")}
                  alt="FSIT"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getLogoFallback();
                  }}
                />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="font-extrabold text-sm tracking-tight uppercase text-slate-900 dark:text-white truncate">
                    School of Future Skills
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider">
                    STUDENT PORTAL
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Student Profile Identity Ribbon */}
          {!sidebarCollapsed ? (
            <div className="p-4 mx-3 my-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shrink-0">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{user?.name || 'Alex Morgan'}</h4>
                  <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 truncate">{user?.rollNo || 'FS24-088'}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-2.5 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">{levelInfo?.title || 'Neural Pioneer'}</span>
                <span className="font-bold text-amber-500">{user?.points || 1940} XP</span>
              </div>
            </div>
          ) : (
            <div className="p-3 flex justify-center border-b border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto" aria-label="Portal Sidebar Navigation">
            {portalNav.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-slate-950' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  {!sidebarCollapsed && item.badge && !active && (
                    <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Sidebar Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <Link
              to="/"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                sidebarCollapsed ? 'justify-center px-0' : ''
              }`}
              title="Return to Public Website"
            >
              <ExternalLink className="w-4 h-4 shrink-0 text-cyan-500" />
              {!sidebarCollapsed && <span>Public Website</span>}
            </Link>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN PORTAL CONTENT AREA                                  */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Topbar Header */}
          <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#080C16]/90 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
            
            {/* Left: Mobile hamburger & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Open portal navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:block">
                <Breadcrumbs items={breadcrumbItems} />
              </div>
              
              <h2 className="sm:hidden font-bold text-sm text-slate-900 dark:text-white truncate">
                {getPageTitle()}
              </h2>
            </div>

            {/* Right: Quick actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Command Palette Trigger */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                aria-label="Search portal"
              >
                <Search className="w-3.5 h-3.5 text-cyan-500" />
                <span className="hidden md:inline">Command Palette</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* XP Gamification Pill */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold shadow-sm">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{user?.points || 1940} XP</span>
              </div>

              {/* Notification Drawer Trigger */}
              <button
                onClick={() => setNotificationDrawerOpen(true)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open notifications drawer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* User Avatar & Profile Quick Link */}
              <Link
                to="/profile"
                className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40 flex items-center justify-center text-xs hover:border-cyan-400 transition-all shadow-sm"
                title="View Profile"
              >
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
              </Link>

            </div>

          </header>

          {/* Page Body Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
            {children}
          </main>

        </div>

      </div>

      {/* ========================================================= */}
      {/* MOBILE DRAWER                                             */}
      {/* ========================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 bg-white dark:bg-[#0B0F19] border-r border-slate-200 dark:border-slate-800 flex flex-col p-4 z-10 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 p-0.5 border border-cyan-500/40">
                  <img
                    src={getAssetUrl("/fsit-neon-logo.png")}
                    alt="FSIT"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getLogoFallback();
                    }}
                  />
                </div>
                <span className="font-extrabold text-xs uppercase">Student Portal</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {portalNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide ${
                    location.pathname === item.path
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              >
                <ExternalLink className="w-4 h-4 text-cyan-500" />
                <span>Return to Public Website</span>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR                              */}
      {/* ========================================================= */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-30 flex items-center justify-around px-2 shadow-lg"
        aria-label="Mobile Bottom Navigation"
      >
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-lg ${
            location.pathname === '/dashboard' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/courses"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-lg ${
            location.pathname === '/courses' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Courses</span>
        </Link>

        <Link
          to="/assignments"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-lg ${
            location.pathname === '/assignments' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Work</span>
        </Link>

        <Link
          to="/timetable"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-lg ${
            location.pathname === '/timetable' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-lg ${
            location.pathname === '/profile' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </Link>
      </nav>

    </div>
  );
};

export default PortalLayout;

