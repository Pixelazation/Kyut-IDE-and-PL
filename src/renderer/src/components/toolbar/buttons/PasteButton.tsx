import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'
import { FaRegPaste } from 'react-icons/fa6'

function PasteButton(): JSX.Element {
  const { editorOpen } = useCode()
  const { handlePaste } = useEditor()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Paste"
      disabled={!editorOpen}
      onClick={handlePaste}
    >
      <FaRegPaste />
    </button>
  )
}

export default PasteButton
