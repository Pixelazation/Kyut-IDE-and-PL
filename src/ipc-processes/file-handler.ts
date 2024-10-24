import { dialog } from 'electron'

const extensions = [{
  name: '.kyot, .kyut, .uwu',
  extensions: ['kyot', 'kyut', 'uwu']
}]

export async function handleFileOpen(): Promise<string | null> {
  const { canceled, filePaths } = await dialog.showOpenDialog({filters: extensions})
  if (!canceled) {
    return filePaths[0]
  }

  return null
}

export async function handleFileSave(): Promise<string | null> {
  const { canceled, filePath } = await dialog.showSaveDialog({filters: extensions})
  if (!canceled) {
    return filePath
  }

  return null
}
