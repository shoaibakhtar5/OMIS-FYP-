import { createContext } from 'react'

export type ToastTone = 'info' | 'success' | 'warning' | 'danger'

export interface ToastMessage {
  id: number
  tone: ToastTone
  text: string
}

export interface ToastContextValue {
  showToast: (text: string, tone?: ToastTone) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
