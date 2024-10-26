import { ReactNode } from 'react'

export type CodeAccessPropsType = {
  code: string
  editorOpen: boolean
  file: string
  lastSavedCode: string
  save: () => void
  saveAs: () => void
  setCode: React.Dispatch<React.SetStateAction<string>>
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>
  setFile: React.Dispatch<React.SetStateAction<string>>
  setLastSavedCode: React.Dispatch<React.SetStateAction<string>>
}

export type CodeAccessProviderPropsType = {
  children: ReactNode | ReactNode[]
}
