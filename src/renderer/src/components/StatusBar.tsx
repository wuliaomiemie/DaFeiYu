import type { JSX } from 'react'

export function StatusBar(): JSX.Element {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-white/[0.06] bg-[#070b14]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-8 py-3 sm:px-10">
        <div className="flex items-center gap-2 text-[12px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          就绪 · 桌面桥接已连接
        </div>
        <p className="truncate text-[12px] text-slate-500">
          执行 <code className="font-mono text-slate-400">npm run build:win</code>{' '}
          即可在 release 目录生成 Windows 安装包
        </p>
      </div>
    </footer>
  )
}
