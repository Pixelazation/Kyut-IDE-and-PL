import { useCode } from '@renderer/contexts/code.context'
import { FaRegWindowClose } from 'react-icons/fa'

function CloseButton(): JSX.Element {
  const { editorOpen, setCode, setEditorOpen } = useCode()

  function handleClick(): void {
    //TODO: Prompt for confirmation
    setEditorOpen(false)
    setCode('')
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
