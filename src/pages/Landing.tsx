import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import StatsSection from '../components/StatsSection'
import TemplateShowcase from '../components/TemplateShowcase'
import ExportSection from '../components/ExportSection'
import Logo from '../components/Logo'
import Footer from '../components/Footer'
import { gsap } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const templates = ['Ditgar', 'Azurill', 'Bronzor']
const colors = ['#14b8a6', '#22c55e', '#f97316']

export default function Landing() {
  const [name, setName] = useState('Alex Morgan')
  const [activeTemplate, setActiveTemplate] = useState('Ditgar')
  const [activeColor, setActiveColor] = useState(colors[0])
  const [font, setFont] = useState<'sans' | 'serif'>('sans')
  const reducedMotion = usePrefersReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const previewText = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (reducedMotion) return
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const distance = mobile ? 16 : 26
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .set('.hero-line, .hero-copy, .hero-actions, .hero-note', { autoAlpha: 0, y: distance })
      .set('.paper-card', { autoAlpha: 0, rotation: 0, x: 0, y: 8 })
      .to('.hero-line', { autoAlpha: 1, y: 0, duration: .42, stagger: .1 })
      .to('.hero-copy, .hero-actions, .hero-note', { autoAlpha: 1, y: 0, duration: .28, stagger: .08 }, '-=.18')
      .to('.paper-card', { autoAlpha: 1, x: (_, el) => Number(el.dataset.x || 0), y: 0, rotation: (_, el) => Number(el.dataset.rotation || 0), duration: .42, stagger: .07 }, '-=.42')
    gsap.to(preview.current, { y: -3, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((section) => {
      gsap.fromTo(section.querySelectorAll('[data-reveal-child]'), { autoAlpha: 0, y: mobile ? 16 : 24 }, { autoAlpha: 1, y: 0, duration: .55, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 85%', once: true } })
    })
  }, { scope: root, dependencies: [reducedMotion] })

  useEffect(() => {
    if (!reducedMotion && preview.current) {
      gsap.to(preview.current.querySelectorAll('[data-accent="color"]'), { color: activeColor, duration: .25, overwrite: 'auto' })
      gsap.to(preview.current.querySelectorAll('[data-accent="background"]'), { backgroundColor: `${activeColor}22`, duration: .25, overwrite: 'auto' })
    }
  }, [activeColor, reducedMotion])
  useEffect(() => {
    if (!reducedMotion && previewText.current) gsap.fromTo(previewText.current, { autoAlpha: .25 }, { autoAlpha: 1, duration: .22, ease: 'power2.out', overwrite: 'auto' })
  }, [font, reducedMotion])
  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || !preview.current) return
    const box = preview.current.getBoundingClientRect()
    gsap.to(preview.current, { rotateY: ((event.clientX - box.left) / box.width - .5) * 12, rotateX: -((event.clientY - box.top) / box.height - .5) * 12, transformPerspective: 900, duration: .35, ease: 'power2.out', overwrite: 'auto' })
  }
  const resetTilt = () => gsap.to(preview.current, { rotateX: 0, rotateY: 0, duration: .55, ease: 'power3.out', overwrite: 'auto' })
  return <div id="top" ref={root} className="min-h-dvh overflow-x-hidden bg-black text-white">
    <nav className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-6"><Logo /><Link to="/signup" className="landing-nav-cta shrink-0 rounded-full bg-teal-500 px-3 py-2 text-xs font-bold text-black sm:px-5 sm:py-2.5 sm:text-sm"><span className="sm:hidden">Build</span><span className="hidden sm:inline">Build your resume</span></Link></nav>
    <div className="grid items-center gap-10 px-4 pb-12 pt-6 sm:px-8 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-8 max-w-6xl mx-auto"><div><h1 className="mb-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-7xl"><span className="hero-line block">Make yourself</span><span className="hero-line block">look good</span><span className="hero-line block">on paper.</span></h1><p className="hero-copy text-slate-400 text-lg mb-8 max-w-md">A free resume builder. Put your experience on the page, without fighting the formatting.</p><div className="hero-actions flex flex-wrap items-center gap-4 mb-6"><Link to="/signup" className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">Get Started →</Link><a href="#templates" className="text-slate-300 hover:text-white">Explore templates ↓</a></div><p className="hero-note text-sm text-slate-500">Free forever and open. <br /> No ads, paywalls, or tracking.</p></div><div className="relative mx-auto flex h-[min(24rem,110vw)] w-full max-w-72 justify-center [perspective:900px]"><div className="paper-card absolute h-full w-3/4 rounded-lg bg-slate-200 shadow-2xl" data-x="-12" data-rotation="-7" /><div className="paper-card absolute h-full w-3/4 rounded-lg bg-slate-100 shadow-2xl" data-x="12" data-rotation="6" /><div ref={preview} onPointerMove={tilt} onPointerLeave={resetTilt} className={`paper-card relative h-full w-3/4 overflow-hidden rounded-lg bg-white text-gray-900 shadow-2xl -rotate-2 ${font === 'serif' ? 'font-serif' : 'font-sans'}`}><div ref={previewText}><div className="p-4" data-accent="background" style={{ backgroundColor: activeColor + '22' }}><h2 className="text-xl font-bold">{name}</h2><p className="text-sm font-medium" data-accent="color" style={{ color: activeColor }}>Product Designer</p></div><div className="p-4 text-sm"><h3 className="font-semibold mb-1" data-accent="color" style={{ color: activeColor }}>Experience</h3><p className="font-medium">Senior Designer, Northstar Studio</p><p className="text-gray-500 text-xs mb-3">2022 — Now</p><h3 className="font-semibold mb-1" data-accent="color" style={{ color: activeColor }}>Education</h3><p className="font-medium">Graphic Design</p><p className="text-gray-500 text-xs">2015 — 2019</p></div></div></div></div></div>
    <div id="templates" className="max-w-6xl mx-auto px-4 pb-16 sm:px-8 sm:pb-24"><div className="flex flex-wrap gap-3 mb-6">{templates.map(t => <button key={t} onClick={() => setActiveTemplate(t)} className={`border rounded-lg px-6 py-3 transition ${activeTemplate === t ? 'border-teal-500 bg-slate-900' : 'border-slate-700 hover:border-slate-500'}`}>{t}</button>)}</div><div className="bg-slate-900 rounded-xl p-4 sm:p-6 flex flex-wrap gap-6 sm:gap-8"><div className="min-w-0 flex-1 basis-full sm:basis-[200px]"><label className="text-sm text-slate-400 mb-2 block">Your name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500" /></div><div><label className="text-sm text-slate-400 mb-2 block">Color</label><div className="flex gap-2">{colors.map(c => <button key={c} onClick={() => setActiveColor(c)} aria-label={`Use ${c} accent`} className={`w-9 h-9 rounded-full border-2 ${activeColor === c ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />)}</div></div><div><label className="text-sm text-slate-400 mb-2 block">Typeface</label><div className="flex bg-slate-800 rounded-lg overflow-hidden"><button onClick={() => setFont('sans')} className={`px-4 py-2 ${font === 'sans' ? 'bg-slate-700' : ''}`}>Sans</button><button onClick={() => setFont('serif')} className={`px-4 py-2 ${font === 'serif' ? 'bg-slate-700' : ''}`}>Serif</button></div></div></div></div>
    <TemplateShowcase reducedMotion={reducedMotion} /><ExportSection reducedMotion={reducedMotion} /><StatsSection /><Footer reducedMotion={reducedMotion} />
  </div>
}
