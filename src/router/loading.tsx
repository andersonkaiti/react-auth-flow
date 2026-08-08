import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  )
}
