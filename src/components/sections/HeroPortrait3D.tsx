import React from 'react'

export const HeroPortrait3D: React.FC = () => (
  <div className="hero-portrait-3d-wrapper hero-portrait-showcase">
    <div className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
    <div className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
    <div className="portrait-3d-card">
      <div className="portrait-grid-lines" aria-hidden="true" />
      <div className="portrait-top-badge">
        <span className="portrait-live-dot" />
        <span>AVAILABLE FOR SELECT PROJECTS</span>
      </div>
      <div className="portrait-image-container">
        <img
          src="/assets/dharani-portrait.png"
          alt="Dharani V - Software Developer and Researcher"
          className="portrait-img-main"
        />
      </div>
      <div className="portrait-3d-info">
        <span className="portrait-index">DV / 01</span>
        <strong>BUILDING USEFUL THINGS</strong>
        <span className="portrait-location">COIMBATORE · INDIA</span>
      </div>
      <div className="portrait-depth-block" aria-hidden="true" />
    </div>
    <span className="portrait-floating-label">FULL STACK / RESEARCH / PRODUCT</span>
  </div>
)
