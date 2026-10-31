import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">Restoring your session...</main>
  return user ? <Outlet /> : <Navigate to="/login" replace />
}