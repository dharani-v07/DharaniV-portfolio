import React from 'react'
import { NavItem, ProfileInfo } from '../../types'

interface HeaderProps {
  profile: ProfileInfo
  navItems: NavItem[]
  activeSection: string
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  navItems,
  activeSection,
  menuOpen,
  onToggleMenu,
  onCloseMenu
}) => {
  const currentIndex = navItems.findIndex(item => item.id === activeSection)
  const currentNumber = currentIndex >= 0 ? navItems[currentIndex].number : '00'
  const totalSections = String(navItems.length).padStart(2, '0')

  return (
    <header className="header">
      <a className="brand" href="#top" onClick={onCloseMenu} aria-label={`${profile.name} Home`}>
        <span className="brand-box">{profile.initials}</span>
        <span className="brand-name">
          DHARANI <b>V.</b>
        </span>
      </a>

      <div className="header-right">
        <div className="header-quick-links">
          <a
            href="https://dharaniconnect.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="header-quick-link header-dc-link"
            title="Founder of DharaniConnect"
          >
            <span>DHARANI CONNECT</span>
          </a>
          <a href="#work" className="header-quick-link" onClick={onCloseMenu}>
            <span>WORK</span>
          </a>
          <a href="#contact" className="header-quick-link" onClick={onCloseMenu}>
            <span>CONTACT</span>
          </a>
        </div>
        <span className="header-index">
          {currentNumber} / {totalSections}
        </span>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={menuOpen}
        >
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <i />
          <i />
        </button>
      </div>
    </header>

  )
}
