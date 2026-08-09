import { httpClient } from '@http/http-client'
import { isAxiosError } from 'axios'

interface ISignUpRequest {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: ISignUpRequest) {
  try {
    await httpClient.post('/sign-up', {
      name,
      email,
      password,
    })
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
