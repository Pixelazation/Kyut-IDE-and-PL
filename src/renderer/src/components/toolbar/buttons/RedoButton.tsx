import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'
import { LuRedo2 } from 'react-icons/lu'

function RedoButton(): JSX.Element {
  const { editorOpen } = useCode()
  const { handleRedo } = useEditor()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Redo"
      disabled={!editorOpen}
      onClick={handleRedo}
    >
      <LuRedo2 />
    </button>
  )
}

export default RedoButton
