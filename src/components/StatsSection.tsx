const stats = [
  { label: 'Templates', value: '3' },
  { label: 'Export formats', value: 'PDF' },
  { label: 'Cost', value: 'Free' },
]

export default function StatsSection() {
  return (
    <div data-reveal className="max-w-6xl mx-auto border-t border-slate-800 px-4 py-12 sm:px-8 sm:py-20">
      <h2 data-reveal-child className="text-3xl font-bold mb-10">Built to be simple.</h2>
      <div className="grid gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div data-reveal-child key={stat.label}>
            <p className="text-slate-500 text-sm mb-2">{stat.label}</p>
            <p className="text-5xl md:text-6xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <p data-reveal-child className="text-sm text-slate-600 mt-10">No ads, paywalls, or tracking.</p>
    </div>
  )
}
