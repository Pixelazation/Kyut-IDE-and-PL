import { SiCompilerexplorer } from 'react-icons/si'

function CompileButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Compile">
      <SiCompilerexplorer />
    </button>
  )
}

export default CompileButton
