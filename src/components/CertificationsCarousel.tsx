import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react';
import { CERTIFICATES } from '../data/certificatesData';
import { ECERTIFICATES_URL } from '../data/resumeData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowUpRightIcon } from './Hero';

const AUTO_SLIDE_MS = 3500;

function getVisibleCards(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="cert-nav-icon" aria-hidden="true">
      <path
        d="M11 4.25L6.25 9L11 13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="cert-nav-icon" aria-hidden="true">
      <path
        d="M7 4.25L11.75 9L7 13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="cert-zoom-icon" aria-hidden="true">
      <circle cx="7.25" cy="7.25" r="4.5" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M10.75 10.75L13.75 13.75M7.25 5.25V9.25M5.25 7.25H9.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CertificationsCarousel() {
  const reducedMotion = useReducedMotion();
  const [visibleCards, setVisibleCards] = useState<number>(getVisibleCards);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const touchStartXRef = useRef<number | null>(null);
  const maxIndex = Math.max(0, CERTIFICATES.length - visibleCards);

  useEffect(() => {
    const onResize = () => {
      const nextVisible = getVisibleCards();
      setVisibleCards(nextVisible);
      setSlideIndex((prev) => Math.min(prev, Math.max(0, CERTIFICATES.length - nextVisible)));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNext = useCallback(() => {
    setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-slide every 3.5s (pauses on hover, touch, lightbox open, or reduced motion)
  useEffect(() => {
    if (reducedMotion || isPaused || lightboxIndex !== null || maxIndex === 0) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion, isPaused, lightboxIndex, maxIndex]);

  // Lightbox keyboard navigation & scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % CERTIFICATES.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = e.changedTouches[0]?.clientX ?? null;
    if (startX !== null && endX !== null) {
      const delta = startX - endX;
      if (delta > 45) handleNext();
      else if (delta < -45) handlePrev();
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  const trackStyle = {
    '--visible-cards': visibleCards,
    '--slide-index': slideIndex,
  } as CSSProperties;

  const activeLightboxCert =
    lightboxIndex !== null ? CERTIFICATES[lightboxIndex] : null;

  return (
    <section
      id="certifications"
      className="portfolio-section portfolio-section--certifications"
    >
      <div className="section-container">
        <header className="section-header">
          <div className="section-eyebrow-row">
            <span className="section-index">04</span>
            <span className="section-eyebrow-line" aria-hidden="true" />
            <span className="section-eyebrow">CERTIFICATIONS &amp; CREDENTIALS</span>
          </div>

          <div className="section-title-row section-title-row--certs">
            <div>
              <h2 className="section-heading">
                Certifications &amp;{' '}
                <span className="section-heading--italic">Credentials.</span>
              </h2>
              <p className="section-lead cert-section-lead">
                Verified credentials spanning Google for Education, DataCamp, Coursera,
                Ministry of Digital, and HRD Corp. Click any certificate to inspect in full
                resolution.
              </p>
            </div>

            <div className="cert-header-controls">
              <div className="cert-arrows" role="group" aria-label="Carousel controls">
                <button
                  type="button"
                  className="cert-arrow-btn"
                  aria-label="Previous certificates"
                  onClick={handlePrev}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  className="cert-arrow-btn"
                  aria-label="Next certificates"
                  onClick={handleNext}
                >
                  <ChevronRightIcon />
                </button>
              </div>

              <a
                href={ECERTIFICATES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn pill-btn--resume-outline"
              >
                <span>View E-Certificates</span>
                <ArrowUpRightIcon className="pill-btn__arrow" />
              </a>
            </div>
          </div>
        </header>

        {/* Auto-sliding Frosted Carousel */}
        <div
          className="cert-carousel-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="cert-carousel-track" style={trackStyle}>
            {CERTIFICATES.map((cert, idx) => (
              <button
                key={cert.id}
                type="button"
                className="glass-card cert-card"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`View full certificate: ${cert.title}`}
              >
                <div className="cert-card__frame">
                  <img
                    src={cert.imageUrl}
                    alt={`${cert.title} — ${cert.issuer}`}
                    className="cert-card__img"
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="cert-card__zoom-pill" aria-hidden="true">
                    <ZoomIcon />
                    <span>Inspect</span>
                  </span>
                </div>

                <div className="cert-card__body">
                  <div className="cert-card__meta-row">
                    <span className="cert-card__issuer">
                      <span className="project-card__dot" aria-hidden="true" />
                      <span>{cert.issuer}</span>
                    </span>
                    <span className="cert-card__date">{cert.date}</span>
                  </div>
                  <h3 className="cert-card__title">{cert.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pagination Dots + Counter */}
        <div className="cert-carousel-footer">
          <div className="cert-dots" role="tablist" aria-label="Certificate slides">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
              const isActive = idx === slideIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to certificate slide ${idx + 1}`}
                  className={isActive ? 'cert-dot cert-dot--active' : 'cert-dot'}
                  onClick={() => setSlideIndex(idx)}
                />
              );
            })}
          </div>

          <span className="cert-counter" aria-live="polite">
            {String(slideIndex + 1).padStart(2, '0')}–
            {String(Math.min(slideIndex + visibleCards, CERTIFICATES.length)).padStart(2, '0')}{' '}
            / {String(CERTIFICATES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* High-Contrast Click-to-Zoom Lightbox Modal */}
      {activeLightboxCert && lightboxIndex !== null && (
        <div
          className="cert-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate preview: ${activeLightboxCert.title}`}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="cert-lightbox-shell"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-lightbox-bar">
              <div className="cert-lightbox-info">
                <span className="cert-lightbox-count">
                  {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                  {String(CERTIFICATES.length).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="cert-lightbox-title">{activeLightboxCert.title}</h3>
                  <p className="cert-lightbox-meta">
                    {activeLightboxCert.issuer} · {activeLightboxCert.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="cert-lightbox-close"
                aria-label="Close certificate lightbox"
                onClick={() => setLightboxIndex(null)}
              >
                ×
              </button>
            </div>

            <div className="cert-lightbox-stage">
              <button
                type="button"
                className="cert-lightbox-arrow cert-lightbox-arrow--prev"
                aria-label="Previous certificate"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + CERTIFICATES.length) % CERTIFICATES.length
                  )
                }
              >
                <ChevronLeftIcon />
              </button>

              <div className="cert-lightbox-img-wrap">
                <img
                  src={activeLightboxCert.imageUrl}
                  alt={`${activeLightboxCert.title} — ${activeLightboxCert.issuer}`}
                  className="cert-lightbox-img"
                />
              </div>

              <button
                type="button"
                className="cert-lightbox-arrow cert-lightbox-arrow--next"
                aria-label="Next certificate"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % CERTIFICATES.length)
                }
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
