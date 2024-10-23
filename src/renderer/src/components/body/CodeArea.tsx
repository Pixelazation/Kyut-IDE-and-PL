import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useCode } from '@renderer/contexts/code.context'

function CodeArea(): JSX.Element {
  const { code, setCode } = useCode()

  return <CodeMirror value={code} onChange={(code) => setCode(code)} theme={vscodeDark} />
}

export default CodeArea
