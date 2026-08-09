import { ThemeToggle } from '@components/theme-toggle'
import { Button } from '@components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { useAuth } from '@hooks/use-auth'
import { LogOut } from 'lucide-react'

export function AppBar() {
  const { isSignedIn, signOut } = useAuth()

  return (
    <header className="fixed top-4 right-4 ml-auto w-fit space-x-4">
      <ThemeToggle />

      {isSignedIn && (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full"
                onClick={signOut}
              >
                <LogOut className="size-4" />
              </Button>
            }
          />
          <TooltipContent>
            <p>Sair</p>
          </TooltipContent>
        </Tooltip>
      )}
    </header>
  )
}
