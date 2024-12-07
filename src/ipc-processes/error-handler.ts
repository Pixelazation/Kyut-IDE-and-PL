import { dialog } from 'electron'

export async function showError(err: string): Promise<void> {
  await dialog.showMessageBox({ type: 'error', message: err })
}