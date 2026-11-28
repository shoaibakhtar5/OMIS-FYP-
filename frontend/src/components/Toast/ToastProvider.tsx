import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import styles from './Toast.module.css'
import { ToastContext, type ToastMessage, type ToastTone } from './toastContext'

/** How long a toast stays on screen, in milliseconds. */
export const TOAST_DURATION_MS = 4000

/**
 * Wrap the app in this once. Any component can then call useToast().showToast(...)
 * to show a short message in the bottom-right corner.
 */
export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (text: string, tone: ToastTone = 'info') => {
      const id = nextId.current++
      setToasts((current) => [...current, { id, tone, text }])
      setTimeout(() => dismiss(id), TOAST_DURATION_MS)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.stack} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.tone]}`}>
            <span className={styles.text}>{toast.text}</span>
            <button
              type="button"
              className={styles.close}
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
