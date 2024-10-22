import { dialog } from 'electron'

export async function handleFileOpen(): Promise<string | null> {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }

  return null
}
