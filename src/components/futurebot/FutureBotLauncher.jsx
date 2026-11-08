import React from 'react';
import { FutureBotScene } from './FutureBotScene';

/**
 * FutureBotLauncher
 * 
 * Floating interactive 3D robot mascot launcher button.
 * Replaces generic floating action buttons with the authentic 3D FutureBot companion.
 */
export const FutureBotLauncher = ({
  isOpen = false,
  onClick,
  state = 'idle',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900/90 dark:bg-slate-950/95 border-2 transition-all duration-300 flex items-center justify-center shadow-[0_8px_30px_rgba(0,210,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,210,255,0.6)] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
        isOpen
          ? 'border-cyan-400 rotate-6 ring-4 ring-cyan-500/20'
          : 'border-cyan-500/40 hover:border-cyan-400'
      } ${className}`}
      aria-label="Toggle SGSU FutureBot 3D AI Assistant"
      aria-expanded={isOpen}
    >
      {/* 3D Character Viewport */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden rounded-full pointer-events-none">
        <FutureBotScene
          state={state}
          size="sm"
          cameraDistance={4.2}
          cameraY={0.65}
          interactive={false}
        />
      </div>

      {/* Pulsing Online Status Indicator */}
      <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />

      {/* Floating Tooltip */}
      <span className="absolute right-full mr-3 px-2.5 py-1 rounded-xl bg-slate-900/95 text-cyan-300 text-xs font-medium font-mono border border-cyan-500/30 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        Ask FutureBot 🤖
      </span>
    </button>
  );
};

export default FutureBotLauncher;

