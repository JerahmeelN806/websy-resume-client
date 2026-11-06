import '@fontsource/newsreader/400.css'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import FooterDeskIllustration from './FooterDeskIllustration'

const linkClass = 'flex min-h-11 items-center text-sm text-slate-400 transition hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="overflow-hidden border-t border-slate-800 bg-[#050908] text-slate-400">
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-8 md:pt-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:gap-16">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-[1.4rem] leading-[1.22] text-slate-200 [font-family:Newsreader,Georgia,serif] sm:text-2xl">
              Shape your story.<br />
              <span className="italic text-teal-300">Keep the focus on you.</span><br />
              Leave formatting behind.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 md:grid-cols-4">
            <FooterColumn title="Product">
              <a href="#templates" className={linkClass}>Templates</a>
              <Link to="/signup" className={linkClass}>Get started</Link>
              <Link to="/login" className={linkClass}>Sign in</Link>
            </FooterColumn>
            <FooterColumn title="Resources">
              <a href="#top" className={linkClass}>About</a>
              <a href="https://github.com/JerahmeelN806" target="_blank" rel="noreferrer" className={linkClass}>Source code</a>
              <a href="https://github.com/JerahmeelN806/websy-resume-client/issues" target="_blank" rel="noreferrer" className={linkClass}>Report a bug</a>
            </FooterColumn>
            <FooterColumn title="Connect">
              <a href="https://github.com/JerahmeelN806" target="_blank" rel="noreferrer" className={linkClass}>GitHub</a>
              <a href="https://portfolio-jnim.vercel.app/" target="_blank" rel="noreferrer" className={linkClass}>Portfolio</a>
              <a href="mailto:jerahmeel657@gmail.com" className={linkClass}>Email</a>
            </FooterColumn>
            <FooterColumn title="Legal">
              <Link to="/privacy" className={linkClass}>Privacy</Link>
              <Link to="/terms" className={linkClass}>Terms</Link>
            </FooterColumn>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 py-6 text-xs leading-5 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p>(c) {year} Websy Resume. Built by Jerahmeel Njoku.</p>
          <p className="font-medium tracking-wide text-slate-500">v0.0.0</p>
        </div>
      </div>
      <div className="relative h-[220px] overflow-hidden sm:h-[250px] md:h-auto">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#050908] to-transparent" />
        <FooterDeskIllustration />
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</h2><div className="mt-3">{children}</div></section>
}
