import type { Role } from './roles'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  /** Every user belongs to one organization; all data is filtered by it. */
  organizationId: string
}
