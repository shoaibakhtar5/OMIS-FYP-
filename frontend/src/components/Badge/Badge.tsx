import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'primary'

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

/** Small colored label for statuses, e.g. task or meeting status. */
export default function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>
}
