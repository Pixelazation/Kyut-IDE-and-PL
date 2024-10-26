import { CodeAccessPropsType, CodeAccessProviderPropsType } from '@renderer/types/code.type'
import { createContext, useContext, useMemo, useState } from 'react'

export const CodeContext = createContext<CodeAccessPropsType | undefined>(undefined)

export function useCode(): CodeAccessPropsType {
  const context = useContext(CodeContext)

  if (context === undefined) {
    throw new Error('useCode must be used within a CodeProvider')
  }

  return context
}

export default function CodeProvider(props: Readonly<CodeAccessProviderPropsType>): JSX.Element {
  const { children } = props
  const [code, setCode] = useState<string>('')
  const [editorOpen, setEditorOpen] = useState<boolean>(false)
  const [file, setFile] = useState<string>('')
  const [lastSavedCode, setLastSavedCode] = useState<string>('')

  async function save(): Promise<boolean> {
    setLastSavedCode(code)
    window.api.saveFile(file, code)
    return true
  }

  async function saveAs(): Promise<boolean> {
    const newFile = window.api.getSaveFile()

    return newFile.then((newFilePath: string | null): boolean => {
      if (newFilePath && newFilePath !== '') {
        setFile(newFilePath)
        window.api.saveFile(newFilePath, code)
        setLastSavedCode(code)

        return true
      }

      return false
    })
  }

  const contextValue = useMemo(
    () => ({
      code,
      editorOpen,
      file,
      lastSavedCode,
      save,
      saveAs,
      setCode,
      setEditorOpen,
      setFile,
      setLastSavedCode
    }),
    [
      code,
      editorOpen,
      file,
      lastSavedCode,
      save,
      saveAs,
      setCode,
      setEditorOpen,
      setFile,
      setLastSavedCode
    ]
  )

  return <CodeContext.Provider value={contextValue}>{children}</CodeContext.Provider>
}
