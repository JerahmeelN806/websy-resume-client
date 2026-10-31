import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiRequest, AUTH_EXPIRED_EVENT, clearStoredToken, getStoredToken, storeToken } from '../lib/api'
import type { User } from '../types/resume'
import { AuthContext } from './auth'

type AuthResponse = { token: string; user: User }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [loading, setLoading] = useState(() => Boolean(getStoredToken()))

  useEffect(() => {
    const clearSession = () => {
      clearStoredToken()
      setToken(null)
      setUser(null)
    }

    window.addEventListener(AUTH_EXPIRED_EVENT, clearSession)
    const savedToken = getStoredToken()

    if (!savedToken) {
      return () => window.removeEventListener(AUTH_EXPIRED_EVENT, clearSession)
    }

    let active = true
    apiRequest<{ user: User }>('/api/auth/me')
      .then(({ user: restoredUser }) => {
        if (active) setUser(restoredUser)
      })
      .catch(() => {
        clearStoredToken()
        if (active) {
          setToken(null)
          setUser(null)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      window.removeEventListener(AUTH_EXPIRED_EVENT, clearSession)
    }
  }, [])

  const saveAuth = (response: AuthResponse) => {
    storeToken(response.token)
    setToken(response.token)
    setUser(response.user)
  }

  const login = async (email: string, password: string) => {
    const response = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    saveAuth(response)
  }

  const signup = async (name: string, username: string, email: string, password: string) => {
    const response = await apiRequest<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
    })
    saveAuth(response)
  }

  const logout = () => {
    clearStoredToken()
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}
