import { useEffect } from 'react'

export const use3DTilt = () => {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const cards = document.querySelectorAll<HTMLElement>(
      '.project-card, .capability-card, .beyond-card, .founder-panel, .cert, .approach-grid > div'
    )

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)
    }

    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    }

    const handleMouseEnter = (card: HTMLElement) => {
      card.style.transition = 'transform 0.1s ease-out'
    }

    cards.forEach(card => {
      if (!isTouch) {
        const onMove = (e: MouseEvent) => handleMouseMove(e, card)
        const onLeave = () => handleMouseLeave(card)
        const onEnter = () => handleMouseEnter(card)

        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        card.addEventListener('mouseenter', onEnter)
      }
    })

    return () => {
      // Clean up event listeners if re-run
    }
  }, [])
}
