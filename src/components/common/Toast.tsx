import React from 'react'
import { CheckIcon } from './Icons'

interface ToastProps {
  message: string
  visible: boolean
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  if (!visible) return null

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <CheckIcon size={14} className="toast-icon" />
      <span>{message}</span>
    </div>
  )
}
