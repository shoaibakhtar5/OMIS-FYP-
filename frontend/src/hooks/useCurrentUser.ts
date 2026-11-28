import { useContext } from 'react'
import { CurrentUserContext } from '../routes/currentUserContext'

/** The signed-in user and sign-in/out actions. Must be used inside <CurrentUserProvider>. */
export function useCurrentUser() {
  const context = useContext(CurrentUserContext)
  if (!context) {
    throw new Error('useCurrentUser must be used inside <CurrentUserProvider>')
  }
  return context
}
