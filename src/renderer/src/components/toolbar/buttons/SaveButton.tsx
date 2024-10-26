import { useCode } from '@renderer/contexts/code.context'
import { useEffect, useState } from 'react'
import { MdOutlineSave } from 'react-icons/md'

function SaveButton(): JSX.Element {
  const { code, editorOpen, file, lastSavedCode, save, saveAs } = useCode()
  const [changedFromSave, setChangedFromSave] = useState<boolean>(false)

  async function handleClick(): Promise<void> {
    file === '' ? saveAs() : save()
  }

  // Check if code has changed from last save
  useEffect(() => {
    console.log(`${code} vs ${lastSavedCode}`)
    setChangedFromSave(code !== lastSavedCode)
  }, [code, lastSavedCode])

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Save"
      disabled={!editorOpen || !changedFromSave}
      onClick={handleClick}
    >
      <MdOutlineSave />
    </button>
  )
}

export default SaveButton
