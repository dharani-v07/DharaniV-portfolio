import React from 'react'
import { NavItem, ProfileInfo } from '../../types'
import { Arrow } from '../common'

interface MobileMenuProps {
  navItems: NavItem[]
  activeSection: string
  menuOpen: boolean
  profile: ProfileInfo
  onCloseMenu: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  activeSection,
  menuOpen,
  profile,
  onCloseMenu
}) => {
  return (
    <div className={`menu-panel ${menuOpen ? 'show' : ''}`} aria-hidden={!menuOpen}>
      <div className="menu-panel-inner">
        <div className="menu-kicker">NAVIGATION / {new Date().getFullYear()}</div>
        <nav>
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onCloseMenu}
              className={activeSection === item.id ? 'active' : ''}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
              <Arrow />
            </a>
          ))}
        </nav>
        <div className="menu-footer">
          <span>{profile.eyebrow}</span>
          <a href={`mailto:${profile.email}`}>{profile.email.toUpperCase()}</a>
        </div>
      </div>
    </div>
  )
}
