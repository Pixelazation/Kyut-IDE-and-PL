import { dialog } from 'electron'

export async function showError(err: string): Promise<void> {
  await dialog.showMessageBox({ title: 'Kyut IDE', type: 'error', message: err })
}