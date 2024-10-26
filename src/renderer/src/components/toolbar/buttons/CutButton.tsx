import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'
import { IoCut } from 'react-icons/io5'

function CutButton(): JSX.Element {
  const { editorOpen } = useCode()
  const { handleCut } = useEditor()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Cut"
      disabled={!editorOpen}
      onClick={handleCut}
    >
      <IoCut />
    </button>
  )
}

export default CutButton
