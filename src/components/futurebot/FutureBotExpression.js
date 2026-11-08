/**
/**
 * FutureBotExpression.js
 * 
 * High-performance 2D Canvas Texture generator for FutureBot's curved OLED visor.
 * Renders expressive digital cyan eyes, natural animated blinking, pointer gaze tracking,
 * emotion morphing (idle, greeting, listening, thinking, responding, success, error),
 * and dynamic voice speech audio waveform bars.
 */

export class FutureBotExpression {
  constructor(width = 512, height = 256) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.width = width;
    this.height = height;

    // State
    this.state = 'idle';
    this.blinkProgress = 0; // 0 = open, 1 = closed
    this.blinkTimer = 0;
    this.nextBlinkInterval = 3200 + Math.random() * 2000;
    this.isBlinking = false;

    // Pupil directional offsets (-1 to 1)
    this.lookX = 0;
    this.lookY = 0;
    this.targetLookX = 0;
    this.targetLookY = 0;

    // Animation timers
    this.time = 0;
    this.wavePhase = 0;
    this.scanlineOffset = 0;
    this.successCelebrationTimer = 0;

    // Audio/speech reactivity level (0 to 1)
    this.audioLevel = 0;
  }

  setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      if (newState === 'success') {
        this.successCelebrationTimer = 1.0;
      }
    }
  }

  setLookTarget(x, y) {
    this.targetLookX = Math.max(-1, Math.min(1, x));
    this.targetLookY = Math.max(-1, Math.min(1, y));
  }

  setAudioLevel(level) {
    this.audioLevel = Math.max(0, Math.min(1, level));
  }

  update(delta = 0.016) {
    this.time += delta;
    this.wavePhase += delta * 7;
    this.scanlineOffset = (this.scanlineOffset + delta * 15) % 8;

    // Smoothly lerp gaze
    this.lookX += (this.targetLookX - this.lookX) * 0.12;
    this.lookY += (this.targetLookY - this.lookY) * 0.12;

    // Blinking logic (natural periodic blink every 3-5 seconds)
    this.blinkTimer += delta * 1000;
    if (!this.isBlinking && this.blinkTimer > this.nextBlinkInterval) {
      this.isBlinking = true;
      this.blinkTimer = 0;
    }

    if (this.isBlinking) {
      this.blinkProgress += delta * 10; // smooth natural blink speed
      if (this.blinkProgress >= 1.0) {
        this.blinkProgress = 0;
        this.isBlinking = false;
        this.nextBlinkInterval = 3000 + Math.random() * 2500;
      }
    }

    if (this.successCelebrationTimer > 0) {
      this.successCelebrationTimer = Math.max(0, this.successCelebrationTimer - delta * 0.5);
    }

    // Render the face
    this.render();
  }

  render() {
    const { ctx, width, height, state, time, wavePhase } = this;
    ctx.clearRect(0, 0, width, height);

    // 1. Deep OLED Glossy Visor Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.55);
    bgGrad.addColorStop(0, '#040914');
    bgGrad.addColorStop(0.65, '#02060E');
    bgGrad.addColorStop(1, '#010307');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle ambient cybernetic rim vignette
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width * 0.46, height * 0.44, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Eye Coordinate Positioning
    const eyeSpacing = 100;
    const eyeBaseY = 112;
    const leftEyeX = width / 2 - eyeSpacing;
    const rightEyeX = width / 2 + eyeSpacing;

    // Calculate blink scale (0 to 1)
    let blinkScale = 1.0;
    if (this.isBlinking) {
      const p = Math.sin(this.blinkProgress * Math.PI);
      blinkScale = Math.max(0.04, 1.0 - p);
    }

    // Apply gaze offset
    const offsetX = this.lookX * 18;
    const offsetY = this.lookY * 12;

    // 3. Draw Eyes based on active character state
    ctx.save();
    switch (state) {
      case 'greeting':
      case 'success':
        this.drawHappyEye(ctx, leftEyeX + offsetX * 0.4, eyeBaseY + offsetY * 0.4, false, time);
        this.drawHappyEye(ctx, rightEyeX + offsetX * 0.4, eyeBaseY + offsetY * 0.4, true, time);
        break;

      case 'thinking':
        this.drawThinkingEye(ctx, leftEyeX + offsetX * 0.5, eyeBaseY + offsetY * 0.5, time);
        this.drawThinkingEye(ctx, rightEyeX + offsetX * 0.5, eyeBaseY + offsetY * 0.5, time + Math.PI);
        break;

      case 'listening':
        this.drawListeningEye(ctx, leftEyeX + offsetX, eyeBaseY + offsetY, time);
        this.drawListeningEye(ctx, rightEyeX + offsetX, eyeBaseY + offsetY, time);
        break;

      case 'error':
        this.drawErrorEye(ctx, leftEyeX + offsetX, eyeBaseY + offsetY, false);
        this.drawErrorEye(ctx, rightEyeX + offsetX, eyeBaseY + offsetY, true);
        break;

      case 'responding':
        // Expressive eyes with subtle speech pulse
        const speechPulse = 1.0 + Math.sin(time * 12) * 0.06;
        this.drawStandardEye(ctx, leftEyeX + offsetX, eyeBaseY + offsetY, blinkScale * speechPulse, time);
        this.drawStandardEye(ctx, rightEyeX + offsetX, eyeBaseY + offsetY, blinkScale * speechPulse, time);
        break;

      case 'idle':
      default:
        this.drawStandardEye(ctx, leftEyeX + offsetX, eyeBaseY + offsetY, blinkScale, time);
        this.drawStandardEye(ctx, rightEyeX + offsetX, eyeBaseY + offsetY, blinkScale, time);
        break;
    }
    ctx.restore();

    // 4. Draw Digital Voice Wave / Mouth
    if (state === 'responding' || state === 'listening' || this.audioLevel > 0.05) {
      this.drawVoiceWave(ctx, width / 2, 192, wavePhase, state);
    } else {
      this.drawStandbyMouth(ctx, width / 2, 192, time, state);
    }

    // 5. Tech scanlines overlay for authentic digital screen aesthetic
    ctx.fillStyle = 'rgba(0, 210, 255, 0.015)';
    for (let y = this.scanlineOffset; y < height; y += 6) {
      ctx.fillRect(0, y, width, 1);
    }
  }

  drawStandardEye(ctx, x, y, blinkScale, time) {
    const eyeW = 52;
    const eyeH = 72 * blinkScale;
    const r = Math.min(eyeW / 2, eyeH / 2);

    ctx.save();
    ctx.translate(x, y);

    // Glowing cyan bloom
    ctx.shadowColor = '#00D2FF';
    ctx.shadowBlur = 24;

    if (blinkScale < 0.12) {
      // Slit eye during full blink
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-eyeW / 2, 0);
      ctx.lineTo(eyeW / 2, 0);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Outer Eye Capsule with Electric Cyan Gradient
    const eyeGrad = ctx.createLinearGradient(0, -eyeH / 2, 0, eyeH / 2);
    eyeGrad.addColorStop(0, '#38BDF8');
    eyeGrad.addColorStop(0.5, '#00D2FF');
    eyeGrad.addColorStop(1, '#0284C7');
    ctx.fillStyle = eyeGrad;
    this.roundRect(ctx, -eyeW / 2, -eyeH / 2, eyeW, eyeH, r);
    ctx.fill();

    // Inner bright white/cyan core
    if (blinkScale > 0.3) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFFFFF';
      ctx.fillStyle = '#E0F7FE';
      this.roundRect(ctx, -eyeW * 0.36, -eyeH * 0.36, eyeW * 0.72, eyeH * 0.72, r * 0.72);
      ctx.fill();

      // Specular Reflection Highlight
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(eyeW * 0.18, -eyeH * 0.22, 5, 0, Math.PI * 2);
      ctx.fill();

      // Secondary soft reflection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(-eyeW * 0.14, eyeH * 0.2, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawHappyEye(ctx, x, y, isRight, time) {
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = '#00D2FF';
    ctx.shadowBlur = 28;

    // Upward crescent arch (^ ^)
    ctx.strokeStyle = '#00D2FF';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, 10, 30, Math.PI * 1.15, Math.PI * 1.85, false);
    ctx.stroke();

    // Inner bright white highlight curve
    ctx.strokeStyle = '#F0FDFA';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Cheerful sparkle stars
    const starX = isRight ? 28 : -28;
    const starY = -12 + Math.sin(time * 3 + (isRight ? 1 : 0)) * 3;
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(starX, starY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawThinkingEye(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    // Center eye capsule
    ctx.shadowColor = '#A855F7';
    ctx.shadowBlur = 22;
    ctx.fillStyle = '#00D2FF';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    // Rotating orbital energy rings in purple and cyan
    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, 0, 28, time * 5, time * 5 + Math.PI * 0.85);
    ctx.stroke();

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 36, -time * 4, -time * 4 + Math.PI * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  drawListeningEye(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    const pulse = Math.sin(time * 7) * 3;
    const radius = 26 + pulse;

    ctx.shadowColor = '#00D2FF';
    ctx.shadowBlur = 30;

    // Attentive wide circular eye
    ctx.fillStyle = '#00D2FF';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Acoustic radar ring expanding outward
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius + 10 + Math.abs(pulse * 1.8), 0, Math.PI * 2);
    ctx.stroke();

    // Bright core
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawErrorEye(ctx, x, y, isRight) {
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 18;

    // Soft tilted drooped eye shape
    ctx.rotate(isRight ? -0.22 : 0.22);
    ctx.fillStyle = '#38BDF8';
    this.roundRect(ctx, -22, -15, 44, 30, 14);
    ctx.fill();

    // Amber warning indicator core
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawVoiceWave(ctx, centerX, centerY, phase, state) {
    ctx.save();
    ctx.translate(centerX, centerY);

    const barCount = 9;
    const barWidth = 6;
    const barSpacing = 13;
    const totalW = barCount * barSpacing;
    const startX = -totalW / 2 + barWidth / 2;

    ctx.shadowColor = state === 'listening' ? '#38BDF8' : '#00D2FF';
    ctx.shadowBlur = 16;

    for (let i = 0; i < barCount; i++) {
      const normI = i / (barCount - 1);
      const wave = Math.sin(phase + i * 0.85) * 0.5 + 0.5;
      const centerFactor = 1.0 - Math.abs(normI - 0.5) * 1.25;
      const height = Math.max(6, (wave * 30 + 8) * Math.max(0.4, centerFactor) * (this.audioLevel ? this.audioLevel * 1.8 : 1));

      ctx.fillStyle = i % 2 === 0 ? '#00D2FF' : '#38BDF8';
      this.roundRect(ctx, startX + i * barSpacing - barWidth / 2, -height / 2, barWidth, height, barWidth / 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawStandbyMouth(ctx, centerX, centerY, time, state) {
    ctx.save();
    ctx.translate(centerX, centerY);

    if (state === 'greeting' || state === 'success') {
      // Gentle cheerful curved smile line
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 14;
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, -6, 22, Math.PI * 0.2, Math.PI * 0.8, false);
      ctx.stroke();
    } else {
      // Gentle standby pill
      const w = 32 + Math.sin(time * 2) * 2;
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 10;
      ctx.fillStyle = 'rgba(0, 210, 255, 0.55)';
      this.roundRect(ctx, -w / 2, -2.5, w, 5, 2.5);
      ctx.fill();
    }

    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

export default FutureBotExpression;
