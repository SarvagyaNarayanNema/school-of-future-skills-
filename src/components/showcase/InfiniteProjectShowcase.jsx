import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  ThumbsUp,
  Sparkles,
  Users,
  CheckCircle2,
  Eye,
  Layers
} from 'lucide-react';
import { LiveWebsiteThumbnail } from '../cards/LiveWebsiteThumbnail';
import { getAssetUrl } from '../../utils/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const AUTOPLAY_INTERVAL = 9500; // 9.5s rotation
const TRANSITION_DURATION = 650; // 650ms smooth 3D transition

/**
 * InfiniteProjectShowcase Component
 *
 * Premium 3D Infinite Project Exhibition:
 * - Central Featured Stage: prominent 3D perspective transition on incoming/outgoing cards.
 * - Horizontal Project Queue: stable, organized rail of remaining 6 projects with smooth translateX.
 * - Circular Infinite Navigation: seamlessly wraps between project 1 and 7.
 * - Strictly Controlled 3D Motion: max 3-5 deg subtle Y-axis tilt, zero wild spins or bouncing.
 * - Inactive Thumbnails: strictly stable with positional shift only (no independent 3D rotation).
 * - Automatic Infinite Rotation: pauses on hover, focus, manual interaction, or tab hide.
 * - Live Website Preview: active featured project mounts live iframe on hover without blocking loaders.
 * - Full Accessibility & Keyboard Navigation: ArrowLeft/ArrowRight, Spacebar/P pause toggle.
 * - Reduced Motion Support: falls back to clean opacity crossfades.
 */
export const InfiniteProjectShowcase = ({
  projects = [],
  onUpvote = null,
  onSelectProject = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const showcaseRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const { isMobile, prefersReducedMotion } = useReducedMotion();

  const total = projects.length;
  const activeProject = projects[currentIndex] || projects[0];

  // The remaining projects in circular queue order
  const queueProjects = useMemo(() => {
    if (total <= 1) return [];
    const queue = [];
    for (let i = 1; i < total; i++) {
      const idx = (currentIndex + i) % total;
      queue.push({
        project: projects[idx],
        originalIndex: idx,
        queuePosition: i - 1,
      });
    }
    return queue;
  }, [projects, currentIndex, total]);

  // Navigate to Next project
  const handleNext = useCallback(() => {
    if (isTransitioning || total <= 1) return;
    setIsTransitioning(true);
    setDirection('next');
    setProgress(0);
    startTimeRef.current = Date.now();

    setCurrentIndex((prev) => (prev + 1) % total);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning, total]);

  // Navigate to Previous project
  const handlePrev = useCallback(() => {
    if (isTransitioning || total <= 1) return;
    setIsTransitioning(true);
    setDirection('prev');
    setProgress(0);
    startTimeRef.current = Date.now();

    setCurrentIndex((prev) => (prev - 1 + total) % total);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning, total]);

  // Direct Selection of a project from the Queue
  const handleSelectFromQueue = useCallback((targetIndex) => {
    if (isTransitioning || targetIndex === currentIndex) return;
    setIsTransitioning(true);
    // Determine shortest circular direction
    const forwardDistance = (targetIndex - currentIndex + total) % total;
    const backwardDistance = (currentIndex - targetIndex + total) % total;
    setDirection(forwardDistance <= backwardDistance ? 'next' : 'prev');

    setProgress(0);
    startTimeRef.current = Date.now();
    setCurrentIndex(targetIndex);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [currentIndex, isTransitioning, total]);

  // Pause / Resume Autoplay
  const togglePlayPause = () => {
    setIsPaused((prev) => !prev);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
      // Toggle pause if active element is not a button or link
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlayPause();
      }
    }
  };

  // Autoplay and Progress Bar Logic
  useEffect(() => {
    // Disable autoplay on mobile by default or when reduced motion is preferred
    const shouldRunAutoplay = !isPaused && !isHovered && !isMobile && !prefersReducedMotion && total > 1;

    if (!shouldRunAutoplay) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    const updateFrequency = 50; // Update progress bar every 50ms

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTOPLAY_INTERVAL) {
        handleNext();
      }
    }, updateFrequency);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, isHovered, isMobile, prefersReducedMotion, total, handleNext, currentIndex]);

  // Handle Tab Visibility (Pause when browser tab is inactive)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
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
      aria-label="Department Projects & Digital Creations 3D Exhibition"
      aria-live="polite"
      className="relative rounded-3xl p-5 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-cyan-950/50 border border-cyan-500/30 shadow-2xl overflow-hidden group/showcase focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ---------------------------------------------------- */}
      {/* 1. TOP HEADER & CAROUSEL NAVIGATION CONTROLS        */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        {/* Exhibition Badge */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Exhibition • 3D Showcase</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
            <span>Project</span>
            <span className="font-bold text-white">0{currentIndex + 1}</span>
            <span>/</span>
            <span>0{total}</span>
          </span>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Pause / Play Button */}
          <button
            onClick={togglePlayPause}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isPaused
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-cyan-500/40 hover:text-white'
            }`}
            aria-label={isPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
            title={isPaused ? "Resume rotation (Space)" : "Pause rotation (Space)"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            type="button"
            disabled={isTransitioning}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-cyan-500/20 active:scale-95"
            aria-label={`Previous project (currently showing ${activeProject.name})`}
            title="Previous project (Left arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Position Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSelectFromQueue(idx)}
                type="button"
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to project ${idx + 1}: ${p.name}`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            type="button"
            disabled={isTransitioning}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-cyan-500/20 active:scale-95"
            aria-label="Next project"
            title="Next project (Right arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Autoplay Hairline Progress Bar */}
      <div className="relative w-full h-0.5 bg-slate-800/80 overflow-hidden mt-0">
        <div
          className={`h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 transition-all duration-100 ease-linear ${
            isPaused || isHovered ? 'opacity-50' : 'opacity-100'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. FEATURED PROJECT STAGE (Active Project Presentation) */}
      {/* ---------------------------------------------------- */}
      <div
        className="relative z-10 pt-8 pb-8"
        style={{ perspective: prefersReducedMotion ? 'none' : '1400px' }}
      >
        <div
          key={activeProject.id}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all ${
            prefersReducedMotion
              ? 'duration-300 opacity-100'
              : 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
          }`}
          style={
            prefersReducedMotion
              ? {}
              : {
                  transform: isTransitioning
                    ? direction === 'next'
                      ? 'translateY(16px) translateZ(-40px) rotateY(-3deg) scale(0.97)'
                      : 'translateY(16px) translateZ(-40px) rotateY(3deg) scale(0.97)'
                    : 'translateY(0) translateZ(0) rotateY(0deg) scale(1)',
                  opacity: isTransitioning ? 0.85 : 1,
                  transformStyle: 'preserve-3d',
                }
          }
        >
          {/* Visual Showcase (Featured Large Viewport) */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950 relative group/thumb">
            <LiveWebsiteThumbnail
              project={activeProject}
              aspectRatio="aspect-[16/10]"
              instanceId={`featured-${activeProject.id}`}
              showCategoryBadge={false}
              showStatusBadge={false}
              onSelect={onSelectProject}
            />

            {/* Stage Indicator Pill */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Active
              </span>
            </div>

            {/* Direct Inspection Shortcut Button */}
            {onSelectProject && (
              <button
                onClick={() => onSelectProject(activeProject)}
                type="button"
                className="hidden sm:inline-flex items-center gap-1 absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-cyan-300 text-xs font-semibold backdrop-blur-md hover:bg-slate-900 transition-colors shadow-lg"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quick Inspect</span>
              </button>
            )}
          </div>

          {/* Synchronized Project Information */}
          <div className="lg:col-span-6 space-y-4">
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                {activeProject.category}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeProject.linkVerificationStatus}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {activeProject.name}
            </h2>

            {/* Creator / Team & Academic Details */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeProject.creators || activeProject.studentTeam}</span>
              </div>
              <span>•</span>
              <span className="text-slate-400 font-mono">{activeProject.year}</span>
            </div>

            {/* Verified Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {activeProject.description}
            </p>

            {/* Verified Feature Highlights */}
            {activeProject.highlights && activeProject.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                {activeProject.highlights.slice(0, 2).map((hl, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-medium truncate">{hl}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            {activeProject.technologies && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800/90 text-cyan-200 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {activeProject.url && (
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {onUpvote && (
                <button
                  onClick={() => onUpvote(activeProject.id)}
                  type="button"
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border transition-colors ${
                    activeProject.hasUpvoted
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  aria-label="Applaud active project"
                >
                  <ThumbsUp className={`w-4 h-4 ${activeProject.hasUpvoted ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                  <span>{activeProject.upvotes || 0} Applauds</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. PROJECT QUEUE (Remaining 6 Inactive Projects)      */}
      {/* Strictly stable thumbnails: simple horizontal shift  */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-10 pt-6 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exhibition Project Queue ({queueProjects.length} upcoming creations)</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any thumbnail to feature immediately
          </span>
        </div>

        {/* Stable Horizontal Queue Rail */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none pt-1">
          {queueProjects.map(({ project, originalIndex }) => (
            <button
              key={project.id}
              onClick={() => handleSelectFromQueue(originalIndex)}
              type="button"
              className="group/item flex-shrink-0 w-44 sm:w-52 text-left rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Select ${project.name} as featured project`}
            >
              {/* Thumbnail Screenshot (Visually stable, NO 3D rotation) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={getAssetUrl(project.image)}
                  alt={`${project.name} preview`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/item:opacity-30 transition-opacity" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-cyan-500/20 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-2.5 space-y-1 bg-slate-900/95">
                <h4 className="text-xs font-bold text-white truncate group-hover/item:text-cyan-300 transition-colors">
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
