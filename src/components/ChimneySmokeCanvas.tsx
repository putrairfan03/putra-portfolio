import { useEffect, useRef, type MutableRefObject } from 'react';

interface ChimneySmokeCanvasProps {
  heatRef: MutableRefObject<number>;
  reducedMotion: boolean;
}

interface Puff {
  born: number;
  seed: number;
  rot: number;
  spin: number;
  jitter: number;
  grow: number;
  alpha: number;
  spriteIdx: number;
}

const BOX_X0 = 1020;
const BOX_W = 540; // 1020..1560
const BOX_H = 210; // 0..210
const SCALE = 2;
const LIFE = 7;
const BASE_RATE = 7;

function createPuffSprites(): HTMLCanvasElement[] {
  const sprites: HTMLCanvasElement[] = [];
  const SIZE = 128;

  for (let s = 0; s < 6; s++) {
    const c = document.createElement('canvas');
    c.width = SIZE;
    c.height = SIZE;
    const ctx = c.getContext('2d');
    if (!ctx) continue;

    for (let b = 0; b < 18; b++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 0.22 * SIZE;
      const cx = SIZE * 0.5 + Math.cos(angle) * dist;
      const cy = SIZE * 0.5 + Math.sin(angle) * dist;
      const r = (0.12 + Math.random() * 0.16) * SIZE;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, 'rgba(255,255,255,0.85)');
      grad.addColorStop(0.5, 'rgba(248,249,254,0.5)');
      grad.addColorStop(1, 'rgba(248,249,254,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Faint cool underside shade
    ctx.globalCompositeOperation = 'source-atop';
    const shade = ctx.createLinearGradient(0, SIZE * 0.35, 0, SIZE);
    shade.addColorStop(0, 'rgba(170,180,205,0)');
    shade.addColorStop(1, 'rgba(170,180,205,0.35)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.globalCompositeOperation = 'source-over';

    sprites.push(c);
  }

  return sprites;
}

function makePuff(born: number): Puff {
  return {
    born,
    seed: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.5, // ±0.25 rad/s
    jitter: (Math.random() - 0.5) * 4, // ±2px
    grow: 0.85 + Math.random() * 0.4, // 0.85–1.25
    alpha: 0.7 + Math.random() * 0.3, // 0.7–1
    spriteIdx: Math.floor(Math.random() * 6),
  };
}

export function ChimneySmokeCanvas({ heatRef, reducedMotion }: ChimneySmokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = BOX_W * SCALE;
    canvas.height = BOX_H * SCALE;

    const sprites = createPuffSprites();
    const puffs: Puff[] = [];

    // Pre-warm plume so it never starts empty
    const T0 = 20;
    const step = 1 / BASE_RATE;
    for (let a = LIFE - step; a >= 0; a -= step) {
      puffs.push(makePuff(T0 - a));
    }

    const render = (t: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];
        const a = t - p.born;
        if (a < 0 || a >= LIFE) continue;

        const k = a / LIFE;
        const wave = Math.sin(p.born * 0.9) * 16 + Math.sin(p.born * 2.3 + 1.3) * 7;
        const y = 164 - (42 * a - 1.1 * a * a);
        const x =
          1150 +
          p.jitter * (1 - k) +
          (2 * a + 3.4 * a * a) +
          wave * Math.pow(k, 0.9) +
          Math.sin(0.4 * t) * 10 * k * k +
          Math.sin(1.7 * a + p.seed) * 6 * k;

        const radius = (7 + 74 * Math.pow(k, 0.75)) * p.grow;
        const opacity = p.alpha * Math.min(1, a / 0.35) * Math.pow(1 - k, 1.2);
        if (opacity <= 0.004) continue;

        const sprite = sprites[p.spriteIdx];
        if (!sprite) continue;

        const cx = (x - BOX_X0) * SCALE;
        const cy = y * SCALE;
        const drawSize = radius * 2 * SCALE;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(cx, cy);
        ctx.rotate(p.rot + p.spin * a);
        ctx.drawImage(sprite, -drawSize * 0.5, -drawSize * 0.5, drawSize, drawSize);
        ctx.restore();
      }
    };

    if (reducedMotion) {
      render(T0);
      return;
    }

    let rafId = 0;
    let lastNow = performance.now();
    let simTime = T0;
    let spawnAcc = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;
      simTime += dt;

      const rate = BASE_RATE * (1 + 0.9 * heatRef.current);
      spawnAcc += rate * dt;
      while (spawnAcc >= 1) {
        spawnAcc -= 1;
        puffs.push(makePuff(simTime));
      }

      // Prune expired puffs
      while (puffs.length > 0 && simTime - puffs[0].born >= LIFE) {
        puffs.shift();
      }

      render(simTime);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [heatRef, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: '61.0413%',
        top: '0%',
        width: '32.3160%',
        height: '22.3167%',
      }}
    />
  );
}
