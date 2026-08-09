import type { ILead } from '@app-types/lead'
import { httpClient } from '@http/http-client'

interface IFindLeadsResponse {
  leads: ILead[]
}

export async function findLeads(): Promise<IFindLeadsResponse> {
  const { data } = await httpClient.get<IFindLeadsResponse>('/leads')

  return data
}
