import { findLeads } from '@http/leads/find-leads'
import { useQuery } from '@tanstack/react-query'

export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: findLeads,
  })
}
