import { useCode } from '@renderer/contexts/code.context'
import { MdOutlineSaveAs } from 'react-icons/md'

function SaveAsButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Save As"
      disabled={!editorOpen}
    >
      <MdOutlineSaveAs />
    </button>
  )
}

export default SaveAsButton
