import { ResearchPublication } from '../../types'
import { ArrowUpRightIcon } from '../common'

interface ResearchSectionProps {
  research: ResearchPublication[]
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ research }) => {
  return (
    <section id="research" className="section research">
      <div className="section-label">
        <span>11</span>
        <span>RESEARCH / PUBLICATIONS</span>
      </div>
      <div className="research-head">
        <div>
          <p className="mini-label">RESEARCH THAT SHIPS</p>
          <h2>
            Questions into <span>evidence.</span>
          </h2>
        </div>
        <p>
          Published work spanning computer vision, machine learning, XR and connected systems.
        </p>
      </div>

      <div className="research-list">
        {research.map(item => (
          <article key={item.number}>
            <span className="research-no">{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p className="research-meta">{item.meta}</p>
              <p>{item.description}</p>
            </div>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="research-link"
                aria-label={`Open DOI for ${item.title}`}
              >
                DOI <ArrowUpRightIcon size={12} />
              </a>
            ) : (
              <span className="research-link muted">PAPER</span>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
