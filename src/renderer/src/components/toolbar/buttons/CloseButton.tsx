import { ConfirmationOptions } from '@renderer/constants'
import { useCode } from '@renderer/contexts/code.context'
import { useEffect } from 'react'
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

  useEffect(() => {
    window.api.refreshCloseListener()

    window.api.onConfirmClose(() => {
      if (code !== lastSavedCode) {
        console.log('did i even')
        const promptResult = window.api.confirmUnsaved()

        promptResult.then(async (result: number) => {
          if (result === ConfirmationOptions.OK) {
            window.api.confirmClose()
          } else if (result === ConfirmationOptions.SAVE) {
            const saveResult = file === '' ? saveAs() : save()

            saveResult.then((saveRes) => (saveRes ? window.api.confirmClose() : null))
          }
        })
      } else {
        window.api.confirmClose()
      }
    })
  }, [code])

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
