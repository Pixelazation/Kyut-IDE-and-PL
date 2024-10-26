import React, { createContext, useRef, useContext } from 'react'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { undo, redo } from '@codemirror/commands'

// Define the context type
interface EditorContextType {
  editorRef: React.RefObject<ReactCodeMirrorRef>
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

  return (
    <EditorContext.Provider value={{ editorRef, handleCopy, handleCut, handlePaste, handleUndo, handleRedo }}>
      {children}
    </EditorContext.Provider>
  )
}
