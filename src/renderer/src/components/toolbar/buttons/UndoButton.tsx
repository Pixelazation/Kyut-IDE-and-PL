import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'
import { LuUndo2 } from 'react-icons/lu'

function UndoButton(): JSX.Element {
  const { editorOpen } = useCode()
  const { canUndo, handleUndo } = useEditor()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Undo"
      disabled={!editorOpen || !canUndo}
      onClick={handleUndo}
    >
      <LuUndo2 />
    </button>
  )
}

export default UndoButton
