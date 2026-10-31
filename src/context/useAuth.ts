import { useContext } from 'react'
import { AuthContext } from './auth'
import type { AuthContextValue } from './auth'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an AuthProvider.')
  return context
}