import React from 'react'

interface SectionHeaderProps {
  number: string
  label: string
  miniLabel?: string
  title: string
  highlightedTitle?: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  miniLabel,
  title,
  highlightedTitle,
  description,
  className = '',
  children
}) => {
  return (
    <div className={`section-header-wrapper ${className}`}>
      <div className="section-label">
        <span>{number}</span>
        <span>{label}</span>
      </div>
      <div className="section-heading">
        <div>
          {miniLabel && <p className="mini-label">{miniLabel}</p>}
          <h2>
            {title} {highlightedTitle && <span>{highlightedTitle}</span>}
          </h2>
        </div>
        {description && <p>{description}</p>}
        {children}
      </div>
    </div>
  )
}
