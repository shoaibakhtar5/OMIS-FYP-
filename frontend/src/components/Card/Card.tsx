import type { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  title?: string
  /** Optional controls shown on the right of the title, e.g. a button. */
  actions?: ReactNode
  children: ReactNode
  className?: string
}

/** White panel used to group content on a page. */
export default function Card({ title, actions, children, className }: CardProps) {
  return (
    <section className={[styles.card, className].filter(Boolean).join(' ')}>
      {(title || actions) && (
        <header className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  )
}
