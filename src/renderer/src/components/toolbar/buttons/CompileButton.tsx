import { useCode } from '@renderer/contexts/code.context'
import { useEffect, useState } from 'react'
import { SiCompilerexplorer } from 'react-icons/si'

function CompileButton(): JSX.Element {
  const { code, editorOpen, file, lastCompiledCode, save, saveAs, setLastCompiledCode } = useCode()
  const [changedFromCompile, setChangedFromCompile] = useState<boolean>(true)

  async function handleClick(): Promise<void> {
    file === '' ? await saveAs() : await save()
    window.api
      .compile(file)
      .then(() => {
        setChangedFromCompile(false)
        setLastCompiledCode(code)
      })
      .catch((err) => console.error(err))
  }

  // Check if code has changed from last save
  useEffect(() => {
    setChangedFromCompile(code !== lastCompiledCode)
  }, [code, lastCompiledCode])

  return (
    <button
      className="hover:text-pink-dark disabled:text-gray-600"
      title="Compile"
      disabled={!editorOpen || !changedFromCompile}
      onClick={handleClick}
    >
      <SiCompilerexplorer />
    </button>
  )
}

export default CompileButton
