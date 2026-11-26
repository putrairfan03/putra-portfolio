import { useEffect, useState } from 'react';
import { ArrowUpRightIcon } from './Hero';

interface Project {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  statusNote: string;
  highlights?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'sqlquest',
    index: '01',
    category: 'Interactive Academy',
    title: 'SQLQuest: Data Analyst Academy',
    description:
      'Interactive SQL learning web application with gamified levels and automated Google Sheets certificate logging.',
    tags: ['HTML/JS', 'SQL', 'Google Sheets API'],
    liveUrl: 'https://putrairfan03.github.io/sqlquest-academy/',
    statusNote: 'Live Web App',
  },
  {
    id: 'pyquest',
    index: '02',
    category: 'Interactive Academy',
    title: 'PyQuest Academy',
    description:
      'Interactive Python programming academy designed for beginners to master data fundamentals.',
    tags: ['Python', 'Web App', 'GitHub Pages'],
    liveUrl: 'https://putrairfan03.github.io/pyquest-academy/',
    statusNote: 'Live Web App',
  },
  {
    id: 'bmi-sql',
    index: '03',
    category: 'Data Analytics',
    title: 'District School Health & BMI SQL Analysis',
    description:
      'Anonymized SQLite data analysis evaluating BMI and SEGAK physical fitness records across 95 schools.',
    tags: ['SQLite', 'Python', 'Data Analysis'],
    statusNote: 'Case Study',
    highlights: [
      'Structured and queried anonymized student health & SEGAK fitness records across 95 district schools.',
      'Automated data cleaning, BMI classification, and summary reporting pipelines with Python & SQLite.',
      'Delivered clear district-level benchmarks to guide targeted student wellness interventions.',
    ],
  },
  {
    id: 'school-monitoring',
    index: '04',
    category: 'Workflow Automation',
    title: 'Automated School Monitoring & Result System',
    description:
      'Real-time Google Apps Script web dashboard and automated exam slip generator with barcode scanning.',
    tags: ['Google Apps Script', 'AppSheet', 'Automation'],
    statusNote: 'Internal System',
    highlights: [
      'Real-time monitoring web dashboard powered by Google Apps Script and AppSheet.',
      'Automated personalized exam slip generation with integrated barcode scanning for fast verification.',
      'Significantly reduced manual administrative overhead and human entry errors during exam cycles.',
    ],
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const handleRequestWalkthrough = () => {
    setSelectedProject(null);
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="projects" className="portfolio-section portfolio-section--projects">
      <div className="section-container">
        <header className="section-header">
          <div className="section-eyebrow-row">
            <span className="section-index">01</span>
            <span className="section-eyebrow-line" aria-hidden="true" />
            <span className="section-eyebrow">SELECTED PROJECTS</span>
          </div>

          <div className="section-title-row">
            <h2 className="section-heading">
              Selected <span className="section-heading--italic">Projects.</span>
            </h2>
            <p className="section-lead">
              A curated collection of interactive learning platforms, large-scale SQL
              analyses, and automated operational tools.
            </p>
          </div>
        </header>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <article key={project.id} className="glass-card project-card">
              <div className="project-card__top">
                <div className="project-card__meta">
                  <span className="project-card__num">{project.index}</span>
                  <span className="project-card__dot" aria-hidden="true" />
                  <span className="project-card__category">{project.category}</span>
                </div>
                <span className="project-card__status">{project.statusNote}</span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
              </div>

              <div className="project-card__footer">
                <ul className="tag-list" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag-pill">
                      {tag}
                    </li>
                  ))}
                </ul>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn pill-btn--card"
                  >
                    <span>View Live</span>
                    <ArrowUpRightIcon className="pill-btn__arrow" />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="pill-btn pill-btn--card"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>View Live</span>
                    <ArrowUpRightIcon className="pill-btn__arrow" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Clean frosted modal for private/anonymized case-study projects */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-modal__header">
              <div className="project-card__meta">
                <span className="project-card__num">{selectedProject.index}</span>
                <span className="project-card__dot" aria-hidden="true" />
                <span className="project-card__category">{selectedProject.statusNote}</span>
              </div>
              <button
                type="button"
                className="project-modal__close"
                aria-label="Close project overview"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
            </div>

            <h3 id="modal-project-title" className="project-modal__title">
              {selectedProject.title}
            </h3>
            <p className="project-modal__desc">{selectedProject.description}</p>

            {selectedProject.highlights && (
              <ul className="project-modal__highlights">
                {selectedProject.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            <div className="project-modal__footer">
              <p className="project-modal__note">
                This system operates on anonymized or internal institutional data. Reach out for a
                private walkthrough or architecture demo.
              </p>
              <button
                type="button"
                className="pill-btn pill-btn--card"
                onClick={handleRequestWalkthrough}
              >
                <span>Request Walkthrough</span>
                <ArrowUpRightIcon className="pill-btn__arrow" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
