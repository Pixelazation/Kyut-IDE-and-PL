import { dialog } from 'electron'
import { ConfirmationOptions } from '../constants/confirmation.constants'

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

export async function showConfirmationPrompt(): Promise<number> {
  const result = await dialog.showMessageBox({
    type: 'question',
    buttons: ['Yes', 'Cancel', 'Save'],
    defaultId: ConfirmationOptions.OK, // 'OK' will be the default button
    cancelId: ConfirmationOptions.CANCEL, // 'Cancel' will be the cancel button
    title: 'Confirmation',
    message: 'You have unsaved changes. Are you sure you want to discard them?',
  });

  return result.response; // Returns true if 'OK' was clicked
}
