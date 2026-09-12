import { useEffect } from 'react'

export const useScrollReveal = () => {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          // Optional: unobserve once revealed for performance
          // observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    })

    const elements = document.querySelectorAll(
      '.reveal-on-scroll, .section-heading, .capability-card, .approach-grid > div, .process-row, .beyond-card, .founder-panel, .skill-row, .experience-list article, .research-list article, .cert, .about-metrics > div, .education-strip > div'
    )

    elements.forEach(el => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])
}
