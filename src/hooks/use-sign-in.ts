import { toast } from '@components/ui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/use-auth'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof signInSchema>

export function useSignIn() {
  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  })

  const { signIn } = useAuth()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  })

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await mutateAsync({
        email,
        password,
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.add({
          title: error.message,
          type: 'error',
        })
      }
    }
  })

  return {
    form,
    handleSubmit,
    isPending,
  }
}
