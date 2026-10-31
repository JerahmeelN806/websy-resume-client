const configuredApiUrl = import.meta.env.VITE_API_URL
const API_BASE_URL = configuredApiUrl?.replace(/\/$/, '')
export const TOKEN_STORAGE_KEY = 'websy_resume_token'
export const AUTH_EXPIRED_EVENT = 'websy:auth-expired'

let memoryToken: string | null = null

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return memoryToken
  try {
    memoryToken = window.localStorage.getItem(TOKEN_STORAGE_KEY)
  } catch {
    // Keep the in-memory token when browser storage is unavailable.
  }
  return memoryToken
}

export function storeToken(token: string): void {
  memoryToken = token
  try {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch {
    // The in-memory token still supports requests for this page session.
  }
}

export function clearStoredToken(): void {
  memoryToken = null
  try {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch {
    // Clearing the in-memory token is sufficient when storage is unavailable.
  }
}

function apiErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload !== 'object' || payload === null || !('error' in payload)) return fallback
  const apiError = payload.error
  if (typeof apiError !== 'object' || apiError === null || !('message' in apiError)) return fallback
  return typeof apiError.message === 'string' ? apiError.message : fallback
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_URL is required. Configure the API URL before using the application.')
  }
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (options.body !== undefined) headers.set('Content-Type', 'application/json')

  const token = getStoredToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  let payload: unknown

  if (response.status !== 204) {
    try {
      payload = await response.json()
    } catch {
      payload = undefined
    }
  }

  if (response.status === 401) {
    clearStoredToken()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT))
      if (window.location.pathname !== '/login') window.location.assign('/login')
    }
  }

  if (!response.ok) {
    throw new Error(apiErrorMessage(payload, response.statusText || 'The request failed.'))
  }

  return payload as T
}
