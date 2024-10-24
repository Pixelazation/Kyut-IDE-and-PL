/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getSaveFile: () => Promise<string>
      readFile: (file: string) => string
      saveFile: (file: string, content: string) => boolean
      selectFile: () => Promise<string>
    }
  }
}
