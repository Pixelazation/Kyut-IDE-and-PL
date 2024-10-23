import { useCode } from '@renderer/contexts/code.context'
import { FaRegWindowClose } from 'react-icons/fa'

function CloseButton(): JSX.Element {
  const { setCode, setEditorOpen } = useCode()

  function handleClick(): void {
    //TODO: Prompt for confirmation
    setEditorOpen(false)
    setCode('')
  }

  return (
    <button className="hover:text-pink-dark" title="Close" onClick={handleClick}>
      <FaRegWindowClose />
    </button>
  )
}

export default CloseButton
