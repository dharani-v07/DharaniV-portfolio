import React from 'react'
import { ProfileInfo } from '../../types'

interface FooterProps {
  profile: ProfileInfo
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer>
      <span>
        © {new Date().getFullYear()} {profile.name.toUpperCase()}.
      </span>
      <span>REACT + TYPESCRIPT / EDITORIAL PORTFOLIO</span>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  )
}
