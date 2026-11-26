export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface EducationCertItem {
  title: string;
  institution: string;
  period: string;
  category: 'Education' | 'Certification';
}

export interface ResumeProjectItem {
  title: string;
  tool: string;
  period: string;
  bullets: string[];
}

export const RESUME_PDF_URL = `${import.meta.env.BASE_URL}Putra_Irfan_Resume.pdf`;

export const RESUME_FULL_NAME = 'Putra Nurizz Irfan bin Safnirizal';

export const PROFESSIONAL_STATEMENT =
  'Analytical professional experienced in converting district education records into performance insights, interactive dashboards and reporting. Proficient in Microsoft Excel, SQL, Power BI and Google Apps Script, supported by an Industrial Mathematics background. Skilled in data cleaning, reporting automation and communicating quantitative findings to education stakeholders. Combines structured problem solving and process improvement experience.';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: 'Data Analyst Intern',
    organization: 'Pejabat Pendidikan Daerah Kota Tinggi',
    period: 'March 2026 – August 2026',
    bullets: [
      'Converted three years of SPM results covering 2,000 students across 21 schools into comparative performance insights, highlighting subjects with low pass rates for district intervention planning across subject groups and school cohorts.',
      'Equipped the SISC+ Social Science unit with an Excel dashboard consolidating four subjects across 21 schools, providing officers with a clearer view of academic performance and school level trends for routine district reporting and review.',
      'Standardised and visualised SEGAK fitness and BMI measures for over 1,000 students, turning unstructured departmental records into interpretable health indicators for district reporting and comparisons across participating schools.',
      'Prepared analytical charts and presentation materials for two official briefings to the Johor State Education Department, communicating district findings through accessible data visualisations to support departmental review discussions.',
      'Strengthened Excel record maintenance for more than 70 Special Recovery teachers through XLOOKUP functions, achieving a reported 95% reduction in lookup errors and improving data retrieval across teacher records and departmental lists.',
      'Introduced a Google Forms QR registration workflow for two official district events, recording over 50 participants and reducing manual registration time by 80% while maintaining accurate participant records for event organisers.',
      'Facilitated practical sessions for 96 teachers and students using Google Gemini, Canva and NotebookLM, supporting faster preparation of daily lesson plans and school reporting materials across regular classroom documentation workflows.',
    ],
  },
];

export const RESUME_PROJECTS: ResumeProjectItem[] = [
  {
    title: 'Academic Results Automation',
    tool: 'Google Apps Script',
    period: 'October 2026',
    bullets: [
      'Developed a live Google Apps Script dashboard monitoring Sports Science and Visual Arts results for 600 students across 10 schools, enabling automatic refreshes of academic progress data for routine monitoring by district education personnel.',
      'Organised live Sports Science and Visual Arts performance information for two district officers, enabling them to review updated results and compare academic progress across all ten participating schools for ongoing district academic review.',
    ],
  },
  {
    title: 'Student Health Risk Surveillance',
    tool: 'SQL & SQLite',
    period: 'September 2026',
    bullets: [
      'Analysed more than 12,000 SEGAK and BMI records in SQLite, categorising student health risks and quantifying a 22.32% share of students in overweight or obese classifications to inform district health surveillance and intervention planning.',
      'Applied conditional aggregation and SQL window functions to compare obesity patterns by gender and location, producing a ranked shortlist of five schools for targeted intervention using comparable school level obesity measures and rankings.',
    ],
  },
  {
    title: 'Academic Performance Intelligence',
    tool: 'Power BI',
    period: 'August 2026',
    bullets: [
      'Built a three page interactive Power BI dashboard covering GPS, GPMP and certificate eligibility indicators alongside baseline, target and examination data for three academic cohorts to reveal differences across school and subject outcomes.',
      'Combined academic progress measures into comparative views for district officers, replacing repetitive spreadsheet lookups when evaluating weaker schools and subject performance across successive reporting stages and academic cohorts.',
    ],
  },
  {
    title: 'Blood Flow and Solute Dispersion Modelling',
    tool: 'MATLAB',
    period: 'January 2026',
    bullets: [
      'Modelled non Newtonian blood flow and solute dispersion through narrowed arteries in MATLAB, applying the Bingham model to examine physiological flow characteristics under two constricted artery simulation scenarios in the project.',
      'Compared numerical outcomes across two simulation scenarios and validated results against analytical solutions, providing an evidence based foundation for the research findings on blood flow and solute dispersion in the numerical study.',
    ],
  },
];

export const EDUCATION_AND_CERTIFICATIONS: EducationCertItem[] = [
  {
    title: 'Bachelor of Science (Industrial Mathematics) with Honours',
    institution: 'Universiti Teknologi Malaysia',
    period: '2026',
    category: 'Education',
  },
  {
    title: 'Google Certified Educator Level 2',
    institution: 'Google for Education',
    period: '2026',
    category: 'Certification',
  },
  {
    title: 'Introduction to SQL, Introduction to Python, Introduction to R & Claude 101',
    institution: 'DataCamp',
    period: '2026',
    category: 'Certification',
  },
  {
    title: 'Matriculation Programme, Module I (Science)',
    institution: 'Kolej Matrikulasi Johor',
    period: '2022',
    category: 'Education',
  },
];

export const CORE_COMPETENCIES: string[] = [
  'Microsoft Excel (XLOOKUP, Dashboards)',
  'SQL & SQLite',
  'Power BI',
  'Google Apps Script',
  'Python',
  'MATLAB',
  'Data Cleaning & Automation',
  'Data Visualization',
];

export const RESUME_CONTACT = {
  location: 'Johor, Malaysia',
  mobile: '+60 19 738 9857',
  mobileHref: 'tel:+60197389857',
  email: 'p.nurizzirfan@gmail.com',
  emailHref: 'mailto:p.nurizzirfan@gmail.com',
  github: 'github.com/putrairfan03',
  githubUrl: 'https://github.com/putrairfan03',
  linkedin: 'linkedin.com/in/putra-nurizz-irfan-bin-safnirizal',
  linkedinUrl: 'https://www.linkedin.com/in/putra-nurizz-irfan-bin-safnirizal/',
};
