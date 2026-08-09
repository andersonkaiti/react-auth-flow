import { storageKeys } from '@config/storage-keys'
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
