import { ConfirmationOptions } from '@renderer/constants'
import { useCode } from '@renderer/contexts/code.context'
import { FaRegWindowClose } from 'react-icons/fa'

function CloseButton(): JSX.Element {
  const { code, editorOpen, file, lastSavedCode, save, saveAs, setCode, setEditorOpen } = useCode()

  async function handleClick(): Promise<void> {
    //TODO: Prompt for confirmation
    if (code !== lastSavedCode) {
      const promptResult = await window.api.confirmUnsaved()

      if (promptResult === ConfirmationOptions.OK) {
        setEditorOpen(false)
        setCode('')
      } else if (promptResult === ConfirmationOptions.SAVE) {
        file === '' ? saveAs() : save()
      }

    } else {
      setEditorOpen(false)
      setCode('')
    }
  }

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Close"
      onClick={handleClick}
      disabled={!editorOpen}
    >
      <FaRegWindowClose />
    </button>
  )
}

export default CloseButton
