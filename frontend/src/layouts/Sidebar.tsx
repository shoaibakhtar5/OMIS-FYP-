import { NavLink } from 'react-router'
import type { Role } from '../types/roles'
import styles from './AppLayout.module.css'
import { Icon } from './icons'
import { navForRole } from './navigation'

interface SidebarProps {
  role: Role
  open: boolean
  onNavigate: () => void
}

export default function Sidebar({ role, open, onNavigate }: SidebarProps) {
  const sections = navForRole(role)

  return (
    <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          O
        </span>
        <span className={styles.brandText}>
          <strong>OMIS</strong>
          <small>Meeting Intelligence</small>
        </span>
      </div>

      <nav aria-label="Main" className={styles.nav}>
        {sections.map((section) => (
          <div key={section.title} className={styles.navSection}>
            <p className={styles.navTitle}>{section.title}</p>
            <ul>
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                  >
                    <Icon name={item.icon} />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
