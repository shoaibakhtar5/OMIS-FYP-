import { MEETING_ROLES, REVIEWER_ROLES, type Role } from '../types/roles'
import type { IconName } from './icons'

export interface NavItem {
  label: string
  path: string
  icon: IconName
  /** Roles that see this item in the sidebar. */
  roles: Role[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

/*
  Sidebar menu. The server enforces access (RBAC); this list only hides links
  a role cannot use, so the menu stays relevant to each user.
  - Super Admin manages the system but cannot read meeting content.
  - HR sees aggregate participation only, never meeting content.
*/
export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: 'dashboard', roles: MEETING_ROLES },
      { label: 'Meetings', path: '/meetings', icon: 'meetings', roles: MEETING_ROLES },
      {
        label: 'Upload recording',
        path: '/meetings/upload',
        icon: 'upload',
        roles: REVIEWER_ROLES,
      },
      {
        label: 'Participation',
        path: '/participation',
        icon: 'participation',
        roles: ['hr_manager'],
      },
    ],
  },
  {
    title: 'Tasks',
    items: [
      { label: 'Task review', path: '/tasks/review', icon: 'review', roles: REVIEWER_ROLES },
      { label: 'My tasks', path: '/tasks/mine', icon: 'tasks', roles: MEETING_ROLES },
    ],
  },
  {
    title: 'Administration',
    items: [
      { label: 'Users', path: '/admin/users', icon: 'users', roles: ['super_admin'] },
      { label: 'Audit log', path: '/admin/audit-log', icon: 'audit', roles: ['super_admin'] },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        label: 'Settings',
        path: '/settings',
        icon: 'settings',
        roles: [
          'super_admin',
          'ceo',
          'project_manager',
          'employee',
          'hr_manager',
          'marketing_manager',
        ],
      },
    ],
  },
]

/** The sidebar sections for one role, with empty sections removed. */
export function navForRole(role: Role): NavSection[] {
  return NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(role)),
  })).filter((section) => section.items.length > 0)
}

/** Where a user lands after login: the first page their role can see. */
export function homePathForRole(role: Role): string {
  return navForRole(role)[0]?.items[0]?.path ?? '/settings'
}
