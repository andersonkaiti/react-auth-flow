import { AppBar } from '@components/app-bar'
import { TooltipProvider } from '@components/ui/tooltip'
import { AuthProvider } from '@contexts/auth-context'
import { ThemeProvider } from '@contexts/theme-context'
import { Router } from '@router/index'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <TooltipProvider>
            <AppBar />

            <Router />
          </TooltipProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
