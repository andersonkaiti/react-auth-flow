import { ThemeToggle } from '@components/theme-toggle'
import { Button } from '@components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { LogOut } from 'lucide-react'

export function AppBar() {
  return (
    <header className="fixed top-4 right-4 ml-auto w-fit space-x-4">
      <ThemeToggle />

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <LogOut className="size-4" />
            </Button>
          }
        />
        <TooltipContent>
          <p>Sair</p>
        </TooltipContent>
      </Tooltip>
    </header>
  )
}
