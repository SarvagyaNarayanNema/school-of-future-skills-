import React, { useRef, useEffect } from 'react';

/**
 * NeuralNetworkCanvas
 * 
 * High-performance 2D Canvas rendering an interactive, organic neural network
 * with synaptic data transmissions and floating digital telemetry particles.
 * 
 * Performance & Architecture:
 * - High-DPI support (Retina / 4K displays via devicePixelRatio).
 * - Nodes concentrated around peripheral zones to ensure central text readability.
 * - Dynamic synaptic packets that travel along connections.
 * - Auto-pauses on document visibility loss or when reduced motion is preferred.
 * - Zero memory allocations in the animation loop.
 */
export const NeuralNetworkCanvas = ({
  parallaxX = 0,
  parallaxY = 0,
  variant = 'home',
  prefersReducedMotion = false,
  isMobile = false
}) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const stateRef = useRef({
    nodes: [],
    particles: [],
    pulses: [],
    width: 0,
    height: 0,
    dpr: 1,
    isVisible: true
  });

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Determine node count and properties based on route variant
    let nodeCount = 36;
    let maxDistance = 140;
    let particleCount = 28;
    let primaryHue = 'cyan'; // cyan, blue, emerald, amber, violet

    if (variant === 'labs') {
      nodeCount = 42;
      maxDistance = 150;
      primaryHue = 'emerald';
    } else if (variant === 'courses') {
      nodeCount = 28;
      maxDistance = 125;
      primaryHue = 'blue';
    } else if (variant === 'achievements') {
      nodeCount = 32;
      maxDistance = 135;
      primaryHue = 'amber';
    } else if (variant === 'projects') {
      nodeCount = 34;
      maxDistance = 140;
      primaryHue = 'violet';
    } else if (variant === 'people') {
      nodeCount = 22;
      maxDistance = 110;
      primaryHue = 'blue';
    }

    const state = stateRef.current;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      state.width = w;
      state.height = h;
      state.dpr = dpr;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize nodes spread primarily towards peripheral thirds
      const nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        // Bias away from exact center (0.35 to 0.65 horizontally and vertically)
        let x = Math.random() * w;
        let y = Math.random() * h;

        // If falls in center text zone, gently nudge to sides
        if (x > w * 0.35 && x < w * 0.65 && y > h * 0.25 && y < h * 0.75) {
          x = Math.random() > 0.5 ? Math.random() * w * 0.35 : w * 0.65 + Math.random() * w * 0.35;
        }

        const speed = 0.12 + Math.random() * 0.18;
        const angle = Math.random() * Math.PI * 2;

        let color = 'rgba(6, 182, 212, '; // cyan
        if (primaryHue === 'emerald' && Math.random() > 0.4) {
          color = 'rgba(16, 185, 129, '; // emerald
        } else if (primaryHue === 'amber' && Math.random() > 0.5) {
          color = 'rgba(245, 158, 11, '; // amber
        } else if (primaryHue === 'violet' && Math.random() > 0.4) {
          color = 'rgba(139, 92, 246, '; // violet
        } else if (Math.random() > 0.6) {
          color = 'rgba(56, 189, 248, '; // sky blue
        }

        nodes.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.2 + Math.random() * 1.6,
          baseAlpha: 0.25 + Math.random() * 0.4,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulseOffset: Math.random() * Math.PI * 2,
          color
        });
      }
      state.nodes = nodes;

      // Re-initialize floating micro-particles
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vy: -(0.08 + Math.random() * 0.2), // gentle upward float
          vx: (Math.random() - 0.5) * 0.08,
          radius: 0.8 + Math.random() * 1.5,
          alpha: 0.15 + Math.random() * 0.35,
          color: Math.random() > 0.3 ? 'rgba(56, 189, 248, ' : 'rgba(167, 139, 250, '
        });
      }
      state.particles = particles;
      state.pulses = [];
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Handle tab visibility to save battery and GPU cycles
    const handleVisibilityChange = () => {
      state.isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let lastTime = performance.now();
    let pulseSpawnTimer = 0;

    const render = (time) => {
      animFrameRef.current = requestAnimationFrame(render);

      if (!state.isVisible) return;

      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      const w = state.width;
      const h = state.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      // Save context for smooth parallax translation
      ctx.save();
      ctx.translate(parallaxX, parallaxY);

      // 1. Update and draw nodes
      const nodes = state.nodes;
      const nodeLen = nodes.length;

      for (let i = 0; i < nodeLen; i++) {
        const node = nodes[i];
        node.x += node.vx * (dt / 16);
        node.y += node.vy * (dt / 16);

        // Soft screen bounds bounce
        if (node.x < 10) { node.x = 10; node.vx *= -1; }
        else if (node.x > w - 10) { node.x = w - 10; node.vx *= -1; }

        if (node.y < 10) { node.y = 10; node.vy *= -1; }
        else if (node.y > h - 10) { node.y = h - 10; node.vy *= -1; }

        // Draw node
        const pulse = Math.sin(time * 0.002 * node.pulseSpeed * 50 + node.pulseOffset);
        const currentAlpha = Math.max(0.1, node.baseAlpha + pulse * 0.15);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${currentAlpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `${node.color}0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Draw connections between nearby nodes
      for (let i = 0; i < nodeLen; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodeLen; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Periodically spawn a synaptic pulse along close connections
            pulseSpawnTimer += 0.0003;
            if (pulseSpawnTimer > 1 && state.pulses.length < 5 && Math.random() < 0.02) {
              pulseSpawnTimer = 0;
              state.pulses.push({
                fromX: a.x,
                fromY: a.y,
                toX: b.x,
                toY: b.y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: a.color
              });
            }
          }
        }
      }

      // 3. Draw active synaptic pulses
      const pulses = state.pulses;
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = p.fromX + (p.toX - p.fromX) * p.progress;
        const py = p.fromY + (p.toY - p.fromY) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.85)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `${p.color}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Update and draw floating micro-particles
      const particles = state.particles;
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.y += pt.vy * (dt / 16);
        pt.x += pt.vx * (dt / 16);

        // Wrap around top
        if (pt.y < -10) {
          pt.y = h + 10;
          pt.x = Math.random() * w;
        }
        if (pt.x < -10) pt.x = w + 10;
        else if (pt.x > w + 10) pt.x = -10;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${pt.color}${pt.alpha})`;
        ctx.fill();
      }

      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [variant, prefersReducedMotion, isMobile, parallaxX, parallaxY]);

  if (isMobile || prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      key="neural-network-2d-canvas"
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700"
      style={{ opacity: 0.95 }}
    />
  );
};

export default NeuralNetworkCanvas;

