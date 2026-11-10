import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { LiveWebsiteThumbnail } from '../cards/LiveWebsiteThumbnail';
import { getAssetUrl } from '../../utils/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const AUTO_ADVANCE_DELAY_MS = 7000; // Exactly 7 seconds between automatic rotations
export const TRANSITION_DURATION_MS = 650; // Controlled 650ms 3D transition

/**
 * InfiniteProjectShowcase Component
 *
 * True Cyclic 3D Project Carousel:
 * - One continuous cyclic collection of exactly 7 genuine department projects.
 * - Single active project index; no duplicate cards, no separate disconnected queues.
 * - Clockwise rotation (Right Arrow / Autoplay): active project moves down to the end of the thumbnail line,
 *   next project rises from the first thumbnail into the featured stage.
 * - Reverse rotation (Left Arrow): previous project rises from the last thumbnail into the featured stage.
 * - Strict 3D Animation Hierarchy: Only the featured card receives 3D depth/perspective.
 *   Inactive thumbnails remain visually stable with simple positional shifts.
 * - 6-column clean thumbnail layout on desktop: zero horizontal scrollbar, zero clipped cards.
 * - Automatic rotation: advances every 7 seconds, pauses on hover, focus, tab switch, or user interaction.
 * - Accessible controls, keyboard navigation (Left/Right arrows, Space/P pause).
 */
export const InfiniteProjectShowcase = ({
  projects = [],
  onSelectProject = null,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const showcaseRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const { isMobile, prefersReducedMotion } = useReducedMotion();

  const total = projects.length;
  const activeProject = projects[activeIndex] || projects[0];

  // Derive the 6 thumbnail projects from the same single collection in circular order
  // When active is 0 (Dimpy): thumbnails are [PixelMeFaizan, Sarvagya, Binary, SpendWise, EduTrack, Aashima]
  // When active is 1 (PixelMeFaizan): thumbnails are [Sarvagya, Binary, SpendWise, EduTrack, Aashima, Dimpy]
  const thumbnailProjects = useMemo(() => {
    if (total <= 1) return [];
    const thumbnails = [];
    for (let i = 1; i < total; i++) {
      const idx = (activeIndex + i) % total;
      thumbnails.push({
        project: projects[idx],
        projectIndex: idx,
        thumbnailPosition: i - 1,
      });
    }
    return thumbnails;
  }, [projects, activeIndex, total]);

  // Clockwise Rotation (Right Arrow / Next)
  const handleNext = useCallback(() => {
    if (isTransitioning || total <= 1) return;
    setIsTransitioning(true);
    setDirection('next');
    setProgress(0);
    startTimeRef.current = Date.now();

    setActiveIndex((prev) => (prev + 1) % total);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);
  }, [isTransitioning, total]);

  // Reverse Rotation (Left Arrow / Previous)
  const handlePrev = useCallback(() => {
    if (isTransitioning || total <= 1) return;
    setIsTransitioning(true);
    setDirection('prev');
    setProgress(0);
    startTimeRef.current = Date.now();

    setActiveIndex((prev) => (prev - 1 + total) % total);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);
  }, [isTransitioning, total]);

  // Direct Thumbnail Selection: make clicked project featured
  const handleSelectThumbnail = useCallback((targetIndex) => {
    if (isTransitioning || targetIndex === activeIndex) return;
    setIsTransitioning(true);

    // Determine circular direction (forward or backward)
    const forwardSteps = (targetIndex - activeIndex + total) % total;
    const backwardSteps = (activeIndex - targetIndex + total) % total;
    setDirection(forwardSteps <= backwardSteps ? 'next' : 'prev');

    setProgress(0);
    startTimeRef.current = Date.now();
    setActiveIndex(targetIndex);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);
  }, [activeIndex, isTransitioning, total]);

  // Toggle Autoplay Pause / Resume
  const togglePlayPause = () => {
    setIsPaused((prev) => !prev);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  // Keyboard Navigation: Left/Right Arrow & Space/P
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlayPause();
      }
    }
  };

  // Autoplay Loop with 7000ms delay and progress indicator
  useEffect(() => {
    const shouldRunAutoplay = !isPaused && !isHovered && !isMobile && !prefersReducedMotion && total > 1;

    if (!shouldRunAutoplay) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    const tickMs = 50;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_ADVANCE_DELAY_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTO_ADVANCE_DELAY_MS) {
        handleNext();
      }
    }, tickMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, isHovered, isMobile, prefersReducedMotion, total, handleNext, activeIndex]);

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

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  if (!activeProject) return null;

  return (
    <section
      ref={showcaseRef}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Department Projects & Digital Creations 3D Carousel"
      aria-live="polite"
      className="relative rounded-3xl p-5 sm:p-7 lg:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/25 shadow-2xl overflow-hidden group/showcase focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* ---------------------------------------------------- */}
      {/* 1. TOP CAROUSEL CONTROLS BAR                         */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-20 flex items-center justify-between pb-5 border-b border-slate-800/80">
        {/* Exhibition Brand & Project Position */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Creations Exhibition</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            <span className="font-bold text-white">0{activeIndex + 1}</span>
            <span className="text-slate-600"> / </span>
            <span>0{total}</span>
          </span>
        </div>

        {/* Carousel Arrow Controls & Play/Pause */}
        <div className="flex items-center gap-2">
          {/* Pause / Resume Button */}
          <button
            onClick={togglePlayPause}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isPaused
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-cyan-500/40 hover:text-white'
            }`}
            aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
            title={isPaused ? "Resume rotation (Space)" : "Pause rotation (Space)"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Left Arrow (Previous Project) */}
          <button
            onClick={handlePrev}
            type="button"
            disabled={isTransitioning}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-cyan-500/20 active:scale-95"
            aria-label={`Previous project (currently: ${activeProject.name})`}
            title="Previous project (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow (Next Project) */}
          <button
            onClick={handleNext}
            type="button"
            disabled={isTransitioning}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-cyan-500/20 active:scale-95"
            aria-label="Next project"
            title="Next project (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Autoplay Hairline Indicator */}
      <div className="relative w-full h-0.5 bg-slate-800/80 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 transition-all duration-100 ease-linear ${
            isPaused || isHovered ? 'opacity-40' : 'opacity-100'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN FEATURED PROJECT STAGE (Controlled 3D Depth) */}
      {/* ---------------------------------------------------- */}
      <div
        className="relative z-10 py-6 sm:py-8"
        style={{ perspective: prefersReducedMotion ? 'none' : '1200px' }}
      >
        <div
          key={activeProject.id}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center transition-all ${
            prefersReducedMotion
              ? 'duration-300 opacity-100'
              : 'duration-650 ease-[cubic-bezier(0.16,1,0.3,1)]'
          }`}
          style={
            prefersReducedMotion
              ? {}
              : {
                  transform: isTransitioning
                    ? direction === 'next'
                      ? 'translateY(20px) translateZ(-40px) rotateY(-3.5deg) scale(0.97)'
                      : 'translateY(20px) translateZ(-40px) rotateY(3.5deg) scale(0.97)'
                    : 'translateY(0) translateZ(0) rotateY(0deg) scale(1)',
                  opacity: isTransitioning ? 0.9 : 1,
                  transformStyle: 'preserve-3d',
                }
          }
        >
          {/* Featured Large Viewport Preview (Left Column) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950 relative group/thumb">
            <LiveWebsiteThumbnail
              project={activeProject}
              aspectRatio="aspect-[16/10]"
              instanceId={`featured-${activeProject.id}`}
              showCategoryBadge={false}
              showStatusBadge={false}
              onSelect={onSelectProject}
            />
          </div>

          {/* Synchronized Project Information (Right Column) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Category Pill */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                {activeProject.category}
              </span>
            </div>

            {/* Project Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {activeProject.name}
            </h2>

            {/* Creator / Team & Academic Details */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{activeProject.creators || activeProject.studentTeam}</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono">{activeProject.year}</span>
            </div>

            {/* Genuine Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Key Verified Feature Highlights */}
            {activeProject.highlights && activeProject.highlights.length > 0 && (
              <div className="space-y-1.5 pt-1 text-xs">
                {activeProject.highlights.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Verified Technology Tags */}
            {activeProject.technologies && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-800/90 text-cyan-200 border border-slate-700/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Primary Action Button: View Live Project */}
            <div className="pt-2">
              {activeProject.url && (
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. THUMBNAIL LINE (6 Remaining Inactive Projects)    */}
      {/* Clean 6-column grid: NO horizontal scrollbar, stable */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {thumbnailProjects.map(({ project, projectIndex }) => (
            <button
              key={project.id}
              onClick={() => handleSelectThumbnail(projectIndex)}
              type="button"
              className="group/thumb-card text-left rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Select ${project.name} as featured project`}
            >
              {/* Thumbnail Image (Strictly stable, NO 3D rotation) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={getAssetUrl(project.image)}
                  alt={`${project.name} thumbnail`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb-card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/thumb-card:opacity-30 transition-opacity" />
                <span className="absolute bottom-1 left-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-cyan-500/20 backdrop-blur-sm truncate max-w-[90%]">
                  {project.category}
                </span>
              </div>

              {/* Title & Creator */}
              <div className="p-2 space-y-0.5 bg-slate-900/95">
                <h4 className="text-xs font-bold text-white truncate group-hover/thumb-card:text-cyan-300 transition-colors">
                  {project.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate">
                  {project.creators || project.studentTeam}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteProjectShowcase;
