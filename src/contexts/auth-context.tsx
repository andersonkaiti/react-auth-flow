import { toast } from '@components/ui/toast'
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
}

export const AuthContext = createContext({} as IAuthContextValue)

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export function AuthProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(
    () => !!localStorage.getItem(ACCESS_TOKEN_KEY),
  )

  const signIn = useCallback(async ({ email, password }: ISignInRequest) => {
    const { accessToken, refreshToken } = await signInRequest({
      email,
      password,
    })

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)

    setIsSignedIn(true)

    toast.add({
      title: 'Autenticação bem-sucedida!',
      type: 'success',
    })
  }, [])

  const value: IAuthContextValue = {
    isSignedIn,
    signIn,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
