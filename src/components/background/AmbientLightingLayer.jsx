import React from 'react';

/**
 * AmbientLightingLayer
 * 
 * Layer 1 (Base Atmosphere) & Layer 2 (Ambient Lighting):
 * - Deep midnight navy base with multi-stop radial and conic gradients.
 * - Soft diffuse cyan, electric-blue, and violet atmospheric light emitters.
 * - Protected central text zone ensuring WCAG AAA typography contrast.
 * - Adapts dynamically to page routes (variants).
 */
export const AmbientLightingLayer = ({
  parallaxX = 0,
  parallaxY = 0,
  variant = 'home',
  isMobile = false
}) => {
  // Mobile uses static, optimized gradients without expensive blur filters
  if (isMobile) {
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base Midnight Navy */}
        <div className="absolute inset-0 bg-[#060913]" />
        
        {/* Subtle Static Gradient Emitter */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-600/10 blur-[80px]" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-blue-600/10 blur-[70px]" />
      </div>
    );
  }

  // Determine accent glows based on route variant
  let primaryGlowColor = 'bg-cyan-500/14';
  let secondaryGlowColor = 'bg-blue-600/12';
  let tertiaryGlowColor = 'bg-purple-600/09';

  if (variant === 'labs') {
    primaryGlowColor = 'bg-emerald-500/12';
    secondaryGlowColor = 'bg-cyan-600/12';
    tertiaryGlowColor = 'bg-blue-700/08';
  } else if (variant === 'achievements') {
    primaryGlowColor = 'bg-amber-500/10';
    secondaryGlowColor = 'bg-cyan-500/12';
    tertiaryGlowColor = 'bg-blue-600/10';
  } else if (variant === 'projects') {
    primaryGlowColor = 'bg-purple-600/12';
    secondaryGlowColor = 'bg-cyan-500/14';
    tertiaryGlowColor = 'bg-blue-600/10';
  }

  const transformStyle = {
    transform: `translate3d(${parallaxX * 0.35}px, ${parallaxY * 0.35}px, 0)`,
    transition: 'transform 0.25s ease-out',
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ---------------------------------------------------- */}
      {/* LAYER 1: BASE ATMOSPHERE                             */}
      {/* ---------------------------------------------------- */}
      <div
        className="absolute inset-0 bg-[#060913]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 65% at 50% -15%, rgba(15, 34, 74, 0.6) 0%, rgba(8, 14, 28, 0.95) 60%, #060913 100%),
            radial-gradient(circle 800px at 85% 25%, rgba(6, 182, 212, 0.05) 0%, transparent 70%),
            radial-gradient(circle 700px at 15% 65%, rgba(59, 130, 246, 0.04) 0%, transparent 70%)
          `
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* LAYER 2: AMBIENT STRATEGIC LIGHTING EMITTERS        */}
      {/* ---------------------------------------------------- */}
      <div
        className="absolute inset-0 will-change-transform"
        style={transformStyle}
      >
        {/* Emitter A: Top-Right (Behind tech visual) */}
        <div
          className={`absolute top-[-5%] right-[2%] w-[680px] h-[580px] rounded-full ${primaryGlowColor} blur-[140px] pointer-events-none`}
        />

        {/* Emitter B: Mid-Left Periphery (Framing content) */}
        <div
          className={`absolute top-[28%] left-[-8%] w-[600px] h-[520px] rounded-full ${secondaryGlowColor} blur-[150px] pointer-events-none`}
        />

        {/* Emitter C: Bottom-Right Depth Glow */}
        <div
          className={`absolute bottom-[-10%] right-[10%] w-[520px] h-[440px] rounded-full ${tertiaryGlowColor} blur-[130px] pointer-events-none`}
        />

        {/* Emitter D: Ultra-Subtle Top Center Atmosphere */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[280px] rounded-full bg-cyan-400/05 blur-[160px] pointer-events-none"
        />
      </div>

      {/* Central Calm Vignette (Protects headline & content legibility) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 45% 40%, transparent 0%, rgba(6, 9, 19, 0.4) 100%)'
        }}
      />
    </div>
  );
};

export default AmbientLightingLayer;

