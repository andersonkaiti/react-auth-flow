import { Skeleton } from '@components/ui/skeleton'

export function DashboardSkeleton() {
  return Array.from({ length: 3 }, (_, index: number) => index).map(
    (index: number) => <Skeleton key={index} className="h-29" />,
  )
}
