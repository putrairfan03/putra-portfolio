import { useEffect, useRef } from 'react';

interface SnowfallCanvasProps {
  reducedMotion: boolean;
}

interface Flake {
  x: number;
  y: number;
  depth: number; // 0 (far) -> 1 (near)
  radius: number;
  vy: number;
  opacity: number;
  swayPhase: number;
  swayFreq: number;
  swayAmp: number;
  blurred: boolean;
}

function createSoftFlakeSprite(): HTMLCanvasElement {
  const SIZE = 48;
  const c = document.createElement('canvas');
  c.width = SIZE;
  c.height = SIZE;
  const ctx = c.getContext('2d');
  if (ctx) {
    const r = SIZE * 0.5;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,255,255,0.92)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.52)');
    grad.addColorStop(0.7, 'rgba(240,245,255,0.16)');
    grad.addColorStop(1, 'rgba(240,245,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);
  }
  return c;
}

function createCrispFlakeSprite(): HTMLCanvasElement {
  const SIZE = 24;
  const c = document.createElement('canvas');
  c.width = SIZE;
  c.height = SIZE;
  const ctx = c.getContext('2d');
  if (ctx) {
    const r = SIZE * 0.5;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.55, 'rgba(255,255,255,0.85)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);
  }
  return c;
}

function makeFlake(w: number, h: number, randomY: boolean): Flake {
  const depth = Math.random();
  const blurred = depth > 0.85; // nearest 15% are soft and blurred
  const radius = blurred
    ? 3.8 + (depth - 0.85) * 28 // ~3.8–8px soft foreground flakes
    : 0.9 + depth * 2.5; // ~0.9–3px mid/far flakes
  const vy = 16 + depth * depth * 58;
  const opacity = blurred
    ? 0.34 + (depth - 0.85) * 1.4
    : 0.24 + depth * 0.62;

  return {
    x: Math.random() * (w + 80) - 40,
    y: randomY ? Math.random() * h : -radius * 3 - Math.random() * 40,
    depth,
    radius,
    vy,
    opacity,
    swayPhase: Math.random() * Math.PI * 2,
    swayFreq: 0.55 + Math.random() * 0.9,
    swayAmp: 10 + depth * 24,
    blurred,
  };
}

export function SnowfallCanvas({ reducedMotion }: SnowfallCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (reducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const softSprite = createSoftFlakeSprite();
    const crispSprite = createCrispFlakeSprite();

    let width = 0;
    let height = 0;
    let dpr = 1;
    let flakes: Flake[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const targetCount = Math.max(30, Math.round(Math.min(220, (width * height) / 8000)));
      if (flakes.length === 0) {
        flakes = Array.from({ length: targetCount }, () => makeFlake(width, height, true));
      } else if (flakes.length < targetCount) {
        while (flakes.length < targetCount) {
          flakes.push(makeFlake(width, height, true));
        }
      } else if (flakes.length > targetCount) {
        flakes.length = targetCount;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let rafId = 0;
    let lastNow = performance.now();
    let elapsed = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;
      elapsed += dt;

      // Slowly wandering horizontal wind
      const wind =
        16 * Math.sin(elapsed * 0.14) +
        9 * Math.sin(elapsed * 0.37 + 1.4) +
        6;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        const sway = Math.sin(elapsed * f.swayFreq + f.swayPhase) * f.swayAmp;
        f.x += (wind * (0.35 + f.depth * 0.9) + sway) * dt;
        f.y += f.vy * dt;

        // Respawn at top if leaving screen
        const margin = f.radius * 4 + 24;
        if (f.y > height + margin || f.x < -margin * 2 || f.x > width + margin * 2) {
          const respawned = makeFlake(width, height, false);
          flakes[i] = respawned;
          continue;
        }

        const sprite = f.blurred ? softSprite : crispSprite;
        const size = f.blurred ? f.radius * 3.4 : f.radius * 2.4;
        ctx.globalAlpha = f.opacity;
        ctx.drawImage(sprite, f.x - size * 0.5, f.y - size * 0.5, size, size);
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
