export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  bullets: string[];
}

export const RESUME_PDF_URL = `${import.meta.env.BASE_URL}Putra_Irfan_Resume.pdf`;

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: 'Data Management & School Monitoring (PIC)',
    organization: 'Pejabat Pendidikan Daerah (PPD) Kota Tinggi',
    period: '2026',
    bullets: [
      'Managed and tracked SEGAK physical fitness and BMI data submissions across 95 schools in the Kota Tinggi district.',
      'Built a live Google Apps Script web monitoring system with Google Sheets synchronization and direct school office dialing.',
      'Automated exam result slip generation and barcode-scanning student dashboards using Google Sheets, Google Docs, and GitHub Pages.',
    ],
  },
  {
    role: 'Industrial Training Intern (Applied Mathematics)',
    organization: 'Pejabat Pendidikan Daerah (PPD) Kota Tinggi',
    period: 'May 2026',
    bullets: [
      'Applied statistical and data analysis techniques to evaluate district-wide student health metrics using SQLite and Python.',
      'Streamlined clerical reporting workflows and built structured datasets for administrative decision-making.',
    ],
  },
];

export const EDUCATION_ITEM: EducationItem = {
  degree: 'Bachelor of Science in Industrial Mathematics',
  institution: 'Universiti Teknologi Malaysia (UTM), Skudai, Johor',
  period: '2026',
  bullets: [
    'Focus areas: Mathematical Modeling (Computational Blood Flow), Statistical Analysis, Numerical Methods, and Optimization.',
    'Technical coursework tools: MATLAB, COMSOL Multiphysics, C++, Python, and SQL.',
  ],
};

export const CORE_COMPETENCIES: string[] = [
  'SQL & SQLite',
  'Python (pandas, openpyxl)',
  'Excel (Power Query, Pivot Tables, VBA)',
  'Google Apps Script',
  'MATLAB',
  'COMSOL Multiphysics',
  'Data Visualization',
];

export const RESUME_CONTACT = {
  location: 'Johor, Malaysia',
  email: 'p.nurizzirfan@gmail.com',
  github: 'github.com/putrairfan03',
  githubUrl: 'https://github.com/putrairfan03',
  linkedin: 'linkedin.com/in/putra-nurizz-irfan-bin-safnirizal',
};
