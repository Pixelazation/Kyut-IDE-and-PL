import MainBody from './components/body/MainBody'
import Toolbar from './components/toolbar/Toolbar'
import CodeProvider from './contexts/code.context'

function App(): JSX.Element {
  return (
    <>
      <CodeProvider>
        <Toolbar />
        <MainBody />
      </CodeProvider>
    </>
  )
}

export default App
