import React from 'react'
import { Ambient3DScene } from '../common'

export const AmbientBackground: React.FC = () => {
  return (
    <>
      <Ambient3DScene />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient-grid-overlay" aria-hidden="true" />
    </>
  )
}

