import { createContext, type PropsWithChildren } from 'react'

interface IAuthContextValue {
  isSignedIn: boolean
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthProvider({ children }: PropsWithChildren) {
  const value: IAuthContextValue = {
    isSignedIn: false,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
