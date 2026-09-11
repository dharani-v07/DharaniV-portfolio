import { useCallback, useState } from 'react'

export interface ToastState {
  message: string
  visible: boolean
}

export function useToast(duration = 2500) {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false })

  const showToast = useCallback(
    (message: string) => {
      setToast({ message, visible: true })
      setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }))
      }, duration)
    },
    [duration]
  )

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }))
  }, [])

  return { toast, showToast, hideToast }
}
