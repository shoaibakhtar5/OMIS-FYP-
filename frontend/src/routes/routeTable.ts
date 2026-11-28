import { MEETING_ROLES, REVIEWER_ROLES, ROLES, type Role } from '../types/roles'

export interface AppRoute {
  path: string
  title: string
  /** What the screen will do. Shown on the placeholder page for now. */
  description: string
  /** Roles allowed to open the page. */
  roles: Role[]
  /** Work package that builds the real screen. */
  workPackage: string
}

/*
  Every signed-in screen from the wireframes, with who may open it.
  Each one renders a placeholder page until its work package builds it.
*/
export const APP_ROUTES: AppRoute[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    description: 'Role-based overview: upcoming meetings, pending reviews and open tasks.',
    roles: MEETING_ROLES,
    workPackage: 'A-04',
  },
  {
    path: '/meetings',
    title: 'Meetings',
    description: 'List of scheduled, live and processed meetings with their status.',
    roles: MEETING_ROLES,
    workPackage: 'A-03',
  },
  {
    path: '/meetings/new',
    title: 'Schedule meeting',
    description: 'Form to schedule a live meeting and invite participants.',
    roles: REVIEWER_ROLES,
    workPackage: 'A-03',
  },
  {
    path: '/meetings/upload',
    title: 'Upload recording',
    description: 'Upload a recorded meeting file for transcription and diarization.',
    roles: REVIEWER_ROLES,
    workPackage: 'A-03',
  },
  {
    path: '/meetings/:meetingId',
    title: 'Meeting record',
    description: 'Transcript, summary, decisions, risks and action items of one meeting.',
    roles: MEETING_ROLES,
    workPackage: 'A-04',
  },
  {
    path: '/meetings/:meetingId/speakers',
    title: 'Speaker mapping',
    description: 'Match anonymous speaker labels to real users. Uploaded recordings only.',
    roles: REVIEWER_ROLES,
    workPackage: 'A-04',
  },
  {
    path: '/meetings/:meetingId/join',
    title: 'Device check',
    description: 'Check microphone and speakers before joining a live meeting.',
    roles: MEETING_ROLES,
    workPackage: 'A-03',
  },
  {
    path: '/meetings/:meetingId/live',
    title: 'Live meeting',
    description: 'Participant list, mute state, active speaker and recording indicator.',
    roles: MEETING_ROLES,
    workPackage: 'A-05',
  },
  {
    path: '/tasks/review',
    title: 'Task review',
    description: 'Approve, reject or reassign AI-suggested tasks from meetings.',
    roles: REVIEWER_ROLES,
    workPackage: 'A-04',
  },
  {
    path: '/tasks/mine',
    title: 'My tasks',
    description: 'Tasks assigned to you, with status updates.',
    roles: MEETING_ROLES,
    workPackage: 'A-04',
  },
  {
    path: '/participation',
    title: 'Participation',
    description: 'Aggregate meeting participation for HR. No meeting content is shown.',
    roles: ['hr_manager'],
    workPackage: 'A-04',
  },
  {
    path: '/admin/users',
    title: 'Users',
    description: 'Create users, assign roles and deactivate accounts.',
    roles: ['super_admin'],
    workPackage: 'A-02',
  },
  {
    path: '/admin/audit-log',
    title: 'Audit log',
    description: 'Record of sign-ins, role changes and other system actions.',
    roles: ['super_admin'],
    workPackage: 'A-02',
  },
  {
    path: '/settings',
    title: 'Settings',
    description: 'Profile, password and notification preferences.',
    roles: [...ROLES],
    workPackage: 'A-02',
  },
]
