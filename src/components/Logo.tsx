interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-md bg-teal-500 flex items-center justify-center">
        <span className="text-black font-extrabold text-lg leading-none">W</span>
      </div>
      <span className="text-xl font-bold tracking-tight">Websy</span>
    </div>
  )
}