import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { readFileSync, writeFileSync } from 'fs'

// Custom APIs for renderer
const api = {
  getSaveFile: (): Promise<string> => ipcRenderer.invoke('dialog:getSaveFile'),
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
  selectFile: (): Promise<string> => ipcRenderer.invoke('dialog:openFile')
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
