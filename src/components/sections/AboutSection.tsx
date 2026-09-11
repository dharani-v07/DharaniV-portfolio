import React from 'react'
import { EducationItem, ProfileInfo } from '../../types'

interface AboutSectionProps {
  profile: ProfileInfo
  education: EducationItem[]
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, education }) => {
  return (
    <section id="about" className="section about">
      <div className="section-label">
        <span>01</span>
        <span>ABOUT</span>
      </div>
      <div className="about-grid">
        <div className="about-title">
          <p className="mini-label">WHO I AM</p>
          <h2>
            Code is a tool.
            <br />
            <span>Impact is the goal.</span>
          </h2>
        </div>
        <div className="about-content">
          <p className="lead">{profile.leadBio}</p>
          <p>{profile.secondaryBio}</p>
          <div className="about-metrics">
            {profile.metrics.map(metric => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="education-strip">
        <div className="strip-title">EDUCATION</div>
        {education.map(edu => (
          <div key={edu.id}>
            <strong>
              {edu.degree} · {edu.institution}
            </strong>
            <span>
              {edu.period} · {edu.score} {edu.honors ? `· ${edu.honors}` : ''}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
