import { useCode } from '@renderer/contexts/code.context'
import { IoPlayOutline } from 'react-icons/io5'

function ExecuteButton(): JSX.Element {
  const { editorOpen, file } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Execute"
      disabled={!editorOpen}
      onClick={() => window.api.run(file)}
    >
      <IoPlayOutline />
    </button>
  )
}

export default ExecuteButton
