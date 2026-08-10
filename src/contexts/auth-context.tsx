import { toast } from '@components/ui/toast'
import { storageKeys } from '@config/storage-keys'
import { rotateRefreshToken } from '@http/auth/refresh-token'
import {
  type ISignInRequest,
  signIn as signInRequest,
} from '@http/auth/sign-in'
import { httpClient } from '@http/http-client'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useLayoutEffect,
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

  useLayoutEffect(() => {
    const interceptorRequestId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN_KEY)

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`)
        }

        return config
      },
    )

    const interceptorResponseId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const refreshToken = localStorage.getItem(storageKeys.REFRESH_TOKEN_KEY)

        if (error.response.status !== 401 || !refreshToken) {
          throw error
        }

        const originalRequest = error.config

        if (originalRequest.url === '/refresh-token') {
          localStorage.removeItem(storageKeys.ACCESS_TOKEN_KEY)
          localStorage.removeItem(storageKeys.REFRESH_TOKEN_KEY)

          setIsSignedIn(false)

          throw error
        }

        const { accessToken, refreshToken: newRefreshToken } =
          await rotateRefreshToken(refreshToken)

        localStorage.setItem(storageKeys.ACCESS_TOKEN_KEY, accessToken)
        localStorage.setItem(storageKeys.REFRESH_TOKEN_KEY, newRefreshToken)

        return httpClient(originalRequest)
      },
    )

    return () => {
      httpClient.interceptors.request.eject(interceptorRequestId)
      httpClient.interceptors.response.eject(interceptorResponseId)
    }
  }, [])

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
