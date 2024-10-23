import { useCode } from '@renderer/contexts/code.context'
import { FaRegPaste } from 'react-icons/fa6'

function PasteButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Paste"
      disabled={!editorOpen}
    >
      <FaRegPaste />
    </button>
  )
}

export default PasteButton
