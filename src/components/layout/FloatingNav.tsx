import React, { useEffect, useRef, useState } from 'react'
import { NavItem, ProfileInfo } from '../../types'
import { Arrow, CloseIcon, GlobeIcon, LinkedinIcon, MailIcon, WhatsAppIcon } from '../common'

interface FloatingNavProps {
  navItems: NavItem[]
  activeSection: string
  profile: ProfileInfo
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  activeSection,
  profile
}) => {
  const [showTop, setShowTop] = useState(false)
  const [connectBoxOpen, setConnectBoxOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  const activeIndex = Math.max(0, navItems.findIndex(item => item.id === activeSection))
  const previous = navItems[activeIndex - 1]
  const next = navItems[activeIndex + 1]

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 280)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close connect box when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setConnectBoxOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConnectBoxOpen(false)
        return
      }

      if (e.defaultPrevented) return
      const target = e.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return
      if (activeSection === 'work' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return

      if (e.key === 'PageDown') {
        if (next) {
          e.preventDefault()
          goTo(next.id)
        }
      } else if (e.key === 'PageUp') {
        if (previous) {
          e.preventDefault()
          goTo(previous.id)
        }
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo('top')
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(navItems[navItems.length - 1].id)
      }
    }

    if (connectBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [connectBoxOpen, activeSection, next, previous, navItems])

  return (
    <>
      {/* Side Rail Section Navigator */}
      <nav className="section-rail" aria-label="Section navigation rail">
        <span className="rail-title">INDEX</span>
        {navItems.map(item => (
          <button
            type="button"
            key={item.id}
            className={activeSection === item.id ? 'is-active' : ''}
            onClick={() => goTo(item.id)}
            aria-label={`Jump to ${item.label}`}
            title={`${item.number} ${item.label}`}
          >
            <span>{item.number}</span>
            <b>{item.label}</b>
          </button>
        ))}
      </nav>

      {/* Floating Stepper (Previous / Next Section) */}
      <div className="floating-section-nav" aria-label="Section stepper">
        <button
          type="button"
          disabled={!previous}
          onClick={() => previous && goTo(previous.id)}
          aria-label={previous ? `Go up to ${previous.label}` : 'At top section'}
          title={previous ? `Previous: ${previous.label}` : 'Top'}
        >
          ↑
        </button>
        <span className="stepper-indicator">{navItems[activeIndex]?.number ?? '00'}</span>
        <button
          type="button"
          disabled={!next}
          onClick={() => next && goTo(next.id)}
          aria-label={next ? `Go down to ${next.label}` : 'At bottom section'}
          title={next ? `Next: ${next.label}` : 'Bottom'}
        >
          ↓
        </button>
      </div>

      {/* Floating Action Cluster */}
      <div className="floating-actions" ref={boxRef} aria-label="Quick contact and tools">
        {/* Floating Connect Box Popup */}
        <div
          className={`connect-box-popup ${connectBoxOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Connect with Dharani V"
        >
          <div className="connect-box-header">
            <div className="connect-box-profile">
              <div className="connect-box-avatar">DV</div>
              <div>
                <h4>Dharani V</h4>
                <p className="connect-box-status">
                  <span className="status-dot" /> Open to work & collaboration
                </p>
              </div>
            </div>
            <button
              type="button"
              className="connect-box-close"
              onClick={() => setConnectBoxOpen(false)}
              aria-label="Close Connect Box"
            >
              <CloseIcon size={14} />
            </button>
          </div>

          <div className="connect-box-body">
            {/* WhatsApp Direct */}
            <a
              className="connect-card connect-wa-card"
              href="https://wa.me/919487509696?text=Hi%20Dharani%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noreferrer"
              onClick={() => setConnectBoxOpen(false)}
            >
              <div className="connect-card-icon wa-icon-bg">
                <WhatsAppIcon size={18} />
              </div>
              <div className="connect-card-info">
                <span className="connect-card-label">WhatsApp</span>
                <span className="connect-card-detail">+91 9487509696</span>
              </div>
              <span className="connect-card-cta">CHAT <Arrow /></span>
            </a>

            {/* DharaniConnect Studio */}
            <a
              className="connect-card connect-dc-card"
              href="https://dharaniconnect.vercel.app/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setConnectBoxOpen(false)}
            >
              <div className="connect-card-icon dc-icon-bg">
                <GlobeIcon size={18} />
              </div>
              <div className="connect-card-info">
                <span className="connect-card-label">DharaniConnect</span>
                <span className="connect-card-detail">Founder & Software Studio</span>
              </div>
              <span className="connect-card-cta">VISIT <Arrow /></span>
            </a>

            {/* Email */}
            <a
              className="connect-card"
              href="mailto:dharaniv4207@gmail.com"
              onClick={() => setConnectBoxOpen(false)}
            >
              <div className="connect-card-icon">
                <MailIcon size={17} />
              </div>
              <div className="connect-card-info">
                <span className="connect-card-label">Email</span>
                <span className="connect-card-detail">dharaniv4207@gmail.com</span>
              </div>
              <span className="connect-card-cta">MAIL <Arrow /></span>
            </a>

            {/* LinkedIn */}
            <a
              className="connect-card"
              href="https://www.linkedin.com/in/dharani-v07"
              target="_blank"
              rel="noreferrer"
              onClick={() => setConnectBoxOpen(false)}
            >
              <div className="connect-card-icon">
                <LinkedinIcon size={17} />
              </div>
              <div className="connect-card-info">
                <span className="connect-card-label">LinkedIn</span>
                <span className="connect-card-detail">dharani-v07</span>
              </div>
              <span className="connect-card-cta">CONNECT <Arrow /></span>
            </a>
          </div>

          <div className="connect-box-footer">
            <button
              type="button"
              className="connect-box-jump"
              onClick={() => {
                setConnectBoxOpen(false)
                goTo('contact')
              }}
            >
              <span>GO TO CONTACT FORM</span>
              <Arrow />
            </button>
          </div>
        </div>

        {/* Floating Buttons Row */}
        <div className="floating-buttons-row">
          {/* Scroll To Top Button */}
          <button
            type="button"
            className={`floating-top ${showTop ? 'visible' : ''}`}
            onClick={() => goTo('top')}
            aria-label="Back to top"
            title="Back to top"
          >
            ↑
          </button>

          {/* Connect With Me Main Floating Button */}
          <button
            type="button"
            className={`floating-connect-btn ${connectBoxOpen ? 'is-active' : ''}`}
            onClick={() => setConnectBoxOpen(prev => !prev)}
            aria-label="Connect with me options"
            aria-expanded={connectBoxOpen}
          >
            <span className="connect-wa-dot">
              <WhatsAppIcon size={15} />
            </span>
            <span className="connect-btn-text">
              {connectBoxOpen ? 'CLOSE' : 'CONNECT WITH ME'}
            </span>
            <span className="wa-pulse-ring" />
          </button>
        </div>
      </div>
    </>
  )
}
