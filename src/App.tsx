import React, { useEffect, useMemo, useState } from 'react'
import { certificationsData, experienceData, profileData, projectsData, researchData, skillGroupsData } from './data'
import './styles/main.css'

const nav = [
  ['about', 'About'],
  ['work', 'Work'],
  ['capabilities', 'Capabilities'],
  ['research', 'Research'],
  ['contact', 'Contact']
]

const capabilities = [
  { number: '01', title: 'Product engineering', text: 'Thoughtful interfaces, reliable APIs, and practical systems that are easy to use and easier to maintain.', tags: ['React', 'TypeScript', 'Flask'] },
  { number: '02', title: 'Applied intelligence', text: 'Computer vision and machine learning work translated into useful, real-world tools instead of isolated experiments.', tags: ['Python', 'OpenCV', 'ML'] },
  { number: '03', title: 'Systems thinking', text: 'From mobile apps to Linux automation, I connect the details across a product so the whole experience feels coherent.', tags: ['Android', 'Linux', 'Cloud'] }
]

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id))
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-25% 0px -60% 0px' }
    )
    sections.forEach(section => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px' }
    )
    document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  const categories = ['ALL', ...Array.from(new Set(projectsData.map(project => project.category.split(' / ')[0])))]
  const visibleProjects = useMemo(
    () => filter === 'ALL' ? projectsData.slice(0, 6) : projectsData.filter(project => project.category.includes(filter)).slice(0, 6),
    [filter]
  )

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="portfolio-shell">
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <button className="wordmark" onClick={() => jump('top')} aria-label="Go to top">
          <span>DV</span>
          <strong>DHARANI V.</strong>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([id, label]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => jump(id)}>{label}</button>)}
        </nav>
        <a className="header-cta" href={`mailto:${profileData.email}`}>LET'S TALK <span>↗</span></a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen}>
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span><i /><i />
        </button>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {nav.map(([id, label]) => <button key={id} onClick={() => jump(id)}>{label}<span>↗</span></button>)}
        <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
      </div>

      <main>
        <section className="hero-section" id="top">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span /> FULL STACK DEVELOPER · RESEARCHER</div>
            <h1>Digital products<br /><em>with a point of view.</em></h1>
            <p className="hero-description">I’m Dharani V. I design and build useful web, mobile, and computer-vision experiences where clarity matters as much as the code.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => jump('work')}>VIEW SELECTED WORK <span>↗</span></button>
              <a className="text-button" href={`mailto:${profileData.email}`}>START A CONVERSATION <span>↗</span></a>
            </div>
            <div className="hero-proof"><strong>04</strong><span>PUBLICATIONS</span><strong>08+</strong><span>FEATURED BUILDS</span><strong>01</strong><span>STUDIO FOUNDER</span></div>
          </div>
          <div className="hero-visual" aria-label="Dharani V portrait" data-reveal>
            <div className="hero-ring ring-a" /><div className="hero-ring ring-b" />
            <div className="hero-panel">
              <div className="panel-top"><span>DV / 2026</span><span className="live"><i /> OPEN TO WORK</span></div>
              <img src="/assets/dharani-portrait.png" alt="Dharani V" />
              <div className="panel-bottom"><strong>BUILD<br />USEFUL.</strong><span>COIMBATORE<br />INDIA</span></div>
            </div>
            <span className="visual-note">RESEARCH / PRODUCT / SYSTEMS</span>
          </div>
        </section>

        <div className="marquee" data-reveal><span>BUILD WITH CURIOSITY</span><b>✳</b><span>SHIP WITH PURPOSE</span><b>✳</b><span>BUILD WITH CURIOSITY</span></div>

        <section className="content-section about-section" id="about" data-reveal>
          <div className="section-kicker"><span>01</span><span>ABOUT / THE PRACTICE</span></div>
          <div className="split-heading"><h2>Code is a tool.<br /><em>Impact is the goal.</em></h2><p>{profileData.leadBio} {profileData.secondaryBio}</p></div>
          <div className="about-grid">
            {profileData.metrics.map(metric => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
          </div>
        </section>

        <section className="content-section dark-section" id="capabilities" data-reveal>
          <div className="section-kicker"><span>02</span><span>CAPABILITIES / WHAT I DO</span></div>
          <div className="split-heading"><h2>Range,<br /><em>with purpose.</em></h2><p>One person, several connected disciplines. I bring product thinking, engineering, and research into the same room.</p></div>
          <div className="capability-grid">{capabilities.map(item => <article className="capability-card" key={item.number}><span className="card-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        </section>

        <section className="content-section work-section" id="work" data-reveal>
          <div className="section-kicker"><span>03</span><span>SELECTED WORK / CASE STUDIES</span></div>
          <div className="split-heading"><h2>Things I’ve<br /><em>made real.</em></h2><p>From research prototypes to production-minded applications. Open a project to explore the thinking behind it.</p></div>
          <div className="filter-bar">{categories.map(category => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>
          <div className="project-grid">{visibleProjects.map((project, index) => <a className={`project-tile tile-${index % 3}`} href={project.link} target="_blank" rel="noreferrer" key={project.id}><div className="tile-art"><span>{project.number}</span><strong>{project.title.split(' ').slice(0, 2).join(' ')}</strong><i>↗</i></div><div className="tile-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.short}</p><div className="tile-stack">{project.stack.slice(0, 3).join(' · ')}</div></a>)}</div>
        </section>

        <section className="statement-section" data-reveal><span className="giant-mark">“</span><h2>Make it useful.<br /><em>Make it last.</em></h2><span>— DHARANI V / FOUNDER, DHARANI CONNECT</span></section>

        <section className="content-section experience-section" id="research" data-reveal>
          <div className="section-kicker"><span>04</span><span>RESEARCH / EXPERIENCE</span></div>
          <div className="split-heading"><h2>Proof in the<br /><em>work.</em></h2><p>Published research and hands-on experience keep my practice grounded in evidence, iteration, and delivery.</p></div>
          <div className="proof-columns"><div className="proof-list"><h3>SELECTED EXPERIENCE</h3>{experienceData.map(item => <article key={item.id}><span>{item.period}</span><div><b>{item.role}</b><strong>{item.organization}</strong><p>{item.description}</p></div><em>{item.badgeNumber}</em></article>)}</div><div className="proof-list"><h3>PUBLICATIONS</h3>{researchData.map(item => <article key={item.number}><span>{item.number}</span><div><b>{item.meta}</b><strong>{item.title}</strong><p>{item.description}</p></div>{item.link && <a href={item.link} target="_blank" rel="noreferrer">DOI ↗</a>}</article>)}</div></div>
        </section>

        <section className="content-section credentials-section" id="credentials" data-reveal>
          <div className="section-kicker"><span>05</span><span>LEARNING / CREDENTIALS</span></div>
          <div className="split-heading"><h2>Always<br /><em>learning.</em></h2><p>Curiosity is part of the job. These are a few of the milestones that shaped how I work.</p></div>
          <div className="credential-grid">{certificationsData.slice(0, 6).map(cert => <div className="credential" key={cert.id || cert.number}><span>{cert.number}</span><strong>{cert.title}</strong><p>{cert.issuer}</p></div>)}</div>
          <div className="skill-cloud">{skillGroupsData.flatMap(group => group.items).slice(0, 16).map(skill => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-orb" /><div className="section-kicker"><span>06</span><span>CONTACT / LET’S BUILD</span></div>
          <h2>Have a good<br /><em>idea?</em></h2><p>I’m open to thoughtful collaborations, product work, research, and conversations about building things that matter.</p>
          <a className="contact-email" href={`mailto:${profileData.email}`}>{profileData.email}<span>↗</span></a>
          <div className="social-row">{profileData.socialLinks.filter(link => ['LINKEDIN', 'GITHUB', 'DHARANI CONNECT'].includes(link.name)).map(link => <a href={link.url} target="_blank" rel="noreferrer" key={link.name}>{link.name} ↗</a>)}</div>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} DHARANI V.</span><span>DESIGNED / BUILT WITH INTENTION</span><button onClick={() => jump('top')}>BACK TO TOP ↑</button></footer>
    </div>
  )
}

export default App
