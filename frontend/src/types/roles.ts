/** The six OMIS roles. Values match what the backend will send. */
export const ROLES = [
  'super_admin',
  'ceo',
  'project_manager',
  'employee',
  'hr_manager',
  'marketing_manager',
] as const

export type Role = (typeof ROLES)[number]

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  ceo: 'CEO',
  project_manager: 'Project Manager',
  employee: 'Employee',
  hr_manager: 'HR Manager',
  marketing_manager: 'Marketing Manager',
}

/** Roles that take part in meetings and can read meeting content. */
export const MEETING_ROLES: Role[] = ['ceo', 'project_manager', 'employee', 'marketing_manager']

/** Roles that can review AI-suggested tasks (meeting organizers and the CEO). */
export const REVIEWER_ROLES: Role[] = ['ceo', 'project_manager']

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value)
}
