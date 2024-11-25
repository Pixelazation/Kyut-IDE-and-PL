/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      confirmUnsaved: () => Promise<number>
      getSaveFile: () => Promise<string | null>
      readFile: (file: string) => string
      saveFile: (file: string, content: string) => boolean
      selectFile: () => Promise<string | null>
      onConfirmClose: (callback: () => void) => Electron.IpcRenderer
      confirmClose: () => void
      refreshCloseListener: () => Electron.IpcRenderer
      compile: (filePath: string) => Promise<null>
      run: (filePath: string) => Promise<null>
    }
  }
}
