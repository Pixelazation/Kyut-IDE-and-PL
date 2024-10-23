import { useCode } from '@renderer/contexts/code.context'
import { MdOutlineSave } from 'react-icons/md'

function SaveButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Save"
      disabled={!editorOpen}
    >
      <MdOutlineSave />
    </button>
  )
}

export default SaveButton
