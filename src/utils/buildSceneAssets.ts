export const HERO_IMAGE_URL =
  'https://plain-apac-prod-public.komododecks.com/202611/26/h6RJ9HHbi5DWevckS9Gh/image.png';

export const SOURCE_WIDTH = 1671;
export const SOURCE_HEIGHT = 941;

export interface SceneAssets {
  plate: HTMLCanvasElement;
  flag: HTMLCanvasElement;
}

export async function buildSceneAssets(url: string): Promise<SceneAssets> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.crossOrigin = 'anonymous';
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });

  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const plate = document.createElement('canvas');
  plate.width = W;
  plate.height = H;
  const ctx = plate.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Could not get 2d context for plate');
  ctx.drawImage(img, 0, 0);

  const id = ctx.getImageData(0, 0, W, H);
  const d = id.data;
  const src = new Uint8ClampedArray(d);
  const at = (x: number, y: number) => (y * W + x) * 4;
  const blue = (x: number, y: number) => src[at(x, y) + 2] - src[at(x, y)];

  function solve(M: number[][], v: number[]): number[] {
    const n = v.length;
    for (let i = 0; i < n; i++) {
      let p = i;
      for (let r = i + 1; r < n; r++) {
        if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
      }
      [M[i], M[p]] = [M[p], M[i]];
      [v[i], v[p]] = [v[p], v[i]];
      for (let r = i + 1; r < n; r++) {
        const f = M[r][i] / M[i][i];
        for (let c = i; c < n; c++) M[r][c] -= f * M[i][c];
        v[r] -= f * v[i];
      }
    }
    const x = new Array<number>(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let s = v[i];
      for (let c = i + 1; c < n; c++) s -= M[i][c] * x[c];
      x[i] = s / M[i][i];
    }
    return x;
  }

  function fitSky(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    cx: number,
    cy: number,
    sc: number,
    isSample: (x: number, y: number) => boolean
  ) {
    const A = Array.from({ length: 6 }, () => new Float64Array(6));
    const B = [0, 1, 2].map(() => new Float64Array(6));
    for (let y = y0; y <= y1; y += 2) {
      for (let x = x0; x <= x1; x += 2) {
        if (!isSample(x, y)) continue;
        const X = (x - cx) / sc;
        const Y = (y - cy) / sc;
        const f = [1, X, Y, X * X, Y * Y, X * Y];
        const i = at(x, y);
        for (let r = 0; r < 6; r++) {
          for (let c = 0; c < 6; c++) A[r][c] += f[r] * f[c];
          for (let ch = 0; ch < 3; ch++) B[ch][r] += f[r] * src[i + ch];
        }
      }
    }
    const k = B.map((b) =>
      solve(
        A.map((r) => Array.from(r)),
        Array.from(b)
      )
    );
    return (x: number, y: number, ch: number) => {
      const X = (x - cx) / sc;
      const Y = (y - cy) / sc;
      const c = k[ch];
      return c[0] + c[1] * X + c[2] * Y + c[3] * X * X + c[4] * Y * Y + c[5] * X * Y;
    };
  }

  function dilate(
    mask: Uint8Array,
    r: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): Uint8Array {
    const out = new Uint8Array(W * H);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (!mask[y * W + x]) continue;
        for (let yy = Math.max(0, y - r); yy <= Math.min(H - 1, y + r); yy++) {
          for (let xx = Math.max(0, x - r); xx <= Math.min(W - 1, x + r); xx++) {
            out[yy * W + xx] = 1;
          }
        }
      }
    }
    return out;
  }

  const noise = () => (Math.random() + Math.random() + Math.random() - 1.5) * 1.6;

  // 1) FLAG — cloth = low "blueness" (B−R) left of the pole
  const poleLeft = (y: number) => 820 + ((y - 140) * 12) / 190;
  const FX = 686;
  const FY = 148;
  const FW = 150;
  const FH = 164;
  const alpha = new Float32Array(W * H);
  for (let y = 150; y <= 306; y++) {
    for (let x = 685; x < poleLeft(y); x++) {
      alpha[y * W + x] = Math.min(1, Math.max(0, (36 - blue(x, y)) / 18));
    }
  }
  const flag = document.createElement('canvas');
  flag.width = FW;
  flag.height = FH;
  const fctx = flag.getContext('2d');
  if (!fctx) throw new Error('Could not get 2d context for flag');
  const fimg = fctx.createImageData(FW, FH);
  for (let y = 0; y < FH; y++) {
    for (let x = 0; x < FW; x++) {
      const s = at(FX + x, FY + y);
      const t = (y * FW + x) * 4;
      fimg.data[t] = src[s];
      fimg.data[t + 1] = src[s + 1];
      fimg.data[t + 2] = src[s + 2];
      fimg.data[t + 3] = alpha[(FY + y) * W + FX + x] * 255;
    }
  }
  fctx.putImageData(fimg, 0, 0);

  const hole0 = new Uint8Array(W * H);
  for (let i = 0; i < alpha.length; i++) hole0[i] = alpha[i] > 0.03 ? 1 : 0;
  const hole = dilate(hole0, 3, 680, 145, 840, 312);
  const holeWide = dilate(hole, 4, 676, 140, 846, 318);
  const skyF = fitSky(640, 110, 880, 350, 760, 230, 100, (x, y) => {
    const i = at(x, y);
    return !holeWide[y * W + x] && blue(x, y) > 30 && src[i] + src[i + 1] + src[i + 2] > 560;
  });
  for (let y = 140; y <= 320; y++) {
    for (let x = 676; x <= 846; x++) {
      if (!hole[y * W + x] || x >= poleLeft(y) - 0.5) continue;
      const i = at(x, y);
      for (let ch = 0; ch < 3; ch++) d[i + ch] = skyF(x, y, ch) + noise();
    }
  }

  // 2) CHIMNEY SMOKE — region above the chimney, opacity estimated from the red channel
  const SX0 = 1095;
  const SX1 = 1420;
  const SY1 = 166;
  const smoky = new Uint8Array(W * H);
  for (let y = 0; y <= SY1; y++) {
    for (let x = SX0; x <= SX1; x++) {
      smoky[y * W + x] = blue(x, y) < 50 ? 1 : 0;
    }
  }
  const smokyWide = dilate(smoky, 12, SX0, 0, SX1, SY1);
  const skyS = fitSky(
    1000,
    0,
    1560,
    300,
    1250,
    120,
    150,
    (x, y) => !smokyWide[y * W + x] && y < 160 && blue(x, y) > 45
  );
  let a = new Float32Array(W * H);
  for (let y = 0; y <= SY1; y++) {
    for (let x = SX0; x <= SX1; x++) {
      const sr = skyS(x, y, 0);
      a[y * W + x] = Math.min(1, Math.max(0, ((src[at(x, y)] - sr) / Math.max(1, 245 - sr)) * 2.2));
    }
  }
  const grow = new Float32Array(W * H);
  for (let y = 0; y <= SY1; y++) {
    for (let x = SX0; x <= SX1; x++) {
      let m = 0;
      for (let yy = Math.max(0, y - 2); yy <= y + 2; yy++) {
        for (let xx = x - 2; xx <= x + 2; xx++) {
          m = Math.max(m, a[yy * W + xx]);
        }
      }
      grow[y * W + x] = m;
    }
  }
  a = grow;
  for (let pass = 0; pass < 2; pass++) {
    const t = new Float32Array(W * H);
    for (let y = 0; y <= SY1 + 3; y++) {
      for (let x = SX0 - 3; x <= SX1 + 3; x++) {
        let s = 0;
        let n = 0;
        for (let yy = Math.max(0, y - 3); yy <= y + 3; yy++) {
          for (let xx = x - 3; xx <= x + 3; xx++) {
            s += a[yy * W + xx];
            n++;
          }
        }
        t[y * W + x] = s / n;
      }
    }
    a = t;
  }
  for (let y = 0; y <= SY1; y++) {
    for (let x = SX0; x <= SX1; x++) {
      const k = Math.min(1, a[y * W + x]) * Math.min(1, Math.max(0, (SY1 - y) / 4));
      if (k <= 0) continue;
      const i = at(x, y);
      for (let ch = 0; ch < 3; ch++) {
        d[i + ch] = src[i + ch] * (1 - k) + (skyS(x, y, ch) + noise()) * k;
      }
    }
  }

  ctx.putImageData(id, 0, 0);
  return { plate, flag };
}
