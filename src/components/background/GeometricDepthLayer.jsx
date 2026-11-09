import React from 'react';

/**
 * GeometricDepthLayer
 * 
 * Scalable SVG vector layer providing technical architectural depth:
 * - Orbital technical telemetry rings with degree tick marks and dashed intervals.
 * - Circuit bus traces with 45° bends and terminal contact pads.
 * - Digital contour grid lines and perspective horizon lines.
 * - Technical reticles and coordinate crosshairs.
 * 
 * Styled with ultra-subtle opacities (0.04 - 0.15) to guarantee zero interference with content text.
 */
export const GeometricDepthLayer = ({
  parallaxX = 0,
  parallaxY = 0,
  variant = 'home',
  isMobile = false
}) => {
  // Mobile uses a minimal version to save rendering operations
  if (isMobile) {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85%" cy="20%" r="180" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>
    );
  }

  const transformStyle = {
    transform: `translate3d(${parallaxX * 0.7}px, ${parallaxY * 0.7}px, 0)`,
    transition: 'transform 0.15s ease-out',
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden will-change-transform"
      style={transformStyle}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle gradient for technical bus lines */}
          <linearGradient id="techLineGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="techLineGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>

          {/* Perspective grid linear mask */}
          <linearGradient id="gridFadeMask" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <mask id="perspectiveGridMask">
            <rect width="100%" height="100%" fill="url(#gridFadeMask)" />
          </mask>
        </defs>

        {/* ========================================================= */}
        {/* 1. TOP-RIGHT ORBITAL TELEMETRY RINGS (Visual Anchor)      */}
        {/* ========================================================= */}
        <g transform="translate(100, 0)">
          {/* Concentric Primary Orbital Arc */}
          <circle
            cx="80%"
            cy="26%"
            r="380"
            fill="none"
            stroke="rgba(6, 182, 212, 0.08)"
            strokeWidth="1.2"
            strokeDasharray="6 14"
          />

          {/* Inner Secondary Ring */}
          <circle
            cx="80%"
            cy="26%"
            r="260"
            fill="none"
            stroke="rgba(59, 130, 246, 0.07)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />

          {/* Precision Degree Tick Marks on Outer Rim */}
          <circle
            cx="80%"
            cy="26%"
            r="440"
            fill="none"
            stroke="rgba(6, 182, 212, 0.05)"
            strokeWidth="1.5"
            strokeDasharray="2 24"
          />

          {/* Subtle Angled Crosshair Axis */}
          <line
            x1="calc(80% - 460px)"
            y1="26%"
            x2="calc(80% + 460px)"
            y2="26%"
            stroke="rgba(6, 182, 212, 0.04)"
            strokeWidth="1"
            strokeDasharray="4 20"
          />
          <line
            x1="80%"
            y1="calc(26% - 460px)"
            x2="80%"
            y2="calc(26% + 460px)"
            stroke="rgba(6, 182, 212, 0.04)"
            strokeWidth="1"
            strokeDasharray="4 20"
          />
        </g>

        {/* ========================================================= */}
        {/* 2. CIRCUIT-INSPIRED BUS LINES & ARCHITECTURAL TRACES       */}
        {/* ========================================================= */}
        {/* Upper Left Peripheral Traces */}
        <g opacity={variant === 'labs' ? '0.7' : '0.45'}>
          <path
            d="M 20 80 L 160 80 L 210 130 L 280 130"
            fill="none"
            stroke="url(#techLineGradCyan)"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="80" r="2.5" fill="#06b6d4" opacity="0.4" />
          <circle cx="280" cy="130" r="2" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />

          <path
            d="M 40 105 L 140 105 L 180 145 L 220 145"
            fill="none"
            stroke="rgba(59, 130, 246, 0.15)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </g>

        {/* Bottom-Right Peripheral Traces */}
        <g opacity="0.4">
          <path
            d="M calc(100% - 40px) calc(100% - 120px) L calc(100% - 180px) calc(100% - 120px) L calc(100% - 240px) calc(100% - 60px) L calc(100% - 340px) calc(100% - 60px)"
            fill="none"
            stroke="url(#techLineGradCyan)"
            strokeWidth="1.2"
          />
          <circle cx="calc(100% - 40px)" cy="calc(100% - 120px)" r="2" fill="#06b6d4" opacity="0.4" />
          <circle cx="calc(100% - 340px)" cy="calc(100% - 60px)" r="2" fill="#3b82f6" opacity="0.3" />
        </g>

        {/* ========================================================= */}
        {/* 3. TECHNICAL RETICLES & COORDINATE CROSSHAIRS             */}
        {/* ========================================================= */}
        {/* Top-Left Crosshair */}
        <g transform="translate(60, 160)" opacity="0.35">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#06b6d4" strokeWidth="1" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#06b6d4" strokeWidth="1" />
          <text x="12" y="4" fill="#06b6d4" fontSize="9" fontFamily="monospace" letterSpacing="1">
            FSIT // 23.2599°N
          </text>
        </g>

        {/* Mid-Left Institutional Reticle */}
        <g transform="translate(80, 480)" opacity="0.25">
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="0" cy="0" r="10" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="2 3" />
        </g>

        {/* Bottom-Right Coordinate Marker */}
        <g transform="translate(calc(100% - 140px), calc(100% - 80px))" opacity="0.3">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#38bdf8" strokeWidth="1" />
          <text x="-95" y="4" fill="#38bdf8" fontSize="8" fontFamily="monospace" letterSpacing="1">
            SGSU.TECH-GRID
          </text>
        </g>

        {/* ========================================================= */}
        {/* 4. PERSPECTIVE HORIZON DEPTH LINES (Bottom Perimeter)     */}
        {/* ========================================================= */}
        <g mask="url(#perspectiveGridMask)" opacity="0.6">
          <line x1="10%" y1="100%" x2="40%" y2="70%" stroke="#06b6d4" strokeWidth="0.8" />
          <line x1="25%" y1="100%" x2="45%" y2="70%" stroke="#06b6d4" strokeWidth="0.8" />
          <line x1="40%" y1="100%" x2="50%" y2="70%" stroke="#06b6d4" strokeWidth="0.8" />
          <line x1="60%" y1="100%" x2="50%" y2="70%" stroke="#06b6d4" strokeWidth="0.8" />
          <line x1="75%" y1="100%" x2="55%" y2="70%" stroke="#06b6d4" strokeWidth="0.8" />
          <line x1="90%" y1="100%" x2="60%" y2="70%" stroke="#06b6d4" strokeWidth="0.8" />

          {/* Horizontal Transverse Lines */}
          <line x1="0%" y1="92%" x2="100%" y2="92%" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3 6" />
          <line x1="15%" y1="84%" x2="85%" y2="84%" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="30%" y1="76%" x2="70%" y2="76%" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="1 3" />
        </g>

      </svg>
    </div>
  );
};

export default GeometricDepthLayer;

