import type { JSX } from 'react'

interface AppHeaderProps {
  version: string
}

export function AppHeader({ version }: AppHeaderProps): JSX.Element {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3.5">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_14px_34px_-10px_rgba(34,211,238,0.75)]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-slate-950"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <ellipse cx="10.4" cy="12" rx="7.1" ry="5.4" />
            <path d="M17.1 12 22 8.4v7.2L17.1 12Z" />
            <path d="M9.4 6.7c.9-1.6 1.7-1.9 2.4-1.6" />
            <circle cx="6.9" cy="10.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-[17px] font-semibold tracking-wide text-slate-100">大肥鱼</span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.26em] text-slate-500">
            DaFeiYu Desktop
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-slate-300">
          v{version}
        </span>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-emerald-400" />
          <span className="text-[11px] font-medium text-emerald-300">运行中</span>
        </div>
      </div>
    </header>
  )
}
