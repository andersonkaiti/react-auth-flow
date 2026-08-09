import type { ILead } from '@app-types/lead'
import { storageKeys } from '@config/storage-keys'
import { httpClient } from '@http/http-client'

interface IFindLeadsResponse {
  leads: ILead[]
}

export async function findLeads(): Promise<IFindLeadsResponse> {
  const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN_KEY)

  const { data } = await httpClient.get<IFindLeadsResponse>('/leads', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
}
