import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import {
  handleFileOpen,
  handleFileSave,
  showConfirmationPrompt
} from '../ipc-processes/file-handler'
import icon from '../../resources/icon.png?asset'
import * as Splashscreen from '@trodi/electron-splashscreen'
import { handleCompile, handleRun } from '../ipc-processes/cmd-handler'
import { showError } from '../ipc-processes/error-handler'

const mainOpts: Electron.BrowserWindowConstructorOptions = {
  width: 900,
  height: 605,
  show: false,
  title: 'Kyut IDE',
  autoHideMenuBar: true,
  ...(process.platform === 'linux' ? { icon } : {}),
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false
  }
}

const config: Splashscreen.Config = {
  windowOpts: mainOpts,
  templateUrl: join(__dirname, '../../src/splash-screen/124-splash-screen.gif'),
  delay: 0,
  minVisible: 3000,
  splashScreenOpts: {
    width: 736,
    height: 424,
    transparent: true
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow: BrowserWindow = Splashscreen.initSplashScreen(config)

  // mainWindow.on('ready-to-show', () => {
  //   mainWindow.show()
  // })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on('close', (event) => {
    // Prevent the default close action
    event.preventDefault()

    // Send a message to the renderer to confirm close
    mainWindow.webContents.send('confirm-close')
  })

  ipcMain.on('close-confirmed', () => {
    console.log('handled ig?')
    mainWindow.destroy()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // IPC processes
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('dialog:getSaveFile', handleFileSave)
  ipcMain.handle('dialog:confirmUnsaved', showConfirmationPrompt)
  ipcMain.handle('dialog:showError', (...args) => showError(args[1] as string))

  ipcMain.handle('cmd:compile', (...args) => handleCompile(args[1] as string))
  ipcMain.handle('cmd:run', (...args) => handleRun(args[1] as string))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
