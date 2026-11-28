import { useNavigate } from 'react-router'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { homePathForRole } from '../layouts/navigation'
import { ROLE_LABELS, ROLES, type Role } from '../types/roles'
import styles from './RoleSwitcher.module.css'

/** Development tool in the top bar: view the app as another mock role. */
export default function RoleSwitcher() {
  const { user, switchRole } = useCurrentUser()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <label className={styles.switcher}>
      <span className={styles.tag}>Dev</span>
      <span className="visually-hidden">View as role</span>
      <select
        value={user.role}
        onChange={(event) => {
          const role = event.target.value as Role
          switchRole(role)
          navigate(homePathForRole(role))
        }}
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {ROLE_LABELS[role]}
          </option>
        ))}
      </select>
    </label>
  )
}
