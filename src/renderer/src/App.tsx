import { useEffect, useState } from 'react'
import type { JSX } from 'react'
import type { AppEnvInfo, AppInfo } from '@shared/api'
import { AppHeader } from './components/AppHeader'
import { HeroPanel } from './components/HeroPanel'
import { QuickStartCard } from './components/QuickStartCard'
import { RuntimeInfoCard } from './components/RuntimeInfoCard'
import { StatusBar } from './components/StatusBar'

const FALLBACK_ENV: AppEnvInfo = {
  electron: '-',
  chrome: '-',
  node: '-',
  platform: '-',
  arch: '-'
}

const FALLBACK_INFO: AppInfo = {
  name: '大飞鱼',
  version: '0.1.0'
}

function BackgroundDecor(): JSX.Element {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-44 -top-52 h-[520px] w-[520px] animate-drift rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute -right-36 top-4 h-[460px] w-[460px] animate-drift rounded-full bg-indigo-500/25 blur-[150px] [animation-delay:-7s]" />
      <div className="absolute -bottom-56 left-1/3 h-[420px] w-[620px] rounded-full bg-sky-600/15 blur-[150px]" />
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_18%,#070b14_76%)]" />
    </div>
  )
}

function App(): JSX.Element {
  const [env, setEnv] = useState<AppEnvInfo>(FALLBACK_ENV)
  const [appInfo, setAppInfo] = useState<AppInfo>(FALLBACK_INFO)

  useEffect(() => {
    const api = window.api

    if (!api) {
      console.error('preload 未注入 window.api，桌面能力不可用')
      return
    }

    setEnv(api.env)

    api
      .getAppInfo()
      .then((info) => setAppInfo(info))
      .catch((error: unknown) => {
        console.error('获取应用信息失败', error)
      })
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14] text-slate-200">
      <BackgroundDecor />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-8 pb-24 pt-7 sm:px-10">
        <AppHeader version={appInfo.version} />

        <main className="mt-10 flex flex-1 flex-col gap-7">
          <HeroPanel />

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <QuickStartCard />
            </div>
            <div className="lg:col-span-2">
              <RuntimeInfoCard env={env} />
            </div>
          </div>
        </main>
      </div>

      <StatusBar />
    </div>
  )
}

export default App
