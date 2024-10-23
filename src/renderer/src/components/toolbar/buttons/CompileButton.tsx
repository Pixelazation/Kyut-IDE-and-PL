import { useCode } from '@renderer/contexts/code.context'
import { SiCompilerexplorer } from 'react-icons/si'

function CompileButton(): JSX.Element {
  const { editorOpen } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Compile"
      disabled={!editorOpen}
    >
      <SiCompilerexplorer />
    </button>
  )
}

export default CompileButton
