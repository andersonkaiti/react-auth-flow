import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Loading } from './loading'
import { routes } from './routes'

const Dashboard = lazy(() =>
  import('@pages/dashboard').then((m) => ({ default: m.Dashboard })),
)

export function Router() {
  const { pathname } = useLocation()

  return (
    <Suspense key={pathname} fallback={<Loading />}>
      <Routes>
        <Route path={routes.home} element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}
