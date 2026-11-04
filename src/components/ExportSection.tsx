import { useState } from 'react'

const formats = [
  { ext: '.pdf', label: 'PDF' },
  { ext: '.docx', label: 'Word' },
  { ext: '.md', label: 'Markdown' },
  { ext: '.json', label: 'JSON' },
]

export default function ExportSection() {
  const [selected, setSelected] = useState('PDF')

  return (
    <div className="max-w-6xl mx-auto border-t border-slate-800 px-4 py-12 sm:px-8 sm:py-20">
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <h2 className="text-4xl font-bold leading-tight">
          Take it<br />with you.
        </h2>
        <p className="text-slate-400 self-end">
          A PDF for the application. A Word file for a few more edits. Download a sample using your choices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="relative flex h-72 justify-center sm:h-80">
          <div className="absolute h-full w-52 sm:w-60 bg-slate-800 rounded-lg -rotate-3" />
          <div className="relative h-full w-52 sm:w-60 bg-teal-100 rounded-lg shadow-2xl text-gray-900 p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-6">Websy Resume</p>
              <h3 className="text-xl font-bold">Alex Morgan</h3>
              <p className="text-sm text-gray-600 mb-6">Frontend Developer</p>
              <div className="space-y-1">
                <div className="h-1.5 bg-gray-400 rounded w-full" /> 
                <div className="h-1.5 bg-gray-400 rounded w-4/5" />
                <div className="h-1.5 bg-gray-400 rounded w-3/5" />
              </div>
            </div>
            <p className="text-4xl font-bold">.{selected.toLowerCase() === 'pdf' ? 'pdf' : selected.toLowerCase()}</p>
          </div>
        </div>

        <div>
          <div className="border border-slate-800 rounded-xl overflow-hidden mb-6">
            {formats.map((f) => (
              <button
                key={f.label}
                onClick={() => setSelected(f.label)}
                className={`w-full flex items-center justify-between px-5 py-4 border-b border-slate-800 last:border-b-0 transition ${
                  selected === f.label ? 'bg-slate-900' : 'hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs border border-slate-600 rounded px-2 py-1 text-slate-400">
                    {f.ext}
                  </span>
                  <span className="font-medium">{f.label}</span>
                </div>
                <span
                  className={`w-4 h-4 rounded-full border-2 ${
                    selected === f.label ? 'bg-teal-500 border-teal-500' : 'border-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-slate-500 text-sm mb-6">Keep your layout intact. Ready to send, upload, or print.</p>
          <button className="w-full bg-teal-100 text-gray-900 font-semibold px-6 py-4 rounded-lg flex items-center justify-between hover:bg-teal-50 transition">
            Download sample {selected} ↓
          </button>
        </div>
      </div>
    </div>
  )
} 
