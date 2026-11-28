import type { User } from '../types/user'
import { apiRequest } from './client'
import { clearTokens, setTokens } from './tokens'

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

/** Signs in and stores the tokens for later requests. */
export async function login(email: string, password: string): Promise<User> {
  const result = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  setTokens(result)
  return result.user
}

export function logout() {
  // TODO(A-02): also tell the backend to revoke the refresh token.
  clearTokens()
}
