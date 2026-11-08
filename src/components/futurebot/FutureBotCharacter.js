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

    // Expression canvas controller (512x256)
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
      roughness: 0.16,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    // 2. Dark Metallic Hardware / Neck Collar / Visor Bezel
    const darkHardware = new THREE.MeshStandardMaterial({
      color: 0x090E17,
      roughness: 0.28,
      metalness: 0.9,
    });

    // 3. Digital OLED Face Visor Screen (with glowing canvas texture)
    const visorScreen = new THREE.MeshStandardMaterial({
      map: this.faceTexture,
      emissiveMap: this.faceTexture,
      emissive: new THREE.Color(0xFFFFFF),
      emissiveIntensity: 1.35, // Ensures bright cyan eyes glow in 3D
      roughness: 0.1,
      metalness: 0.15,
    });

    // 4. Glossy Outer Visor Glass Shield
    const visorGlass = new THREE.MeshPhysicalMaterial({
      color: 0x040812,
      transparent: true,
      opacity: 0.18,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
      depthWrite: false, // CRITICAL: Never clips or occludes the glowing eyes behind it
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
      roughness: 0.08,
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

    // Outer Head Shell (Sculpted rounded helmet with front facial cavity)
    const headGeo = new THREE.SphereGeometry(0.85, 36, 28);
    headGeo.scale(1.12, 1.0, 1.02);
    
    // Recess the front of the white head shell so it never covers the visor
    const hPos = headGeo.attributes.position;
    for (let i = 0; i < hPos.count; i++) {
      const x = hPos.getX(i);
      const y = hPos.getY(i);
      const z = hPos.getZ(i);
      if (z > 0.35 && Math.abs(x) < 0.65 && Math.abs(y) < 0.45) {
        hPos.setZ(i, Math.min(z, 0.68));
      }
    }
    headGeo.computeVertexNormals();

    this.headMesh = new THREE.Mesh(headGeo, whiteBody);
    this.headMesh.castShadow = true;
    this.headGroup.add(this.headMesh);

    // ==========================================
    // 3A. CURVED FRONT VISOR SCREEN (512x256 PLANAR UV PROJECTION)
    // ==========================================
    const visorWidth = 1.18;
    const visorHeight = 0.72;
    const visorGeo = new THREE.PlaneGeometry(visorWidth, visorHeight, 32, 24);
    const vPos = visorGeo.attributes.position;
    const vUvs = visorGeo.attributes.uv;

    // Curve the visor to match the natural dome of the head
    for (let i = 0; i < vPos.count; i++) {
      const x = vPos.getX(i);
      const y = vPos.getY(i);
      const nx = x / (visorWidth / 2); // -1 to 1
      const ny = y / (visorHeight / 2); // -1 to 1
      const distSq = nx * nx * 0.65 + ny * ny * 0.35;
      const curveZ = 0.18 * (1.0 - Math.min(1.0, distSq));
      vPos.setZ(i, curveZ);

      // Clean planar UV coordinates: maps canvas texture 1:1 without pinching
      vUvs.setXY(i, (nx + 1.0) * 0.5, (ny + 1.0) * 0.5);
    }
    visorGeo.computeVertexNormals();

    // Visor Screen Mesh (Displays glowing cyan eyes and talking mouth)
    this.visorMesh = new THREE.Mesh(visorGeo, visorScreen);
    this.visorMesh.position.set(0, 0.05, 0.76);
    this.headGroup.add(this.visorMesh);

    // Protective Glossy Outer Dark Glass
    const glassGeo = visorGeo.clone();
    const visorGlassMesh = new THREE.Mesh(glassGeo, visorGlass);
    visorGlassMesh.position.set(0, 0.05, 0.78);
    this.headGroup.add(visorGlassMesh);

    // Visor Bezel Frame (Integrated dark titanium rim around the face)
    const bezelGeo = new THREE.TorusGeometry(0.58, 0.024, 16, 48);
    bezelGeo.scale(1.06, 0.65, 0.75);
    const bezelMesh = new THREE.Mesh(bezelGeo, darkHardware);
    bezelMesh.position.set(0, 0.05, 0.81);
    this.headGroup.add(bezelMesh);

    // Visor Cyan Accent Seam (Glowing perimeter outline)
    const seamGeo = new THREE.TorusGeometry(0.59, 0.008, 8, 48);
    seamGeo.scale(1.06, 0.65, 0.75);
    const seamMesh = new THREE.Mesh(seamGeo, cyanGlow);
    seamMesh.position.set(0, 0.05, 0.815);
    this.headGroup.add(seamMesh);

    // Soft Forward Eye Illumination Light
    this.eyeLight = new THREE.PointLight(0x00D2FF, 1.2, 2.2);
    this.eyeLight.position.set(0, 0.05, 1.15);
    this.headGroup.add(this.eyeLight);

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

    // Shoulder Magnetic Emitter Socket
    const socketGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.08, 16);
    socketGeo.rotateZ(isLeft ? Math.PI / 2 : -Math.PI / 2);
    const socket = new THREE.Mesh(socketGeo, darkHardware);
    socket.position.set(isLeft ? 0.12 : -0.12, 0.15, 0);
    armGroup.add(socket);

    return armGroup;
  }

  createEarModule(isLeft) {
    const earGroup = new THREE.Group();
    const { whiteBody, darkHardware, cyanGlow } = this.materials;

    // Outer Ear Cup
    const cupGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.16, 32);
    cupGeo.rotateZ(Math.PI / 2);
    const cup = new THREE.Mesh(cupGeo, whiteBody);
    earGroup.add(cup);

    // Inner Audio Grille
    const grilleGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.18, 24);
    grilleGeo.rotateZ(Math.PI / 2);
    const grille = new THREE.Mesh(grilleGeo, darkHardware);
    earGroup.add(grille);

    // Cyan Pulse Ring
    const ringGeo = new THREE.TorusGeometry(0.24, 0.02, 16, 32);
    ringGeo.rotateY(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, cyanGlow);
    ring.position.x = isLeft ? -0.06 : 0.06;
    earGroup.add(ring);

    return earGroup;
  }

  createContactShadow() {
    // Soft blurred elliptical shadow disk underneath floating robot
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.4, 'rgba(0, 210, 255, 0.15)');
    grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.0);
    shadowGeo.rotateX(-Math.PI / 2);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    return new THREE.Mesh(shadowGeo, shadowMat);
  }

  createParticles() {
    const count = 30;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 1.2 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x00D2FF,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geo, mat);
  }

  setState(newState) {
    if (this.state === newState) return;
    this.state = newState;
    this.expression.setState(newState);

    // Update LED Accent Lighting based on active emotional state
    if (newState === 'thinking') {
      this.beaconLed.material = this.materials.purpleGlow;
      this.beaconLight.color.setHex(0x8B5CF6);
      this.haloMesh.visible = true;
      this.eyeLight.color.setHex(0xA855F7);
    } else if (newState === 'error') {
      this.beaconLight.color.setHex(0xF59E0B);
      this.eyeLight.color.setHex(0xF59E0B);
      this.haloMesh.visible = false;
    } else {
      this.beaconLed.material = this.materials.cyanGlow;
      this.beaconLight.color.setHex(0x00D2FF);
      this.haloMesh.visible = false;
      this.reactorLight.color.setHex(0x00D2FF);
      this.eyeLight.color.setHex(0x00D2FF);
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

    // 1. Update Expression Canvas Texture (Always refresh for animated eyes, blinking, and speech wave)
    this.expression.update(delta);
    this.faceTexture.needsUpdate = true;

    // 2. Smoothly damp pointer coordinates for head and body tracking
    this.dampedPointer.x += (this.pointer.x - this.dampedPointer.x) * 0.09;
    this.dampedPointer.y += (this.pointer.y - this.dampedPointer.y) * 0.09;

    // 3. Gentle Sine-Wave Floating Bobbing (zero-gravity hovering)
    const floatFreq = state === 'thinking' ? 1.6 : 2.2;
    let floatAmp = state === 'thinking' ? 0.05 : 0.08;
    let hoverY = Math.sin(time * floatFreq) * floatAmp;

    // Celebratory bounce in success state
    if (state === 'success') {
      hoverY += Math.abs(Math.sin(time * 6)) * 0.1;
    }

    this.torsoGroup.position.y = -0.3 + hoverY;
    this.headGroup.position.y = 0.92 + hoverY;

    // Dynamically adjust shadow disk scale with height
    const shadowScale = 1.0 - hoverY * 1.5;
    this.shadowDisk.scale.set(shadowScale, shadowScale, shadowScale);

    // 4. Pointer-guided Head Tracking (Pitch & Yaw)
    let targetHeadYaw = this.dampedPointer.x * 0.45;
    let targetHeadPitch = -this.dampedPointer.y * 0.25;
    let targetHeadRoll = -this.dampedPointer.x * 0.07;

    // State-specific head gesture enhancements
    if (state === 'greeting') {
      // Welcoming polite head nod & tilt
      targetHeadRoll += Math.sin(time * 3) * 0.07;
      targetHeadPitch += Math.sin(time * 4) * 0.05;
    } else if (state === 'thinking') {
      // Inquisitive head tilt upward
      targetHeadYaw += 0.22;
      targetHeadPitch += 0.14;
      targetHeadRoll += 0.08;
    } else if (state === 'listening') {
      // Attentive slight forward lean
      targetHeadPitch -= 0.09;
    } else if (state === 'responding') {
      // Speaking rhythmic head bob
      targetHeadPitch += Math.sin(time * 12) * 0.035;
    } else if (state === 'error') {
      // Gentle concerned downward tilt
      targetHeadPitch -= 0.12;
    }

    this.headGroup.rotation.y = targetHeadYaw + Math.sin(time * 0.8) * 0.03;
    this.headGroup.rotation.x = targetHeadPitch;
    this.headGroup.rotation.z = targetHeadRoll;

    // 5. Torso Follows with subtle secondary lag
    this.torsoGroup.rotation.y = targetHeadYaw * 0.4;

    // 6. Articulated Floating Arms
    const armBob = Math.cos(time * 2.2) * 0.05;
    this.leftArm.position.y = 0.1 + armBob;
    this.rightArm.position.y = 0.1 - armBob;

    if (state === 'greeting') {
      // Right arm raises and waves cheerfully!
      this.rightArm.position.y = 0.35;
      this.rightArm.rotation.z = -0.6 + Math.sin(time * 8) * 0.35;
      this.leftArm.rotation.z = 0.2;
    } else if (state === 'success') {
      // Both arms spread outward in joy
      this.leftArm.rotation.z = 0.5 + Math.sin(time * 5) * 0.15;
      this.rightArm.rotation.z = -0.5 - Math.sin(time * 5) * 0.15;
    } else {
      this.leftArm.rotation.z = 0.2 + armBob * 0.4;
      this.rightArm.rotation.z = -0.2 - armBob * 0.4;
    }

    // 7. Rotating Thinking Halo
    if (this.haloMesh.visible) {
      this.haloMesh.rotation.z += delta * 2.2;
      this.haloMesh.rotation.y += delta * 1.5;
    }

    // 8. Swirling background energy particles
    if (this.particles) {
      this.particles.rotation.y += delta * 0.18;
    }

    // 9. Chest Arc Reactor Core Pulse
    const reactorPulse = Math.sin(time * 4) * 0.15 + 1.0;
    this.reactorLight.intensity = (state === 'responding' || state === 'listening')
      ? 1.6 + (this.expression.audioLevel || 0) * 1.5
      : 1.1 * reactorPulse;
  }

  dispose() {
    if (this.faceTexture) this.faceTexture.dispose();
    this.root.traverse((obj) => {
      if (obj.isMesh || obj.isPoints) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      }
    });
  }
}

export default FutureBotCharacter;
