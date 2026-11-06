import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy'
  const title = isPrivacy ? 'Privacy' : 'Terms of use'
  const content = isPrivacy
    ? ['Websy Resume stores the account and resume information you provide so the app can create and save your resumes.', 'This portfolio project does not sell personal information. Hosting providers may process limited technical information needed to run the app.', 'Contact the project owner if you need help with information associated with your account.']
    : ['Websy Resume is a portfolio project provided for demonstration and personal resume-building use.', 'You are responsible for the information you add and for reviewing every exported resume before using it. The service may change or be unavailable while the project is being developed.', 'Do not use the service in a way that harms others or attempts to access accounts or data that are not yours.']

  return <main className="min-h-dvh bg-black px-4 py-6 text-slate-200 sm:px-8"><div className="mx-auto max-w-2xl"><Link to="/" aria-label="Return to Websy Resume"><Logo /></Link><p className="mt-14 rounded-md border border-teal-900/70 bg-teal-950/30 px-4 py-3 text-sm text-teal-100">Draft for a portfolio project. This page is not legal advice.</p><h1 className="mt-8 text-4xl font-bold text-white">{title}</h1><div className="mt-6 space-y-5 leading-7 text-slate-400">{content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link to="/" className="mt-10 inline-flex min-h-11 items-center text-sm text-teal-300 hover:text-teal-200">Return home</Link></div></main>
}
