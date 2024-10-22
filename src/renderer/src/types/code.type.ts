import { ReactNode } from 'react'

export type CodeAccessPropsType = {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

export type CodeAccessProviderPropsType = {
  children: ReactNode | ReactNode[]
}
