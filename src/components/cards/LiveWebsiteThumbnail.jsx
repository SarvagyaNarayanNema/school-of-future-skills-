import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, ExternalLink, X, Eye } from 'lucide-react';
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
 * - Displays genuine static screenshot initially and keeps it visible while loading.
 * - On desktop hover: immediately mounts and streams the actual live website inside an iframe without blocking loaders.
 * - Seamless opacity transition: iframe fades in smoothly from 0 to 1 once fully ready.
 * - Fits within existing thumbnail dimensions (16:10 or 16:9) without layout shifts.
 * - Desktop scaling: renders website at 1200x750 virtual viewport and scales down with CSS transform.
 * - pointer-events: none on iframe ensures hover events are never trapped or lost.
 * - On mouse leave: immediately unmounts iframe, restores screenshot, and frees CPU/memory.
 * - Coordinates a single active preview across the entire page.
 * - Handles slow or unavailable websites by safely retaining the original screenshot.
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
  const [imgError, setImgError] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
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

  // Clean up state when active changes or on unmount
  useEffect(() => {
    if (isActive) {
      setIsIframeLoaded(false);
      setHasError(false);

      // Safety timeout: if external website takes > 8s, stop waiting to prevent hanging states
      const timeoutId = setTimeout(() => {
        setIsIframeLoaded((loaded) => {
          if (!loaded) {
            setHasError(true);
          }
          return loaded;
        });
      }, 8000);

      return () => clearTimeout(timeoutId);
    } else {
      setIsIframeLoaded(false);
      setHasError(false);
    }
  }, [isActive]);

  // Clean up global coordinator on component unmount
  useEffect(() => {
    return () => {
      deactivate();
    };
  }, [deactivate]);

  // Immediate Desktop Hover Handlers (ZERO artificial delay / no loading screen)
  const handleMouseEnter = () => {
    if (isMobile || prefersReducedMotion || !supportsLivePreview) return;
    updateScale();
    activate();
  };

  const handleMouseLeave = () => {
    if (isActive) {
      setIsIframeLoaded(false);
      setHasError(false);
      deactivate();
    }
  };

  // Mobile Tap Handler
  const handleMobileToggle = (e) => {
    e.stopPropagation();
    if (isActive) {
      setIsIframeLoaded(false);
      setHasError(false);
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
      {/* Stays 100% visible while iframe loads; no blank flash */}
      {/* ---------------------------------------------------- */}
      {!imgError && project.image ? (
        <img
          src={getAssetUrl(project.image)}
          alt={`${project.name} preview`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/thumb:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 text-center">
          <span className="text-xl font-black text-white tracking-wider">{project.name}</span>
          <span className="text-xs text-cyan-400 mt-1 font-mono">{project.category}</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. LIVE WEBSITE EMBEDDED PREVIEW (IFRAME)            */}
      {/* Clean opacity transition: no blocking loaders/shimmers */}
      {/* ---------------------------------------------------- */}
      {isActive && supportsLivePreview && !hasError && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            scrolling="no"
            onLoad={() => setIsIframeLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-[1200px] h-[750px] border-0 select-none pointer-events-none transition-opacity duration-500 ease-out ${
              isIframeLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. TOP BADGES (Category & Status)                    */}
      {/* ---------------------------------------------------- */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20 pointer-events-none">
        {showCategoryBadge && (
          <span className="pointer-events-auto">
            <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow">
              {project.category}
            </span>
          </span>
        )}

        {showStatusBadge && (
          <span className="pointer-events-auto flex items-center gap-1.5">
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
        <div className="sm:hidden absolute bottom-2.5 right-2.5 z-30">
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
