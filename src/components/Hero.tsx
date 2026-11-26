import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  HERO_IMAGE_URL,
  SOURCE_HEIGHT,
  SOURCE_WIDTH,
  buildSceneAssets,
} from '../utils/buildSceneAssets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WavingFlagCanvas } from './WavingFlagCanvas';
import { ChimneySmokeCanvas } from './ChimneySmokeCanvas';
import { EmbersCanvas } from './EmbersCanvas';
import { SnowfallCanvas } from './SnowfallCanvas';
import { LogoTile } from './LogoTile';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'About', href: '#about' },
] as const;

const QUICK_MENU_LINKS = [
  { label: 'Projects', href: '#projects', num: '01' },
  { label: 'Skills', href: '#skills', num: '02' },
  { label: 'Resume', href: '#resume', num: '03' },
  { label: 'About', href: '#about', num: '04' },
  { label: 'Contact', href: '#contact', num: '05' },
] as const;

const SCENES = [
  {
    id: 'igloo-studio',
    label: 'Illuminated Igloo Camp',
    alt: 'Snow-covered Arctic igloo glowing with warm amber interior light beneath a snowy mountain sky',
    backgroundSize: '165% auto',
    backgroundPosition: '56% 62%',
  },
  {
    id: 'snowy-rocks',
    label: 'Snowy Arctic Rocks',
    alt: 'Snow-dusted granite boulders and sunlit winter peaks across a calm arctic ridge',
    backgroundSize: '340% auto',
    backgroundPosition: '14% 86%',
  },
  {
    id: 'glacier-cliff',
    label: 'Frozen Glacier Waterfall',
    alt: 'Towering crystalline blue glacier cliff and frozen winter icefall',
    backgroundSize: '560% auto',
    backgroundPosition: '100% 56%',
  },
] as const;

const IGLOO_SCENE_INDEX = 0;
const THUMB_CYCLE_SECONDS = 6;

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 3.25V12.75M8 12.75L3.75 8.5M8 12.75L12.25 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isBlockedUITarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('a, button, [data-ui-block="true"]'));
}

export function Hero() {
  const reducedMotion = useReducedMotion();

  const [plateUrl, setPlateUrl] = useState<string>(HERO_IMAGE_URL);
  const [flagSprite, setFlagSprite] = useState<HTMLCanvasElement | null>(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scene 0 (Igloo Camp) is first & default active
  const [activeScene, setActiveScene] = useState<number>(IGLOO_SCENE_INDEX);
  const activeSceneRef = useRef<number>(IGLOO_SCENE_INDEX);
  const thumbElapsedRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const sceneInnerRef = useRef<HTMLDivElement | null>(null);

  const targetHeatRef = useRef<number>(0);
  const heatRef = useRef<number>(0);
  const flashRef = useRef<number>(0);
  const burstCountRef = useRef<number>(0);

  const isIglooActive = activeScene === IGLOO_SCENE_INDEX;

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  // Close floating quick menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Reset igloo heat smoothly when switching away from Igloo scene
  useEffect(() => {
    activeSceneRef.current = activeScene;
    if (activeScene !== IGLOO_SCENE_INDEX) {
      targetHeatRef.current = 0;
    }
  }, [activeScene]);

  // Runtime asset preparation: removes baked-in flag and chimney smoke for the Igloo scene
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    buildSceneAssets(HERO_IMAGE_URL)
      .then(({ plate, flag }) => {
        if (cancelled) return;
        plate.toBlob(
          (blob) => {
            if (cancelled) return;
            if (blob) {
              objectUrl = URL.createObjectURL(blob);
              setPlateUrl(objectUrl);
              setFlagSprite(flag);
              setAssetsReady(true);
            }
          },
          'image/png'
        );
      })
      .catch(() => {
        if (!cancelled) {
          setAssetsReady(false);
        }
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // Smooth igloo heat & click-flash loop (writes --heat & --flash directly to .scene-inner)
  useEffect(() => {
    let rafId = 0;
    let lastNow = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;

      const target =
        activeSceneRef.current === IGLOO_SCENE_INDEX ? targetHeatRef.current : 0;
      let heat = heatRef.current;
      heat += (target - heat) * (1 - Math.exp(-3.4 * dt));
      if (Math.abs(target - heat) < 0.0004) heat = target;
      heatRef.current = heat;

      let flash = flashRef.current;
      if (flash > 0) {
        flash *= Math.exp(-2.6 * dt);
        if (flash < 0.0005) flash = 0;
        flashRef.current = flash;
      }

      const inner = sceneInnerRef.current;
      if (inner) {
        inner.style.setProperty('--heat', heat.toFixed(4));
        inner.style.setProperty('--flash', flash.toFixed(4));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Continuous 6-second auto-circulate carousel loop & progress bar fill (0% -> 100%)
  useEffect(() => {
    if (reducedMotion) {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = 'scaleX(1)';
      }
      return;
    }

    let rafId = 0;
    let lastNow = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;

      if (!document.hidden) {
        thumbElapsedRef.current += dt;
        if (thumbElapsedRef.current >= THUMB_CYCLE_SECONDS) {
          thumbElapsedRef.current = 0;
          const next = (activeSceneRef.current + 1) % SCENES.length;
          activeSceneRef.current = next;
          setActiveScene(next);
        }
      }

      const ratio = Math.min(1, thumbElapsedRef.current / THUMB_CYCLE_SECONDS);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const isPointerOnIgloo = (clientX: number, clientY: number): boolean => {
    if (activeSceneRef.current !== IGLOO_SCENE_INDEX) return false;
    const sceneEl = sceneRef.current;
    if (!sceneEl) return false;
    const rect = sceneEl.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    const sx = ((clientX - rect.left) / rect.width) * SOURCE_WIDTH;
    const sy = ((clientY - rect.top) / rect.height) * SOURCE_HEIGHT;
    if (sy > 740) return false;

    const domeDx = (sx - 1010) / 385;
    const domeDy = (sy - 520) / 265;
    if (domeDx * domeDx + domeDy * domeDy <= 1) return true;

    const entDx = (sx - 850) / 230;
    const entDy = (sy - 590) / 170;
    return entDx * entDx + entDy * entDy <= 1;
  };

  const handleHeroMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (activeSceneRef.current !== IGLOO_SCENE_INDEX || isBlockedUITarget(e.target)) {
      targetHeatRef.current = 0;
      return;
    }
    targetHeatRef.current = isPointerOnIgloo(e.clientX, e.clientY) ? 1 : 0;
  };

  const handleHeroMouseLeave = () => {
    targetHeatRef.current = 0;
  };

  const handleHeroClick = (e: MouseEvent<HTMLElement>) => {
    if (isBlockedUITarget(e.target)) return;
    if (menuOpen) setMenuOpen(false);
    if (isPointerOnIgloo(e.clientX, e.clientY)) {
      flashRef.current = 1;
      if (!reducedMotion) {
        burstCountRef.current += 46;
      }
    }
  };

  const handleSelectScene = (index: number) => {
    activeSceneRef.current = index;
    thumbElapsedRef.current = 0;
    setActiveScene(index);
    if (index !== IGLOO_SCENE_INDEX) {
      targetHeatRef.current = 0;
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = reducedMotion ? 'scaleX(1)' : 'scaleX(0)';
    }
  };

  return (
    <section
      id="top"
      className="hero"
      aria-label="Putra Irfan — Industrial Mathematics & Data Analytics Portfolio"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      onClick={handleHeroClick}
    >
      {/* LAYER 1: Scene Carousel (3 cross-fading winter scenes + Igloo-gated effects) */}
      <div className="scene-carousel">
        {/* Scene 0: Igloo Camp (aspect-locked for exact flag/smoke/ember alignment) */}
        <div
          className={
            isIglooActive
              ? 'scene-slide scene-slide--active'
              : 'scene-slide'
          }
          aria-hidden={!isIglooActive}
        >
          <div className="scene" ref={sceneRef}>
            <div className="scene-stage">
              <div className="scene-inner" ref={sceneInnerRef}>
                <img
                  src={plateUrl}
                  alt={SCENES[0].alt}
                  className="scene-photo"
                  draggable={false}
                />

                {/* Igloo-specific overlays fade smoothly with the Igloo scene */}
                <div
                  className={
                    isIglooActive
                      ? 'igloo-effects-layer igloo-effects-layer--visible'
                      : 'igloo-effects-layer'
                  }
                  aria-hidden="true"
                >
                  <div className="igloo-vignette" />
                  <div className="igloo-warm-dome" />
                  <div className="igloo-snow-spill" />
                  <div className="door-glow-ambient" />
                  <div className="igloo-fire-bright" />

                  {assetsReady && flagSprite && (
                    <WavingFlagCanvas flagSprite={flagSprite} reducedMotion={reducedMotion} />
                  )}
                  {assetsReady && (
                    <ChimneySmokeCanvas heatRef={heatRef} reducedMotion={reducedMotion} />
                  )}
                  <EmbersCanvas
                    heatRef={heatRef}
                    burstCountRef={burstCountRef}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 1: Snowy Arctic Rocks (matches Thumbnail 2) */}
        <div
          className={
            activeScene === 1
              ? 'scene-slide scene-slide--active'
              : 'scene-slide'
          }
          aria-hidden={activeScene !== 1}
        >
          <img
            src={HERO_IMAGE_URL}
            alt={SCENES[1].alt}
            className="scene-alt-photo scene-alt-photo--rocks"
            draggable={false}
          />
        </div>

        {/* Scene 2: Frozen Glacier Waterfall (matches Thumbnail 3) */}
        <div
          className={
            activeScene === 2
              ? 'scene-slide scene-slide--active'
              : 'scene-slide'
          }
          aria-hidden={activeScene !== 2}
        >
          <img
            src={HERO_IMAGE_URL}
            alt={SCENES[2].alt}
            className="scene-alt-photo scene-alt-photo--glacier"
            draggable={false}
          />
        </div>
      </div>

      {/* LAYER 2: Soft wash for headline legibility */}
      <div className="soft-wash" aria-hidden="true" />

      {/* LAYER 3: Full-hero Snowfall canvas (active across all 3 scenes) */}
      <div className="snowfall-layer" aria-hidden="true">
        <SnowfallCanvas reducedMotion={reducedMotion} />
      </div>

      {/* LAYER 4: Editorial UI */}
      <div className="ui-layer">
        {/* 1. Header */}
        <header className="hero-header" data-ui-block="true" data-ui-interactive="true">
          <a
            href="#top"
            className="brand-group enter-fade-up"
            style={{ animationDelay: '500ms' }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#top');
            }}
          >
            <LogoTile size="header" />
            <span className="brand-name">Putra Irfan</span>
          </a>

          <nav
            className="hero-nav enter-fade-up"
            aria-label="Primary Navigation"
            style={{ animationDelay: '600ms' }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(href);
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div
            className="header-cta-wrap enter-fade-up"
            style={{ animationDelay: '700ms' }}
          >
            <a
              href="#contact"
              className="pill-btn pill-btn--header"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
            >
              <span>Get in Touch</span>
              <ArrowUpRightIcon className="pill-btn__arrow" />
            </a>
          </div>
        </header>

        {/* 2. Floating Side Menu */}
        <div
          className="side-menu-wrap enter-fade-up"
          style={{ animationDelay: '800ms' }}
          data-ui-block="true"
          data-ui-interactive="true"
        >
          <button
            type="button"
            className="side-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <LogoTile size="menu" />
            <span className="side-menu__label">MENU</span>
            <span className="side-menu__dots" aria-hidden="true">
              <span className="side-menu__dot" />
              <span className="side-menu__dot" />
              <span className="side-menu__dot" />
            </span>
          </button>

          {menuOpen && (
            <nav className="side-menu-popover" aria-label="Quick section menu">
              {QUICK_MENU_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="side-menu-popover__link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  <span className="side-menu-popover__num">{item.num}</span>
                  <span>{item.label}</span>
                  <ArrowUpRightIcon className="side-menu-popover__arrow" />
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* 3. Headline Block */}
        <div className="headline-block">
          <div
            className="eyebrow-row enter-fade-up"
            style={{ animationDelay: '800ms' }}
          >
            <span className="eyebrow-text">INDUSTRIAL MATHEMATICS &amp; DATA ANALYTICS</span>
            <span className="eyebrow-line" aria-hidden="true" />
          </div>

          <h1 className="hero-h1">
            <span className="h1-mask">
              <span
                className="h1-line enter-slide-mask"
                style={{ animationDelay: '920ms' }}
              >
                Turning Data
              </span>
            </span>
            <span className="h1-mask">
              <span
                className="h1-line enter-slide-mask"
                style={{ animationDelay: '1040ms' }}
              >
                Into Clear
              </span>
            </span>
            <span className="h1-mask">
              <span
                className="h1-line h1-line--italic enter-slide-mask"
                style={{ animationDelay: '1160ms' }}
              >
                Decisions.
              </span>
            </span>
          </h1>

          <p
            className="hero-subcopy enter-fade-up"
            style={{ animationDelay: '1400ms' }}
          >
            Applied mathematics graduate crafting SQL analytics, automated workflows, and interactive web applications.
          </p>

          <div
            className="enter-fade-up"
            style={{ animationDelay: '1550ms' }}
            data-ui-interactive="true"
          >
            <a
              href="#projects"
              className="pill-btn pill-btn--hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#projects');
              }}
            >
              <span>Explore Projects</span>
              <ArrowUpRightIcon className="pill-btn__arrow" />
            </a>
          </div>
        </div>

        {/* 4. Frosted Info Card */}
        <div
          className="info-card-wrap enter-fade-up"
          style={{ animationDelay: '1650ms' }}
          data-ui-block="true"
          data-ui-interactive="true"
        >
          <a
            href="#projects"
            className="info-card"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#projects');
            }}
          >
            <div
              className="info-card__bg"
              style={{ backgroundImage: `url("${HERO_IMAGE_URL}")` }}
              aria-hidden="true"
            />
            <div className="info-card__wash" aria-hidden="true" />
            <div className="info-card__top">
              <p className="info-card__text">
                Interactive academies &amp; SQL data analytics built for real-world impact.
              </p>
              <span className="info-card__btn" aria-hidden="true">
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </div>
          </a>
        </div>

        {/* 5. Vertical Wordmark */}
        <div
          className="vertical-wordmark enter-fade-up"
          style={{ animationDelay: '1750ms' }}
          data-ui-block="true"
          data-ui-interactive="true"
          aria-hidden="true"
        >
          <span>Putra Irfan</span>
          <span className="wordmark-square" />
        </div>

        {/* 6. Auto-Circulating 3-Scene Thumbnail Dock */}
        <div
          className="thumb-strip-wrap"
          data-ui-block="true"
          data-ui-interactive="true"
        >
          <div
            className="thumb-strip enter-fade-up"
            style={{ animationDelay: '1850ms' }}
            role="tablist"
            aria-label="Winter background scene switcher"
          >
            {SCENES.map((scene, idx) => {
              const isActive = idx === activeScene;
              return (
                <button
                  key={scene.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Switch background to ${scene.label}`}
                  className={
                    isActive ? 'thumb-item thumb-item--active' : 'thumb-item'
                  }
                  style={{
                    backgroundImage: `url("${HERO_IMAGE_URL}")`,
                    backgroundSize: scene.backgroundSize,
                    backgroundPosition: scene.backgroundPosition,
                  }}
                  onClick={() => handleSelectScene(idx)}
                >
                  <span className="thumb-item__outline" aria-hidden="true" />
                  {isActive && (
                    <span className="thumb-progress-track" aria-hidden="true">
                      <span
                        ref={progressBarRef}
                        className="thumb-progress-bar"
                        style={{
                          display: 'block',
                          transform: reducedMotion ? 'scaleX(1)' : 'scaleX(0)',
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. Bottom Utilities */}
        <a
          href="#projects"
          className="util-left enter-fade-up"
          style={{ animationDelay: '1900ms' }}
          data-ui-block="true"
          data-ui-interactive="true"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#projects');
          }}
        >
          <span>FEATURED WORK (04)</span>
          <span className="util-left__line" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="util-right enter-fade-up"
          style={{ animationDelay: '1900ms' }}
          data-ui-block="true"
          data-ui-interactive="true"
          aria-label="Scroll down to Selected Projects"
          onClick={() => scrollToSection('#projects')}
        >
          <span className="scroll-label">SCROLL DOWN</span>
          <span className="scroll-circle" aria-hidden="true">
            <ArrowDownIcon className="scroll-arrow" />
          </span>
        </button>
      </div>
    </section>
  );
}
