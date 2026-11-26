import { ArrowUpRightIcon } from './Hero';
import {
  CORE_COMPETENCIES,
  ECERTIFICATES_URL,
  EDUCATION_AND_CERTIFICATIONS,
  EXPERIENCE_ITEMS,
  RESUME_CONTACT,
} from '../data/resumeData';

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

export function ResumeSection() {
  return (
    <section id="resume" className="portfolio-section portfolio-section--resume">
      <div className="section-container">
        <header className="section-header">
          <div className="section-eyebrow-row">
            <span className="section-index">03</span>
            <span className="section-eyebrow-line" aria-hidden="true" />
            <span className="section-eyebrow">CURRICULUM VITAE</span>
          </div>

          <div className="section-title-row section-title-row--resume">
            <h2 className="section-heading">
              Experience &amp;{' '}
              <span className="section-heading--italic">Education.</span>
            </h2>

            <div className="resume-header-actions">
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
            </div>
          </div>
        </header>

        <div className="resume-grid">
          {/* Left Column — Working Experience */}
          <div className="glass-card resume-card">
            <div className="resume-card__head">
              <div className="project-card__meta">
                <span className="project-card__dot" aria-hidden="true" />
                <span className="resume-card__kicker">WORKING EXPERIENCE</span>
              </div>
              <span className="project-card__status">District Analytics</span>
            </div>

            <div className="timeline timeline--single">
              {EXPERIENCE_ITEMS.map((item) => (
                <article key={item.role} className="timeline-item">
                  <div className="timeline-item__marker" aria-hidden="true" />
                  <div className="timeline-item__content">
                    <div className="timeline-item__top">
                      <h3 className="timeline-item__role">{item.role}</h3>
                      <span className="timeline-item__period">{item.period}</span>
                    </div>
                    <p className="timeline-item__org">{item.organization}</p>
                    <ul className="timeline-bullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column — Education & Certifications */}
          <div className="glass-card resume-card resume-card--right">
            <div>
              <div className="resume-card__head">
                <div className="project-card__meta">
                  <span className="project-card__dot" aria-hidden="true" />
                  <span className="resume-card__kicker">EDUCATION &amp; CERTIFICATIONS</span>
                </div>
                <span className="project-card__status">UTM &amp; Credentials</span>
              </div>

              <div className="timeline">
                {EDUCATION_AND_CERTIFICATIONS.map((item) => (
                  <article key={item.title} className="timeline-item">
                    <div className="timeline-item__marker" aria-hidden="true" />
                    <div className="timeline-item__content">
                      <div className="timeline-item__top">
                        <h3 className="timeline-item__role">{item.title}</h3>
                        <span className="timeline-item__period">{item.period}</span>
                      </div>
                      <p className="timeline-item__org">{item.institution}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="resume-subsection">
                <h4 className="resume-subsection__title">Core Competencies Summary</h4>
                <ul className="tag-list" aria-label="Core competencies">
                  {CORE_COMPETENCIES.map((skill) => (
                    <li key={skill} className="tag-pill tag-pill--compact">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="resume-contact-row" aria-label="Resume contact and links">
              <div className="resume-contact-item">
                <span className="resume-contact-item__label">Mobile</span>
                <a href={RESUME_CONTACT.mobileHref} className="resume-contact-item__link">
                  {RESUME_CONTACT.mobile}
                </a>
              </div>
              <div className="resume-contact-item">
                <span className="resume-contact-item__label">Email</span>
                <a href={RESUME_CONTACT.emailHref} className="resume-contact-item__link">
                  {RESUME_CONTACT.email}
                </a>
              </div>
              <div className="resume-contact-item">
                <span className="resume-contact-item__label">GitHub</span>
                <a
                  href={RESUME_CONTACT.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item__link"
                >
                  {RESUME_CONTACT.github}
                </a>
              </div>
              <div className="resume-contact-item">
                <span className="resume-contact-item__label">LinkedIn</span>
                <a
                  href={RESUME_CONTACT.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item__link"
                >
                  {RESUME_CONTACT.linkedin}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
