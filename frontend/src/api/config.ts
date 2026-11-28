/** Backend base URL, e.g. http://localhost:8000/api. */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

/**
 * Mock mode is on unless VITE_USE_MOCKS is exactly "false".
 * That way the app works out of the box before the backend exists.
 */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'
