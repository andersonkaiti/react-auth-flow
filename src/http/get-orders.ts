import type { IOrder } from '@app-types/order'

const ordersMock: IOrder[] = [
  {
    id: crypto.randomUUID(),
    orderNumber: '#001',
    date: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    orderNumber: '#002',
    date: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    orderNumber: '#003',
    date: Date.now(),
  },
]

export function getOrders() {
  return ordersMock
}
