import { contextBridge, ipcRenderer } from 'electron'
import type { AppApi, AppInfo } from '../shared/api'

const versions = process.versions

const api: AppApi = {
  env: {
    electron: versions.electron ?? '未知',
    chrome: versions.chrome ?? '未知',
    node: versions.node ?? '未知',
    platform: process.platform,
    arch: process.arch
  },
  getAppInfo: () => ipcRenderer.invoke('app:get-info') as Promise<AppInfo>,
  copyText: (text: string) => ipcRenderer.invoke('app:copy-text', text) as Promise<boolean>
}

contextBridge.exposeInMainWorld('api', api)
