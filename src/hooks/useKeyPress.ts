import { useEffect } from 'react'

export function useKeyPress(keyMap: Record<string, () => void>): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = keyMap[event.key]
      if (action) {
        action()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keyMap])
}
