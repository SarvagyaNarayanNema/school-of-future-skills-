/**
 * FutureBotExpression.js
 * 
 * High-performance 2D Canvas Texture generator for FutureBot's curved OLED visor.
 * Renders expressive digital cyan eyes, natural blinking, pointer pupil tracking,
 * emotion morphing (idle, greeting, listening, thinking, responding, success, error),
 * and audio soundwave visualizer bars.
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
    this.nextBlinkInterval = 3000 + Math.random() * 2000;
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
    this.wavePhase += delta * 6;
    this.scanlineOffset = (this.scanlineOffset + delta * 20) % 8;

    // Smoothly lerp gaze
    this.lookX += (this.targetLookX - this.lookX) * 0.1;
    this.lookY += (this.targetLookY - this.lookY) * 0.1;

    // Blinking logic (natural periodic blink)
    this.blinkTimer += delta * 1000;
    if (!this.isBlinking && this.blinkTimer > this.nextBlinkInterval) {
      this.isBlinking = true;
      this.blinkTimer = 0;
    }

    if (this.isBlinking) {
      this.blinkProgress += delta * 12; // fast blink
      if (this.blinkProgress >= 1.0) {
        this.blinkProgress = 0;
        this.isBlinking = false;
        this.nextBlinkInterval = 2500 + Math.random() * 3000;
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

    // 1. Deep OLED Visor Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width / 2);
    bgGrad.addColorStop(0, '#060F1E');
    bgGrad.addColorStop(0.7, '#030712');
    bgGrad.addColorStop(1, '#02050B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle digital horizon curve
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width * 0.45, height * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Eye Coordinates
    const eyeSpacing = 95;
    const eyeBaseY = 110;
    const leftEyeX = width / 2 - eyeSpacing;
    const rightEyeX = width / 2 + eyeSpacing;

    // Calculate blink scale (0 to 1)
    let blinkScale = 1.0;
    if (this.isBlinking) {
      blinkScale = Math.sin(this.blinkProgress * Math.PI);
      blinkScale = Math.max(0.06, 1.0 - blinkScale);
    }

    // Apply look offset
    const offsetX = this.lookX * 18;
    const offsetY = this.lookY * 12;

    // 3. Draw Eyes based on active character state
    ctx.save();
    switch (state) {
      case 'greeting':
      case 'success':
        this.drawHappyEye(ctx, leftEyeX + offsetX, eyeBaseY + offsetY, false, time);
        this.drawHappyEye(ctx, rightEyeX + offsetX, eyeBaseY + offsetY, true, time);
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
      case 'idle':
      default:
        this.drawStandardEye(ctx, leftEyeX + offsetX, eyeBaseY + offsetY, blinkScale, time);
        this.drawStandardEye(ctx, rightEyeX + offsetX, eyeBaseY + offsetY, blinkScale, time);
        break;
    }
    ctx.restore();

    // 4. Draw Digital Voice Wave / Mouth when responding or listening
    if (state === 'responding' || state === 'listening' || this.audioLevel > 0.05) {
      this.drawVoiceWave(ctx, width / 2, 195, wavePhase, state);
    } else {
      // Subtle ambient standby bar
      this.drawStandbyMouth(ctx, width / 2, 195, time);
    }

    // 5. Tech scanlines overlay
    ctx.fillStyle = 'rgba(0, 210, 255, 0.02)';
    for (let y = this.scanlineOffset; y < height; y += 8) {
      ctx.fillRect(0, y, width, 1);
    }
  }

  drawStandardEye(ctx, x, y, blinkScale, time) {
    const eyeW = 42;
    const eyeH = 54 * blinkScale;
    const r = Math.min(eyeW / 2, eyeH / 2);

    ctx.save();
    ctx.translate(x, y);

    // Glowing cyan drop shadow
    ctx.shadowColor = '#00D2FF';
    ctx.shadowBlur = 18;

    // Outer Eye Capsule
    ctx.fillStyle = '#00D2FF';
    this.roundRect(ctx, -eyeW / 2, -eyeH / 2, eyeW, eyeH, r);
    ctx.fill();

    // Inner bright cyan/white core
    if (blinkScale > 0.3) {
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#FFFFFF';
      ctx.fillStyle = '#E0F7FE';
      this.roundRect(ctx, -eyeW * 0.35, -eyeH * 0.35, eyeW * 0.7, eyeH * 0.7, r * 0.7);
      ctx.fill();

      // Digital lens glint
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(eyeW * 0.15, -eyeH * 0.2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawHappyEye(ctx, x, y, isRight, time) {
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#00D2FF';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';

    // Upward crescent arch (^ ^)
    ctx.beginPath();
    ctx.arc(0, 8, 26, Math.PI * 1.15, Math.PI * 1.85, false);
    ctx.stroke();

    // Secondary inner highlight
    ctx.strokeStyle = '#E0F2FE';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Sparkle star next to eye
    const sparkleAngle = time * 3 + (isRight ? 1 : 0);
    const starX = isRight ? 24 : -24;
    const starY = -12 + Math.sin(sparkleAngle) * 3;
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(starX, starY, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawThinkingEye(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    // Center eye dot
    ctx.shadowColor = '#818CF8';
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    // Rotating orbital energy arcs
    ctx.strokeStyle = '#A78BFA';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, 0, 26, time * 5, time * 5 + Math.PI * 0.85);
    ctx.stroke();

    ctx.strokeStyle = '#00D2FF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 32, -time * 3, -time * 3 + Math.PI * 0.6);
    ctx.stroke();

    ctx.restore();
  }

  drawListeningEye(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    // Pulse diameter
    const pulse = Math.sin(time * 6) * 3;
    const radius = 24 + pulse;

    ctx.shadowColor = '#00D2FF';
    ctx.shadowBlur = 24;

    // Attentive wide circular eye
    ctx.fillStyle = '#00D2FF';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Concentric acoustic sensor rings
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8 + Math.abs(pulse * 1.5), 0, Math.PI * 2);
    ctx.stroke();

    // Bright pupil core
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawErrorEye(ctx, x, y, isRight) {
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 14;

    // Soft tilted drooped eye shape
    ctx.rotate(isRight ? -0.2 : 0.2);
    ctx.fillStyle = '#38BDF8';
    this.roundRect(ctx, -18, -14, 36, 28, 12);
    ctx.fill();

    // Tiny amber warning indicator
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawVoiceWave(ctx, centerX, centerY, phase, state) {
    ctx.save();
    ctx.translate(centerX, centerY);

    const barCount = 7;
    const barWidth = 6;
    const barSpacing = 12;
    const totalW = barCount * barSpacing;
    const startX = -totalW / 2 + barWidth / 2;

    ctx.shadowColor = state === 'listening' ? '#38BDF8' : '#00D2FF';
    ctx.shadowBlur = 12;

    for (let i = 0; i < barCount; i++) {
      // Dynamic equalizer height
      const normI = i / (barCount - 1);
      const wave = Math.sin(phase + i * 0.9) * 0.5 + 0.5;
      const centerFactor = 1.0 - Math.abs(normI - 0.5) * 1.2;
      const height = Math.max(6, (wave * 26 + 6) * Math.max(0.4, centerFactor) * (this.audioLevel ? this.audioLevel * 1.5 : 1));

      ctx.fillStyle = i % 2 === 0 ? '#00D2FF' : '#38BDF8';
      this.roundRect(ctx, startX + i * barSpacing - barWidth / 2, -height / 2, barWidth, height, barWidth / 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawStandbyMouth(ctx, centerX, centerY, time) {
    ctx.save();
    ctx.translate(centerX, centerY);

    // Gentle friendly digital mouth pill
    const w = 24 + Math.sin(time * 2) * 2;
    ctx.shadowColor = '#00D2FF';
    ctx.shadowBlur = 8;
    ctx.fillStyle = 'rgba(0, 210, 255, 0.45)';
    this.roundRect(ctx, -w / 2, -2, w, 4, 2);
    ctx.fill();

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

