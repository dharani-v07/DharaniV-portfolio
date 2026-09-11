import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Project, ProjectCategory } from '../../types'
import { Arrow, SearchIcon } from '../common'

interface ProjectsSectionProps {
  projects: Project[]
  categories: ProjectCategory[]
  onSelectProject: (project: Project) => void
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  categories,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProjects = useMemo(() => {
    let list = projects

    if (activeCategory !== 'ALL') {
      list = list.filter(project =>
        project.category.toUpperCase().includes(activeCategory.toUpperCase())
      )
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        project =>
          project.title.toLowerCase().includes(q) ||
          project.short.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.category.toLowerCase().includes(q) ||
          project.stack.some(tech => tech.toLowerCase().includes(q))
      )
    }

    return list
  }, [projects, activeCategory, searchQuery])

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  useEffect(() => {
    const el = gridRef.current
    const section = el?.closest('section') as HTMLElement | null
    if (!el || !section) return

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 900) return
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      const gridRect = el.getBoundingClientRect()
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
      if (maxScroll <= 8) return

      const atStart = el.scrollLeft <= 8
      const atEnd = el.scrollLeft >= maxScroll - 8
      const movingDown = event.deltaY > 0
      const movingUp = event.deltaY < 0

      // Only engage horizontal scroll once the cards are in full viewing position (Image 2)
      // When scrolling down, let vertical scroll bring the full cards into view first
      const fullyInViewForDown =
        gridRect.bottom <= window.innerHeight + 30 ||
        gridRect.top <= Math.min(260, window.innerHeight * 0.35)
      const inViewForUp =
        gridRect.top >= 40 &&
        gridRect.top <= window.innerHeight * 0.65

      if (movingDown && !atEnd && fullyInViewForDown && gridRect.top > -40) {
        event.preventDefault()
        el.scrollLeft = Math.max(0, Math.min(maxScroll, el.scrollLeft + event.deltaY * 1.35))
      } else if (movingUp && !atStart && inViewForUp) {
        event.preventDefault()
        el.scrollLeft = Math.max(0, Math.min(maxScroll, el.scrollLeft + event.deltaY * 1.35))
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [visibleProjects.length])





  return (
    <section id="work" className="section work">
      <div className="section-label">
        <span>07</span>
        <span>SELECTED WORK</span>
      </div>
      <div className="section-heading">
        <div>
          <p className="mini-label">THINGS I'VE BUILT</p>
          <h2>
            Selected <span>work.</span>
          </h2>
        </div>
        <p>
          Web, mobile, research and hackathon work — each project starts with a problem and ends
          with something usable.
        </p>
      </div>

      <div className="projects-toolbar">
        <div className="filter-row">
          {categories.map(category => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => {
                setActiveCategory(category)
                setShowAll(false)
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="search-box">
          <SearchIcon size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setShowAll(false)
            }}
            aria-label="Search projects by title, category, or technology"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="projects-empty">
          <p>No projects matched your criteria "{searchQuery || activeCategory}".</p>
          <button
            onClick={() => {
              setActiveCategory('ALL')
              setSearchQuery('')
            }}
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <>
          <div className="work-scroll-note"><span>HORIZONTAL EXPLORATION</span><span>MOUSE WHEEL → PROJECTS · THEN CONTINUE DOWN</span></div>
          <div className="project-grid horizontal-projects" ref={gridRef}>
          {visibleProjects.map(project => (
            <article className={`project-card ${project.accent}`} key={project.id}>
              <button
                className="project-open"
                onClick={() => onSelectProject(project)}
                aria-label={`Open case study: ${project.title}`}
              >
                <div className="project-top">
                  <span>{project.number}</span>
                  <span>{project.year}</span>
                </div>
                <div className="project-visual">
                  <div className="visual-lines" />
                  <div className="visual-shape shape-one" />
                  <div className="visual-shape shape-two" />
                  <span className="visual-type">{project.category}</span>
                  <span className="visual-word">
                    {project.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span className="visual-plus">+</span>
                </div>
                <div className="project-info">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.short}</span>
                  <div className="project-meta">
                    <span>{project.stack.slice(0, 3).join(' · ')}</span>
                    <span>
                      VIEW CASE <Arrow />
                    </span>
                  </div>
                </div>
              </button>
            </article>
          ))}
          </div>
        </>
      )}

      {filteredProjects.length > 6 && (
        <button className="view-all" onClick={() => setShowAll(value => !value)}>
          {showAll ? 'SHOW LESS' : `VIEW ALL PROJECTS (${filteredProjects.length})`} <Arrow />
        </button>
      )}
    </section>
  )
}
