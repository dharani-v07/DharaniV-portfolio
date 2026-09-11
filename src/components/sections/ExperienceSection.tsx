import React from 'react'
import { ExperienceItem } from '../../types'

interface ExperienceSectionProps {
  experience: ExperienceItem[]
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="section experience">
      <div className="section-label">
        <span>10</span>
        <span>EXPERIENCE / ROLES</span>
      </div>
      <div className="section-heading">
        <div>
          <p className="mini-label">WHERE I'VE WORKED</p>
          <h2>
            Learning by <span>doing.</span>
          </h2>
        </div>
        <p>
          Experience across development, student leadership and digital work — with a bias toward
          building things end to end.
        </p>
      </div>

      <div className="experience-list">
        {experience.map(item => (
          <article key={item.id}>
            <div className="exp-date">{item.period}</div>
            <div className="exp-body">
              <p className="mini-label">{item.role}</p>
              <h3>{item.organization}</h3>
              <p>{item.description}</p>
            </div>
            <div className="exp-score">
              <strong>{item.badgeNumber}</strong>
              <span>{item.badgeLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
