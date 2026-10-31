import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function GuestRoute() {
  const { user, loading } = useAuth()
  if (loading) return <main className="flex min-h-screen items-center justify-center bg-[#0d0d0b] text-sm text-slate-400">Restoring your session...</main>
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}