/**
 * 通过 preload 暴露的桌面桥接写入系统剪贴板。
 * 渲染进程运行在 file:// 或 sandbox 环境，直接使用 navigator.clipboard 并不可靠。
 */
export function copyToClipboard(text: string): Promise<boolean> {
  const api = window.api

  if (!api) {
    console.error('桌面桥接未就绪，无法复制文本')
    return Promise.resolve(false)
  }

  return api.copyText(text)
}
