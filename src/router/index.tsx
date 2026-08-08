import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Loading } from './loading'
import { routes } from './routes'

const Dashboard = lazy(() =>
  import('@pages/dashboard').then((m) => ({ default: m.Dashboard })),
)

const SignUp = lazy(() =>
  import('@pages/sign-up').then((m) => ({ default: m.SignUp })),
)

const SignIn = lazy(() =>
  import('@pages/sign-in').then((m) => ({ default: m.SignIn })),
)

export function Router() {
  const { pathname } = useLocation()

  return (
    <Suspense key={pathname} fallback={<Loading />}>
      <Routes>
        <Route path={routes.home} element={<Dashboard />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.signIn} element={<SignIn />} />
      </Routes>
    </Suspense>
  )
}
