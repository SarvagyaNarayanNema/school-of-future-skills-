import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track smoothed, normalized pointer position (-1 to 1)
 * with natural inertia / damping for responsive 3D orientation.
 */
export function usePointerPosition(targetRef) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const targetCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const element = targetRef?.current || window;

    const handlePointerMove = (e) => {
      let width = window.innerWidth;
      let height = window.innerHeight;
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        clientX = e.clientX - rect.left;
        clientY = e.clientY - rect.top;
      }

      // Normalize to -1 -> +1
      targetCoords.current.x = (clientX / width) * 2 - 1;
      targetCoords.current.y = -((clientY / height) * 2 - 1);
    };

    const handlePointerLeave = () => {
      // Gently spring back to center
      targetCoords.current.x = 0;
      targetCoords.current.y = 0;
    };

    element.addEventListener('pointermove', handlePointerMove);
    if (targetRef?.current) {
      targetRef.current.addEventListener('pointerleave', handlePointerLeave);
    }

    // Smooth lerp loop
    const updateLoop = () => {
      const ease = 0.08;
      currentCoords.current.x += (targetCoords.current.x - currentCoords.current.x) * ease;
      currentCoords.current.y += (targetCoords.current.y - currentCoords.current.y) * ease;

      setCoords({
        x: currentCoords.current.x,
        y: currentCoords.current.y,
      });

      animationFrameId.current = requestAnimationFrame(updateLoop);
    };

    animationFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      if (targetRef?.current) {
        targetRef.current.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetRef]);

  return coords;
}

export default usePointerPosition;

