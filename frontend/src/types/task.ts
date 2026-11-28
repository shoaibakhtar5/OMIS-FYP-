export type TaskStatus = 'suggested' | 'approved' | 'rejected' | 'in_progress' | 'completed'

export interface Task {
  id: string
  meetingId: string
  organizationId: string
  title: string
  status: TaskStatus
  /** Resolved owner. Null until a real user is matched (the LLM never sets this). */
  assigneeId: string | null
  /** Name the LLM extracted from the transcript, before matching to a user. */
  suggestedOwnerName: string | null
  dueDate: string | null
}

/*
  Allowed status changes (human-in-the-loop workflow):
  Suggested -> Approved / Rejected
  Approved -> In Progress / Completed
  In Progress -> Completed
  Completed -> In Progress (reopen)
  Rejected is final.
*/
export const TASK_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  suggested: ['approved', 'rejected'],
  approved: ['in_progress', 'completed'],
  in_progress: ['completed'],
  completed: ['in_progress'],
  rejected: [],
}

export function canTransition(from: TaskStatus, to: TaskStatus): boolean {
  return TASK_TRANSITIONS[from].includes(to)
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  suggested: 'Suggested',
  approved: 'Approved',
  rejected: 'Rejected',
  in_progress: 'In progress',
  completed: 'Completed',
}
