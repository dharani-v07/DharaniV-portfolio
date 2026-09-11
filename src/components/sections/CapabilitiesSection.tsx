import React from 'react'
import { Arrow, GlobeIcon } from '../common'

interface CapabilityItem {
  number: string
  title: string
  description: string
  tags: string[]
}

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface CapabilitiesSectionProps {
  capabilities: CapabilityItem[]
  processSteps: ProcessStep[]
  beyondCode: string[]
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  processSteps,
  beyondCode
}) => {
  return (
    <>
      {/* 02 - CAPABILITIES */}
      <section id="capabilities" className="section capability-section">
        <div className="section-label">
          <span>02</span>
          <span>CAPABILITIES</span>
        </div>
        <div className="section-heading">
          <div>
            <p className="mini-label">WHAT I BUILD</p>
            <h2>
              Range with <span>purpose.</span>
            </h2>
          </div>
          <p>
            Web, mobile, AI and security are connected parts of the same engineering practice.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map(c => (
            <article className="capability-card" key={c.number}>
              <div className="card-top">
                <span className="card-number">{c.number}</span>
                <span className="card-dot" />
              </div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <div className="tag-list">
                {c.tags.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 - APPROACH */}
      <section id="approach" className="section approach-section on-dark">
        <div className="section-label">
          <span>03</span>
          <span>APPROACH</span>
        </div>
        <div className="section-heading">
          <div>
            <p className="mini-label">HOW I THINK</p>
            <h2>
              Useful over <span>impressive.</span>
            </h2>
          </div>
          <p>Good software solves the actual problem, stays understandable and leaves room to evolve.</p>
        </div>
        <div className="approach-grid">
          <div>
            <strong>01</strong>
            <h3>Full-stack range</h3>
            <p>
              From UI and APIs to persistence, testing and deployment decisions — with fewer handoffs between layers.
            </p>
          </div>
          <div>
            <strong>02</strong>
            <h3>Research-backed rigor</h3>
            <p>
              Published work in computer vision, machine learning, XR and IoT–Cloud systems informs a practical engineering mindset.
            </p>
          </div>
          <div>
            <strong>03</strong>
            <h3>Student-first communication</h3>
            <p>
              Campus leadership and tech education work keep technical ideas focused on clarity, usefulness and outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 04 - PROCESS */}
      <section id="process" className="section process-section">
        <div className="section-label">
          <span>04</span>
          <span>PROCESS</span>
        </div>
        <div className="section-heading">
          <div>
            <p className="mini-label">FROM IDEA TO RELEASE</p>
            <h2>
              A repeatable <span>way of working.</span>
            </h2>
          </div>
        </div>
        <div className="process-list">
          {processSteps.map(s => (
            <div className="process-row" key={s.number}>
              <span>{s.number}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 - BEYOND CODE */}
      <section id="beyond" className="section beyond-section on-dark">
        <div className="section-label">
          <span>05</span>
          <span>BEYOND CODE</span>
        </div>
        <div className="beyond-grid">
          {beyondCode.map((item, index) => (
            <div className="beyond-card" key={index}>
              <span className="beyond-num">0{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 06 - FOUNDER / STUDIO */}
      <section id="founder" className="section founder-section">
        <div className="section-label">
          <span>06</span>
          <span>FOUNDER / STUDIO</span>
        </div>
        <div className="section-heading">
          <div>
            <p className="mini-label">DHARANI CONNECT TECHNOLOGIES</p>
            <h2>
              Building the <span>studio.</span>
            </h2>
          </div>
          <p>
            A founder-led software studio connecting ideas to web, mobile, AI and security-aware systems.
          </p>
        </div>
        <div className="founder-panel">
          <div>
            <span className="founder-kicker">FOUNDER & LEAD ENGINEER</span>
            <h3>Dharani V</h3>
            <p>
              Dharani Connect Technologies is a full-stack software studio based in Coimbatore, building practical digital products with research, security and direct founder attention.
            </p>
          </div>
          <div className="founder-services">
            <span>WEB APPS</span>
            <span>MOBILE & ANDROID</span>
            <span>AI & COMPUTER VISION</span>
            <span>CYBER SECURITY</span>
            <span>DEVOPS & CLOUD</span>
            <span>SYSTEMS</span>
          </div>
          <a
            className="founder-cta"
            href="https://dharaniconnect.vercel.app/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Dharani Connect Studio"
          >
            <GlobeIcon size={14} />
            <span>VISIT DHARANI CONNECT</span>
            <Arrow />
          </a>
        </div>
      </section>
    </>
  )
}
