import { useForm } from 'react-hook-form'

interface IFormData {
  email: string
  password: string
}

export function useSignIn() {
  const form = useForm<IFormData>()

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return {
    ...form,
    handleSubmit,
  }
}
