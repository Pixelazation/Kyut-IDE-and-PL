import Toolbar from './components/toolbar/Toolbar'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useState } from 'react'

function App(): JSX.Element {
  const [code, setCode] = useState<string>('')

  return (
    <>
      <Toolbar />
      <CodeMirror value={code} onChange={(code) => setCode(code)} theme={vscodeDark} />
    </>
  )
}

export default App
