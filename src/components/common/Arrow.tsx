import React from 'react'

interface ArrowProps {
  direction?: string
  className?: string
}

export const Arrow: React.FC<ArrowProps> = ({ direction = '↗', className = '' }) => {
  return (
    <span className={`arrow ${className}`} aria-hidden="true">
      {direction}
    </span>
  )
}
