import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { readFileSync, writeFileSync } from 'fs'

// Custom APIs for renderer
const api = {
  confirmUnsaved: (): Promise<number> => ipcRenderer.invoke('dialog:confirmUnsaved'),
  getSaveFile: (): Promise<string | null> => ipcRenderer.invoke('dialog:getSaveFile'),
  readFile: (file: string): string => readFileSync(file).toString(),
  saveFile: (file: string, content: string): boolean => {
    try {
      writeFileSync(file, content)
      return true
    } catch (err) {
      console.log(err)
    }

    return false
  },
  selectFile: (): Promise<string | null> => ipcRenderer.invoke('dialog:openFile'),
  showError: (err: string): Promise<void> => ipcRenderer.invoke('dialog:showError', err),

  onConfirmClose: (callback: () => void): Electron.IpcRenderer =>
    ipcRenderer.on('confirm-close', () => callback()),
  confirmClose: (): void => ipcRenderer.send('close-confirmed'),
  refreshCloseListener: (): Electron.IpcRenderer => ipcRenderer.removeAllListeners('confirm-close'),

  compile: (filePath: string): Promise<null> => ipcRenderer.invoke('cmd:compile', filePath),
  run: (filePath: string): Promise<null> => ipcRenderer.invoke('cmd:run', filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
