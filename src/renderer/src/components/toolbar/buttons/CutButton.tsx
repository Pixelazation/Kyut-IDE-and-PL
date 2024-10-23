import { useCode } from '@renderer/contexts/code.context'
import { IoCut } from 'react-icons/io5'

function CutButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Cut"
      disabled={!editorOpen}
    >
      <IoCut />
    </button>
  )
}

export default CutButton
