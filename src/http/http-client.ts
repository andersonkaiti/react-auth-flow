import { storageKeys } from '@config/storage-keys'
import { rotateRefreshToken } from '@http/auth/refresh-token'
import { routes } from '@router/routes'
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN_KEY)

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem(storageKeys.REFRESH_TOKEN_KEY)

    if ((error.response && error.response.status !== 401) || !refreshToken) {
      throw error
    }

    const originalRequest = error.config

    if (originalRequest.url === '/refresh-token') {
      localStorage.removeItem(storageKeys.ACCESS_TOKEN_KEY)
      localStorage.removeItem(storageKeys.REFRESH_TOKEN_KEY)

      window.location.href = routes.signIn

      throw error
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await rotateRefreshToken(refreshToken)

    localStorage.setItem(storageKeys.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(storageKeys.REFRESH_TOKEN_KEY, newRefreshToken)

    return httpClient(originalRequest)
  },
)
