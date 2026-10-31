import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-slate-800 bg-black px-4 pt-12 text-slate-400 sm:px-8 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div
          className="grid gap-x-12 gap-y-10 pb-16"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          <div>
            <h2 className="text-lg font-bold text-white">Websy Resume</h2>
            <p className="mt-3 max-w-xs text-sm leading-6">
              Beautiful resumes, without the formatting fight.
            </p>
            <p className="mt-6 text-sm">MIT Licensed</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/signup" className="hover:text-teal-400">Build a resume</Link></li>
              <li><Link to="/login" className="hover:text-teal-400">Sign in</Link></li>
              <li><a href="#templates" className="hover:text-teal-400">Templates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">About</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-teal-400">GitHub</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-teal-400">Open source</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-teal-400">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="mailto:hello@websyresume.com" target="_blank" rel="noreferrer" className="hover:text-teal-400">Email us</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-teal-400">Portfolio</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-teal-400">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-12">
          <p className="break-words text-[clamp(2.75rem,15vw,9rem)] font-bold leading-[0.8] tracking-tighter text-white">Websy</p>
          <p className="mt-[0.08em] break-words text-[clamp(2.75rem,15vw,9rem)] font-bold leading-[0.8] tracking-tighter text-teal-400">Resume</p>
        </div>
      </div>
    </footer>
  )
}
