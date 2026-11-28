import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockSettings, resetMockData } from '../mocks/handlers'
import { login, logout } from './auth'
import { createApiClient } from './client'
import { ApiError } from './errors'
import { getMeeting, listMeetings } from './meetings'
import { listTasks, updateTaskStatus } from './tasks'
import { getAccessToken, setTokens } from './tokens'

beforeEach(() => {
  mockSettings.delayMs = 0
  resetMockData()
  logout()
})

describe('mock API: auth', () => {
  it('signs in a mock user and stores the access token', async () => {
    const user = await login('ceo@omis.test', 'any-password')
    expect(user.role).toBe('ceo')
    expect(getAccessToken()).toBe('mock-access-u-ceo')
  })

  it('rejects an unknown email', async () => {
    await expect(login('nobody@omis.test', 'x')).rejects.toMatchObject({ status: 401 })
  })

  it('rejects requests without a token', async () => {
    await expect(listMeetings()).rejects.toMatchObject({ status: 401 })
  })
})

describe('mock API: meetings', () => {
  it('only returns meetings from the user organization', async () => {
    await login('employee@omis.test', 'x')
    const meetings = await listMeetings()
    expect(meetings.length).toBeGreaterThan(0)
    expect(meetings.every((m) => m.organizationId === 'org-demo')).toBe(true)
    await expect(getMeeting('m-x')).rejects.toMatchObject({ status: 404 })
  })

  it.each(['hr@omis.test', 'admin@omis.test'])('blocks meeting content for %s', async (email) => {
    await login(email, 'x')
    await expect(listMeetings()).rejects.toMatchObject({ status: 403 })
  })
})

describe('mock API: tasks', () => {
  it('filters tasks by status', async () => {
    await login('pm@omis.test', 'x')
    const suggested = await listTasks({ status: 'suggested' })
    expect(suggested.map((t) => t.id)).toEqual(['t-1', 't-4'])
  })

  it('lets a reviewer approve a suggested task', async () => {
    await login('ceo@omis.test', 'x')
    const task = await updateTaskStatus('t-1', 'approved')
    expect(task.status).toBe('approved')
  })

  it('does not let an employee approve a suggested task', async () => {
    await login('employee@omis.test', 'x')
    await expect(updateTaskStatus('t-1', 'approved')).rejects.toMatchObject({ status: 403 })
  })

  it('lets the owner move their own task forward', async () => {
    await login('employee@omis.test', 'x')
    const task = await updateTaskStatus('t-3', 'completed')
    expect(task.status).toBe('completed')
  })

  it('rejects a transition that is not allowed', async () => {
    await login('ceo@omis.test', 'x')
    await expect(updateTaskStatus('t-1', 'completed')).rejects.toMatchObject({ status: 400 })
  })
})

describe('real API client', () => {
  afterEach(() => {
    logout()
  })

  it('calls the backend with JSON and the bearer token', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify([{ id: 'm-1' }]), { status: 200 }))
    const request = createApiClient({ useMocks: false, baseUrl: 'http://api.test', fetchFn })
    setTokens({ accessToken: 'abc', refreshToken: 'def' })

    const result = await request('/meetings')

    expect(result).toEqual([{ id: 'm-1' }])
    const [url, init] = fetchFn.mock.calls[0]
    expect(url).toBe('http://api.test/meetings')
    expect(init.headers.Authorization).toBe('Bearer abc')
  })

  it('throws ApiError with the server message and clears tokens on 401', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ detail: 'Token expired' }), { status: 401 }))
    const request = createApiClient({ useMocks: false, baseUrl: 'http://api.test', fetchFn })
    setTokens({ accessToken: 'old', refreshToken: 'def' })

    const error = await request('/meetings').catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 401, message: 'Token expired' })
    expect(getAccessToken()).toBeNull()
  })
})
