import { useState } from 'react'
import type { JSX } from 'react'
import { copyToClipboard } from '../lib/clipboard'

interface CommandItem {
  command: string
  title: string
  description: string
}

const COMMANDS: CommandItem[] = [
  {
    command: 'npm run dev',
    title: '启动开发环境',
    description: 'Vite 热更新 + Electron 主进程同时启动，改动界面即刻生效。'
  },
  {
    command: 'npm run build:win',
    title: '打包 Windows 安装包',
    description: '产物落在 release 目录，NSIS 向导支持自选安装路径并创建桌面快捷方式。'
  }
]

export function QuickStartCard(): JSX.Element {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const handleCopy = (command: string): void => {
    copyToClipboard(command)
      .then((ok) => {
        if (!ok) return
        setCopiedCommand(command)
        window.setTimeout(() => setCopiedCommand(null), 1800)
      })
      .catch((error: unknown) => {
        console.error('复制命令失败', error)
      })
  }

  return (
    <section id="quick-start" className="animate-rise scroll-mt-24 [animation-delay:110ms]">
      <div className="glass-card h-full p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-100">快速上手</h2>
            <p className="mt-1 text-[12px] text-slate-500">两条命令覆盖开发与发布</p>
          </div>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-slate-400">
            terminal
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {COMMANDS.map((item) => {
            const copied = copiedCommand === item.command

            return (
              <div
                key={item.command}
                className="group rounded-xl border border-white/[0.07] bg-[#0a1020]/70 p-4 transition duration-300 hover:border-cyan-300/25 hover:bg-[#0c1526]/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-slate-200">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.command)}
                    aria-label={`复制命令 ${item.command}`}
                    className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                      copied
                        ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300'
                        : 'border-white/10 bg-white/[0.05] text-slate-400 hover:border-cyan-300/40 hover:text-cyan-200'
                    }`}
                  >
                    {copied ? '已复制' : '复制'}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2">
                  <span className="select-none font-mono text-[11px] text-cyan-400/70">$</span>
                  <code className="whitespace-nowrap font-mono text-[12px] text-slate-300">
                    {item.command}
                  </code>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
