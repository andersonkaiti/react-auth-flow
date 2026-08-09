import { useAuth } from '@hooks/use-auth'
import { Navigate, Outlet as Page } from 'react-router-dom'

interface IAuthGuardProps {
  isPrivate?: boolean
}

export function AuthGuard({ isPrivate = false }: IAuthGuardProps) {
  const { isSignedIn } = useAuth()

  if (isSignedIn && !isPrivate) {
    return <Navigate to="/" replace />
  }

  if (!isSignedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />
  }

  return <Page />
}
