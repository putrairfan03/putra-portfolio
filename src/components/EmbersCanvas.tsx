import { useEffect, useRef, type MutableRefObject } from 'react';

interface EmbersCanvasProps {
  heatRef: MutableRefObject<number>;
  burstCountRef: MutableRefObject<number>;
  reducedMotion: boolean;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  swayPhase: number;
  swayFreq: number;
  swayAmp: number;
  flickerPhase: number;
  flickerFreq: number;
}

const BOX_X0 = 560;
const BOX_Y0 = 360;
const BOX_W = 600; // 560..1160
const BOX_H = 440; // 360..800
const SCALE = 2;

function createEmberSprite(): HTMLCanvasElement {
  const SIZE = 64;
  const c = document.createElement('canvas');
  c.width = SIZE;
  c.height = SIZE;
  const ctx = c.getContext('2d');
  if (ctx) {
    const r = SIZE * 0.5;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,244,214,1)');
    grad.addColorStop(0.18, 'rgba(255,200,110,1)');
    grad.addColorStop(0.42, 'rgba(245,150,50,0.55)');
    grad.addColorStop(1, 'rgba(245,150,50,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);
  }
  return c;
}

function spawnEmber(speedMult = 1): Ember {
  const x = 815 + (Math.random() - 0.5) * 160; // 815 ± 80
  const y = 520 + Math.random() * 180; // 520..700
  const vx = ((Math.random() - 0.5) * 40 + (x - 815) * 0.35) * speedMult;
  const vy = -(22 + Math.random() * 38) * speedMult;
  return {
    x,
    y,
    vx,
    vy,
    age: 0,
    life: 2.2 + Math.random() * 1.6, // 2.2–3.8s
    size: 3.6 + Math.random() * 5.0, // 3.6–8.6px
    swayPhase: Math.random() * Math.PI * 2,
    swayFreq: 2.4 + Math.random() * 3.0,
    swayAmp: 12 + Math.random() * 18,
    flickerPhase: Math.random() * Math.PI * 2,
    flickerFreq: 11 + Math.random() * 14,
  };
}

export function EmbersCanvas({ heatRef, burstCountRef, reducedMotion }: EmbersCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = BOX_W * SCALE;
    canvas.height = BOX_H * SCALE;

    if (reducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const sprite = createEmberSprite();
    const embers: Ember[] = [];
    let spawnAcc = 0;
    let lastNow = performance.now();
    let rafId = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;

      // Handle click bursts (46 faster embers at 2.2x speed)
      if (burstCountRef.current > 0) {
        const count = burstCountRef.current;
        burstCountRef.current = 0;
        for (let i = 0; i < count; i++) {
          embers.push(spawnEmber(2.2));
        }
      }

      // Continuous hover embers: 34 * heat per second
      const heat = heatRef.current;
      if (heat > 0.01) {
        spawnAcc += 34 * heat * dt;
        while (spawnAcc >= 1) {
          spawnAcc -= 1;
          embers.push(spawnEmber(1));
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.age += dt;
        if (e.age >= e.life) {
          embers.splice(i, 1);
          continue;
        }

        const k = e.age / e.life;
        // Slight upward acceleration + sideways sway
        e.vy -= 12 * dt;
        e.vx *= Math.exp(-0.35 * dt);
        const sway = Math.sin(e.age * e.swayFreq + e.swayPhase) * e.swayAmp;
        e.x += (e.vx + sway) * dt;
        e.y += e.vy * dt;

        const fadeIn = Math.min(1, e.age / 0.18);
        const fadeOut = Math.pow(1 - k, 1.35);
        const flicker = 0.68 + 0.32 * Math.sin(e.age * e.flickerFreq + e.flickerPhase);
        const alpha = fadeIn * fadeOut * flicker;
        if (alpha <= 0.01) continue;

        const cx = (e.x - BOX_X0) * SCALE;
        const cy = (e.y - BOX_Y0) * SCALE;
        const drawDiameter = e.size * (1 - k * 0.3) * SCALE * 2.4;

        ctx.globalAlpha = alpha;
        ctx.drawImage(
          sprite,
          cx - drawDiameter * 0.5,
          cy - drawDiameter * 0.5,
          drawDiameter,
          drawDiameter
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [heatRef, burstCountRef, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: '33.5129%',
        top: '38.2572%',
        width: '35.9066%',
        height: '46.7588%',
      }}
    />
  );
}
