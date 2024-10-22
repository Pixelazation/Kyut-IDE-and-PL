import Toolbar from './components/toolbar/Toolbar'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import CodeProvider, { useCode } from './contexts/code.context'

function App(): JSX.Element {
  const { code, setCode } = useCode()

  return (
    <>
      <CodeProvider>
        <Toolbar />
        <CodeMirror value={code} onChange={(code) => setCode(code)} theme={vscodeDark} />
      </CodeProvider>
    </>
  )
}

export default App
