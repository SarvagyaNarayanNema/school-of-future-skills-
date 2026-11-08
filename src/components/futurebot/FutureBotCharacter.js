import * as THREE from 'three';
import { FutureBotExpression } from './FutureBotExpression';

/**
 * FutureBotCharacter
 * 
 * Genuine 3D Three.js character model for the official SGSU FutureBot mascot.
 * Features pearl-white ceramic chassis, dark curved OLED visor with dynamic digital expressions,
 * articulated head with spring pointer tracking, floating magnetic shoulder pods,
 * glowing chest arc reactor, headphone sensor pods, antenna beacon, and state animation loops.
 */
export class FutureBotCharacter {
  constructor() {
    this.root = new THREE.Group();
    this.root.name = 'FutureBot';

    // State
    this.state = 'idle';
    this.time = 0;

    // Expression canvas controller
    this.expression = new FutureBotExpression(512, 256);
    this.faceTexture = new THREE.CanvasTexture(this.expression.canvas);
    this.faceTexture.colorSpace = THREE.SRGBColorSpace;
    this.faceTexture.minFilter = THREE.LinearFilter;
    this.faceTexture.magFilter = THREE.LinearFilter;

    // Pointer target for look-at tracking (-1 to 1)
    this.pointer = { x: 0, y: 0 };
    this.dampedPointer = { x: 0, y: 0 };

    // Material definitions
    this.materials = this.createMaterials();

    // Build the 3D character hierarchy
    this.buildModel();
  }

  createMaterials() {
    // 1. Pearl White Ceramic Body Material
    const whiteBody = new THREE.MeshPhysicalMaterial({
      color: 0xF8FAFC,
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // 2. Dark Metallic Hardware / Neck Collar / Accents
    const darkHardware = new THREE.MeshStandardMaterial({
      color: 0x0F172A,
      roughness: 0.35,
      metalness: 0.85,
    });

    // 3. Digital OLED Face Visor (with CanvasTexture)
    const visorScreen = new THREE.MeshBasicMaterial({
      map: this.faceTexture,
      transparent: false,
    });

    // 4. Glossy Outer Visor Glass Dome
    const visorGlass = new THREE.MeshPhysicalMaterial({
      color: 0x0A0F1D,
      transparent: true,
      opacity: 0.35,
      roughness: 0.04,
      transmission: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // 5. Cyan Emissive LED Ring / Reactor Material
    const cyanGlow = new THREE.MeshStandardMaterial({
      color: 0x00D2FF,
      emissive: 0x00D2FF,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.5,
    });

    // 6. Purple Thinking Glow Material
    const purpleGlow = new THREE.MeshStandardMaterial({
      color: 0x8B5CF6,
      emissive: 0x8B5CF6,
      emissiveIntensity: 2.5,
      roughness: 0.2,
      metalness: 0.4,
    });

    // 7. Chrome / Polished Metal Ring
    const chrome = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      roughness: 0.1,
      metalness: 0.95,
    });

    return {
      whiteBody,
      darkHardware,
      visorScreen,
      visorGlass,
      cyanGlow,
      purpleGlow,
      chrome,
    };
  }

  buildModel() {
    const { whiteBody, darkHardware, visorScreen, visorGlass, cyanGlow, chrome } = this.materials;

    // ==========================================
    // 1. FLOATING BASE & CONTACT SHADOW
    // ==========================================
    this.shadowDisk = this.createContactShadow();
    this.shadowDisk.position.y = -1.35;
    this.root.add(this.shadowDisk);

    // ==========================================
    // 2. TORSO GROUP
    // ==========================================
    this.torsoGroup = new THREE.Group();
    this.torsoGroup.name = 'TorsoGroup';
    this.torsoGroup.position.y = -0.3;
    this.root.add(this.torsoGroup);

    // Body Chassis (Smooth rounded capsule shape)
    const torsoGeo = new THREE.SphereGeometry(0.75, 32, 24);
    // Squash sphere vertically to create cute compact robot torso
    torsoGeo.scale(1.0, 0.9, 0.85);
    this.torsoMesh = new THREE.Mesh(torsoGeo, whiteBody);
    this.torsoMesh.castShadow = true;
    this.torsoGroup.add(this.torsoMesh);

    // Chest Arc Reactor (FSIT Power Core)
    const reactorCoreGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 32);
    reactorCoreGeo.rotateX(Math.PI / 2);
    this.reactorCore = new THREE.Mesh(reactorCoreGeo, cyanGlow);
    this.reactorCore.position.set(0, 0.08, 0.62);
    this.torsoGroup.add(this.reactorCore);

    // Reactor Chrome Bezel Ring
    const reactorBezelGeo = new THREE.TorusGeometry(0.22, 0.03, 16, 32);
    const reactorBezel = new THREE.Mesh(reactorBezelGeo, chrome);
    reactorBezel.position.set(0, 0.08, 0.63);
    this.torsoGroup.add(reactorBezel);

    // Point Light emitting from chest core
    this.reactorLight = new THREE.PointLight(0x00D2FF, 1.2, 2.5);
    this.reactorLight.position.set(0, 0.08, 0.7);
    this.torsoGroup.add(this.reactorLight);

    // Neck Ring Collar (dark titanium gimbal between torso and head)
    const neckGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.18, 32);
    const neckCollar = new THREE.Mesh(neckGeo, darkHardware);
    neckCollar.position.set(0, 0.68, 0);
    this.torsoGroup.add(neckCollar);

    // Floating Shoulder Pods / Arms
    this.leftArm = this.createArmPod(true);
    this.leftArm.position.set(-1.05, 0.1, 0);
    this.torsoGroup.add(this.leftArm);

    this.rightArm = this.createArmPod(false);
    this.rightArm.position.set(1.05, 0.1, 0);
    this.torsoGroup.add(this.rightArm);

    // ==========================================
    // 3. ARTICULATED HEAD GROUP (Pointer tracking)
    // ==========================================
    this.headGroup = new THREE.Group();
    this.headGroup.name = 'HeadGroup';
    this.headGroup.position.set(0, 0.92, 0);
    this.root.add(this.headGroup);

    // Outer Head Shell (cute friendly rounded profile, slightly wider than tall)
    const headGeo = new THREE.SphereGeometry(0.85, 36, 28);
    headGeo.scale(1.15, 1.02, 1.05);
    this.headMesh = new THREE.Mesh(headGeo, whiteBody);
    this.headMesh.castShadow = true;
    this.headGroup.add(this.headMesh);

    // Recessed Digital Visor Screen
    // A clipped front curved surface mapped with the dynamic canvas texture
    const visorGeo = new THREE.SphereGeometry(0.82, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    visorGeo.scale(0.92, 0.62, 0.88);
    visorGeo.rotateX(Math.PI / 2);
    // Align texture coordinates for the front visor display
    this.visorMesh = new THREE.Mesh(visorGeo, visorScreen);
    this.visorMesh.position.set(0, 0.04, 0.22);
    this.headGroup.add(this.visorMesh);

    // Outer Protective Glass Visor
    const glassGeo = new THREE.SphereGeometry(0.84, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    glassGeo.scale(0.94, 0.64, 0.9);
    glassGeo.rotateX(Math.PI / 2);
    const visorGlassMesh = new THREE.Mesh(glassGeo, visorGlass);
    visorGlassMesh.position.set(0, 0.04, 0.23);
    this.headGroup.add(visorGlassMesh);

    // Headphone Audio Ear Pods (Left & Right)
    this.leftEar = this.createEarModule(true);
    this.leftEar.position.set(-1.0, 0.05, 0);
    this.headGroup.add(this.leftEar);

    this.rightEar = this.createEarModule(false);
    this.rightEar.position.set(1.0, 0.05, 0);
    this.headGroup.add(this.rightEar);

    // Antenna Sensor Beacon on Top of Head
    this.antennaGroup = new THREE.Group();
    this.antennaGroup.position.set(0, 0.9, 0);

    const stemGeo = new THREE.CylinderGeometry(0.035, 0.05, 0.35, 16);
    const antennaStem = new THREE.Mesh(stemGeo, darkHardware);
    antennaStem.position.y = 0.17;
    this.antennaGroup.add(antennaStem);

    const beaconGeo = new THREE.SphereGeometry(0.1, 24, 16);
    this.beaconLed = new THREE.Mesh(beaconGeo, cyanGlow);
    this.beaconLed.position.y = 0.35;
    this.antennaGroup.add(this.beaconLed);

    this.beaconLight = new THREE.PointLight(0x00D2FF, 1.5, 2.0);
    this.beaconLight.position.y = 0.38;
    this.antennaGroup.add(this.beaconLight);

    this.headGroup.add(this.antennaGroup);

    // ==========================================
    // 4. ATMOSPHERIC THINKING HALO & PARTICLES
    // ==========================================
    const haloGeo = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
    this.haloMesh = new THREE.Mesh(haloGeo, this.materials.purpleGlow);
    this.haloMesh.rotation.x = Math.PI / 3;
    this.haloMesh.visible = false;
    this.headGroup.add(this.haloMesh);

    // Floating tech particle motes
    this.particles = this.createParticles();
    this.root.add(this.particles);
  }

  createArmPod(isLeft) {
    const armGroup = new THREE.Group();
    const { whiteBody, cyanGlow, darkHardware } = this.materials;

    // Floating streamlined pod
    const podGeo = new THREE.CapsuleGeometry(0.2, 0.45, 8, 16);
    const pod = new THREE.Mesh(podGeo, whiteBody);
    pod.rotation.z = isLeft ? 0.2 : -0.2;
    armGroup.add(pod);

    // Cyan glowing magnetic trim ring
    const trimGeo = new THREE.TorusGeometry(0.21, 0.018, 8, 24);
    trimGeo.rotateX(Math.PI / 2);
    const trim = new THREE.Mesh(trimGeo, cyanGlow);
    armGroup.add(trim);

    // Small dark magnetic cap on top
    const capGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const cap = new THREE.Mesh(capGeo, darkHardware);
    cap.position.y = 0.32;
    armGroup.add(cap);

    return armGroup;
  }

  createEarModule(isLeft) {
    const earGroup = new THREE.Group();
    const { whiteBody, darkHardware, cyanGlow, chrome } = this.materials;

    // Outer cylindrical housing
    const housingGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.16, 24);
    housingGeo.rotateZ(Math.PI / 2);
    const housing = new THREE.Mesh(housingGeo, whiteBody);
    earGroup.add(housing);

    // Inner chrome bevel
    const bevelGeo = new THREE.TorusGeometry(0.18, 0.025, 12, 24);
    bevelGeo.rotateY(Math.PI / 2);
    const bevel = new THREE.Mesh(bevelGeo, chrome);
    bevel.position.x = isLeft ? -0.09 : 0.09;
    earGroup.add(bevel);

    // Glowing cyan center audio sensor disk
    const diskGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 20);
    diskGeo.rotateZ(Math.PI / 2);
    const disk = new THREE.Mesh(diskGeo, cyanGlow);
    disk.position.x = isLeft ? -0.1 : 0.1;
    earGroup.add(disk);

    return earGroup;
  }

  createContactShadow() {
    // Soft radial dark cyan contact shadow
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 210, 255, 0.45)');
    grad.addColorStop(0.3, 'rgba(15, 23, 42, 0.7)');
    grad.addColorStop(0.7, 'rgba(2, 6, 23, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    return shadowMesh;
  }

  createParticles() {
    const count = 35;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.0 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x00D2FF,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geo, mat);
  }

  setState(newState) {
    this.state = newState;
    this.expression.setState(newState);

    // Update material illumination colors based on state
    if (newState === 'thinking') {
      this.haloMesh.visible = true;
      this.beaconLed.material = this.materials.purpleGlow;
      this.beaconLight.color.setHex(0x8B5CF6);
      this.reactorLight.color.setHex(0x8B5CF6);
    } else if (newState === 'success') {
      this.haloMesh.visible = false;
      this.beaconLed.material = this.materials.cyanGlow;
      this.beaconLight.color.setHex(0x10B981); // Emerald celebration
      this.reactorLight.color.setHex(0x10B981);
    } else if (newState === 'error') {
      this.haloMesh.visible = false;
      this.beaconLed.material = this.materials.cyanGlow;
      this.beaconLight.color.setHex(0xF59E0B); // Amber caution
      this.reactorLight.color.setHex(0xF59E0B);
    } else {
      this.haloMesh.visible = false;
      this.beaconLed.material = this.materials.cyanGlow;
      this.beaconLight.color.setHex(0x00D2FF);
      this.reactorLight.color.setHex(0x00D2FF);
    }
  }

  setPointer(normX, normY) {
    this.pointer.x = Math.max(-1, Math.min(1, normX));
    this.pointer.y = Math.max(-1, Math.min(1, normY));
    this.expression.setLookTarget(this.pointer.x, this.pointer.y);
  }

  setAudioLevel(level) {
    this.expression.setAudioLevel(level);
  }

  update(delta = 0.016) {
    this.time += delta;
    const { time, state } = this;

    // 1. Update Expression Canvas Texture
    this.expression.update(delta);
    this.faceTexture.needsUpdate = true;

    // 2. Smoothly damp pointer coordinates for head and body tracking
    this.dampedPointer.x += (this.pointer.x - this.dampedPointer.x) * 0.08;
    this.dampedPointer.y += (this.pointer.y - this.dampedPointer.y) * 0.08;

    // 3. Gentle Sine-Wave Floating Bobbing (zero-gravity hovering)
    const floatFreq = state === 'thinking' ? 1.5 : 2.2;
    const floatAmp = state === 'thinking' ? 0.05 : 0.09;
    const hoverY = Math.sin(time * floatFreq) * floatAmp;
    this.torsoGroup.position.y = -0.3 + hoverY;
    this.headGroup.position.y = 0.92 + hoverY;

    // Dynamically adjust shadow disk scale with height
    const shadowScale = 1.0 - hoverY * 1.5;
    this.shadowDisk.scale.set(shadowScale, shadowScale, shadowScale);

    // 4. Pointer-guided Head Tracking (Pitch & Yaw)
    // Head yaw (-28 deg to +28 deg)
    const targetHeadYaw = this.dampedPointer.x * 0.5;
    // Head pitch (-16 deg to +16 deg)
    const targetHeadPitch = -this.dampedPointer.y * 0.28;
    // Subtle tilt roll
    const targetHeadRoll = -this.dampedPointer.x * 0.08;

    this.headGroup.rotation.y = targetHeadYaw + Math.sin(time * 0.7) * 0.04;
    this.headGroup.rotation.x = targetHeadPitch;
    this.headGroup.rotation.z = targetHeadRoll;

    // 5. Torso Follows with subtle secondary lag
    this.torsoGroup.rotation.y = targetHeadYaw * 0.45;
    this.torsoGroup.rotation.x = targetHeadPitch * 0.3;

    // 6. State-Specific Articulation Gestures
    if (state === 'greeting') {
      // Right arm waves gently
      const wave = Math.sin(time * 8) * 0.35;
      this.rightArm.position.y = 0.35 + hoverY;
      this.rightArm.position.x = 1.15;
      this.rightArm.rotation.z = -0.8 + wave;
      this.leftArm.position.y = 0.1 + hoverY;
      this.leftArm.rotation.z = 0.2;
    } else if (state === 'thinking') {
      // Both arms tuck closer to chest
      this.leftArm.position.set(-0.88, 0.15 + hoverY, 0.2);
      this.rightArm.position.set(0.88, 0.15 + hoverY, 0.2);
      this.leftArm.rotation.z = 0.5;
      this.rightArm.rotation.z = -0.5;

      // Spin thinking halo
      this.haloMesh.rotation.z = time * 2.5;
      this.haloMesh.rotation.y = time * 1.2;
    } else if (state === 'listening') {
      // Attentive slight head tilt
      this.headGroup.rotation.z += Math.sin(time * 3) * 0.06 + 0.08;
      this.leftArm.position.y = 0.1 + hoverY;
      this.rightArm.position.y = 0.1 + hoverY;
      this.leftArm.rotation.z = 0.2;
      this.rightArm.rotation.z = -0.2;
    } else if (state === 'responding') {
      // Slight rhythmic nodding
      const nod = Math.sin(time * 5) * 0.06;
      this.headGroup.rotation.x += nod;
      this.leftArm.position.y = 0.1 + hoverY + nod * 0.5;
      this.rightArm.position.y = 0.1 + hoverY - nod * 0.5;
      this.leftArm.rotation.z = 0.25;
      this.rightArm.rotation.z = -0.25;
    } else {
      // Idle natural subtle counter-bob of arms
      this.leftArm.position.y = 0.1 + Math.sin(time * floatFreq + Math.PI) * 0.03;
      this.rightArm.position.y = 0.1 + Math.sin(time * floatFreq) * 0.03;
      this.leftArm.position.x = -1.05;
      this.rightArm.position.x = 1.05;
      this.leftArm.rotation.z = 0.2;
      this.rightArm.rotation.z = -0.2;
    }

    // 7. Ambient Particle Drift
    if (this.particles) {
      this.particles.rotation.y = time * 0.08;
    }

    // 8. Core Reactor Pulse
    const reactorPulse = Math.sin(time * 4) * 0.4 + 1.2;
    this.reactorLight.intensity = reactorPulse;
    this.beaconLight.intensity = Math.sin(time * 3) * 0.5 + 1.2;
  }

  dispose() {
    // Dispose materials
    Object.values(this.materials).forEach(mat => {
      if (mat && mat.dispose) mat.dispose();
    });

    // Dispose face texture
    if (this.faceTexture) this.faceTexture.dispose();

    // Traverse and dispose geometries
    this.root.traverse((child) => {
      if (child.isMesh || child.isPoints) {
        if (child.geometry) child.geometry.dispose();
      }
    });
  }
}

export default FutureBotCharacter;

