import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useCode } from '@renderer/contexts/code.context'
import { useEditor } from '@renderer/contexts/editor.context'

function CodeArea(): JSX.Element {
  const { code, setCode } = useCode()

  const { editorRef, setHasSelection } = useEditor()

  function checkForSelection(): void {
    const view = editorRef.current?.view

    if (view) {
      setHasSelection(!view.state.selection.main.empty)
    }
  }

  return (
    <CodeMirror
      ref={editorRef}
      value={code}
      onClick={checkForSelection} 
      onKeyDown={checkForSelection}
      onChange={(code) => setCode(code)}
      theme={vscodeDark}
    />
  );
}

export default CodeArea
