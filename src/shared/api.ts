export interface AppEnvInfo {
  electron: string
  chrome: string
  node: string
  platform: string
  arch: string
}

export interface AppInfo {
  name: string
  version: string
}

export interface AppApi {
  env: AppEnvInfo
  getAppInfo: () => Promise<AppInfo>
  copyText: (text: string) => Promise<boolean>
}
