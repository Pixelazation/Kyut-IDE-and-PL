import { useCode } from '@renderer/contexts/code.context'
import { SiCompilerexplorer } from 'react-icons/si'

function CompileButton(): JSX.Element {
  const { editorOpen, file } = useCode()

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Compile"
      disabled={!editorOpen}
      onClick={() => window.api.compile(file)}
    >
      <SiCompilerexplorer />
    </button>
  )
}

export default CompileButton
