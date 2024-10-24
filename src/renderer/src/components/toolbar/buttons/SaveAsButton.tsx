import { useCode } from '@renderer/contexts/code.context'
import { MdOutlineSaveAs } from 'react-icons/md'

function SaveAsButton(): JSX.Element {
  const { code, editorOpen, setFile } = useCode()

  async function handleClick(): Promise<void> {
    const newFile = window.api.getSaveFile()
      
    newFile.then((newFilePath: string) => {
      if (newFilePath !== '') {
        setFile(newFilePath)
        window.api.saveFile(newFilePath, code)
      }
    })
  }

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Save As"
      disabled={!editorOpen}
      onClick={handleClick}
    >
      <MdOutlineSaveAs />
    </button>
  )
}

export default SaveAsButton
