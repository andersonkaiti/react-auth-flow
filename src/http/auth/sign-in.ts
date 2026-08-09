import { httpClient } from '@http/http-client'
import { isAxiosError } from 'axios'

export interface ISignInRequest {
  email: string
  password: string
}

interface ISignInResponse {
  accessToken: string
  refreshToken: string
}

export async function signIn({
  email,
  password,
}: ISignInRequest): Promise<ISignInResponse> {
  try {
    const { data } = await httpClient.post<ISignInResponse>('/sign-in', {
      email,
      password,
    })

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ??
          'Não foi possível concluir o cadastro. Tente novamente.',
      )
    }

    throw error
  }
}
