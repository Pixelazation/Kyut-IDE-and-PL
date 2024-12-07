import { useCode } from '@renderer/contexts/code.context'
import { useEffect, useState } from 'react'
import { IoPlayOutline } from 'react-icons/io5'

function ExecuteButton(): JSX.Element {
  const { code, editorOpen, file, lastCompiledCode, save, saveAs, setLastCompiledCode } = useCode()
  const [changedFromCompile, setChangedFromCompile] = useState<boolean>(true)

  async function handleClick(): Promise<void> {
    if (changedFromCompile) {
      file === '' ? await saveAs() : await save()
      await window.api.compile(file)
      setChangedFromCompile(false)
      setLastCompiledCode(code)
    }

    window.api.run(file)
  }

  // Check if code has changed from last save
  useEffect(() => {
    setChangedFromCompile(code !== lastCompiledCode)
  }, [code, lastCompiledCode])

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Execute"
      disabled={!editorOpen}
      onClick={handleClick}
    >
      <IoPlayOutline />
    </button>
  )
}

export default ExecuteButton
