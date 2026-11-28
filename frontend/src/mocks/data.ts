import type { Meeting } from '../types/meeting'
import type { Task } from '../types/task'
import { MOCK_ORG_ID } from './users'

/** A second organization, used to check that data from other orgs never shows up. */
export const OTHER_ORG_ID = 'org-other'

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'm-1',
    organizationId: MOCK_ORG_ID,
    title: 'Sprint planning',
    source: 'live',
    status: 'completed',
    scheduledAt: '2026-11-24T10:00:00+05:00',
    hostId: 'u-pm',
    participantIds: ['u-pm', 'u-emp', 'u-ceo'],
  },
  {
    id: 'm-2',
    organizationId: MOCK_ORG_ID,
    title: 'Client call recording',
    source: 'upload',
    status: 'awaiting_speaker_mapping',
    scheduledAt: '2026-11-26T15:30:00+05:00',
    hostId: 'u-ceo',
    participantIds: ['u-ceo', 'u-mkt'],
  },
  {
    id: 'm-3',
    organizationId: MOCK_ORG_ID,
    title: 'Marketing campaign review',
    source: 'live',
    status: 'scheduled',
    scheduledAt: '2026-12-02T11:00:00+05:00',
    hostId: 'u-ceo',
    participantIds: ['u-ceo', 'u-mkt', 'u-emp'],
  },
  {
    id: 'm-x',
    organizationId: OTHER_ORG_ID,
    title: 'Other company board meeting',
    source: 'live',
    status: 'completed',
    scheduledAt: '2026-11-20T09:00:00+05:00',
    hostId: 'u-other',
    participantIds: ['u-other'],
  },
]

export const MOCK_TASKS: Task[] = [
  {
    id: 't-1',
    meetingId: 'm-1',
    organizationId: MOCK_ORG_ID,
    title: 'Prepare API draft for meeting endpoints',
    status: 'suggested',
    assigneeId: 'u-emp',
    suggestedOwnerName: 'Hamza',
    dueDate: '2026-12-05',
  },
  {
    id: 't-2',
    meetingId: 'm-1',
    organizationId: MOCK_ORG_ID,
    title: 'Update sprint board',
    status: 'approved',
    assigneeId: 'u-pm',
    suggestedOwnerName: 'Bilal',
    dueDate: '2026-11-30',
  },
  {
    id: 't-3',
    meetingId: 'm-1',
    organizationId: MOCK_ORG_ID,
    title: 'Share design mockups with the team',
    status: 'in_progress',
    assigneeId: 'u-emp',
    suggestedOwnerName: 'Hamza',
    dueDate: '2026-12-01',
  },
  {
    id: 't-4',
    meetingId: 'm-2',
    organizationId: MOCK_ORG_ID,
    title: 'Send revised proposal to client',
    status: 'suggested',
    assigneeId: null,
    suggestedOwnerName: 'Usman',
    dueDate: null,
  },
  {
    id: 't-x',
    meetingId: 'm-x',
    organizationId: OTHER_ORG_ID,
    title: 'Task from another organization',
    status: 'approved',
    assigneeId: 'u-other',
    suggestedOwnerName: null,
    dueDate: null,
  },
]
