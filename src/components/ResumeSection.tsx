import {
  CORE_COMPETENCIES,
  EDUCATION_ITEM,
  EXPERIENCE_ITEMS,
  RESUME_CONTACT,
} from '../data/resumeData';

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
          </div>
        </header>

        <div className="resume-grid">
          {/* Left Column — Experience */}
          <div className="glass-card resume-card">
            <div className="resume-card__head">
              <div className="project-card__meta">
                <span className="project-card__dot" aria-hidden="true" />
                <span className="resume-card__kicker">EXPERIENCE</span>
              </div>
              <span className="project-card__status">District & Applied Analytics</span>
            </div>

            <div className="timeline">
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

          {/* Right Column — Education & Key Highlights */}
          <div className="glass-card resume-card resume-card--right">
            <div>
              <div className="resume-card__head">
                <div className="project-card__meta">
                  <span className="project-card__dot" aria-hidden="true" />
                  <span className="resume-card__kicker">EDUCATION & KEY HIGHLIGHTS</span>
                </div>
                <span className="project-card__status">B.Sc. Honors</span>
              </div>

              <div className="timeline timeline--single">
                <article className="timeline-item">
                  <div className="timeline-item__marker" aria-hidden="true" />
                  <div className="timeline-item__content">
                    <div className="timeline-item__top">
                      <h3 className="timeline-item__role">{EDUCATION_ITEM.degree}</h3>
                      <span className="timeline-item__period">{EDUCATION_ITEM.period}</span>
                    </div>
                    <p className="timeline-item__org">{EDUCATION_ITEM.institution}</p>
                    <ul className="timeline-bullets">
                      {EDUCATION_ITEM.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
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
                <span className="resume-contact-item__label">Location</span>
                <span className="resume-contact-item__value">{RESUME_CONTACT.location}</span>
              </div>
              <div className="resume-contact-item">
                <span className="resume-contact-item__label">Email</span>
                <a
                  href="mailto:p.nurizzirfan@gmail.com"
                  className="resume-contact-item__link"
                >
                  p.nurizzirfan@gmail.com
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
                  href="https://www.linkedin.com/in/putra-nurizz-irfan-bin-safnirizal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item__link"
                  style={{ wordBreak: 'break-all' }}
                >
                  linkedin.com/in/putra-nurizz-irfan-bin-safnirizal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}