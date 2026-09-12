import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const [isPaused, setIsPaused] = useState(false)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInteractingRef = useRef(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Smooth Horizontal Auto-Scroll Engine (Continuous, non-blocking)
  useEffect(() => {
    let animId: number
    const el = gridRef.current
    if (!el) return

    const scrollStep = () => {
      if (el && !isUserPaused && !isInteractingRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth
        if (maxScroll > 10) {
          if (el.scrollLeft >= maxScroll - 1) {
            // Loop back seamlessly to start
            el.scrollLeft = 0
          } else {
            el.scrollLeft += 0.8
          }
        }
      }
      animId = requestAnimationFrame(scrollStep)
    }

    animId = requestAnimationFrame(scrollStep)

    return () => {
      cancelAnimationFrame(animId)
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [visibleProjects.length, isUserPaused])

  // Mouse & Touch interaction handlers for seamless pause & resume
  const handleMouseEnter = useCallback(() => {
    isInteractingRef.current = true
    setIsPaused(true)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
      if (!isUserPaused) {
        setIsPaused(false)
      }
    }, 600)
  }, [isUserPaused])

  const handleTouchStart = useCallback(() => {
    isInteractingRef.current = true
    setIsPaused(true)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
      if (!isUserPaused) {
        setIsPaused(false)
      }
    }, 1200)
  }, [isUserPaused])

  const toggleUserPause = () => {
    setIsUserPaused(prev => {
      const next = !prev
      setIsPaused(next)
      return next
    })
  }

  const scrollManual = (direction: 'left' | 'right') => {
    const el = gridRef.current
    if (!el) return
    const offset = direction === 'left' ? -340 : 340
    el.scrollBy({ left: offset, behavior: 'smooth' })
  }

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
                if (gridRef.current) gridRef.current.scrollLeft = 0
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
              if (gridRef.current) gridRef.current.scrollLeft = 0
            }}
            aria-label="Search projects by title, category, or technology"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => {
                setSearchQuery('')
                if (gridRef.current) gridRef.current.scrollLeft = 0
              }}
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
              if (gridRef.current) gridRef.current.scrollLeft = 0
            }}
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <>
          <div className="work-scroll-note">
            <div className="work-scroll-status">
              <span className={`scroll-pulse-dot ${!isPaused && !isUserPaused ? 'active' : ''}`} />
              <span>
                {isUserPaused || isPaused
                  ? 'AUTO-SCROLL PAUSED · SWIPE / DRAG TO EXPLORE'
                  : 'AUTO-SCROLLING HORIZONTALLY · TAP CARD TO VIEW'}
              </span>
            </div>
            <div className="work-scroll-controls">
              <button
                type="button"
                className="scroll-ctrl-btn"
                onClick={() => scrollManual('left')}
                aria-label="Scroll projects left"
                title="Previous projects"
              >
                ←
              </button>
              <button
                type="button"
                className={`scroll-ctrl-btn scroll-pause-btn ${isUserPaused ? 'is-paused' : ''}`}
                onClick={toggleUserPause}
                aria-label={isUserPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                title={isUserPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              >
                {isUserPaused ? '▶ PLAY' : '⏸ PAUSE'}
              </button>
              <button
                type="button"
                className="scroll-ctrl-btn"
                onClick={() => scrollManual('right')}
                aria-label="Scroll projects right"
                title="Next projects"
              >
                →
              </button>
            </div>
          </div>

          <div
            className="project-grid horizontal-projects"
            ref={gridRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
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
