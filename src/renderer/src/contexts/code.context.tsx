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

  const contextValue = useMemo(
    () => ({
      code,
      setCode
    }),
    [code, setCode]
  )

  return <CodeContext.Provider value={contextValue}>{children}</CodeContext.Provider>
}
