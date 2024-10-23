import { useCode } from '@renderer/contexts/code.context'
import CodeArea from './CodeArea'
import Landing from './Landing'

function MainBody(): JSX.Element {
  const { editorOpen } = useCode()

  return editorOpen ? <CodeArea /> : <Landing />
}

export default MainBody
