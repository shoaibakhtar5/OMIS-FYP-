import type { Task, TaskStatus } from '../types/task'
import { apiRequest } from './client'

export interface TaskFilters {
  status?: TaskStatus
  assigneeId?: string
}

/** Tasks in the signed-in user's organization, optionally filtered. */
export function listTasks(filters: TaskFilters = {}) {
  const params = new URLSearchParams()
  if (filters.status) params.set('status', filters.status)
  if (filters.assigneeId) params.set('assigneeId', filters.assigneeId)
  const query = params.toString()
  return apiRequest<Task[]>(`/tasks${query ? `?${query}` : ''}`)
}

/** Moves a task to a new status. The server rejects transitions that are not allowed. */
export function updateTaskStatus(id: string, status: TaskStatus) {
  return apiRequest<Task>(`/tasks/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { status },
  })
}
