import { useCode } from '@renderer/contexts/code.context'
import { LuUndo2 } from 'react-icons/lu'

function UndoButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Undo"
      disabled={!editorOpen}
    >
      <LuUndo2 />
    </button>
  )
}

export default UndoButton
