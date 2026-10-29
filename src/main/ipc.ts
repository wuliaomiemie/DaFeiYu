import { app, clipboard, ipcMain } from 'electron'
import type { AppInfo } from '../shared/api'

export const APP_DISPLAY_NAME = '大肥鱼'

/** 注册主进程 IPC 处理器，渲染进程只通过 preload 暴露的通道访问这些能力 */
export function registerIpcHandlers(): void {
  ipcMain.handle('app:get-info', (): AppInfo => {
    return {
      name: APP_DISPLAY_NAME,
      version: app.getVersion()
    }
  })

  ipcMain.handle('app:copy-text', (_event, text: unknown): boolean => {
    if (typeof text !== 'string' || text.length === 0) {
      console.error('app:copy-text 收到非法的文本内容')
      return false
    }

    clipboard.writeText(text)
    return true
  })
}
