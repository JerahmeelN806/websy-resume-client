import { useState } from 'react'

const templates = ['Modern', 'Classic', 'Minimal']

const previewContent: Record<string, { accent: string; name: string; role: string }> = {
  Modern: { accent: '#14b8a6', name: 'Jerahmeel Njoku', role: 'Frontend Developer' },
  Classic: { accent: '#0f172a', name: 'Jerahmeel Njoku', role: 'Frontend Developer' },
  Minimal: { accent: '#6b7280', name: 'Jerahmeel Njoku', role: 'Frontend Developer' },
}

export default function TemplateShowcase() {
  const [index, setIndex] = useState(0)
  const active = templates[index]
  const preview = previewContent[active]

  const next = () => setIndex((i) => (i + 1) % templates.length)
  const prev = () => setIndex((i) => (i - 1 + templates.length) % templates.length)

  return (
    <div className="max-w-6xl mx-auto border-t border-slate-800 px-4 py-12 sm:px-8 sm:py-20">
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <h2 className="text-4xl font-bold leading-tight">
          Same story.<br />A different look.
        </h2>
        <p className="text-slate-400 self-end">
          A few clean templates, all free. Change the color and layout right in the editor.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div
          className="h-[22rem] w-64 max-w-full bg-white rounded-lg shadow-2xl text-gray-900 overflow-hidden sm:h-96 sm:w-72"
          key={active}
        >
          <div className="p-4" style={{ backgroundColor: preview.accent + '22' }}>
            <h3 className="text-xl font-bold">{preview.name}</h3>
            <p className="text-sm font-medium" style={{ color: preview.accent }}>
              {preview.role}
            </p>
          </div>
          <div className="p-4 text-sm text-gray-700">
            <p className="font-semibold mb-1" style={{ color: preview.accent }}>
              Experience
            </p>
            <p>Frontend Developer — Freelance</p>
            <p className="text-gray-500 text-xs mb-3">2023 — Present</p>
            <p className="font-semibold mb-1" style={{ color: preview.accent }}>
              Skills
            </p>
            <p>React, TypeScript, Tailwind</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-teal-500 transition"
        >
          ←
        </button>
        <div className="text-center">
          <p className="font-semibold text-lg">{active}</p>
          <p className="text-slate-500 text-sm">
            {index + 1} / {templates.length}
          </p>
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-teal-500 transition"
        >
          →
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {templates.map((t, i) => (
          <button
            key={t}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              i === index ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
