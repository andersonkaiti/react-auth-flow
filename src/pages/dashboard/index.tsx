import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { getOrders } from '@http/get-orders'
import { useState } from 'react'
import { DashboardSkeleton } from './skeleton'

export function Dashboard() {
  const orders = getOrders()
  const [isLoading] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col p-8">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8">
        <div className="space-y-2">
          <h1 className="font-bold text-4xl tracking-tighter">
            Boas-vindas ao Dashboard!
          </h1>
          <h2 className="text-muted-foreground">Estes são os seus pedidos:</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isLoading && <DashboardSkeleton />}

          {!isLoading &&
            orders.map(({ id, orderNumber, date }) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle>Pedido {orderNumber}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <CardDescription>
                    Reaizado em: {Intl.DateTimeFormat('pt-br').format(date)}
                  </CardDescription>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
