import React from 'react'

interface ProgressBarProps {
  progress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      className="progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
