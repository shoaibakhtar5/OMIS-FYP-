// Types for the environment variables read through import.meta.env.
// Values come from the .env file in the repo root (see .env.example).
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  /** "true" (default) uses mock data; "false" calls the real backend. */
  readonly VITE_USE_MOCKS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
