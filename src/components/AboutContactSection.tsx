import { ArrowUpRightIcon } from './Hero';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ECERTIFICATES_URL, RESUME_PDF_URL } from '../data/resumeData';

interface AboutContactSectionProps {
  onOpenCvPreview: () => void;
}

function MailIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="contact-btn__icon" aria-hidden="true">
      <rect
        x="2.25"
        y="3.75"
        width="13.5"
        height="10.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.25 5.25L9 9.5L14.75 5.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="contact-btn__icon" aria-hidden="true">
      <rect
        x="2.25"
        y="2.25"
        width="13.5"
        height="13.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6 8V12.25M6 5.75V5.8M9 12.25V8M9 9.75C9 8.65 9.85 8 10.75 8C11.75 8 12.25 8.7 12.25 9.8V12.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="contact-btn__icon" aria-hidden="true">
      <path
        d="M7.25 14.25C4 15.2 4 12.5 2.75 12.1M11.25 15.25V12.75C11.3 11.95 11.15 11.35 10.65 10.9C12.75 10.65 14.75 9.9 14.75 6.45C14.75 5.5 14.4 4.7 13.85 4.05C14.05 3.45 14.05 2.65 13.75 2.05C13.75 2.05 13 1.85 11.3 2.95C10.05 2.6 8.45 2.6 7.2 2.95C5.5 1.85 4.75 2.05 4.75 2.05C4.45 2.65 4.45 3.45 4.65 4.05C4.1 4.7 3.75 5.5 3.75 6.45C3.75 9.85 5.75 10.65 7.85 10.9C7.35 11.35 7.2 11.95 7.25 12.75V15.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="contact-btn__icon" aria-hidden="true">
      <path
        d="M5.25 6.75V3.25H12.75V6.75M5.25 12.75H3.75C3.05 12.75 2.5 12.2 2.5 11.5V8.25C2.5 7.55 3.05 7 3.75 7H14.25C14.95 7 15.5 7.55 15.5 8.25V11.5C15.5 12.2 14.95 12.75 14.25 12.75H12.75"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5.25"
        y="10.25"
        width="7.5"
        height="4.75"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="contact-btn__icon" aria-hidden="true">
      <circle cx="9" cy="7" r="3.75" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M6.75 10.25L5.75 15.25L9 13.5L12.25 15.25L11.25 10.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutContactSection({ onOpenCvPreview }: AboutContactSectionProps) {
  const reducedMotion = useReducedMotion();

  const handleBackToTop = () => {
    const topEl = document.querySelector('#top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="portfolio-section portfolio-section--about">
      <div className="section-container">
        <div className="about-layout">
          <div className="about-bio-col">
            <div className="section-eyebrow-row">
              <span className="section-index">05</span>
              <span className="section-eyebrow-line" aria-hidden="true" />
              <span className="section-eyebrow">ABOUT</span>
            </div>

            <h2 className="section-heading">
              Analytical Depth,{' '}
              <span className="section-heading--italic">Practical Craft.</span>
            </h2>

            <p className="about-bio-text">
              I&apos;m <strong>Putra Irfan</strong>, an Industrial Mathematics graduate from{' '}
              <strong>Universiti Teknologi Malaysia (UTM)</strong> based in{' '}
              <strong>Johor, Malaysia</strong>. My work sits at the intersection of
              educational data management, statistical modeling, and practical digital
              engineering—transforming complex institutional records and mathematical
              concepts into clear analytics, automated workflows, and approachable web tools.
            </p>

            <dl className="about-facts">
              <div className="about-fact">
                <dt>Education</dt>
                <dd>Industrial Mathematics, UTM</dd>
              </div>
              <div className="about-fact">
                <dt>Location</dt>
                <dd>Johor, Malaysia</dd>
              </div>
              <div className="about-fact">
                <dt>Focus</dt>
                <dd>Data Analytics &amp; Automation</dd>
              </div>
            </dl>

            <div className="about-resume-actions">
              <a
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn pill-btn--resume-primary"
              >
                <span>Download Resume (PDF)</span>
                <ArrowUpRightIcon className="pill-btn__arrow" />
              </a>

              <a
                href={ECERTIFICATES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn pill-btn--resume-outline"
              >
                <CertificateIcon />
                <span>View E-Certificates</span>
                <ArrowUpRightIcon className="pill-btn__arrow" />
              </a>

              <button
                type="button"
                className="pill-btn pill-btn--resume-outline"
                onClick={onOpenCvPreview}
              >
                <PrinterIcon />
                <span>Print / Preview CV</span>
              </button>
            </div>
          </div>

          <div id="contact" className="glass-card contact-card">
            <div className="contact-card__glow" aria-hidden="true" />
            <div className="contact-card__content">
              <div className="contact-card__eyebrow">
                <span className="contact-card__dot" aria-hidden="true" />
                <span>OPEN FOR OPPORTUNITIES &amp; COLLABORATION</span>
              </div>

              <h3 className="contact-card__heading">
                Let&apos;s <span className="section-heading--italic">Connect</span>
              </h3>

              <p className="contact-card__copy">
                Interested in data analytics, automated school or operational dashboards,
                or interactive learning apps? Feel free to reach out directly.
              </p>

              <div className="contact-actions">
                <a
                  href="mailto:p.nurizzirfan@gmail.com"
                  className="pill-btn pill-btn--contact-primary"
                >
                  <MailIcon />
                  <span>Email</span>
                  <ArrowUpRightIcon className="pill-btn__arrow" />
                </a>

                <a
                  href="https://www.linkedin.com/in/putra-nurizz-irfan-bin-safnirizal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn pill-btn--contact-secondary"
                >
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                  <ArrowUpRightIcon className="pill-btn__arrow" />
                </a>

                <a
                  href="https://github.com/putrairfan03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn pill-btn--contact-secondary"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                  <ArrowUpRightIcon className="pill-btn__arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="portfolio-footer">
          <p className="portfolio-footer__copy">
            &copy; 2026 Putra Irfan. Built with precision.
          </p>
          <button
            type="button"
            className="portfolio-footer__top"
            onClick={handleBackToTop}
          >
            <span>BACK TO TOP</span>
            <span aria-hidden="true">↑</span>
          </button>
        </footer>
      </div>
    </section>
  );
}
