import { useEffect, useRef } from 'react';

interface WavingFlagCanvasProps {
  flagSprite: HTMLCanvasElement;
  reducedMotion: boolean;
}

const SW = 150;
const SH = 164;
const PAD = 24;
const ATTACH = 136;
const S = 3;

export function WavingFlagCanvas({ flagSprite, reducedMotion }: WavingFlagCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = SW * S;
    canvas.height = (SH + PAD * 2) * S;

    const dy = new Float32Array(SW);

    const draw = (t: number) => {
      const gust = 0.82 + 0.18 * Math.sin(t * 0.7) + 0.06 * Math.sin(t * 2.1);
      for (let x = 0; x < SW; x++) {
        const u = Math.max(0, (ATTACH - x) / ATTACH);
        dy[x] =
          Math.pow(u, 1.35) *
          gust *
          (13.5 * Math.sin(u * 8.6 - t * 6.0) + 4.2 * Math.sin(u * 16.0 - t * 9.2 + 1.2));
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      for (let x = 0; x < SW; x++) {
        const u = Math.max(0, (ATTACH - x) / ATTACH);
        const slope = x ? dy[x] - dy[x - 1] : 0;
        const h = SH * (1 - Math.min(0.1, Math.abs(slope) * 0.05) * u);
        const y = PAD + dy[x] + (SH - h) / 2;
        ctx.drawImage(flagSprite, x, 0, 1, SH, x * S, y * S, S + 0.6, h * S);
      }

      ctx.globalCompositeOperation = 'source-atop';
      for (let x = 1; x < SW; x++) {
        const slope = dy[x] - dy[x - 1];
        const a = Math.min(0.28, Math.abs(slope) * 0.12);
        if (a < 0.005) continue;
        ctx.fillStyle =
          slope > 0 ? `rgba(60,70,100,${a})` : `rgba(255,255,255,${a * 0.9})`;
        ctx.fillRect(x * S, 0, S + 0.6, canvas.height);
      }
    };

    if (reducedMotion) {
      draw(0);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      draw(t);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [flagSprite, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: '41.0533%',
        top: '13.1775%',
        width: '8.9767%',
        height: '22.5292%',
      }}
    />
  );
}
