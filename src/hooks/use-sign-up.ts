import { useForm } from 'react-hook-form'

interface IFormData {
  name: string
  email: string
  password: string
}

export function useSignUp() {
  const form = useForm<IFormData>()

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return {
    ...form,
    handleSubmit,
  }
}
