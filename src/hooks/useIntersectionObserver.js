import { useState, useEffect } from 'react';

/**
 * Hook to pause Three.js requestAnimationFrame loops when canvas is out of viewport,
 * guaranteeing 0% GPU/CPU overhead when the user scrolls away.
 */
export function useIntersectionObserver(targetRef, options = { threshold: 0.05 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!targetRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(targetRef.current);

    return () => {
      if (targetRef?.current) {
        observer.unobserve(targetRef.current);
      }
      observer.disconnect();
    };
  }, [targetRef, options.threshold]);

  return isVisible;
}

export default useIntersectionObserver;

