import { useEffect } from 'react';
import { ArrowUpRightIcon } from './Hero';
import {
  CORE_COMPETENCIES,
  EDUCATION_ITEM,
  EXPERIENCE_ITEMS,
  RESUME_CONTACT,
  RESUME_PDF_URL,
} from '../data/resumeData';

interface ResumePrintModalProps {
  open: boolean;
  onClose: () => void;
}

const CV_PROJECTS = [
  {
    title: 'SQLQuest: Data Analyst Academy',
    meta: 'HTML/JS · SQL · Google Sheets API',
    summary:
      'Gamified SQL learning web app featuring interactive exercises and automated Google Sheets certificate logging.',
  },
  {
    title: 'PyQuest Academy',
    meta: 'Python · Web App · GitHub Pages',
    summary:
      'Interactive Python academy tailored for beginners mastering core programming and data fundamentals.',
  },
  {
    title: 'District School Health & BMI SQL Analysis',
    meta: 'SQLite · Python · Data Analysis',
    summary:
      'Anonymized SQLite analysis evaluating BMI and SEGAK physical fitness records across 95 Kota Tinggi schools.',
  },
  {
    title: 'Automated School Monitoring & Result System',
    meta: 'Google Apps Script · AppSheet · Automation',
    summary:
      'Real-time monitoring web dashboard and automated exam slip generator with integrated barcode scanning.',
  },
];

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
                <h1 className="cv-a4-name">Putra Irfan</h1>
                <p className="cv-a4-tagline">
                  Industrial Mathematics &amp; Data Analytics
                </p>
              </div>
              <div className="cv-a4-contact">
                <span>{RESUME_CONTACT.location}</span>
                <span>{RESUME_CONTACT.email}</span>
                <span>{RESUME_CONTACT.github}</span>
                <span>{RESUME_CONTACT.linkedin}</span>
              </div>
            </header>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">Profile</h2>
              <p className="cv-a4-summary">
                Industrial Mathematics graduate from Universiti Teknologi Malaysia (UTM)
                based in Johor, Malaysia, experienced in educational data management,
                statistical modeling, SQL analytics, and building automated web workflows
                for practical administrative and learning impact.
              </p>
            </section>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">Experience</h2>
              <div className="cv-a4-entries">
                {EXPERIENCE_ITEMS.map((item) => (
                  <div key={item.role} className="cv-a4-entry">
                    <div className="cv-a4-entry-row">
                      <h3 className="cv-a4-entry-title">{item.role}</h3>
                      <span className="cv-a4-entry-date">{item.period}</span>
                    </div>
                    <p className="cv-a4-entry-org">{item.organization}</p>
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
              <h2 className="cv-a4-section-title">Education</h2>
              <div className="cv-a4-entry">
                <div className="cv-a4-entry-row">
                  <h3 className="cv-a4-entry-title">{EDUCATION_ITEM.degree}</h3>
                  <span className="cv-a4-entry-date">{EDUCATION_ITEM.period}</span>
                </div>
                <p className="cv-a4-entry-org">{EDUCATION_ITEM.institution}</p>
                <ul className="cv-a4-list">
                  {EDUCATION_ITEM.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="cv-a4-section">
              <h2 className="cv-a4-section-title">Selected Projects</h2>
              <div className="cv-a4-projects">
                {CV_PROJECTS.map((proj) => (
                  <div key={proj.title} className="cv-a4-project">
                    <div className="cv-a4-entry-row">
                      <h3 className="cv-a4-entry-title">{proj.title}</h3>
                      <span className="cv-a4-project-meta">{proj.meta}</span>
                    </div>
                    <p className="cv-a4-project-desc">{proj.summary}</p>
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
