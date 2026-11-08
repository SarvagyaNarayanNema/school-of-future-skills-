import React from 'react';
import { getAssetUrl, getBotAvatarFallback } from '../../utils/assets';

/**
 * FutureBotFallback
 * 
 * Elegant zero-network 2D fallback when WebGL is disabled or unavailable.
 * Preserves the original character identity with state-reactive halos,
 * status badges, and audio waveforms.
 */
export const FutureBotFallback = ({
  state = 'idle',
  size = 'md',
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-10 h-10',
    sm: 'w-16 h-16',
    md: 'w-32 h-32 sm:w-40 sm:h-40',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    xl: 'w-64 h-64 sm:w-72 sm:h-72',
    hero: 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96',
  }[size] || 'w-32 h-32';

  const isThinking = state === 'thinking';
  const isListening = state === 'listening';
  const isSpeaking = state === 'responding';
  const isSuccess = state === 'success';

  return (
    <div
      onClick={onClick}
      className={`relative select-none flex items-center justify-center ${sizeClasses} ${className} ${onClick ? 'cursor-pointer group' : ''}`}
      role="img"
      aria-label={`FutureBot AI Assistant - Status: ${state}`}
    >
      {/* Ambient Glow */}
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 pointer-events-none ${
          isThinking
            ? 'bg-purple-500/40 animate-pulse'
            : isListening
            ? 'bg-rose-500/35 animate-ping'
            : isSpeaking
            ? 'bg-cyan-400/40 animate-pulse'
            : isSuccess
            ? 'bg-emerald-400/40'
            : 'bg-cyan-500/20 group-hover:bg-cyan-500/35'
        }`}
      />

      {/* Outer Halo Rings */}
      {isListening && (
        <span className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-75 animate-ping pointer-events-none" />
      )}
      {isThinking && (
        <span className="absolute inset-0 rounded-full border border-purple-400/60 animate-spin pointer-events-none" />
      )}

      {/* Avatar Image with standard fallback */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center p-1">
        <img
          src={getAssetUrl('/bot-avatar.png')}
          alt="FutureBot AI Assistant Mascot"
          className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
          draggable={false}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getBotAvatarFallback();
          }}
        />
      </div>

      {/* State Badge */}
      {state !== 'idle' && (
        <span
          className={`absolute -bottom-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md ${
            isThinking
              ? 'bg-purple-950/90 text-purple-300 border-purple-500/40'
              : isListening
              ? 'bg-rose-950/90 text-rose-300 border-rose-500/40 animate-pulse'
              : isSpeaking
              ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40'
              : isSuccess
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-900/90 text-slate-300 border-slate-700'
          }`}
        >
          {state}
        </span>
      )}
    </div>
  );
};

export default FutureBotFallback;

