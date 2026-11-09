import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, ExternalLink, X, RefreshCw, Eye } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Shared global preview coordinator ensuring only ONE live iframe exists at a time
let globalActivePreviewId = null;
const listeners = new Set();

const setActivePreview = (id) => {
  globalActivePreviewId = id;
  listeners.forEach(fn => fn(id));
};

export const useActivePreview = (projectId) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handler = (activeId) => {
      setIsActive(activeId === projectId);
    };
    listeners.add(handler);
    // Initial check
    setIsActive(globalActivePreviewId === projectId);
    return () => {
      listeners.delete(handler);
    };
  }, [projectId]);

  const activate = useCallback(() => {
    setActivePreview(projectId);
  }, [projectId]);

  const deactivate = useCallback(() => {
    if (globalActivePreviewId === projectId) {
      setActivePreview(null);
    }
  }, [projectId]);

  return { isActive, activate, deactivate };
};

/**
 * LiveWebsiteThumbnail Component
 * 
 * Interactive YouTube-style live website hover preview:
 * - Displays genuine static screenshot initially.
 * - On desktop hover (250ms debounce): smoothly mounts and streams the actual live website inside an iframe.
 * - Fits perfectly within existing thumbnail dimensions (16:10 or 16:9).
 * - Desktop scaling: renders website at 1200x750 virtual viewport and scales down with CSS transform.
 * - pointer-events: none on iframe ensures hover events are never trapped or lost.
 * - On mouse leave: immediately unmounts iframe and frees CPU/memory.
 * - Strictly coordinates a single active preview across the entire page.
 * - Mobile: provides an explicit tap-to-preview toggle with an easy exit button.
 * - Fallback: tasteful image zoom/pan for non-previewable projects.
 */
export const LiveWebsiteThumbnail = ({
  project,
  aspectRatio = 'aspect-[16/10]',
  onSelect = null,
  showCategoryBadge = true,
  showStatusBadge = true,
  instanceId = null,
}) => {
  const containerRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [scale, setScale] = useState(0.32);
  const { isMobile, prefersReducedMotion } = useReducedMotion();

  // Unique preview ID for this exact instance
  const effectiveId = instanceId || `${project.id}-${aspectRatio}`;
  const { isActive, activate, deactivate } = useActivePreview(effectiveId);
  const supportsLivePreview = Boolean(project.supportsLivePreview && project.url && project.isAvailable);

  // Calculate downscale factor so desktop website fits inside the card thumbnail
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth || 380;
      // Virtual desktop width 1200px
      const calculated = Math.min(containerWidth / 1200, 0.45);
      setScale(calculated);
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale, { passive: true });
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      deactivate();
    };
  }, [deactivate]);

  // Desktop Hover Handlers with 250ms debounce
  const handleMouseEnter = () => {
    if (isMobile || prefersReducedMotion || !supportsLivePreview) return;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      updateScale();
      activate();
    }, 220);
  };

  const handleMouseLeave = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (isActive) {
      setIsIframeLoaded(false);
      deactivate();
    }
  };

  // Mobile Tap Handler
  const handleMobileToggle = (e) => {
    e.stopPropagation();
    if (isActive) {
      setIsIframeLoaded(false);
      deactivate();
    } else {
      updateScale();
      activate();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${aspectRatio} w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 group/thumb`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. GENUINE POSTER / SCREENSHOT IMAGE (Always Base)    */}
      {/* ---------------------------------------------------- */}
      {!imgError && project.image ? (
        <img
          src={getAssetUrl(project.image)}
          alt={`${project.name} live interface`}
          loading="lazy"
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover object-top transition-all duration-500 ease-out ${
            isActive && isIframeLoaded ? 'opacity-0 scale-95' : 'opacity-100 group-hover/thumb:scale-105'
          } ${!supportsLivePreview ? 'group-hover/thumb:brightness-105' : ''}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 text-center">
          <span className="text-xl font-black text-white tracking-wider">{project.name}</span>
          <span className="text-xs text-cyan-400 mt-1 font-mono">{project.category}</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. LIVE WEBSITE EMBEDDED PREVIEW (IFRAME)            */}
      {/* ---------------------------------------------------- */}
      {isActive && supportsLivePreview && (
        <div className="absolute inset-0 z-20 bg-slate-950 overflow-hidden pointer-events-none">
          {/* Subtle Loading Shimmer until live website signals ready */}
          {!isIframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-30 transition-opacity">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-xl backdrop-blur-md">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Streaming Live Interface...</span>
              </div>
            </div>
          )}

          {/* Actual Live Website Rendered Inside Virtual Desktop Viewport */}
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            scrolling="no"
            onLoad={() => setIsIframeLoaded(true)}
            className={`w-[1200px] h-[750px] border-0 select-none pointer-events-none transition-opacity duration-500 ${
              isIframeLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />

          {/* Floating Live Telemetry Badge (Confirms live site is active) */}
          <div className="absolute bottom-2.5 left-2.5 z-30 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold shadow-lg backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE INTERFACE ACTIVE</span>
            </span>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. TOP BADGES (Category & Live Status)               */}
      {/* ---------------------------------------------------- */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-30 pointer-events-none">
        {showCategoryBadge && (
          <span className="pointer-events-auto">
            <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow">
              {project.category}
            </span>
          </span>
        )}

        {showStatusBadge && (
          <span className="pointer-events-auto flex items-center gap-1.5">
            {/* Live Preview Capability Indicator Chip */}
            {supportsLivePreview && !isActive && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/75 border border-cyan-500/20 text-[10px] font-mono text-cyan-400/90 backdrop-blur-md">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span>Hover to Preview</span>
              </span>
            )}

            {/* Verification Status Pill */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md shadow border ${
                project.isAvailable
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>{project.isAvailable ? 'Verified Live' : 'Verification Pending'}</span>
            </span>
          </span>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. MOBILE PREVIEW TOGGLE BUTTON                      */}
      {/* ---------------------------------------------------- */}
      {supportsLivePreview && (
        <div className="sm:hidden absolute bottom-2.5 right-2.5 z-40">
          <button
            onClick={handleMobileToggle}
            type="button"
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-md border transition-all ${
              isActive
                ? 'bg-rose-500/90 text-white border-rose-400'
                : 'bg-slate-900/90 text-cyan-300 border-cyan-500/30'
            }`}
            aria-label={isActive ? "Exit live preview" : "Preview live website"}
          >
            {isActive ? (
              <>
                <X className="w-3 h-3" />
                <span>Close Preview</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-cyan-400" />
                <span>Preview Site</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5. QUICK INSPECT MODAL TRIGGER (Desktop Only)        */}
      {/* ---------------------------------------------------- */}
      {onSelect && !isActive && (
        <button
          onClick={() => onSelect(project)}
          type="button"
          className="hidden sm:flex absolute inset-0 bg-slate-950/30 opacity-0 hover:opacity-100 transition-opacity items-end justify-end p-3 text-white text-xs font-semibold z-20"
          aria-label={`View full details of ${project.name}`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Details</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default LiveWebsiteThumbnail;
