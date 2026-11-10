import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { initialProjects, PROJECT_CATEGORIES } from '../data/projects';
import { ProjectCard } from '../components/cards/ProjectCard';
import { FeaturedDestinationStage, AUTO_ADVANCE_INTERVAL_MS, TRANSITION_DURATION_MS } from '../components/showcase/FeaturedDestinationStage';
import { EmptyState } from '../components/common/EmptyState';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getAssetUrl } from '../utils/assets';
import {
  Code2,
  Sparkles,
  Search,
  ExternalLink,
  ThumbsUp,
  X,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const Projects = () => {
  const [projects, setProjects] = useState(() => projectService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { earnPoints } = useApp();
  const { isMobile, prefersReducedMotion } = useReducedMotion();
  const autoplayTimerRef = useRef(null);

  const activeProject = projects[activeIndex] || projects[0];

  const handleUpvote = (id) => {
    const updated = projectService.upvote(id);
    setProjects(projectService.getAll());
    if (updated?.hasUpvoted && earnPoints) {
      earnPoints(10, 'Applauded department innovation showcase');
    }
  };

  // Filter projects by search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.creators && p.creators.toLowerCase().includes(q)) ||
        (p.studentTeam && p.studentTeam.toLowerCase().includes(q)) ||
        (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === 'All Projects' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  // Physical Card Transfer between Gallery slot and Featured Destination Area
  const transferCard = useCallback((targetIndex) => {
    if (isTransitioning || targetIndex === activeIndex || targetIndex < 0 || targetIndex >= projects.length) {
      return;
    }

    const currentProject = projects[activeIndex];
    const nextProject = projects[targetIndex];

    // Fallback for reduced motion: instant state change
    if (prefersReducedMotion) {
      setActiveIndex(targetIndex);
      return;
    }

    const featuredEl = document.getElementById('featured-stage-preview');
    const targetCardEl = document.getElementById(`gallery-card-${nextProject.id}`);
    const currentPlaceholderEl = document.getElementById(`gallery-card-${currentProject.id}`);

    // If DOM elements aren't ready (e.g. during search filter), update directly
    if (!featuredEl || !targetCardEl) {
      setActiveIndex(targetIndex);
      return;
    }

    const featuredRect = featuredEl.getBoundingClientRect();
    const targetRect = targetCardEl.getBoundingClientRect();
    const destRect = currentPlaceholderEl ? currentPlaceholderEl.getBoundingClientRect() : targetRect;

    setIsTransitioning(true);

    // Create a temporary fixed FLIP flight container
    const flightContainer = document.createElement('div');
    flightContainer.id = 'gsap-card-flight-container';
    flightContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;perspective:1400px;overflow:hidden;';
    document.body.appendChild(flightContainer);

    // Incoming proxy: starts at target card in gallery, flies up and expands into featured stage
    const incomingProxy = document.createElement('div');
    incomingProxy.className = 'rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-400 bg-slate-950';
    incomingProxy.style.cssText = `
      position: fixed;
      left: ${targetRect.left}px;
      top: ${targetRect.top}px;
      width: ${targetRect.width}px;
      height: ${targetRect.height}px;
      transform-origin: center center;
      transform-style: preserve-3d;
      box-shadow: 0 25px 50px -12px rgba(6, 182, 212, 0.4);
      z-index: 10001;
    `;
    incomingProxy.innerHTML = `
      <img src="${getAssetUrl(nextProject.image)}" class="w-full h-full object-cover object-top" />
    `;
    flightContainer.appendChild(incomingProxy);

    // Outgoing proxy: starts at featured stage, flies down and shrinks into its gallery placeholder
    const outgoingProxy = document.createElement('div');
    outgoingProxy.className = 'rounded-2xl overflow-hidden shadow-xl border border-slate-700 bg-slate-950';
    outgoingProxy.style.cssText = `
      position: fixed;
      left: ${featuredRect.left}px;
      top: ${featuredRect.top}px;
      width: ${featuredRect.width}px;
      height: ${featuredRect.height}px;
      transform-origin: center center;
      transform-style: preserve-3d;
      z-index: 10000;
    `;
    outgoingProxy.innerHTML = `
      <img src="${getAssetUrl(currentProject.image)}" class="w-full h-full object-cover object-top" />
    `;
    flightContainer.appendChild(outgoingProxy);

    // Temporarily hide original elements so only the flying proxies are visible
    targetCardEl.style.opacity = '0';
    featuredEl.style.opacity = '0';

    const tl = gsap.timeline({
      onComplete: () => {
        if (document.body.contains(flightContainer)) {
          document.body.removeChild(flightContainer);
        }
        targetCardEl.style.opacity = '1';
        featuredEl.style.opacity = '1';

        setActiveIndex(targetIndex);
        setIsTransitioning(false);
      }
    });

    const flightDuration = TRANSITION_DURATION_MS / 1000;

    // Incoming card rises, scales up, brings forward in Z
    tl.to(incomingProxy, {
      left: featuredRect.left,
      top: featuredRect.top,
      width: featuredRect.width,
      height: featuredRect.height,
      rotateY: 0,
      z: 40,
      duration: flightDuration,
      ease: 'power2.out',
    }, 0);

    // Outgoing card descends, scales down, moves backward in Z
    tl.to(outgoingProxy, {
      left: destRect.left,
      top: destRect.top,
      width: destRect.width,
      height: destRect.height,
      rotateY: -3.5,
      z: -40,
      opacity: 0.85,
      duration: flightDuration,
      ease: 'power2.inOut',
    }, 0);

  }, [activeIndex, isTransitioning, projects, prefersReducedMotion]);

  // Next / Previous Navigation Handlers
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (activeIndex + 1) % projects.length;
    transferCard(nextIdx);
  }, [activeIndex, isTransitioning, projects.length, transferCard]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    transferCard(prevIdx);
  }, [activeIndex, isTransitioning, projects.length, transferCard]);

  // Autoplay Loop: Advances every 2000ms (waits for transition to complete)
  useEffect(() => {
    const shouldAutoplay =
      !isPaused &&
      !isHovered &&
      !isMobile &&
      !prefersReducedMotion &&
      selectedCategory === 'All Projects' &&
      !searchQuery &&
      projects.length > 1;

    if (!shouldAutoplay) {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setTimeout(() => {
      if (!isTransitioning) {
        const nextIdx = (activeIndex + 1) % projects.length;
        transferCard(nextIdx);
      }
    }, AUTO_ADVANCE_INTERVAL_MS);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [
    activeIndex,
    isPaused,
    isHovered,
    isMobile,
    prefersReducedMotion,
    selectedCategory,
    searchQuery,
    isTransitioning,
    transferCard,
    projects.length
  ]);

  // Pause when browser tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Global Keyboard Navigation (ArrowLeft, ArrowRight, Space/P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
          e.preventDefault();
          setIsPaused((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Department Showcase', path: '/projects' }, { label: 'Projects & Digital Creations' }]} />

      {/* Main Section Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Department Engineering &amp; Creative Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Built With Vision.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500">
            Created With Technology.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explore digital experiences, creative applications, interactive 3D simulations, and community platforms developed by the students, innovators, and engineering cohorts of the School of Future Skills at Scope Global Skills University.
        </p>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 1. FEATURED DESTINATION AREA (No duplicate queue)    */}
      {/* ---------------------------------------------------- */}
      {selectedCategory === 'All Projects' && !searchQuery && (
        <FeaturedDestinationStage
          project={activeProject}
          currentIndex={activeIndex}
          totalProjects={projects.length}
          onNext={handleNext}
          onPrev={handlePrev}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((prev) => !prev)}
          isTransitioning={isTransitioning}
          onSelectModal={setSelectedProjectModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. FILTER & SEARCH CONTROL BAR                       */}
      {/* ---------------------------------------------------- */}
      <section className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, creator, or tech stack..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProjects.length}</span> verified department {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200 dark:border-slate-800/80">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. ORIGINAL PROJECT GALLERY GRID (Single Source)     */}
      {/* Holds in-place placeholder for currently featured card*/}
      {/* ---------------------------------------------------- */}
      {filteredProjects.length > 0 ? (
        <section
          aria-label="Department Projects Gallery"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {filteredProjects.map((p) => {
            const isFeatured = p.id === activeProject.id && selectedCategory === 'All Projects' && !searchQuery;

            // In-place placeholder when elevated to featured area above
            if (isFeatured) {
              return (
                <div
                  key={p.id}
                  id={`gallery-card-${p.id}`}
                  className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-900/30 min-h-[460px] p-6 flex flex-col items-center justify-center text-center space-y-4 select-none transition-all"
                  aria-label={`${p.name} is currently featured above`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
                    <Sparkles className="w-7 h-7 animate-pulse text-cyan-400" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                      Elevated to Featured Stage ↑
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-[220px] mx-auto">
                      Original gallery slot reserved for physical return animation.
                    </p>
                  </div>
                </div>
              );
            }

            // Normal gallery card: clicking it physically flies it to the featured area!
            return (
              <div
                key={p.id}
                id={`gallery-card-${p.id}`}
                onClick={() => {
                  const fullIndex = projects.findIndex((item) => item.id === p.id);
                  if (fullIndex !== -1) transferCard(fullIndex);
                }}
                className="cursor-pointer transition-transform hover:-translate-y-1"
                title={`Click to feature ${p.name} in stage`}
              >
                <ProjectCard
                  project={p}
                  onUpvote={handleUpvote}
                  onSelect={setSelectedProjectModal}
                />
              </div>
            );
          })}
        </section>
      ) : (
        <EmptyState
          title="No projects match your filter"
          description="Try selecting another category or searching for another keyword like '3D', 'AI', or 'React'."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All Projects');
          }}
        />
      )}

      {/* LIGHTWEIGHT PROJECT DETAIL MODAL */}
      {selectedProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 border border-cyan-500/30 shadow-2xl bg-slate-900/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  {selectedProjectModal.category}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedProjectModal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Built by {selectedProjectModal.creators || selectedProjectModal.studentTeam}
                </p>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProjectModal.description}
            </p>

            {selectedProjectModal.highlights && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Project Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProjectModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProjectModal.technologies && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Technologies Utilized
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectModal.technologies.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                {selectedProjectModal.year}
              </span>
              {selectedProjectModal.url && (
                <a
                  href={selectedProjectModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
