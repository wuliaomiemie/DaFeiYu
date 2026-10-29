import type { JSX } from 'react'
import type { AppEnvInfo } from '@shared/api'

interface RuntimeInfoCardProps {
  env: AppEnvInfo
}

export function RuntimeInfoCard({ env }: RuntimeInfoCardProps): JSX.Element {
  const items = [
    { label: 'Electron', value: env.electron, hint: '桌面运行时' },
    { label: 'Chromium', value: env.chrome, hint: '渲染引擎' },
    { label: 'Node.js', value: env.node, hint: '主进程环境' },
    { label: '平台 / 架构', value: `${env.platform} · ${env.arch}`, hint: '目标平台' }
  ]

  return (
    <section className="animate-rise [animation-delay:160ms]">
      <div className="glass-card h-full p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-100">运行环境</h2>
            <p className="mt-1 text-[12px] text-slate-500">由 preload 桥接同步注入，无需额外请求</p>
          </div>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-slate-400">
            process.versions
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.06]"
            >
              <p className="text-[11px] font-medium tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-1.5 truncate font-mono text-[13px] font-medium text-cyan-200/90">
                {item.value}
              </p>
              <p className="mt-1 text-[10px] text-slate-600 transition group-hover:text-slate-500">
                {item.hint}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-indigo-400/15 bg-indigo-500/[0.07] px-3.5 py-2.5">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 shrink-0 text-indigo-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z" />
          </svg>
          <p className="text-[11px] leading-relaxed text-indigo-200/80">
            上下文隔离已开启，渲染层无法直接访问 Node 能力
          </p>
        </div>
      </div>
    </section>
  )
}
