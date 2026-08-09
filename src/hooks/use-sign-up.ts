import { toast } from '@components/ui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@http/auth/sign-up'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().min(2, 'O nome precisa ter no mínimo 2 caracteres.'),
  email: z.email('E-mail inválido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})

type FormData = z.infer<typeof signUpSchema>

export function useSignUp() {
  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  })

  const navigate = useNavigate()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: signUp,
  })

  const handleSubmit = form.handleSubmit(async ({ name, email, password }) => {
    await mutateAsync({
      name,
      email,
      password,
    })

    toast.add({
      title: 'Cadastro realizado com sucesso!',
      type: 'success',
    })

    navigate('/sign-in')
  })

  return {
    form,
    handleSubmit,
    isPending,
    isError,
    error,
  }
}
