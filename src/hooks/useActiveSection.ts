import { useEffect, useState } from 'react'
import { NavItem } from '../types'

export function useActiveSection(navItems: NavItem[], defaultSection = 'top'): string {
  const [activeSection, setActiveSection] = useState(defaultSection)

  useEffect(() => {
    let raf = 0
    const headerOffset = 88

    const update = () => {
      const targets = navItems
        .map(item => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[]

      if (!targets.length) return

      const probe = window.scrollY + headerOffset + window.innerHeight * 0.18
      let current = targets[0].id

      for (const target of targets) {
        if (target.offsetTop <= probe) current = target.id
        else break
      }

      // Keep the last section active at the very bottom of the document.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = targets[targets.length - 1].id
      }

      setActiveSection(prev => (prev === current ? prev : current))
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [navItems])

  return activeSection
}
