import { ReactNode } from 'react'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'

export type EditorPropsType = {
  editorRef: React.RefObject<ReactCodeMirrorRef>
  hasSelection: boolean
  canUndo: boolean
  canRedo: boolean
  setHasSelection: React.Dispatch<React.SetStateAction<boolean>>
  setCanUndo: React.Dispatch<React.SetStateAction<boolean>>
  setCanRedo: React.Dispatch<React.SetStateAction<boolean>> 
  handleCopy: () => void
  handleCut: () => void
  handlePaste: () => void
  handleUndo: () => void
  handleRedo: () => void
}

export type EditorProviderPropsType = {
  children: ReactNode | ReactNode[]
}
