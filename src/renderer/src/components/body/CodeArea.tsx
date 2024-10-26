import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'

function CodeArea(): JSX.Element {
  const { code, setCode } = useCode()

  const { editorRef } = useEditor()

  return (
    <CodeMirror
      ref={editorRef}
      value={code} 
      onChange={(code) => setCode(code)}
      theme={vscodeDark}
    />
  );
}

export default CodeArea
