import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useCurrentUser } from '../hooks/useCurrentUser'
import type { Role } from '../types/roles'

interface RequireRoleProps {
  /** Roles allowed to see the page. Leave out to allow any signed-in user. */
  roles?: Role[]
  children: ReactNode
}

/**
 * Route guard.
 * - Signed out: redirect to /login (and remember the page to come back to).
 * - Wrong role: redirect to /unauthorized.
 * This only protects the UI. The server must still check every request (RBAC).
 */
export default function RequireRole({ roles, children }: RequireRoleProps) {
  const { user } = useCurrentUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
