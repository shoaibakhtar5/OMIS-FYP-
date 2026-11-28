import { createContext } from 'react'
import type { Role } from '../types/roles'
import type { User } from '../types/user'

export interface CurrentUserContextValue {
  /** The signed-in user, or null when signed out. */
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
  /** Development only: switch the mock user to another role. */
  switchRole: (role: Role) => void
}

export const CurrentUserContext = createContext<CurrentUserContextValue | null>(null)
