import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AmbientLightingLayer } from './AmbientLightingLayer';
import { GeometricDepthLayer } from './GeometricDepthLayer';
import { NeuralNetworkCanvas } from './NeuralNetworkCanvas';

/**
 * FuturisticBackground
 * 
 * Advanced Multi-Layer Immersive Technology Environment:
 * - Layer 1: Base Atmosphere (Deep midnight navy with multidirectional radial gradients)
 * - Layer 2: Ambient Lighting (Strategic cyan, electric-blue, and violet diffuse emitters)
 * - Layer 3: Neural Network & Synaptic Transmission (High-DPI 2D canvas with traveling pulses)
 * - Layer 4: Geometric Depth (Orbital technical rings, perspective horizon grid, reticles)
 * - Layer 5: Particles (Curated floating digital telemetry particles)
 * - Layer 6: Technical Patterns (Circuit traces, 45° bus lines, coordinate crosshairs)
 * 
 * Features:
 * - Dynamic route-aware adaptations (Home, Courses, Labs, Projects, Achievements, Faculty/Alumni).
 * - Smooth damped mouse parallax tracking.
 * - Gentle scroll parallax depth.
 * - Auto-pauses on background tab or when reduced motion is preferred.
 * - Optimized mobile fallback (0% CPU canvas overhead on small touch devices).
 * - WCAG AAA typography contrast preservation.
 */
export const FuturisticBackground = () => {
  const location = useLocation();
  const { prefersReducedMotion, isMobile } = useReducedMotion();

  // Route-based variant determination
  const getVariant = (pathname) => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/courses')) return 'courses';
    if (pathname.startsWith('/labs')) return 'labs';
    if (pathname.startsWith('/projects')) return 'projects';
    if (pathname.startsWith('/achievements')) return 'achievements';
    if (pathname.startsWith('/alumni') || pathname.startsWith('/about')) return 'people';
    return 'general';
  };

  const variant = getVariant(location.pathname);

  // Parallax tracking state
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const targetParallax = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to +1 range
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Maximum displacement in pixels
      targetParallax.current.x = normX * 18;
      targetParallax.current.y = normY * 14;
    };

    const handleMouseLeave = () => {
      targetParallax.current.x = 0;
      targetParallax.current.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth Damped Interpolation Loop (40-60fps)
    let isRunning = true;
    const updateParallax = () => {
      if (!isRunning) return;

      const ease = 0.045;
      currentParallax.current.x += (targetParallax.current.x - currentParallax.current.x) * ease;
      currentParallax.current.y += (targetParallax.current.y - currentParallax.current.y) * ease;

      setParallax({
        x: currentParallax.current.x,
        y: currentParallax.current.y,
      });

      animFrameId.current = requestAnimationFrame(updateParallax);
    };

    animFrameId.current = requestAnimationFrame(updateParallax);

    return () => {
      isRunning = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-500"
    >
      {/* ---------------------------------------------------- */}
      {/* LAYER 1 & 2: BASE ATMOSPHERE + AMBIENT LIGHTING      */}
      {/* ---------------------------------------------------- */}
      <AmbientLightingLayer
        parallaxX={parallax.x}
        parallaxY={parallax.y}
        variant={variant}
        isMobile={isMobile}
      />

      {/* ---------------------------------------------------- */}
      {/* LAYER 4 & 6: GEOMETRIC DEPTH + TECHNICAL TRACES     */}
      {/* ---------------------------------------------------- */}
      <GeometricDepthLayer
        parallaxX={parallax.x}
        parallaxY={parallax.y}
        variant={variant}
        isMobile={isMobile}
      />

      {/* ---------------------------------------------------- */}
      {/* LAYER 3 & 5: NEURAL NETWORK + PARTICLES (Canvas 2D) */}
      {/* ---------------------------------------------------- */}
      <NeuralNetworkCanvas
        parallaxX={parallax.x}
        parallaxY={parallax.y}
        variant={variant}
        prefersReducedMotion={prefersReducedMotion}
        isMobile={isMobile}
      />

      {/* Light Mode Subtle Architecture Overlay (Preserves Light Mode theme) */}
      <div className="absolute inset-0 bg-slate-50/90 dark:opacity-0 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default FuturisticBackground;
