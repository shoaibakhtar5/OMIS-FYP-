import type { ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'
import { ROLE_LABELS, type Role } from '../types/roles'
import styles from './AppLayout.module.css'
import { Icon } from './icons'

interface TopBarProps {
  userName: string
  role: Role
  onMenuClick: () => void
  onLogout?: () => void
  /** Extra controls shown before the user chip (e.g. the dev role switcher). */
  extra?: ReactNode
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TopBar({ userName, role, onMenuClick, onLogout, extra }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={`${styles.iconButton} ${styles.menuButton}`}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Icon name="menu" />
      </button>

      <div className={styles.topbarSpacer} />

      {extra}

      <button
        type="button"
        className={styles.iconButton}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
      </button>

      <div className={styles.userChip}>
        <span className={styles.avatar} aria-hidden="true">
          {initials(userName)}
        </span>
        <span className={styles.userText}>
          <strong>{userName}</strong>
          <small>{ROLE_LABELS[role]}</small>
        </span>
      </div>

      {onLogout && (
        <button type="button" className={styles.iconButton} onClick={onLogout} aria-label="Log out">
          <Icon name="logout" />
        </button>
      )}
    </header>
  )
}
