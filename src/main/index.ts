import { app, BrowserWindow, shell } from 'electron'
import { join } from 'node:path'
import { APP_DISPLAY_NAME, registerIpcHandlers } from './ipc'

const RENDERER_DEV_URL = process.env['ELECTRON_RENDERER_URL']

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    title: APP_DISPLAY_NAME,
    autoHideMenuBar: true,
    backgroundColor: '#070b14',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 开发态把渲染进程的错误转发到主进程日志，便于定位白屏等问题
  if (!app.isPackaged) {
    mainWindow.webContents.on('console-message', (details) => {
      if (details.level === 'error') {
        console.error(`[renderer] ${details.message}`)
      }
    })
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (RENDERER_DEV_URL && url.startsWith(RENDERER_DEV_URL)) {
      return
    }

    event.preventDefault()
    console.error(`已拦截页面内跳转：${url}`)
  })

  if (!app.isPackaged && RENDERER_DEV_URL) {
    void mainWindow.loadURL(RENDERER_DEV_URL)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
    return
  }

  void mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  })

  app
    .whenReady()
    .then(() => {
      registerIpcHandlers()
      createWindow()

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    })
    .catch((error: unknown) => {
      console.error('应用启动失败', error)
    })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
