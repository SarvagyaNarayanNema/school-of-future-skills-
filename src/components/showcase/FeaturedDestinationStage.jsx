import React from 'react';
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

export const AUTO_ADVANCE_INTERVAL_MS = 2000;
export const TRANSITION_DURATION_MS = 700;

/**
 * FeaturedDestinationStage Component
 *
 * The single destination area above the gallery into which original gallery project cards
 * physically fly and expand.
 *
 * Contains:
 * - Large preview area (#featured-stage-preview)
 * - Navigation arrow controls (Previous/Next) and Pause/Resume toggle
 * - Project metadata: Title, Category, Creators, Year, Description, Highlights, Tech tags, View Live Project
 * - No separate thumbnail strip, no duplicate cards, no queue labels
 */
export const FeaturedDestinationStage = ({
  project,
  currentIndex,
  totalProjects,
  onNext,
  onPrev,
  isPaused,
  onTogglePause,
  isTransitioning,
  onSelectModal,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!project) return null;

  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-roledescription="carousel"
      aria-label="Department Projects Featured Presentation Stage"
      className="relative rounded-3xl p-5 sm:p-7 lg:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 shadow-2xl overflow-hidden group/stage focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* ---------------------------------------------------- */}
      {/* 1. TOP CAROUSEL CONTROLS BAR                         */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-20 flex items-center justify-between pb-5 border-b border-slate-800/80">
        {/* Exhibition Badge & Project Counter */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Department Creation</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            <span className="font-bold text-white">0{currentIndex + 1}</span>
            <span className="text-slate-600"> / </span>
            <span>0{totalProjects}</span>
          </span>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-2">
          {/* Pause / Resume Button */}
          <button
            onClick={onTogglePause}
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

          {/* Previous Arrow Button */}
          <button
            onClick={onPrev}
            type="button"
            disabled={isTransitioning}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-cyan-500/20 active:scale-95"
            aria-label={`Previous project (currently showing ${project.name})`}
            title="Previous project (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={onNext}
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

      {/* ---------------------------------------------------- */}
      {/* 2. FEATURED DESTINATION STAGE (Split Layout)         */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-10 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Featured Large Viewport Preview (Physical FLIP destination) */}
          <div
            id="featured-stage-preview"
            className="lg:col-span-7 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950 relative group/thumb"
          >
            <LiveWebsiteThumbnail
              project={project}
              aspectRatio="aspect-[16/10]"
              instanceId={`featured-${project.id}`}
              showCategoryBadge={false}
              showStatusBadge={false}
              onSelect={onSelectModal}
            />
          </div>

          {/* Synchronized Project Information (Right Column) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Category Pill */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
            </div>

            {/* Project Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {project.name}
            </h2>

            {/* Creator / Team & Academic Details */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{project.creators || project.studentTeam}</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono">{project.year}</span>
            </div>

            {/* Genuine Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {/* Key Verified Feature Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-1.5 pt-1 text-xs">
                {project.highlights.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Verified Technology Tags */}
            {project.technologies && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((t, idx) => (
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
              {project.url && (
                <a
                  href={project.url}
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
    </section>
  );
};

export default FeaturedDestinationStage;
