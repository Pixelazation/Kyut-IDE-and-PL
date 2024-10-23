import { useCode } from '@renderer/contexts/code.context'
import { AiOutlineFolderOpen } from 'react-icons/ai'

function OpenButton(): JSX.Element {
  const { setCode, setEditorOpen, setFile } = useCode()

  async function handleClick(): Promise<void> {
    const file = await window.api.selectFile()
    const contents = window.api.readFile(file)
    setFile(file)
    setCode(contents)
    setEditorOpen(true)
  }

  return (
    <button className="hover:text-pink-dark" title="Open File" onClick={handleClick}>
      <AiOutlineFolderOpen />
    </button>
  )
}

export default OpenButton
