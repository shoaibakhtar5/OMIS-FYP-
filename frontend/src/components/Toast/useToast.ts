import { useContext } from 'react'
import { ToastContext } from './toastContext'

/** Returns showToast(text, tone). Must be used inside <ToastProvider>. */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside <ToastProvider>')
  }
  return context
}
