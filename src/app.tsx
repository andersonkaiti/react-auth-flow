import { AppBar } from '@components/app-bar'
import { TooltipProvider } from '@components/ui/tooltip'
import { AuthProvider } from '@contexts/auth-context'
import { ThemeProvider } from '@contexts/theme-context'
import { queryClient } from '@lib/query-client'
import { Router } from '@router/index'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
