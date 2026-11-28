import { handleMockRequest } from '../mocks/handlers'
import { API_BASE_URL, USE_MOCKS } from './config'
import { ApiError } from './errors'
import { clearTokens, getAccessToken, refreshAccessToken } from './tokens'

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export interface RequestOptions {
  method?: HttpMethod
  body?: unknown
}

export interface ApiClientConfig {
  useMocks: boolean
  baseUrl: string
  /** Swappable for tests. */
  fetchFn?: typeof fetch
}

/**
 * Creates the function every API module uses to talk to the backend.
 * - Mock mode: answers from src/mocks without any network call.
 * - Real mode: fetch with JSON and the access token. On 401 it tries one
 *   token refresh, then retries once; if that fails the tokens are cleared.
 */
export function createApiClient({ useMocks, baseUrl, fetchFn = fetch }: ApiClientConfig) {
  async function send(path: string, { method = 'GET', body }: RequestOptions): Promise<Response> {
    const headers: Record<string, string> = { Accept: 'application/json' }
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    const token = getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`

    return fetchFn(`${baseUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  }

  return async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    if (useMocks) {
      return handleMockRequest(options.method ?? 'GET', path, options.body, getAccessToken()) as T
    }

    let response = await send(path, options)

    if (response.status === 401 && (await refreshAccessToken())) {
      response = await send(path, options)
    }

    if (response.status === 401) {
      clearTokens()
    }

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      const message = (data && (data.detail ?? data.message)) || response.statusText
      throw new ApiError(response.status, String(message))
    }

    if (response.status === 204) return undefined as T
    return (await response.json()) as T
  }
}

/** The client used by the app, configured from the env variables. */
export const apiRequest = createApiClient({ useMocks: USE_MOCKS, baseUrl: API_BASE_URL })
