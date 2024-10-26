import { ConfirmationOptions } from '@renderer/constants'
import { useCode } from '@renderer/contexts/code.context'
import { AiOutlineFolderOpen } from 'react-icons/ai'

function OpenButton(): JSX.Element {
  const { code, file, lastSavedCode, save, saveAs, setCode, setEditorOpen, setFile, setLastSavedCode } = useCode()

  async function handleClick(): Promise<void> {
    if (code !== lastSavedCode) {
      const promptResult = await window.api.confirmUnsaved()

      if (promptResult === ConfirmationOptions.OK) {
        setEditorOpen(false)
        setCode('')
      } else if (promptResult === ConfirmationOptions.SAVE) {
        file === '' ? saveAs() : save()
      }
    }

    const selectedFile = await window.api.selectFile()

    if (!selectedFile) {
      return
    }

    const contents = window.api.readFile(selectedFile)
    setFile(selectedFile)
    setCode(contents)
    setEditorOpen(true)
    setLastSavedCode(contents)
  }

  return (
    <button className="hover:text-pink-dark" title="Open File" onClick={handleClick}>
      <AiOutlineFolderOpen />
    </button>
  )
}

export default OpenButton
