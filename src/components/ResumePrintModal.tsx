import { useEffect } from 'react';
import { ArrowUpRightIcon } from './Hero';
import {
  CORE_COMPETENCIES,
  EDUCATION_AND_CERTIFICATIONS,
  EXPERIENCE_ITEMS,
  PROFESSIONAL_STATEMENT,
  RESUME_CONTACT,
  RESUME_FULL_NAME,
  RESUME_PDF_URL,
  RESUME_PROJECTS,
} from '../data/resumeData';

interface ResumePrintModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumePrintModal({ open, onClose }: ResumePrintModalProps) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="cv-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Print-ready A4 Resume Preview"
      onClick={onClose}
    >
      <div className="cv-modal-shell" onClick={(e) => e.stopPropagation()}>
        {/* Screen-only toolbar (hidden during print) */}
        <div className="cv-modal-toolbar">
          <div className="cv-modal-toolbar__left">
            <span className="project-card__dot" aria-hidden="true" />
            <span className="cv-modal-toolbar__label">A4 PRINT-READY CV PREVIEW</span>
          </div>

          <div className="cv-modal-toolbar__actions">
            <button
              type="button"
              className="pill-btn pill-btn--card"
              onClick={() => window.print()}
            >
              <span>Print / Save as PDF</span>
            </button>

            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn--resume-outline pill-btn--toolbar-sm"
            >
              <span>PDF File</span>
              <ArrowUpRightIcon className="pill-btn__arrow" />
            </a>

            <button
              type="button"
              className="project-modal__close"
              aria-label="Close resume preview"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {/* Crisp white print-ready A4 paper surface */}
        <div className="cv-modal-scroll">
          <article className="cv-a4-sheet">
            <header className="cv-a4-header">
              <div>
                <h1 className="cv-a4-name">{RESUME_FULL_NAME}</h1>
                <p className="cv-a4-tagline">
                  Industrial Mathematics &amp; Data Analytics
                </p>
              </div>
              <div className="cv-a4-contact">
                <span>{RESUME_CONTACT.mobile}</span>
                <span>{RESUME_CONTACT.email}</span>
                <span>{RESUME_CONTACT.linkedin}</span>
                <span>{RESUME_CONTACT.github}</span>
              </div>
            </header>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">Professional Statement</h2>
              <p className="cv-a4-summary">{PROFESSIONAL_STATEMENT}</p>
            </section>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">Working Experience</h2>
              <div className="cv-a4-entries">
                {EXPERIENCE_ITEMS.map((item) => (
                  <div key={item.role} className="cv-a4-entry">
                    <div className="cv-a4-entry-row">
                      <h3 className="cv-a4-entry-title">
                        {item.organization} | {item.role}
                      </h3>
                      <span className="cv-a4-entry-date">{item.period}</span>
                    </div>
                    <ul className="cv-a4-list">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">
                Selected Analytics &amp; Automation Projects
              </h2>
              <div className="cv-a4-projects">
                {RESUME_PROJECTS.map((proj) => (
                  <div key={proj.title} className="cv-a4-project">
                    <div className="cv-a4-entry-row">
                      <h3 className="cv-a4-entry-title">
                        {proj.title} | {proj.tool}
                      </h3>
                      <span className="cv-a4-entry-date">{proj.period}</span>
                    </div>
                    <ul className="cv-a4-list">
                      {proj.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">Education &amp; Certifications</h2>
              <div className="cv-a4-entries">
                {EDUCATION_AND_CERTIFICATIONS.map((item) => (
                  <div key={item.title} className="cv-a4-entry-row">
                    <h3 className="cv-a4-entry-title">
                      {item.title}{' '}
                      <span className="cv-a4-project-meta">— {item.institution}</span>
                    </h3>
                    <span className="cv-a4-entry-date">{item.period}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-a4-section cv-a4-section--last">
              <h2 className="cv-a4-section-title">Core Competencies</h2>
              <p className="cv-a4-skills">{CORE_COMPETENCIES.join('  ·  ')}</p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
