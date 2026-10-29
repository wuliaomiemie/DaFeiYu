# 大飞鱼（DaFeiYu）

基于 **Electron 45 + React 19 + TypeScript 5 + Vite** 的 Windows 桌面应用骨架，开箱即用，支持一键打包成带安装向导的 `.exe`。

## 环境要求

| 依赖 | 版本 |
| --- | --- |
| Node.js | ≥ 20（实测 24.15.0） |
| npm | ≥ 10（实测 11.12.1） |
| 系统 | Windows 10 / 11 x64 |

## 快速开始

```bash
npm install     # 安装依赖
npm run dev     # 启动开发环境（Vite 热更新 + Electron 主进程）
```

## 打包 Windows 安装包

```bash
npm run build:win      # 产出 release/DaFeiYu-0.1.0-Setup.exe
npm run build:unpack   # 只生成免安装目录，便于快速验证
```

安装包特性：

- NSIS 安装向导，`oneClick: false`，可自行选择安装目录
- 默认按当前用户安装（`perMachine: false`），无需管理员权限
- 自动创建桌面快捷方式与开始菜单项，快捷方式名为「大飞鱼」

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发模式，渲染进程热更新 |
| `npm run build` | 仅构建三端产物到 `out/` |
| `npm run build:win` | 构建 + 打包 Windows 安装包 |
| `npm run build:unpack` | 构建 + 生成免安装目录 |
| `npm run typecheck` | 主进程与渲染进程的类型检查 |
| `npm start` | 预览已构建的产物 |

## 目录结构

```
DaFeiYu/
├─ electron.vite.config.ts   # 主进程 / preload / 渲染进程三端构建配置
├─ electron-builder.yml      # Windows NSIS 打包配置
├─ build/                    # 打包资源目录（放置 icon.ico）
└─ src/
   ├─ main/                  # 主进程：窗口、安全策略、IPC
   ├─ preload/               # 预加载脚本：contextBridge 最小能力暴露
   ├─ shared/                # 主进程与渲染进程共享的类型契约
   └─ renderer/              # React 界面
```

## 安全基线

- `contextIsolation: true` + `nodeIntegration: false` + `sandbox: true`
- 渲染进程只能通过 `window.api` 访问白名单能力，无法触达 Node 与 Electron 原生模块
- 拦截 `window.open` 与页面内导航，外部链接交由系统浏览器打开

当前暴露的能力定义在 `src/shared/api.ts`：

```ts
window.api.env                      // Electron / Chromium / Node / 平台信息
window.api.getAppInfo()             // 应用名称与版本
window.api.copyText('文本')          // 写入系统剪贴板
```

## 图标替换

在 `build/` 目录放置 256×256 的 `icon.ico`，然后在 `electron-builder.yml` 的 `win` 节点下补充：

```yaml
win:
  icon: build/icon.ico
```

未提供图标时 electron-builder 会使用 Electron 默认图标，不影响打包。

## 网络加速

首次安装或打包需要下载 Electron 运行时与 NSIS 工具链，国内网络可临时指定镜像（不要写进全局配置）：

```powershell
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
$env:ELECTRON_BUILDER_BINARIES_MIRROR = "https://npmmirror.com/mirrors/electron-builder-binaries/"
npm run build:win
```

若 `node_modules/electron/dist` 缺失（安装时跳过 postinstall），可单独补下载：

```powershell
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
node node_modules/electron/install.js
```

## 常见问题

**安装后双击无反应？** 检查是否被安全软件拦截；开发阶段可用 `npm run build:unpack` 生成免安装目录先行验证。

**打包报错 `cannot execute ... winCodeSign`？** 多为符号工具链下载失败，设置 `ELECTRON_BUILDER_BINARIES_MIRROR` 后重试，或加 `--config.win.sign=false`（本地调试无需签名）。

**想升级 Electron 版本？** 修改 `package.json` 中的 `electron` 版本后重新 `npm install`，并确认 `node_modules/electron/dist` 已重新下载。
