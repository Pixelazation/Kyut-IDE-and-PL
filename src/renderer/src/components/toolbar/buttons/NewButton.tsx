import { ConfirmationOptions } from '@renderer/constants'
import { useCode } from '@renderer/contexts/code.context'
import { VscNewFile } from 'react-icons/vsc'

function NewButton(): JSX.Element {
  const { code, file, lastSavedCode, save, saveAs, setCode, setEditorOpen, setFile, setLastSavedCode } = useCode()

  async function handleClick() {
    if (code !== lastSavedCode) {
      const promptResult = await window.api.confirmUnsaved()

      if (promptResult === ConfirmationOptions.OK) {
        setEditorOpen(false)
        setCode('')
      } else if (promptResult === ConfirmationOptions.SAVE) {
        file === '' ? saveAs() : save()
      }
    }

    setEditorOpen(true)
    setFile('')
    setCode('')
    setLastSavedCode('')
  }

  return (
    <button
      className="hover:text-pink-dark"
      title="New File"
      onClick={handleClick}
    >
      <VscNewFile />
    </button>
  )
}

export default NewButton
