import { useCode } from '@renderer/contexts/code.context'
import { AiOutlineFolderOpen } from 'react-icons/ai'

function OpenButton(): JSX.Element {
  const { setCode } = useCode()

  async function handleClick(): Promise<void> {
    const file = await window.api.selectFile()
    const contents = window.api.readFile(file)
    setCode(contents)
  }

  return (
    <button className="hover:text-pink-dark" onClick={handleClick}>
      <AiOutlineFolderOpen />
    </button>
  )
}

export default OpenButton
