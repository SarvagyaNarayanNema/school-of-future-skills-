import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * HeroKnowledgeCore - 3D Futuristic Technology Centerpiece for School of Future Skills
 * 
 * Built with pure Three.js for maximum performance, zero React-fiber version conflicts,
 * demand-based rendering, memory cleanup, and pointer-driven spatial rotation.
 */
export const HeroKnowledgeCore = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { shouldSimplifyEffects } = useReducedMotion();
  const isVisible = useIntersectionObserver(containerRef);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 480;
    const height = containerRef.current.clientHeight || 480;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // 2. Renderer with Antialias & Alpha
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Central Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 4. Inner Luminous Polyhedron (Icosahedron)
    const icosaGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const icosaWireframe = new THREE.WireframeGeometry(icosaGeo);
    const icosaMat = new THREE.LineBasicMaterial({
      color: 0x00D2FF,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    });
    const icosaMesh = new THREE.LineSegments(icosaWireframe, icosaMat);
    coreGroup.add(icosaMesh);

    // Inner Glowing Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x0284C7,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // 5. Dual Concentric Orbital Rings
    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.65,
    });
    const ringGeo1 = new THREE.RingGeometry(1.85, 1.88, 64);
    const ring1 = new THREE.LineLoop(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ringMat2 = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.55,
    });
    const ringGeo2 = new THREE.RingGeometry(2.15, 2.18, 64);
    const ring2 = new THREE.LineLoop(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 5;
    coreGroup.add(ring2);

    // 6. Constellation of Orbiting Data Nodes
    const particleCount = shouldSimplifyEffects ? 35 : 75;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        orbitSpeed: 0.003 + Math.random() * 0.004,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00D2FF,
      size: 0.07,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 7. Subtle Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00D2FF, 2, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // 8. Pointer Interaction Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const py = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = px * 0.65;
      mouse.targetY = py * 0.65;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const containerEl = containerRef.current;
    window.addEventListener('pointermove', handlePointerMove);
    containerEl.addEventListener('pointerleave', handlePointerLeave);

    // 9. Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Render Loop (with Viewport-Culling)
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = clock.getDelta();

      // Fluid pointer interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Base rotation + pointer influence
      coreGroup.rotation.y += 0.005;
      coreGroup.rotation.x = mouse.y * 0.45;
      coreGroup.rotation.z = -mouse.x * 0.35;

      // Inner sphere counter-rotation
      innerSphere.rotation.y -= 0.008;
      innerSphere.rotation.x += 0.004;

      // Ring rotations
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.004;

      // Constellation node orbits
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        const v = new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        v.applyAxisAngle(vel.axis, vel.orbitSpeed);
        positions[i * 3] = v.x;
        positions[i * 3 + 1] = v.y;
        positions[i * 3 + 2] = v.z;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 11. Clean Memory Disposal on Unmount
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (containerEl) {
        containerEl.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Dispose Three.js objects
      icosaGeo.dispose();
      icosaWireframe.dispose();
      icosaMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isVisible, shouldSimplifyEffects]);

  // Fallback if WebGL disabled or unavailable
  if (!webglSupported) {
    return (
      <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center p-8">
        <div className="w-64 h-64 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin [animation-duration:20s] flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-purple-500/50 animate-ping [animation-duration:4s]" />
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 backdrop-blur-md border border-cyan-400" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none"
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Real 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        aria-label="Interactive 3D Technology Core. Responds to cursor movement."
      />

      {/* Floating Status Orbit Chip */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>INTERACTIVE SPATIAL CORE</span>
      </div>
    </div>
  );
};

export default HeroKnowledgeCore;

