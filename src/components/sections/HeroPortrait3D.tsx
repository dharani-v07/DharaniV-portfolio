import React, { useEffect, useRef, useState } from 'react'

export const HeroPortrait3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [portraitStyle, setPortraitStyle] = useState<'cyber' | 'original'>('cyber')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    const container = containerRef.current
    if (!card || !container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // 3D Perspective Rotation Angles
      const rotateX = ((y - centerY) / centerY) * -12
      const rotateY = ((x - centerX) / centerX) * 12

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`)
      card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`)
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      setIsHovered(false)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -8
        const rotateY = ((x - centerX) / centerX) * 8

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`)
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`)
      }
    }

    const handleTouchEnd = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div className="hero-portrait-3d-wrapper" ref={containerRef}>
      {/* Ambient Breathing Aura Glow */}
      <div className="portrait-aura-glow" aria-hidden="true" />

      {/* 4 Sleek Minimal Corner Reticles */}
      <div className="portrait-corner corner-tl" aria-hidden="true" />
      <div className="portrait-corner corner-tr" aria-hidden="true" />
      <div className="portrait-corner corner-bl" aria-hidden="true" />
      <div className="portrait-corner corner-br" aria-hidden="true" />

      {/* Main 3D Card Stage */}
      <div className={`portrait-3d-card ${isHovered ? 'is-hovered' : ''}`} ref={cardRef}>
        {/* Dynamic Specular Lighting Glare */}
        <div className="portrait-glare-layer" aria-hidden="true" />

        {/* The Real Portrait Image */}
        <div className="portrait-image-container">
          <img
            src={
              portraitStyle === 'cyber'
                ? '/assets/dharani-portrait-3d.png'
                : '/assets/dharani-portrait.png'
            }
            alt="Dharani V - Software Developer & Researcher"
            className="portrait-img-main"
          />
        </div>

        {/* 3D Depth Layer 1: Top Status Bar */}
        <div className="portrait-top-badge">
          <div className="portrait-status-pill">
            <span className="status-live-beacon" />
            <span>DEV & RESEARCH NODE</span>
          </div>
          <button
            type="button"
            className="portrait-style-toggle"
            onClick={() =>
              setPortraitStyle(prev => (prev === 'cyber' ? 'original' : 'cyber'))
            }
            aria-label="Toggle Portrait Aesthetic"
            title="Switch Portrait Mode"
          >
            {portraitStyle === 'cyber' ? '⚡ 3D CYBER' : '🌅 SUNSET'}
          </button>
        </div>

        {/* 3D Depth Layer 2: Floating Bottom Information Cluster */}
        <div className="portrait-bottom-cluster">
          <div className="portrait-info-glass">
            <div className="info-glass-header">
              <span className="info-initials">DV</span>
              <div>
                <h4>Dharani V</h4>
                <p>Full Stack · Computer Vision · Mobile</p>
              </div>
            </div>
            <div className="info-glass-badges">
              <span>FOUNDER @ DHARANI CONNECT</span>
              <span>BCA · MULTI-TASKING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Floating Micro-Note */}
      <div className="portrait-interactive-hint">
        <span>3D PERSPECTIVE · MOVE CURSOR / TOUCH TO TILT</span>
      </div>
    </div>
  )
}
