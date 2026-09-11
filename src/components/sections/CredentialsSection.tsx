import React from 'react'
import { CertificationItem } from '../../types'

interface CredentialsSectionProps {
  certifications: CertificationItem[]
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({ certifications }) => {
  return (
    <section id="credentials" className="section credentials">
      <div className="section-label">
        <span>12</span>
        <span>CREDENTIALS / LEARNING</span>
      </div>
      <div className="credentials-heading">
        <h2>
          Proof of <span>practice.</span>
        </h2>
        <p>Selected certifications and learning milestones.</p>
      </div>
      <div className="cert-grid">
        {certifications.map(cert => (
          <div className="cert" key={cert.id || cert.number}>
            <span>{cert.number}</span>
            <div>
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              {cert.result && <b>{cert.result}</b>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
