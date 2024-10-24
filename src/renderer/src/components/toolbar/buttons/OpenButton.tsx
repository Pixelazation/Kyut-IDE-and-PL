import { useCode } from '@renderer/contexts/code.context'
import { AiOutlineFolderOpen } from 'react-icons/ai'

function OpenButton(): JSX.Element {
  const { setCode, setEditorOpen, setFile, setLastSavedCode } = useCode()

  async function handleClick(): Promise<void> {
    const file = await window.api.selectFile()

    if (!file) {
      return
    }

    const contents = window.api.readFile(file)
    setFile(file)
    setCode(contents)
    setEditorOpen(true)
    setLastSavedCode(contents)
  }

  return (
    <button className="hover:text-pink-dark" title="Open File" onClick={handleClick}>
      <AiOutlineFolderOpen />
    </button>
  )
}

export default OpenButton
