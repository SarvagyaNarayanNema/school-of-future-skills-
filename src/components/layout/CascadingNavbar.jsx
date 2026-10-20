import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ChevronRight,
  ChevronDown,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NAVIGATION_ITEMS } from '../../data/navigationData';

/**
 * CascadingNavbar Component
 * 
 * Features:
 * 1. Strict 5-Item Top Bar: COURSES, ACHIEVEMENTS, NOTICE, STUDENT CLUBS & PROJECTS, ALUMNI.
 * 2. Multi-Level Cascading Flyouts: Level 1 -> Level 2 -> Level 3.
 * 3. Mouse Traversal Buffer: 150ms debounce on mouse leave to prevent abrupt closing when crossing columns.
 * 4. Screen Boundary Detection: Dynamically detects viewport overflow and flips cascading columns leftwards.
 * 5. Mobile Accordion System: On < 768px screens, transforms into a full-height drawer with nested expandable accordions.
 * 6. Visuals: Dark glassmorphic theme, Lucide icons, glowing cyan accents, and clear status badges.
 */
export const CascadingNavbar = () => {
  const { theme, toggleTheme, setCommandPaletteOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Desktop Hover & Active State
  const [activeTopId, setActiveTopId] = useState(null);
  const [activeL1Id, setActiveL1Id] = useState(null);
  const [activeL2Id, setActiveL2Id] = useState(null);

  // Boundary Detection: whether cascading flyouts should flip to the left
  const [flipFlyoutLeft, setFlipFlyoutLeft] = useState(false);

  // Mobile Drawer & Accordion States
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileExpandedTop, setMobileExpandedTop] = useState({});
  const [mobileExpandedL1, setMobileExpandedL1] = useState({});
  const [mobileExpandedL2, setMobileExpandedL2] = useState({});

  // Navbar compact on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Safe Hover Buffer Timeout Ref
  const closeTimeoutRef = useRef(null);
  const topNavContainerRef = useRef(null);
  const activeNavButtonRef = useRef({});

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
    setActiveTopId(null);
    setActiveL1Id(null);
    setActiveL2Id(null);
  }, [location.pathname]);

  // Clean timeout helper
  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Mouse leave with 150ms buffer
  const handleNavMouseLeave = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveTopId(null);
      setActiveL1Id(null);
      setActiveL2Id(null);
    }, 150);
  }, [clearCloseTimeout]);

  // Mouse enter on top item
  const handleTopItemMouseEnter = (item) => {
    clearCloseTimeout();
    setActiveTopId(item.id);

    // Screen Boundary Detection: check if dropdown with child columns would overflow viewport
    const btnEl = activeNavButtonRef.current[item.id];
    if (btnEl) {
      const rect = btnEl.getBoundingClientRect();
      // Estimated width of Level 1 (280px) + Level 2 (280px) + Level 3 (280px) = ~840px
      const estimatedMaxWidth = 720;
      if (rect.left + estimatedMaxWidth > window.innerWidth - 24) {
        setFlipFlyoutLeft(true);
      } else {
        setFlipFlyoutLeft(false);
      }
    }

    // Default to first child with children or keep clean
    if (item.children && item.children.length > 0) {
      const firstWithChildren = item.children.find((c) => c.children && c.children.length > 0);
      if (firstWithChildren) {
        setActiveL1Id(firstWithChildren.id);
        if (firstWithChildren.children && firstWithChildren.children[0]?.children) {
          setActiveL2Id(firstWithChildren.children[0].id);
        } else {
          setActiveL2Id(null);
        }
      } else {
        setActiveL1Id(item.children[0].id);
        setActiveL2Id(null);
      }
    } else {
      setActiveL1Id(null);
      setActiveL2Id(null);
    }
  };

  // Hover over Level 1 item
  const handleL1MouseEnter = (l1Item) => {
    clearCloseTimeout();
    setActiveL1Id(l1Item.id);
    if (l1Item.children && l1Item.children.length > 0) {
      const firstL2WithKids = l1Item.children.find((c) => c.children && c.children.length > 0);
      setActiveL2Id(firstL2WithKids ? firstL2WithKids.id : null);
    } else {
      setActiveL2Id(null);
    }
  };

  // Hover over Level 2 item
  const handleL2MouseEnter = (l2Item) => {
    clearCloseTimeout();
    setActiveL2Id(l2Item.id);
  };

  // Navigation click helper
  const handleNavigate = (path) => {
    clearCloseTimeout();
    setActiveTopId(null);
    setActiveL1Id(null);
    setActiveL2Id(null);
    setMobileDrawerOpen(false);
    navigate(path);
  };

  // Mobile Accordion toggles
  const toggleMobileTop = (id) => {
    setMobileExpandedTop((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMobileL1 = (id, e) => {
    e.stopPropagation();
    setMobileExpandedL1((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMobileL2 = (id, e) => {
    e.stopPropagation();
    setMobileExpandedL2((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Find currently active objects for desktop flyout
  const currentTopItem = NAVIGATION_ITEMS.find((item) => item.id === activeTopId);
  const currentL1Item = currentTopItem?.children?.find((item) => item.id === activeL1Id);
  const currentL2Item = currentL1Item?.children?.find((item) => item.id === activeL2Id);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md ${
        isScrolled
          ? 'border-b border-slate-200 dark:border-slate-800/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-2.5'
          : 'border-b border-slate-200/80 dark:border-slate-800/60 py-3.5'
      }`}
    >
      <div
        ref={topNavContainerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
      >
        {/* ========================================================= */}
        {/* BRAND LOGO: School of Future Skills                       */}
        {/* ========================================================= */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
          aria-label="School of Future Skills Platform Home"
          onClick={() => {
            setActiveTopId(null);
            setMobileDrawerOpen(false);
          }}
        >
          {/* Official FSIT Neon Brand Logo (Image 1) */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-[0_0_18px_rgba(242,101,34,0.35)] group-hover:shadow-[0_0_26px_rgba(217,70,239,0.55)] transition-all duration-300 shrink-0 bg-slate-900 border border-fuchsia-500/30 group-hover:border-amber-400/60 flex items-center justify-center p-0.5">
            <img
              src="/fsit-neon-logo.png"
              alt="School of Future Skills Logo"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Logo Wordmark */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base lg:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors uppercase">
                School of Future Skills
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25">
                PORTAL
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden sm:block">
              Learn. Build. Innovate. Lead.
            </span>
          </div>
        </Link>

        {/* ========================================================= */}
        {/* DESKTOP NAVIGATION: 5 Exact Main Items with Cascading Flyouts */}
        {/* ========================================================= */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2 relative"
          onMouseLeave={handleNavMouseLeave}
          onMouseEnter={clearCloseTimeout}
        >
          {NAVIGATION_ITEMS.map((item) => {
            const isTopActive = activeTopId === item.id;
            const isRouteActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

            return (
              <div
                key={item.id}
                ref={(el) => (activeNavButtonRef.current[item.id] = el)}
                className="relative"
                onMouseEnter={() => handleTopItemMouseEnter(item)}
              >
                {/* Main Nav Button */}
                <button
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    isTopActive
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.25)] border border-cyan-400 dark:border-cyan-500/30'
                      : isRouteActive
                      ? 'text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-slate-800/40 border border-transparent'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                  aria-expanded={isTopActive}
                  aria-haspopup="true"
                >
                  <span>{item.title}</span>
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isTopActive ? 'rotate-180 text-cyan-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}

          {/* ======================================================= */}
          {/* DESKTOP MULTI-LEVEL CASCADING FLYOUT CONTAINER          */}
          {/* ======================================================= */}
          {activeTopId && currentTopItem && currentTopItem.children && (
            <div
              className={`absolute top-full pt-3 z-[100] transition-all duration-200 animate-in fade-in zoom-in-95 ${
                flipFlyoutLeft ? 'right-0' : 'left-0'
              }`}
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={handleNavMouseLeave}
            >
              {/* Flyout Multi-Column Flexbox with responsive theme */}
              <div
                className="flex items-start rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-700 shadow-2xl p-2.5 ring-1 ring-slate-200 dark:ring-cyan-500/25"
              >
                
                {/* --------------------------------------------------- */}
                {/* COLUMN 1: Level 1 Dropdown Menu                     */}
                {/* --------------------------------------------------- */}
                <div
                  className="w-72 sm:w-80 flex flex-col gap-1.5 p-1.5 shrink-0 rounded-xl bg-slate-50/70 dark:bg-[#0c1322]"
                >
                  {/* Category Header */}
                  <div
                    className="px-3 py-2 border-b border-slate-200 dark:border-slate-800/90 mb-1 flex items-center justify-between rounded-lg bg-slate-100 dark:bg-[#080d19]"
                  >
                    <span className="text-[11px] font-mono tracking-wider text-cyan-600 dark:text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                      <currentTopItem.icon className="w-3.5 h-3.5" />
                      {currentTopItem.title}
                    </span>
                    <button
                      onClick={() => handleNavigate(currentTopItem.path)}
                      className="text-[11px] text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {currentTopItem.children.map((l1) => {
                    const isL1Active = activeL1Id === l1.id;
                    const hasChildren = Boolean(l1.children && l1.children.length > 0);
                    const L1Icon = l1.icon;

                    return (
                      <div
                        key={l1.id}
                        onMouseEnter={() => handleL1MouseEnter(l1)}
                        onClick={() => !hasChildren && handleNavigate(l1.path)}
                        className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 border ${
                          isL1Active
                            ? 'border-cyan-500/40 text-cyan-900 dark:text-white bg-cyan-500/15 dark:bg-cyan-500/20 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0f172a]'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-lg mt-0.5 transition-colors ${
                              isL1Active
                                ? 'bg-cyan-500/25 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-800'
                            }`}
                          >
                            <L1Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold truncate leading-tight text-slate-900 dark:text-slate-100">
                                {l1.title}
                              </span>
                              {l1.badge && (
                                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 shrink-0">
                                  {l1.badge}
                                </span>
                              )}
                            </div>
                            {l1.description && (
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-normal">
                                {l1.description}
                              </span>
                            )}
                          </div>
                        </div>

                        {hasChildren && (
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                              isL1Active ? 'text-cyan-500 dark:text-cyan-400 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* --------------------------------------------------- */}
                {/* COLUMN 2: Level 2 Cascading Menu                    */}
                {/* --------------------------------------------------- */}
                {currentL1Item && currentL1Item.children && currentL1Item.children.length > 0 && (
                  <div
                    className="w-72 sm:w-80 border-l border-slate-200 dark:border-slate-700/80 pl-2.5 flex flex-col gap-1.5 p-1.5 shrink-0 rounded-xl bg-slate-50/70 dark:bg-[#0c1322] animate-in fade-in slide-in-from-left-2 duration-150"
                  >
                    <div
                      className="px-3 py-2 border-b border-slate-200 dark:border-slate-800/90 mb-1 flex items-center justify-between rounded-lg bg-slate-100 dark:bg-[#080d19]"
                    >
                      <span className="text-[11px] font-mono tracking-wider text-slate-800 dark:text-slate-200 font-bold uppercase truncate">
                        {currentL1Item.title}
                      </span>
                      <button
                        onClick={() => handleNavigate(currentL1Item.path)}
                        className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        Explore <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {currentL1Item.children.map((l2) => {
                      const isL2Active = activeL2Id === l2.id;
                      const hasL2Children = Boolean(l2.children && l2.children.length > 0);
                      const L2Icon = l2.icon;

                      return (
                        <div
                          key={l2.id}
                          onMouseEnter={() => handleL2MouseEnter(l2)}
                          onClick={() => !hasL2Children && handleNavigate(l2.path)}
                          className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 border ${
                            isL2Active
                              ? 'border-cyan-500/40 text-cyan-900 dark:text-white bg-cyan-500/15 dark:bg-cyan-500/20 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0f172a]'
                          }`}
                          role="menuitem"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div
                              className={`p-2 rounded-lg mt-0.5 transition-colors ${
                                isL2Active
                                  ? 'bg-cyan-500/25 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40'
                                  : 'bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-800'
                              }`}
                            >
                              <L2Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold truncate leading-tight text-slate-900 dark:text-slate-100">
                                  {l2.title}
                                </span>
                                {l2.badge && (
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 shrink-0">
                                    {l2.badge}
                                  </span>
                                )}
                              </div>
                              {l2.description && (
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-normal">
                                  {l2.description}
                                </span>
                              )}
                            </div>
                          </div>

                          {hasL2Children && (
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                                isL2Active ? 'text-cyan-500 dark:text-cyan-400 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* --------------------------------------------------- */}
                {/* COLUMN 3: Level 3 Cascading Menu                    */}
                {/* --------------------------------------------------- */}
                {currentL2Item && currentL2Item.children && currentL2Item.children.length > 0 && (
                  <div
                    className="w-72 sm:w-80 border-l border-slate-200 dark:border-slate-700/80 pl-2.5 flex flex-col gap-1.5 p-1.5 shrink-0 rounded-xl bg-slate-50/70 dark:bg-[#0c1322] animate-in fade-in slide-in-from-left-2 duration-150"
                  >
                    <div
                      className="px-3 py-2 border-b border-slate-200 dark:border-slate-800/90 mb-1 flex items-center justify-between rounded-lg bg-slate-100 dark:bg-[#080d19]"
                    >
                      <span className="text-[11px] font-mono tracking-wider text-slate-800 dark:text-slate-200 font-bold uppercase truncate">
                        {currentL2Item.title}
                      </span>
                      <button
                        onClick={() => handleNavigate(currentL2Item.path)}
                        className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        Explore <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {currentL2Item.children.map((l3) => {
                      const L3Icon = l3.icon;

                      return (
                        <div
                          key={l3.id}
                          onClick={() => handleNavigate(l3.path)}
                          className="group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 border border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 hover:border-cyan-500/40 hover:text-cyan-900 dark:hover:text-white bg-white dark:bg-[#0f172a]"
                          role="menuitem"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="p-2 rounded-lg mt-0.5 bg-slate-100 dark:bg-slate-800/90 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700/60 group-hover:bg-cyan-500/20 transition-colors">
                              <L3Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold truncate leading-tight text-slate-900 dark:text-slate-100">
                                  {l3.title}
                                </span>
                                {l3.badge && (
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 shrink-0">
                                    {l3.badge}
                                  </span>
                                )}
                              </div>
                              {l3.description && (
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-normal">
                                  {l3.description}
                                </span>
                              )}
                            </div>
                          </div>

                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>
          )}
        </nav>

        {/* ========================================================= */}
        {/* RIGHT UTILITIES: Search, Theme Toggle, Mobile Hamburger    */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700/60 transition-all duration-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden lg:inline text-slate-600 dark:text-slate-400 font-medium">Quick Search...</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>

          {/* Mobile Hamburger Drawer Toggle (< 768px) */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileDrawerOpen}
          >
            {mobileDrawerOpen ? <X className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE ACCORDION DRAWER (< 768px)                          */}
      {/* ========================================================= */}
      {mobileDrawerOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[65px] bottom-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] overflow-y-auto px-4 py-6 z-50 animate-in fade-in duration-200 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span>Future Skills Navigation</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">5 Departments</span>
            </div>

            {NAVIGATION_ITEMS.map((item) => {
              const isTopExpanded = Boolean(mobileExpandedTop[item.id]);
              const ItemIcon = item.icon;

              return (
                <div key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/90 overflow-hidden">
                  {/* Top Level Item Header */}
                  <div
                    className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                    onClick={() => toggleMobileTop(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm tracking-wide text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(item.path);
                        }}
                        className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline px-2 py-1 rounded bg-slate-200 dark:bg-slate-800/60 font-semibold"
                      >
                        Visit
                      </button>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isTopExpanded ? 'rotate-180 text-cyan-500 dark:text-cyan-400' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Level 1 Accordion Content */}
                  {isTopExpanded && item.children && (
                    <div
                      className="px-3 pb-3 pt-1 border-t border-slate-200 dark:border-slate-800/70 bg-slate-100/60 dark:bg-[#070b14] flex flex-col gap-2"
                    >
                      {item.children.map((l1) => {
                        const isL1Expanded = Boolean(mobileExpandedL1[l1.id]);
                        const hasL1Kids = Boolean(l1.children && l1.children.length > 0);
                        const L1Icon = l1.icon;

                        return (
                          <div key={l1.id} className="rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/60 overflow-hidden">
                            <div
                              className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                              onClick={(e) => {
                                if (hasL1Kids) {
                                  toggleMobileL1(l1.id, e);
                                } else {
                                  handleNavigate(l1.path);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <L1Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                                  {l1.title}
                                </span>
                                {l1.badge && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                                    {l1.badge}
                                  </span>
                                )}
                              </div>

                              {hasL1Kids ? (
                                <ChevronDown
                                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                    isL1Expanded ? 'rotate-180 text-cyan-500 dark:text-cyan-400' : ''
                                  }`}
                                />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </div>

                            {/* Level 2 Accordion Content */}
                            {isL1Expanded && l1.children && (
                              <div className="pl-4 pr-2 py-2 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/70 border-l-2 border-cyan-500/30 ml-3 my-1 flex flex-col gap-1.5">
                                {l1.children.map((l2) => {
                                  const isL2Expanded = Boolean(mobileExpandedL2[l2.id]);
                                  const hasL2Kids = Boolean(l2.children && l2.children.length > 0);
                                  const L2Icon = l2.icon;

                                  return (
                                    <div key={l2.id} className="rounded bg-white dark:bg-slate-900/50 p-2 border border-slate-200 dark:border-slate-800/40">
                                      <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={(e) => {
                                          if (hasL2Kids) {
                                            toggleMobileL2(l2.id, e);
                                          } else {
                                            handleNavigate(l2.path);
                                          }
                                        }}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <L2Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                          <span className="text-xs font-medium text-slate-800 dark:text-slate-300 truncate">
                                            {l2.title}
                                          </span>
                                        </div>
                                        {hasL2Kids ? (
                                          <ChevronDown
                                            className={`w-3 h-3 text-slate-400 transition-transform ${
                                              isL2Expanded ? 'rotate-180 text-cyan-500 dark:text-cyan-400' : ''
                                            }`}
                                          />
                                        ) : (
                                          <ArrowRight className="w-3 h-3 text-slate-400" />
                                        )}
                                      </div>

                                      {/* Level 3 Accordion Content */}
                                      {isL2Expanded && l2.children && (
                                        <div className="pl-3 pr-1 py-1.5 border-l-2 border-blue-500/30 ml-2 mt-1.5 flex flex-col gap-1">
                                          {l2.children.map((l3) => {
                                            const L3Icon = l3.icon;
                                            return (
                                              <button
                                                key={l3.id}
                                                type="button"
                                                onClick={() => handleNavigate(l3.path)}
                                                className="flex items-center justify-between py-1 px-1.5 text-left text-[11px] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                                              >
                                                <div className="flex items-center gap-1.5">
                                                  <L3Icon className="w-3 h-3 text-cyan-600 dark:text-cyan-400/80" />
                                                  <span>{l3.title}</span>
                                                </div>
                                                <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                                              </button>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Footer Quick Actions */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>© 2026 Future Skills Portal</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400">v2.5.0 Production</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default CascadingNavbar;
