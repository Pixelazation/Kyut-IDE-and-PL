import { useCode } from '@renderer/contexts/code.context'
import { LuRedo2 } from 'react-icons/lu'

function RedoButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Redo"
      disabled={!editorOpen}
    >
      <LuRedo2 />
    </button>
  )
}

export default RedoButton
