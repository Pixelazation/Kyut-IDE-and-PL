import MainBody from './components/body/MainBody'
import Toolbar from './components/toolbar/Toolbar'
import CodeProvider from './contexts/code.context'
import { EditorProvider } from './contexts/editor.context'

function App(): JSX.Element {
  return (
    <>
      <CodeProvider>
        <EditorProvider>
          <Toolbar />
          <MainBody />
        </EditorProvider>
      </CodeProvider>
    </>
  )
}

export default App
