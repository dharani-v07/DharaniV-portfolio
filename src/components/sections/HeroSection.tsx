import React from 'react'
import { ProfileInfo } from '../../types'
import { Arrow } from '../common'

interface HeroSectionProps {
  profile: ProfileInfo
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  return (
    <section className="hero" id="top">
      <div className="hero-topline">
        <span>BASED IN {profile.location}</span>
        <span>{profile.availability}</span>
      </div>

      <div className="hero-grid">
        <div className="hero-side-note">
          <span className="vertical">PORTFOLIO / {new Date().getFullYear()}</span>
          <span className="side-arrow">↓</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <b /> {profile.eyebrow}
          </p>
          <h1>
            Building
            <br />
            <em>useful</em> digital
            <br />
            experiences.
          </h1>
          <div className="hero-intro">
            <p>
              I'm Dharani V — a BCA student, developer and published researcher who turns ideas into
              practical web, mobile and computer-vision products.
            </p>
            <a className="founder-chip" href="#founder">FOUNDER · DHARANI CONNECT TECHNOLOGIES</a>
            <a className="line-link" href="#work">
              EXPLORE SELECTED WORK <Arrow />
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-image">
            <img src="/assets/dharani-portrait.png" alt="Dharani V portrait" />
          </div>
          <div className="art-block red" />
          <div className="art-block dark" />
          <div className="art-caption">
            D / V
            <br />
            <small>CODE + RESEARCH</small>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <span>00 — 13</span>
      </div>
    </section>
  )
}
