import CodeArea from './components/CodeArea'
import Toolbar from './components/toolbar/Toolbar'
import CodeProvider from './contexts/code.context'

function App(): JSX.Element {
  return (
    <>
      <CodeProvider>
        <Toolbar />
        <CodeArea />
      </CodeProvider>
    </>
  )
}

export default App
