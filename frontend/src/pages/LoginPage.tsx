import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'
import Select from '../components/Select/Select'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { homePathForRole } from '../layouts/navigation'
import { MOCK_USERS } from '../mocks/users'
import { ROLE_LABELS, ROLES, type Role } from '../types/roles'
import styles from './pages.module.css'

const roleOptions = ROLES.map((role) => ({ value: role, label: ROLE_LABELS[role] }))

/**
 * Placeholder login: pick a role and continue as that mock user.
 * The real email/password form is built in A-02.
 */
export default function LoginPage() {
  const { signIn } = useCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState<Role>('ceo')

  const from = (location.state as { from?: string } | null)?.from

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    signIn(MOCK_USERS[role])
    navigate(from ?? homePathForRole(role), { replace: true })
  }

  return (
    <div className={styles.centered}>
      <Card className={styles.authCard}>
        <div className={styles.authBrand}>
          <h1>Sign in to OMIS</h1>
          <p>Development mode: choose a role to continue.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Select
            label="Role"
            options={roleOptions}
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          />
          <Button type="submit">Continue as {MOCK_USERS[role].name}</Button>
          <p className={styles.note}>
            No account? <Link to="/register">Register your organization</Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
