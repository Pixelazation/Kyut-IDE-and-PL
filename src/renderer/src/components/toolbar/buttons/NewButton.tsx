import { useCode } from '@renderer/contexts/code.context'
import { VscNewFile } from 'react-icons/vsc'

function NewButton(): JSX.Element {
  const { setEditorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark"
      title="New File"
      onClick={(): void => setEditorOpen(true)}
    >
      <VscNewFile />
    </button>
  )
}

export default NewButton
