import { useState } from 'react';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ResumeSection } from './components/ResumeSection';
import { CertificationsCarousel } from './components/CertificationsCarousel';
import { AboutContactSection } from './components/AboutContactSection';
import { ResumePrintModal } from './components/ResumePrintModal';

export function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <>
      <main className="portfolio-main">
        <Hero />
        <div className="portfolio-content">
          <ProjectsSection />
          <SkillsSection />
          <ResumeSection />
          <CertificationsCarousel />
          <AboutContactSection onOpenCvPreview={() => setCvModalOpen(true)} />
        </div>
      </main>

      <ResumePrintModal
        open={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </>
  );
}

export default App;
