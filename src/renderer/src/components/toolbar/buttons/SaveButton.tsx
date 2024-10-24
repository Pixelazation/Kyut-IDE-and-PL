import { useCode } from '@renderer/contexts/code.context'
import { MdOutlineSave } from 'react-icons/md'

function SaveButton(): JSX.Element {
  const { code, editorOpen, file, setFile } = useCode()

  async function handleClick(): Promise<void> {
    if (file === '') {
      const newFile = window.api.getSaveFile()
      
      newFile.then((newFilePath: string) => {
        if (newFilePath !== '') {
          setFile(newFilePath)
          window.api.saveFile(newFilePath, code)
        }
      })
      
    } else {
      window.api.saveFile(file, code)
    }
  }

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Save"
      disabled={!editorOpen}
      onClick={handleClick}
    >
      <MdOutlineSave />
    </button>
  )
}

export default SaveButton
