/*
  Token handling (stub).
  Plan from the design: access token lives 30 minutes, refresh token 7 days.
  For now both are kept in memory only, so a page refresh signs the user out.
  Where the refresh token is stored (e.g. an httpOnly cookie set by the backend)
  will be agreed with Member B in the OpenAPI file before A-02 is finished.
*/

let accessToken: string | null = null
let refreshToken: string | null = null

export function getAccessToken() {
  return accessToken
}

export function setTokens(tokens: { accessToken: string; refreshToken: string }) {
  accessToken = tokens.accessToken
  refreshToken = tokens.refreshToken
}

export function clearTokens() {
  accessToken = null
  refreshToken = null
}

/**
 * Ask the backend for a new access token.
 * Stub: returns false until the refresh endpoint exists, which makes the
 * client treat the user as signed out.
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (!refreshToken) return false
  // TODO(A-02): call POST /auth/refresh once it is in backend/openapi.yaml.
  return false
}
