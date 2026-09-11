import React, { useEffect } from 'react'
import { Project } from '../../types'
import { Arrow, ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon, GithubIcon } from '../common'

interface ProjectModalProps {
  project: Project | null
  projects: Project[]
  onClose: () => void
  onSelectProject: (project: Project) => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        const currentIndex = projects.findIndex(p => p.id === project.id)
        if (currentIndex < projects.length - 1) {
          onSelectProject(projects[currentIndex + 1])
        } else {
          onSelectProject(projects[0])
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = projects.findIndex(p => p.id === project.id)
        if (currentIndex > 0) {
          onSelectProject(projects[currentIndex - 1])
        } else {
          onSelectProject(projects[projects.length - 1])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, projects, onClose, onSelectProject])

  if (!project) return null

  const currentIndex = projects.findIndex(p => p.id === project.id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className={`project-modal ${project.accent}`}
        onClick={event => event.stopPropagation()}
      >
        <div className="modal-header-nav">
          <div className="modal-nav-arrows">
            <button
              className="modal-nav-btn"
              onClick={() => onSelectProject(prevProject)}
              title={`Previous: ${prevProject.title}`}
              aria-label="Previous Project"
            >
              <ChevronLeftIcon size={14} /> PREV
            </button>
            <span className="modal-counter">
              {project.number} / {String(projects.length).padStart(2, '0')}
            </span>
            <button
              className="modal-nav-btn"
              onClick={() => onSelectProject(nextProject)}
              title={`Next: ${nextProject.title}`}
              aria-label="Next Project"
            >
              NEXT <ChevronRightIcon size={14} />
            </button>
          </div>

          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={16} /> <span>CLOSE</span>
          </button>
        </div>

        <div className="modal-number">{project.number} / CASE STUDY · {project.year}</div>
        <p className="mini-label">{project.category}</p>
        <h2>{project.title}</h2>
        <p className="modal-description">{project.description}</p>

        <div className="modal-tags">
          {project.stack.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="modal-actions">
          {project.link && project.link.includes('doi.org') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn"
              aria-label={`Open research paper for ${project.title}`}
            >
              <span>RESEARCH PAPER (DOI)</span> <ArrowUpRightIcon size={13} />
            </a>
          )}

          {project.link && !project.link.includes('doi.org') && !project.link.includes('github.com') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn"
              aria-label={`Open live demo for ${project.title}`}
            >
              <span>LIVE DEMO</span> <ArrowUpRightIcon size={13} />
            </a>
          )}

          {(project.github || (project.link && project.link.includes('github.com'))) && (
            <a
              href={project.github || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn modal-github-btn"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <GithubIcon size={14} /> <span>VIEW REPOSITORY</span> <Arrow />
            </a>
          )}

          <button className="modal-btn-dismiss" onClick={onClose} aria-label="Close case study details">
            CLOSE CASE
          </button>
        </div>
      </div>
    </div>
  )
}
