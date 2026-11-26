interface SkillGroup {
  index: string;
  title: string;
  subtitle: string;
  skills: string[];
  icon: 'analytics' | 'math' | 'automation';
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    index: '01',
    title: 'Data & Analytics',
    subtitle: 'Querying, cleaning, and translating raw datasets into insight.',
    icon: 'analytics',
    skills: [
      'SQL (SQLite)',
      'Python (pandas, openpyxl)',
      'Microsoft Excel (Power Query, Pivot Tables, VBA)',
      'Data Visualization',
      'Power BI',

    ],
  },
  {
    index: '02',
    title: 'Mathematical & Scientific Modeling',
    subtitle: 'Quantitative rigor from applied mathematics and computational science.',
    icon: 'math',
    skills: [
      'Industrial Mathematics',
      'MATLAB',
      'COMSOL Multiphysics',
      'C++',
      'Statistical Analysis',
    ],
  },
  {
    index: '03',
    title: 'Web & Workflow Automation',
    subtitle: 'Interactive tools and streamlined systems built for everyday reliability.',
    icon: 'automation',
    skills: [
      'Google Apps Script',
      'Google AppSheet',
      'HTML/CSS/JavaScript',
      'GitHub Pages',
    ],
  },
];

function SkillIcon({ kind }: { kind: SkillGroup['icon'] }) {
  if (kind === 'analytics') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="skill-icon" aria-hidden="true">
        <path
          d="M4 19H20M7 16V11M12 16V7M17 16V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="17" cy="8" r="2" fill="var(--golden-ice)" />
      </svg>
    );
  }
  if (kind === 'math') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="skill-icon" aria-hidden="true">
        <path
          d="M4 16C7.5 16 8.5 7 12 7C15.5 7 16.5 17 20 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 12H20"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1.2"
          strokeDasharray="2 3"
        />
        <circle cx="12" cy="7" r="2" fill="var(--golden-ice)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="skill-icon" aria-hidden="true">
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 11L10.75 13L8.5 15M12.5 15H15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16.5" cy="8.5" r="1.5" fill="var(--golden-ice)" />
    </svg>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section portfolio-section--skills">
      <div className="section-container">
        <header className="section-header">
          <div className="section-eyebrow-row">
            <span className="section-index">02</span>
            <span className="section-eyebrow-line" aria-hidden="true" />
            <span className="section-eyebrow">TECHNICAL SKILLS &amp; TOOLS</span>
          </div>

          <div className="section-title-row">
            <h2 className="section-heading">
              Technical Skills <span className="section-heading--italic">&amp; Tools.</span>
            </h2>
            <p className="section-lead">
              Combining industrial mathematics with modern data tooling and lightweight
              web engineering.
            </p>
          </div>
        </header>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.index} className="glass-card skill-card">
              <div className="skill-card__head">
                <div className="skill-card__icon-wrap">
                  <SkillIcon kind={group.icon} />
                </div>
                <span className="project-card__num">{group.index}</span>
              </div>

              <h3 className="skill-card__title">{group.title}</h3>
              <p className="skill-card__subtitle">{group.subtitle}</p>

              <div className="skill-card__divider" aria-hidden="true" />

              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill} className="skill-list__item">
                    <span className="skill-list__bullet" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
