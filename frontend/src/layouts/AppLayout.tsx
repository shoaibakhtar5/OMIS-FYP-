import { useState, type ReactNode } from 'react'
import { Outlet } from 'react-router'
import type { Role } from '../types/roles'
import styles from './AppLayout.module.css'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface AppLayoutProps {
  userName: string
  role: Role
  onLogout?: () => void
  topBarExtra?: ReactNode
}

/**
 * Frame for every signed-in page: sidebar on the left, top bar above,
 * and the current page (<Outlet />) in the main area.
 * On small screens the sidebar slides in from the menu button.
 */
export default function AppLayout({ userName, role, onLogout, topBarExtra }: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <Sidebar role={role} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}

      <div className={styles.main}>
        <TopBar
          userName={userName}
          role={role}
          onMenuClick={() => setMenuOpen(true)}
          onLogout={onLogout}
          extra={topBarExtra}
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
