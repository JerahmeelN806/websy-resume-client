import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const fieldClassName = 'mt-2 w-full rounded-xl border border-stone-700 bg-[#211f1c] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="flex min-h-dvh items-center justify-center bg-[#0d0d0b] px-4 py-8 text-white sm:px-6 sm:py-10"><div className="w-full max-w-[33rem]">
    <Link to="/" className="mb-8 flex justify-center text-base font-bold tracking-tight"><span className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-teal-400 text-xs text-slate-950">W</span>Websy Resume</Link>
    <section aria-labelledby="login-heading"><h1 id="login-heading" className="text-center font-serif text-3xl tracking-tight">Sign in to your account</h1>
      <p className="mt-3 text-center text-slate-400">New to Websy Resume? <Link to="/signup" className="font-medium text-teal-300 hover:text-teal-200 hover:underline">Create an account →</Link></p>
      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        <div><label htmlFor="email" className="text-sm font-medium text-slate-200">Email Address</label><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className={fieldClassName} /></div>
        <div><div className="flex items-center justify-between gap-4"><label htmlFor="password" className="text-sm font-medium text-slate-200">Password</label><Link to="/forgot-password" className="text-sm font-medium text-teal-300 hover:text-teal-200 hover:underline">Forgot Password?</Link></div><div className="relative"><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required className={`${fieldClassName} pr-16`} /><button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm text-slate-400 hover:text-white">{showPassword ? 'Hide' : 'Show'}</button></div></div>
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-xl bg-teal-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-[#0d0d0b] disabled:cursor-wait disabled:opacity-60">{submitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <div className="my-10 flex items-center gap-4" aria-hidden="true"><div className="h-px flex-1 bg-slate-800" /><span className="text-sm text-slate-500">or continue with</span><div className="h-px flex-1 bg-slate-800" /></div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 3.2-4.4 3.2-7.3Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.5L15.4 17c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.8A6 6 0 0 1 6.1 12c0-.6.1-1.2.3-1.8V7.6H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.4l3.3-2.6Z"/><path fill="#EA4335" d="M12 6.1c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17 3 14.7 2 12 2a10 10 0 0 0-8.9 5.6l3.3 2.6C7.2 7.8 9.4 6.1 12 6.1Z"/></svg>Google</button>
        <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 rounded-sm fill-[#0A66C2]"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.7A1.7 1.7 0 1 1 6.5 4a1.7 1.7 0 0 1 0 3.7ZM19 19h-3v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4h.1A3.2 3.2 0 0 1 15.3 9c3 0 3.7 2 3.7 4.6V19Z"/></svg>LinkedIn</button>
      </div>
    </section>
  </div></main>
}
