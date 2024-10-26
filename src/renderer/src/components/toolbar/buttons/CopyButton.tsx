import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'
import { IoCopy } from 'react-icons/io5'

function CopyButton(): JSX.Element {
  const { editorOpen } = useCode()
  const { handleCopy } = useEditor()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Copy"
      disabled={!editorOpen}
      onClick={handleCopy}
    >
      <IoCopy />
    </button>
  )
}

export default CopyButton
