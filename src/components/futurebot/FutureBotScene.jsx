import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FutureBotCharacter } from './FutureBotCharacter';
import { FutureBotFallback } from './FutureBotFallback';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * FutureBotScene
 * 
 * WebGL Canvas viewport for the interactive 3D FutureBot character.
 * Supports demand-based rendering, viewport culling with IntersectionObserver,
 * pointer tracking, touch gestures, state synchronization, and zero-breakage 2D fallback.
 */
export const FutureBotScene = ({
  state = 'idle',
  audioLevel = 0,
  size = 'md',
  interactive = true,
  onClick,
  className = '',
  cameraDistance = 4.3,
  cameraY = 0.45,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isWebGL = useWebGLSupport();
  const { prefersReducedMotion, isTouchDevice } = useReducedMotion();
  const isIntersecting = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const isIntersectingRef = useRef(isIntersecting);

  useEffect(() => {
    isIntersectingRef.current = isIntersecting;
  }, [isIntersecting]);

  const [hasContextError, setHasContextError] = useState(false);
  const characterRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameId = useRef(null);

  // Sync state changes with 3D character instance
  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.setState(state);
    }
  }, [state]);

  // Sync audio levels with 3D character voice wave
  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.setAudioLevel(audioLevel);
    }
  }, [audioLevel]);

  // Pointer move handler (mouse on desktop, subtle touch on mobile)
  const handlePointerMove = useCallback((e) => {
    if (!interactive || prefersReducedMotion || !containerRef.current || !characterRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // Normalized coordinate (-1 to 1) centered at canvas origin
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    characterRef.current.setPointer(normX, normY);
  }, [interactive, prefersReducedMotion]);

  // Touch move handler
  const handleTouchMove = useCallback((e) => {
    if (!interactive || prefersReducedMotion || !containerRef.current || !characterRef.current) return;
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      characterRef.current.setPointer(normX, normY);
    }
  }, [interactive, prefersReducedMotion]);

  // Pointer leave handler resets gaze to center
  const handlePointerLeave = useCallback(() => {
    if (characterRef.current) {
      characterRef.current.setPointer(0, 0);
    }
  }, []);

  // Click interaction reaction
  const handleClick = useCallback((e) => {
    if (characterRef.current) {
      // Trigger temporary happy nod on click
      characterRef.current.setState('greeting');
      setTimeout(() => {
        if (characterRef.current) characterRef.current.setState(state);
      }, 1500);
    }
    if (onClick) onClick(e);
  }, [onClick, state]);

  // Initialize Three.js Scene, Camera, Lights, and Renderer
  useEffect(() => {
    if (!isWebGL || hasContextError || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth || 250;
    let height = container.clientHeight || 250;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, cameraY, cameraDistance);
    camera.lookAt(0, 0.35, 0);

    // 3. Renderer with antialiasing and alpha transparency
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL context failed to initialize:', err);
      setHasContextError(true);
      return;
    }

    // 4. Lighting System
    // Ambient Light (deep soft blue fill)
    const ambientLight = new THREE.AmbientLight(0x0C192C, 1.4);
    scene.add(ambientLight);

    // Key Light (warm white from top-right)
    const keyLight = new THREE.DirectionalLight(0xF0F9FF, 2.2);
    keyLight.position.set(3, 4, 3.5);
    scene.add(keyLight);

    // Cyan Rim Light (striking cinematic edge lighting from behind-left)
    const rimLight = new THREE.DirectionalLight(0x00D2FF, 4.0);
    rimLight.position.set(-3.5, 3, -3);
    scene.add(rimLight);

    // Bottom Bounce Light (subtle cyan/purple underglow)
    const bounceLight = new THREE.DirectionalLight(0x38BDF8, 1.2);
    bounceLight.position.set(0, -3, 1);
    scene.add(bounceLight);

    // 5. Mount Character
    const character = new FutureBotCharacter();
    character.setState(state);
    character.setAudioLevel(audioLevel);
    scene.add(character.root);
    characterRef.current = character;

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && rendererRef.current) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH, false);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Render Loop with Demand-based Culling
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      // Cull rendering when scrolled offscreen
      if (!isIntersectingRef.current) return;

      const delta = Math.min(clock.getDelta(), 0.05);

      if (character && !prefersReducedMotion) {
        character.update(delta);
      } else if (character && prefersReducedMotion) {
        // In reduced motion, only update expression canvas without physical bobbing
        character.expression.update(delta);
        character.faceTexture.needsUpdate = true;
      }

      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }
    };

    animate();

    // 8. Cleanup
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      resizeObserver.disconnect();

      if (character) {
        scene.remove(character.root);
        character.dispose();
      }

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isWebGL, hasContextError, prefersReducedMotion, cameraDistance, cameraY]);

  // Dimension classes based on size prop
  const sizeClasses = {
    xs: 'w-10 h-10',
    sm: 'w-16 h-16',
    md: 'w-32 h-32 sm:w-40 sm:h-40',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    xl: 'w-64 h-64 sm:w-72 sm:h-72',
    hero: 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96',
  }[size] || 'w-32 h-32';

  // Fallback if WebGL fails or is unsupported
  if (!isWebGL || hasContextError) {
    return (
      <FutureBotFallback
        state={state}
        size={size}
        onClick={handleClick}
        className={className}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handlePointerLeave}
      onClick={handleClick}
      className={`relative select-none ${sizeClasses} ${className} ${interactive ? 'cursor-pointer' : ''}`}
      style={{ touchAction: 'none' }}
      role="img"
      aria-label={`FutureBot 3D AI Assistant - Status: ${state}`}
    >
      <canvas
        key="futurebot-3d-webgl-canvas"
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto"
        tabIndex={interactive ? 0 : -1}
      />
    </div>
  );
};

export default FutureBotScene;

