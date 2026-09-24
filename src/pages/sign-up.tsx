import { Button } from '@components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@components/ui/field'
import { Input } from '@components/ui/input'
import { useSignUp } from '@hooks/use-sign-up'
import { routes } from '@router/routes'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SignUp() {
  const {
    handleSubmit,
    isPending,
    form: {
      register,
      formState: { errors },
    },
  } = useSignUp()

  return (
    <div className="flex min-h-screen w-full flex-col p-8">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8">
        <h1 className="font-bold text-4xl tracking-tighter">Cadastre-se</h1>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldSet>
                <FieldLegend>Nome completo</FieldLegend>
              </FieldSet>

              <Input placeholder="Nome" {...register('name')} />

              <FieldError errors={[errors.name]} />
            </Field>

            <Field>
              <FieldSet>
                <FieldLegend>E-mail</FieldLegend>
              </FieldSet>

              <Input placeholder="E-mail" {...register('email')} />

              <FieldError errors={[errors.email]} />
            </Field>

            <Field>
              <FieldSet>
                <FieldLegend>Senha</FieldLegend>
              </FieldSet>

              <Input
                placeholder="Senha"
                type="password"
                {...register('password')}
              />

              <FieldError errors={[errors.password]} />
            </Field>

            <Field>
              <Button className="space-x-2" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>

        <p className="text-muted-foreground text-sm">
          Já tem uma conta?{' '}
          <Link
            className="font-medium text-foreground underline"
            to={routes.signIn}
          >
            Acesse sua conta
          </Link>
        </p>
      </main>
    </div>
  )
}
