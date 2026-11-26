export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
}

const certUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}certificates/${filename}`;

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'google-certified-educator-level-2',
    title: 'Google Certified Educator Level 2',
    issuer: 'Google for Education',
    date: 'Oct 2026',
    imageUrl: certUrl('gce.png'),
  },
  {
    id: 'introduction-to-sql',
    title: 'Introduction to SQL',
    issuer: 'DataCamp',
    date: 'Dec 2025',
    imageUrl: certUrl('introduction-to-sql.png'),
  },
  {
    id: 'introduction-to-python',
    title: 'Introduction to Python',
    issuer: 'DataCamp',
    date: 'Jan 2023',
    imageUrl: certUrl('introduction-to-python.png'),
  },
  {
    id: 'claude-101',
    title: 'Claude 101',
    issuer: 'DataCamp',
    date: 'Oct 2026',
    imageUrl: certUrl('claude-101.png'),
  },
  {
    id: 'introduction-to-r',
    title: 'Introduction to R',
    issuer: 'DataCamp',
    date: 'Dec 2022',
    imageUrl: certUrl('introduction-to-r.png'),
  },
  {
    id: 'understanding-digital-transformation',
    title: 'Understanding Digital Transformation',
    issuer: 'MyDIGITAL Corp · Coursera',
    date: 'Nov 2026',
    imageUrl: certUrl('coursera-d7hr59736cru.png'),
  },
  {
    id: 'agentic-ai-for-all',
    title: 'Agentic AI for All',
    issuer: 'Ministry of Digital, Malaysia',
    date: 'Oct 2026',
    imageUrl: certUrl('agentic-ai-for-all.png'),
  },
  {
    id: 'introduction-to-generative-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Ministry of Digital · Intel',
    date: 'Oct 2026',
    imageUrl: certUrl('generative-ai.png'),
  },
  {
    id: 'ai-safety',
    title: 'AI Safety',
    issuer: 'Ministry of Digital, Malaysia',
    date: 'Oct 2026',
    imageUrl: certUrl('ai-safety.png'),
  },
  {
    id: 'introduction-to-ai',
    title: 'Introduction to AI (AI Untuk Rakyat)',
    issuer: 'Ministry of Digital, Malaysia',
    date: 'Oct 2026',
    imageUrl: certUrl('ai-untuk-rakyat.png'),
  },
  {
    id: 'ai-nation-2030',
    title: 'AI Nation 2030: The MADANI Approach',
    issuer: 'Ministry of Digital, Malaysia',
    date: 'Oct 2026',
    imageUrl: certUrl('ai-nation-2030.png'),
  },
  {
    id: 'cloud-untuk-rakyat',
    title: 'Cloud Untuk Rakyat',
    issuer: 'Ministry of Digital, Malaysia',
    date: 'Oct 2026',
    imageUrl: certUrl('cloud-untuk-rakyat.png'),
  },
  {
    id: 'cybersafe-untuk-rakyat',
    title: 'CyberSAFE Untuk Rakyat',
    issuer: 'Ministry of Digital, Malaysia',
    date: 'Oct 2026',
    imageUrl: certUrl('cybersecurity.png'),
  },
  {
    id: 'tips-ajaib-excel',
    title: 'Tips Ajaib Menggunakan MS Excel',
    issuer: 'HRD Corp e-LATiH',
    date: 'Mar 2026',
    imageUrl: certUrl('tips-ajaib-excel.png'),
  },
  {
    id: 'isics-stephen-wolfram',
    title: 'ISICS Series-20: Building the Future with Computation',
    issuer: 'UniMAP · IEEE Malaysia',
    date: 'Dec 2024',
    imageUrl: certUrl('42-putra-nurizz-irfan-bin-safnirizal.png'),
  },
  {
    id: 'chinese-for-hsk-1',
    title: 'Chinese for HSK 1',
    issuer: 'Peking University · Coursera',
    date: 'Nov 2026',
    imageUrl: certUrl('hsk-1-coursera.png'),
  },
  {
    id: 'creating-online-store-ecwid',
    title: 'Basic Skills of Creating Online Store Using Ecwid',
    issuer: 'HRD Corp e-LATiH',
    date: 'Mar 2026',
    imageUrl: certUrl('basic-skill-creating-online-store.png'),
  },
];
