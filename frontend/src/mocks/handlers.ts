import { ApiError } from '../api/errors'
import { MEETING_ROLES, REVIEWER_ROLES } from '../types/roles'
import { canTransition, type Task, type TaskStatus } from '../types/task'
import type { User } from '../types/user'
import { MOCK_MEETINGS, MOCK_TASKS } from './data'
import { MOCK_USERS } from './users'

/*
  Fake backend used when VITE_USE_MOCKS is not "false".
  It copies the rules the real server must enforce, so screens behave
  realistically: tokens, organization filtering, role checks and task
  transitions. Data lives in memory and resets on page reload.
*/

/** Artificial delay so loading states are visible. Tests set it to 0. */
export const mockSettings = { delayMs: 300 }

const tasks: Task[] = structuredClone(MOCK_TASKS)

/** Restores the mock data (used by tests). */
export function resetMockData() {
  tasks.splice(0, tasks.length, ...structuredClone(MOCK_TASKS))
}

function userFromToken(token: string | null): User {
  const id = token?.startsWith('mock-access-') ? token.slice('mock-access-'.length) : null
  const user = Object.values(MOCK_USERS).find((candidate) => candidate.id === id)
  if (!user) throw new ApiError(401, 'Not signed in')
  return user
}

/** Super Admin and HR never receive meeting content. */
function requireMeetingAccess(user: User) {
  if (!MEETING_ROLES.includes(user.role)) {
    throw new ApiError(403, 'Your role cannot read meeting content')
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function handleMockRequest(
  method: string,
  fullPath: string,
  body: unknown,
  token: string | null,
): Promise<unknown> {
  if (mockSettings.delayMs > 0) await wait(mockSettings.delayMs)

  const [path, queryString = ''] = fullPath.split('?')
  const query = new URLSearchParams(queryString)
  const segments = path.split('/').filter(Boolean)

  // POST /auth/login: any password works for the mock users (e.g. ceo@omis.test).
  if (method === 'POST' && path === '/auth/login') {
    const { email, password } = (body ?? {}) as { email?: string; password?: string }
    const user = Object.values(MOCK_USERS).find((candidate) => candidate.email === email)
    if (!user || !password) throw new ApiError(401, 'Wrong email or password')
    return {
      user,
      accessToken: `mock-access-${user.id}`,
      refreshToken: `mock-refresh-${user.id}`,
    }
  }

  const user = userFromToken(token)

  // GET /meetings and GET /meetings/:id
  if (segments[0] === 'meetings' && method === 'GET') {
    requireMeetingAccess(user)
    const visible = MOCK_MEETINGS.filter((m) => m.organizationId === user.organizationId)
    if (segments.length === 1) return visible
    const meeting = visible.find((m) => m.id === segments[1])
    if (!meeting) throw new ApiError(404, 'Meeting not found')
    return meeting
  }

  // GET /tasks?status=&assigneeId=
  if (path === '/tasks' && method === 'GET') {
    requireMeetingAccess(user)
    const status = query.get('status')
    const assigneeId = query.get('assigneeId')
    return tasks.filter(
      (task) =>
        task.organizationId === user.organizationId &&
        (!status || task.status === status) &&
        (!assigneeId || task.assigneeId === assigneeId),
    )
  }

  // PATCH /tasks/:id  { status }
  if (segments[0] === 'tasks' && segments.length === 2 && method === 'PATCH') {
    const task = tasks.find((t) => t.id === segments[1] && t.organizationId === user.organizationId)
    if (!task) throw new ApiError(404, 'Task not found')

    const next = (body as { status?: TaskStatus } | undefined)?.status
    if (!next || !canTransition(task.status, next)) {
      throw new ApiError(400, `Cannot move a task from ${task.status} to ${next}`)
    }

    // Approving or rejecting a suggested task is a review step: reviewers only.
    // Later status changes: the task owner or a reviewer.
    const isReviewer = REVIEWER_ROLES.includes(user.role)
    const isOwner = task.assigneeId === user.id
    const allowed = task.status === 'suggested' ? isReviewer : isReviewer || isOwner
    if (!allowed) {
      throw new ApiError(403, 'You cannot change this task')
    }

    task.status = next
    return task
  }

  throw new ApiError(404, `No mock for ${method} ${path}`)
}
