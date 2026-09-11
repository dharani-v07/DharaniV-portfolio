import React, { useCallback, useState } from 'react'
import {
  AboutSection,
  AmbientBackground,
  CapabilitiesSection,
  ContactSection,
  CredentialsSection,
  ExperienceSection,
  ExpertiseSection,
  FloatingNav,
  Footer,
  Header,
  HeroSection,
  MobileMenu,
  ProgressBar,
  ProjectModal,
  ProjectsSection,
  ResearchSection,
  StatementSection,
  TickerSection,
  Toast
} from './components'
import {
  beyondCode,
  capabilities,
  certificationsData,
  educationData,
  experienceData,
  navItems,
  processSteps,
  profileData,
  projectCategories,
  projectsData,
  researchData,
  skillGroupsData
} from './data'
import { useActiveSection, useScrollLock, useScrollProgress, useToast } from './hooks'
import { Project } from './types'
import './styles/main.css'

export const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const progress = useScrollProgress()
  const active = useActiveSection(navItems, 'top')
  const { toast, showToast } = useToast()

  useScrollLock(menuOpen || activeProject !== null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <div className="site">
      <ProgressBar progress={progress} />
      <AmbientBackground />
      <FloatingNav navItems={navItems} activeSection={active} profile={profileData} />
      <Header
        profile={profileData}
        navItems={navItems}
        activeSection={active}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(v => !v)}
        onCloseMenu={closeMenu}
      />
      <MobileMenu
        navItems={navItems}
        activeSection={active}
        menuOpen={menuOpen}
        profile={profileData}
        onCloseMenu={closeMenu}
      />
      <main>
        <HeroSection profile={profileData} />
        <TickerSection />
        <AboutSection profile={profileData} education={educationData} />
        <CapabilitiesSection
          capabilities={capabilities}
          processSteps={processSteps}
          beyondCode={beyondCode}
        />
        <ProjectsSection
          projects={projectsData}
          categories={projectCategories}
          onSelectProject={setActiveProject}
        />
        <ExpertiseSection skillGroups={skillGroupsData} />
        <StatementSection />
        <ExperienceSection experience={experienceData} />
        <ResearchSection research={researchData} />
        <CredentialsSection certifications={certificationsData} />
        <ContactSection profile={profileData} onShowToast={showToast} />
      </main>
      <Footer profile={profileData} />
      <ProjectModal
        project={activeProject}
        projects={projectsData}
        onClose={() => setActiveProject(null)}
        onSelectProject={setActiveProject}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}

export default App
