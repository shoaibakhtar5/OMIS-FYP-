import type { Role } from '../types/roles'
import type { User } from '../types/user'

/** Demo organization used by all mock data. */
export const MOCK_ORG_ID = 'org-demo'

/** One mock user per role, so every screen can be tried with every role. */
export const MOCK_USERS: Record<Role, User> = {
  super_admin: {
    id: 'u-admin',
    name: 'Sana Malik',
    email: 'admin@omis.test',
    role: 'super_admin',
    organizationId: MOCK_ORG_ID,
  },
  ceo: {
    id: 'u-ceo',
    name: 'Ayesha Khan',
    email: 'ceo@omis.test',
    role: 'ceo',
    organizationId: MOCK_ORG_ID,
  },
  project_manager: {
    id: 'u-pm',
    name: 'Bilal Ahmed',
    email: 'pm@omis.test',
    role: 'project_manager',
    organizationId: MOCK_ORG_ID,
  },
  employee: {
    id: 'u-emp',
    name: 'Hamza Raza',
    email: 'employee@omis.test',
    role: 'employee',
    organizationId: MOCK_ORG_ID,
  },
  hr_manager: {
    id: 'u-hr',
    name: 'Fatima Noor',
    email: 'hr@omis.test',
    role: 'hr_manager',
    organizationId: MOCK_ORG_ID,
  },
  marketing_manager: {
    id: 'u-mkt',
    name: 'Usman Tariq',
    email: 'marketing@omis.test',
    role: 'marketing_manager',
    organizationId: MOCK_ORG_ID,
  },
}
