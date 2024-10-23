import { useCode } from '@renderer/contexts/code.context'
import { VscNewFile } from 'react-icons/vsc'

function NewButton(): JSX.Element {
  const { setEditorOpen, setFile } = useCode()

  function handleClick() {
    setEditorOpen(true)
    setFile('')
  }

  return (
    <button
      className="hover:text-pink-dark"
      title="New File"
      onClick={handleClick}
    >
      <VscNewFile />
    </button>
  )
}

export default NewButton
