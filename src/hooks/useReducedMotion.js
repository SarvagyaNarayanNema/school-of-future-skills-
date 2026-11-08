import { useState, useEffect } from 'react';

/**
 * Hook to detect if user has requested reduced motion in their OS or browser,
 * or if running on a small touch device where intensive WebGL should be restrained.
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Media query listener for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    // Detect mobile touch screen width
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return {
    reducedMotion: prefersReducedMotion,
    isMobile: isMobileDevice,
    shouldSimplifyEffects: prefersReducedMotion || isMobileDevice,
  };
}

export default useReducedMotion;

