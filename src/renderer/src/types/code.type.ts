import { ReactNode } from 'react'

export type CodeAccessPropsType = {
  code: string
  editorOpen: boolean
  file: string
  lastCompiledCode: string
  lastSavedCode: string
  save: () => Promise<boolean>
  saveAs: () => Promise<boolean>
  setCode: React.Dispatch<React.SetStateAction<string>>
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>
  setFile: React.Dispatch<React.SetStateAction<string>>
  setLastCompiledCode: React.Dispatch<React.SetStateAction<string>>
  setLastSavedCode: React.Dispatch<React.SetStateAction<string>>
}

export type CodeAccessProviderPropsType = {
  children: ReactNode | ReactNode[]
}
