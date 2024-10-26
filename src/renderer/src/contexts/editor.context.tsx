import React, { createContext, useRef, useContext, useState, useEffect, useMemo } from 'react'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { undo, redo, redoDepth, undoDepth } from '@codemirror/commands'
import { useCode } from './code.context'

// Define the context type
interface EditorContextType {
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

// Create the context with default values
const EditorContext = createContext<EditorContextType | undefined>(undefined)

// Custom hook to use the context
export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider')
  }
  return context
}

// Provider component
export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const [hasSelection, setHasSelection] = useState<boolean>(false)
  const [canUndo, setCanRedo] = useState<boolean>(false)
  const [canRedo, setCanUndo] = useState<boolean>(false)

  const { code } = useCode()
  const view = editorRef.current?.view

  useEffect(() => {
    if (view) {
      setCanUndo(redoDepth(view.state) > 0)
      setCanRedo(undoDepth(view.state) > 0)
      setHasSelection(!view.state.selection.main.empty)
    }
  }, [code])

  const handleCopy = () => {
    if (navigator.clipboard && editorRef.current) {
      const selectedText = editorRef.current.view?.state.sliceDoc(
        editorRef.current.view.state.selection.main.from,
        editorRef.current.view.state.selection.main.to
      )
      if (selectedText) {
        navigator.clipboard.writeText(selectedText).then(() => {
          console.log('Text copied to clipboard')
        })
      }
    }
  }

  const handleCut = () => {
    if (navigator.clipboard && editorRef.current) {
      const selectedText = editorRef.current.view?.state.sliceDoc(
        editorRef.current.view.state.selection.main.from,
        editorRef.current.view.state.selection.main.to
      )
      if (selectedText) {
        navigator.clipboard.writeText(selectedText).then(() => {
          editorRef.current?.view?.dispatch({
            changes: {
              from: editorRef.current.view.state.selection.main.from,
              to: editorRef.current.view.state.selection.main.to,
              insert: '',
            },
          })
          console.log('Text cut and copied to clipboard')
        })
      }
    }
  }

  const handlePaste = () => {
    if (navigator.clipboard && editorRef.current) {
      navigator.clipboard.readText().then((text) => {
        editorRef.current?.view?.dispatch({
          changes: {
            from: editorRef.current.view.state.selection.main.from,
            to: editorRef.current.view.state.selection.main.to,
            insert: text,
          },
        })
        console.log('Text pasted from clipboard')
      })
    }
  }

  const handleUndo = () => {
    if (editorRef.current) {
      undo(editorRef.current.view!)
    }
  }

  const handleRedo = () => {
    if (editorRef.current) {
      redo(editorRef.current.view!)
    }
  }

  const contextValue = useMemo(
    () => ({
      editorRef,
      hasSelection,
      canUndo,
      canRedo,
      setHasSelection,
      setCanUndo,
      setCanRedo,
      handleCopy,
      handleCut,
      handlePaste,
      handleRedo,
      handleUndo
    }),
    [
      editorRef,
      hasSelection,
      canUndo,
      canRedo,
      setHasSelection,
      setCanUndo,
      setCanRedo,
      handleCopy,
      handleCut,
      handlePaste,
      handleRedo,
      handleUndo
    ]
  )

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  )
}
