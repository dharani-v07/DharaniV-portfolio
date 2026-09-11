import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'outline' | 'filled' | 'red'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'outline',
  className = ''
}) => {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>
}
