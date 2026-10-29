import { useState } from 'react'
import type { JSX } from 'react'
import { copyToClipboard } from '../lib/clipboard'

const START_COMMAND = 'npm run dev'

export function HeroPanel(): JSX.Element {
  const [copied, setCopied] = useState(false)

  const handleCopy = (): void => {
    copyToClipboard(START_COMMAND)
      .then((ok) => {
        if (!ok) return
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      })
      .catch((error: unknown) => {
        console.error('复制启动命令失败', error)
      })
  }

  return (
    <section className="animate-rise [animation-delay:60ms]">
      <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1 text-[11px] font-medium text-cyan-300">
        <span className="h-1 w-1 rounded-full bg-cyan-300" />
        Electron 45 · React 19 · TypeScript 5
      </div>

      <h1 className="mt-5 max-w-[780px] text-[40px] font-bold leading-[1.16] tracking-tight">
        <span className="text-gradient animate-shimmer">让桌面应用，从想法直接起飞</span>
      </h1>

      <p className="mt-4 max-w-[660px] text-[14px] leading-relaxed text-slate-400">
        大肥鱼是一个面向 Windows 的桌面客户端工程骨架：主进程与界面进程通过安全通道通信，开发态支持热更新，
        打包命令可直接产出带安装向导的 exe，把原型推进到「双击安装」只差一次构建。
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="group flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-6 py-3 text-[13px] font-semibold text-slate-950 shadow-[0_20px_44px_-16px_rgba(56,189,248,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_54px_-16px_rgba(56,189,248,1)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="11" height="11" rx="2.5" />
            <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6a2.5 2.5 0 0 0-2.5 2.5V13" />
          </svg>
          {copied ? '已复制启动命令' : '复制启动命令'}
        </button>

        <a
          href="#quick-start"
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-6 py-3 text-[13px] font-medium text-slate-200 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        >
          查看打包流程
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
