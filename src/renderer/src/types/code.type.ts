import { ReactNode } from 'react'

export type CodeAccessPropsType = {
  code: string
  editorOpen: boolean
  setCode: React.Dispatch<React.SetStateAction<string>>
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type CodeAccessProviderPropsType = {
  children: ReactNode | ReactNode[]
}
