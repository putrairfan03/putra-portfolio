interface LogoTileProps {
  size?: 'header' | 'menu';
}

export function LogoTile({ size = 'header' }: LogoTileProps) {
  const isMenu = size === 'menu';
  const uid = `sigma-${size}`;

  return (
    <div
      className={isMenu ? 'logo-tile logo-tile--menu' : 'logo-tile logo-tile--header'}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="logo-sigma-wave"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EAA75E" stopOpacity="0.52" />
            <stop offset="48%" stopColor="#EAA75E" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#EAA75E" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${uid}-wave`} x1="6" y1="32" x2="58" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EAA75E" stopOpacity="0.2" />
            <stop offset="22%" stopColor="#EAA75E" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFF0D6" stopOpacity="1" />
            <stop offset="78%" stopColor="#EAA75E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EAA75E" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id={`${uid}-sigma`} x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="55%" stopColor="#E9EBF3" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
          </linearGradient>

          <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Warm ambient center energy glow */}
        <circle cx="32" cy="32" r="21" fill={`url(#${uid}-core)`} className="sigma-glow-pulse" />

        {/* Analytical fine grid hairlines & orbital ring */}
        <g stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="0.55">
          <circle cx="32" cy="32" r="24" strokeDasharray="1.8 2.4" />
          <line x1="8" y1="32" x2="56" y2="32" strokeDasharray="1.5 2.5" />
          <line x1="20" y1="13" x2="20" y2="51" strokeOpacity="0.09" />
          <line x1="32" y1="10" x2="32" y2="54" strokeOpacity="0.11" />
          <line x1="44" y1="13" x2="44" y2="51" strokeOpacity="0.09" />
        </g>

        {/* Infinity (∞) constructed with fine parallel geometric ribbon tracks */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Outer fine parallel infinity loop */}
          <path
            d="M 32 32 C 27 22.5, 13 22.5, 13 32 C 13 41.5, 27 41.5, 32 32 C 37 22.5, 51 22.5, 51 32 C 51 41.5, 37 41.5, 32 32 Z"
            stroke="#FFFFFF"
            strokeOpacity="0.78"
            strokeWidth="1.05"
          />
          {/* Inner parallel track */}
          <path
            d="M 32 32 C 27.6 25.2, 16.2 25.2, 16.2 32 C 16.2 38.8, 27.6 38.8, 32 32 C 36.4 25.2, 47.8 25.2, 47.8 32 C 47.8 38.8, 36.4 38.8, 32 32 Z"
            stroke="#FFFFFF"
            strokeOpacity="0.36"
            strokeWidth="0.65"
          />
        </g>

        {/* Geometric Sigma (∑) built from crisp parallel digital lines */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Outer primary Sigma contour */}
          <path
            d="M 45.5 19.5 L 45.5 15.5 L 18.5 15.5 L 31.5 32 L 18.5 48.5 L 45.5 48.5 L 45.5 44.5"
            stroke={`url(#${uid}-sigma)`}
            strokeWidth="1.75"
          />
          {/* Parallel inner digital line */}
          <path
            d="M 42.5 18.3 L 23.2 18.3 L 34.4 32 L 23.2 45.7 L 42.5 45.7"
            stroke="#FFFFFF"
            strokeOpacity="0.52"
            strokeWidth="0.75"
          />
          {/* Fine outer architectural parallel echo on top & bottom bars */}
          <line x1="21" y1="13" x2="43" y2="13" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="0.6" />
          <line x1="21" y1="51" x2="43" y2="51" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="0.6" />
        </g>

        {/* Secondary harmonic Fourier echo curve */}
        <path
          d="M 7 32 C 11 26, 15 26, 19 32 C 23 38, 27 37, 32 32 C 37 27, 41 26, 45 32 C 49 38, 53 37, 57 32"
          stroke="#FFFFFF"
          strokeOpacity="0.34"
          strokeWidth="0.7"
          strokeLinecap="round"
        />

        {/* Primary pulsing mathematical Fourier/sine wave in warm golden-orange */}
        <path
          d="M 6.5 32 C 10.5 32, 12.2 22.5, 16.2 22.5 C 20.2 22.5, 21.8 40.5, 25.6 40.5 C 28.8 40.5, 29.8 32, 32 32 C 34.2 32, 35.2 23.5, 38.4 23.5 C 42.2 23.5, 43.8 41.5, 47.8 41.5 C 51.8 41.5, 53.5 32, 57.5 32"
          stroke={`url(#${uid}-wave)`}
          strokeWidth="1.6"
          strokeLinecap="round"
          filter={`url(#${uid}-glow)`}
          className="sigma-wave-curve"
        />

        {/* Travelling golden signal pulse along the wave */}
        <path
          d="M 6.5 32 C 10.5 32, 12.2 22.5, 16.2 22.5 C 20.2 22.5, 21.8 40.5, 25.6 40.5 C 28.8 40.5, 29.8 32, 32 32 C 34.2 32, 35.2 23.5, 38.4 23.5 C 42.2 23.5, 43.8 41.5, 47.8 41.5 C 51.8 41.5, 53.5 32, 57.5 32"
          stroke="#FFF4DF"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeDasharray="10 68"
          className="sigma-wave-signal"
        />

        {/* Crisp white Sigma structural vertex nodes */}
        <g fill="#FFFFFF">
          <circle cx="18.5" cy="15.5" r="1.4" />
          <circle cx="45.5" cy="15.5" r="1.4" />
          <circle cx="18.5" cy="48.5" r="1.4" />
          <circle cx="45.5" cy="48.5" r="1.4" />
          <circle cx="13" cy="32" r="1.15" fillOpacity="0.85" />
          <circle cx="51" cy="32" r="1.15" fillOpacity="0.85" />
        </g>

        {/* Warm golden-orange (#EAA75E) high-energy data nodes */}
        <g filter={`url(#${uid}-glow)`} className="sigma-nodes-pulse">
          {/* Wave peak & trough data points */}
          <circle cx="16.2" cy="22.5" r="1.75" fill="#EAA75E" />
          <circle cx="16.2" cy="22.5" r="0.65" fill="#FFFFFF" />

          <circle cx="25.6" cy="40.5" r="1.55" fill="#EAA75E" />
          <circle cx="25.6" cy="40.5" r="0.55" fill="#FFFFFF" />

          <circle cx="38.4" cy="23.5" r="1.55" fill="#EAA75E" />
          <circle cx="38.4" cy="23.5" r="0.55" fill="#FFFFFF" />

          <circle cx="47.8" cy="41.5" r="1.75" fill="#EAA75E" />
          <circle cx="47.8" cy="41.5" r="0.65" fill="#FFFFFF" />

          {/* Central Sigma × Infinity × Wave convergence node */}
          <circle cx="32" cy="32" r="2.7" fill="#EAA75E" />
          <circle cx="32" cy="32" r="1.15" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
