import { toast } from '@components/ui/toast'
import { storageKeys } from '@config/storage-keys'
import {
  type ISignInRequest,
  signIn as signInRequest,
} from '@http/auth/sign-in'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react'

interface IAuthContextValue {
  isSignedIn: boolean
  signIn(data: ISignInRequest): Promise<void>
  signOut(): void
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(
    () => !!localStorage.getItem(storageKeys.ACCESS_TOKEN_KEY),
  )

  const signIn = useCallback(async ({ email, password }: ISignInRequest) => {
    const { accessToken, refreshToken } = await signInRequest({
      email,
      password,
    })

    localStorage.setItem(storageKeys.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(storageKeys.REFRESH_TOKEN_KEY, refreshToken)

    setIsSignedIn(true)

    toast.add({
      title: 'Autenticação bem-sucedida!',
      type: 'success',
    })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(storageKeys.ACCESS_TOKEN_KEY)
    localStorage.removeItem(storageKeys.REFRESH_TOKEN_KEY)

    setIsSignedIn(false)

    toast.add({
      title: 'Deslogado(a) com sucesso!',
      type: 'success',
    })
  }, [])

  const value: IAuthContextValue = {
    isSignedIn,
    signIn,
    signOut,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
