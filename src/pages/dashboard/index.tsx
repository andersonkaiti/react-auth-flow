import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { useLeads } from '@hooks/use-leads'
import { DashboardLeadsSkeleton } from './skeleton'

export function Dashboard() {
  const { data, isLoading } = useLeads()

  return (
    <div className="flex min-h-screen w-full flex-col p-8">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8 pt-40">
        <div className="space-y-2">
          <h1 className="font-bold text-4xl tracking-tighter">
            Boas-vindas ao Dashboard!
          </h1>
          <h2 className="text-muted-foreground">Estes são os seus pedidos:</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {isLoading && <DashboardLeadsSkeleton />}

          {!isLoading &&
            data?.leads?.map(({ id, name, email }) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <CardDescription>E-mail: {email}</CardDescription>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
