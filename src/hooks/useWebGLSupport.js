import { useState, useEffect } from 'react';

/**
 * Hook to detect WebGL and WebGL2 hardware support in the browser.
 * Caches result to avoid redundant canvas context creations.
 */
let cachedSupport = null;

export function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState(() => {
    if (cachedSupport !== null) return cachedSupport;
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      cachedSupport = !!(gl && gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext));
      return cachedSupport;
    } catch {
      cachedSupport = false;
      return false;
    }
  });

  useEffect(() => {
    if (cachedSupport === null) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        const supported = !!(gl && (gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext)));
        cachedSupport = supported;
        setIsSupported(supported);
      } catch {
        cachedSupport = false;
        setIsSupported(false);
      }
    }
  }, []);

  return isSupported;
}

export default useWebGLSupport;

