import { httpClient } from '@http/http-client'

interface IRotateRefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export async function rotateRefreshToken(
  refreshToken: string,
): Promise<IRotateRefreshTokenResponse> {
  const { data } = await httpClient.post<IRotateRefreshTokenResponse>(
    '/refresh-token',
    {
      refreshToken,
    },
  )

  return data
}
