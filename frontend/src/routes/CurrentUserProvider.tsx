import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { MOCK_USERS } from '../mocks/users'
import { isRole, type Role } from '../types/roles'
import type { User } from '../types/user'
import { CurrentUserContext } from './currentUserContext'

const STORAGE_KEY = 'omis-mock-role'

/*
  Mock current user until the backend auth endpoints exist (A-02 with B).
  Only the role is kept in sessionStorage so a page refresh keeps you signed in
  as the same mock user. Real tokens are handled in src/api/tokens.ts.
*/
function readSavedUser(): User | null {
  try {
    const role = sessionStorage.getItem(STORAGE_KEY)
    return isRole(role) ? MOCK_USERS[role] : null
  } catch {
    return null
  }
}

function saveRole(role: Role | null) {
  try {
    if (role) sessionStorage.setItem(STORAGE_KEY, role)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked: the user simply has to sign in again after a refresh.
  }
}

interface CurrentUserProviderProps {
  children: ReactNode
  /** Start signed in as this user (used by tests). */
  initialUser?: User | null
}

export default function CurrentUserProvider({ children, initialUser }: CurrentUserProviderProps) {
  const [user, setUser] = useState<User | null>(() =>
    initialUser !== undefined ? initialUser : readSavedUser(),
  )

  const signIn = useCallback((next: User) => {
    setUser(next)
    saveRole(next.role)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    saveRole(null)
  }, [])

  const switchRole = useCallback((role: Role) => {
    setUser(MOCK_USERS[role])
    saveRole(role)
  }, [])

  const value = useMemo(
    () => ({ user, signIn, signOut, switchRole }),
    [user, signIn, signOut, switchRole],
  )

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
