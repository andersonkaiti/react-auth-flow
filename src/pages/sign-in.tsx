import { Button } from '@components/ui/button'
import { Field, FieldGroup, FieldLegend, FieldSet } from '@components/ui/field'
import { Input } from '@components/ui/input'
import { useSignIn } from '@hooks/use-sign-in'

export function SignIn() {
  const { handleSubmit, register } = useSignIn()

  return (
    <div className="flex min-h-screen w-full flex-col p-8">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8">
        <h1 className="font-bold text-4xl tracking-tighter">
          Acesse sua conta
        </h1>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldSet>
                <FieldLegend>E-mail</FieldLegend>
              </FieldSet>
              <Input placeholder="E-mail" {...register('email')} />
            </Field>

            <Field>
              <FieldSet>
                <FieldLegend>Senha</FieldLegend>
              </FieldSet>
              <Input placeholder="Senha" {...register('password')} />
            </Field>

            <Field>
              <Button type="submit">Entrar</Button>
            </Field>
          </FieldGroup>
        </form>
      </main>
    </div>
  )
}
