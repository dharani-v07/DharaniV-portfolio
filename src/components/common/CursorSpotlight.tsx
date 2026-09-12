import React, { useEffect, useRef } from 'react'

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/tablets with mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const spotlight = spotlightRef.current
    if (!spotlight) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let isVisible = false
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        spotlight.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      isVisible = false
      spotlight.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    const updatePosition = () => {
      // Smooth lerp physics
      currentX += (mouseX - currentX) * 0.15
      currentY += (mouseY - currentY) * 0.15

      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      animId = requestAnimationFrame(updatePosition)
    }

    animId = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <div className="cursor-ambient-spotlight" ref={spotlightRef} aria-hidden="true" />
}
