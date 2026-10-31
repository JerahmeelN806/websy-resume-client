import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatsSection from '../components/StatsSection'
import TemplateShowcase from '../components/TemplateShowcase'
import ExportSection from '../components/ExportSection'
import Logo from '../components/Logo'
import Footer from '../components/Footer'

const templates = ['Ditgar', 'Azurill', 'Bronzor']
const colors = ['#14b8a6', '#22c55e', '#f97316'] // teal, green, orange

export default function Landing() {
  const [name, setName] = useState('Alex Morgan')
  const [activeTemplate, setActiveTemplate] = useState('Ditgar')
  const [activeColor, setActiveColor] = useState(colors[0])
  const [font, setFont] = useState<'sans' | 'serif'>('sans')

  return (
    <div className="min-h-dvh overflow-x-hidden bg-black text-white">
      <nav className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-6">
        <Logo />
        <Link to="/signup" className="shrink-0 rounded-full bg-teal-500 px-3 py-2 text-xs font-bold text-black transition hover:bg-teal-400 sm:px-5 sm:py-2.5 sm:text-sm">
          <span className="sm:hidden">Build</span><span className="hidden sm:inline">Build your resume</span>
        </Link>
      </nav>

      <div className="grid items-center gap-10 px-4 pb-12 pt-6 sm:px-8 md:grid-cols-2 md:gap-12 md:pt-8 md:pb-16 max-w-6xl mx-auto">
        <div>
          <h1 className="mb-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-7xl">
            Make yourself<br />look good<br />on paper.
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-md">
            A free resume builder. Put your experience on the page, without fighting the formatting.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link
              to="/signup"
              className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-slate-200 transition flex items-center gap-2"
            >
              Get Started →
            </Link>
            <a href="#templates" className="text-slate-300 hover:text-white">
              Explore templates ↓
            </a>
          </div>
          <p className="text-sm text-slate-500">
            Free forever and open. <br /> No ads, paywalls, or tracking.
          </p>
        </div>

        <div className="relative mx-auto flex h-[min(24rem,110vw)] w-full max-w-72 justify-center">
          <div className="absolute h-full w-3/4 bg-slate-100 rounded-lg shadow-2xl rotate-6" />
          <div
            className={`relative h-full w-3/4 bg-white rounded-lg shadow-2xl text-gray-900 overflow-hidden -rotate-2 ${
              font === 'serif' ? 'font-serif' : 'font-sans'
            }`}
          >
            <div className="p-4" style={{ backgroundColor: activeColor + '22' }}>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm font-medium" style={{ color: activeColor }}>
                Product Designer
              </p>
            </div>
            <div className="p-4 text-sm">
              <h3 className="font-semibold mb-1" style={{ color: activeColor }}>
                Experience
              </h3>
              <p className="font-medium">Senior Designer, Northstar Studio</p>
              <p className="text-gray-500 text-xs mb-3">2022 — Now</p>
              <h3 className="font-semibold mb-1" style={{ color: activeColor }}>
                Education
              </h3>
              <p className="font-medium">Graphic Design</p>
              <p className="text-gray-500 text-xs">2015 — 2019</p>
            </div>
          </div>
        </div>
      </div>

      <div id="templates" className="max-w-6xl mx-auto px-4 pb-16 sm:px-8 sm:pb-24">
        <div className="flex flex-wrap gap-3 mb-6">
          {templates.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTemplate(t)}
              className={`border rounded-lg px-6 py-3 transition ${
                activeTemplate === t
                  ? 'border-teal-500 bg-slate-900'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl p-4 sm:p-6 flex flex-wrap gap-6 sm:gap-8">
          <div className="min-w-0 flex-1 basis-full sm:basis-[200px]">
            <label className="text-sm text-slate-400 mb-2 block">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Color</label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(c)}
                  className={`w-9 h-9 rounded-full border-2 ${
                    activeColor === c ? 'border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Typeface</label>
            <div className="flex bg-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setFont('sans')}
                className={`px-4 py-2 ${font === 'sans' ? 'bg-slate-700' : ''}`}
              >
                Sans
              </button>
              <button
                onClick={() => setFont('serif')}
                className={`px-4 py-2 ${font === 'serif' ? 'bg-slate-700' : ''}`}
              >
                Serif
              </button>
            </div>
          </div>
        </div>
      </div>

      <TemplateShowcase />
      <ExportSection />
      <StatsSection />
      <Footer />
    </div>
  )
}
