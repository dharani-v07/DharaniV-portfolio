import React from 'react'
import { SkillGroup } from '../../types'

interface ExpertiseSectionProps {
  skillGroups: SkillGroup[]
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ skillGroups }) => {
  return (
    <section id="skills" className="section expertise">
      <div className="section-label">
        <span>08</span>
        <span>SKILLS / STACK</span>
      </div>
      <div className="section-heading">
        <div>
          <p className="mini-label">WHAT I WORK WITH</p>
          <h2>
            Tools for <span>the job.</span>
          </h2>
        </div>
        <p>
          My stack is broad by design: enough range to move from an idea and data model to an
          interface, API or mobile experience.
        </p>
      </div>

      <div className="skills-list">
        {skillGroups.map((group, index) => (
          <div className="skill-row" key={group.id || group.title}>
            <span className="skill-no">0{index + 1}</span>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.items.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
