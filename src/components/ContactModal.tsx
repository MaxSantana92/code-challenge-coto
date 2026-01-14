import React from 'react'
import { Mail } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import ModalShell from '@/components/ModalShell'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRolesStore } from '@/store/roles-store'

const contactSchema = z.object({
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  role: z.string().min(1, 'Seleccioná un rol'),
})

type ContactFormValues = z.infer<typeof contactSchema>

type ContactModalProps = {
  trigger?: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  onOpenChange?: (open: boolean) => void
}

function ContactModal({ trigger, isOpen, onClose, onOpenChange }: ContactModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = isOpen ?? internalOpen
  const roles = useRolesStore((s) => s.roles)
  const loadingRoles = useRolesStore((s) => s.loading)
  const rolesError = useRolesStore((s) => s.error)
  const hasRoles = roles.length > 0

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (isOpen === undefined) {
        setInternalOpen(next)
      }
      if (!next) {
        onClose?.()
      }
      onOpenChange?.(next)
    },
    [isOpen, onClose, onOpenChange]
  )

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: '',
      role: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit = (values: ContactFormValues) => {
    console.log('Contact form submitted', values)
    setOpen(false)
    form.reset()
  }

  return (
    <ModalShell
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      title='Completa tus datos'
      subtitle='Para comenzar a operar.'
    >
      <div className='flex justify-center pb-2'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary'>
          <Mail className='size-6' aria-hidden />
        </div>
      </div>

      <div className='rounded-lg bg-card border border-border p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] sm:p-5'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Ingresá tu mensaje...'
                      className='bg-background text-foreground'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol a proponer</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loadingRoles || !hasRoles}
                    >
                      <SelectTrigger className='w-full bg-background'>
                        <SelectValue
                          placeholder={
                            loadingRoles
                              ? 'Cargando roles...'
                              : hasRoles
                              ? 'Seleccioná un rol'
                              : 'No hay roles disponibles'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingRoles && (
                          <SelectItem disabled value='__loading'>
                            Cargando roles...
                          </SelectItem>
                        )}
                        {rolesError && !loadingRoles && (
                          <SelectItem disabled value='__error'>
                            Error al cargar roles
                          </SelectItem>
                        )}
                        {!loadingRoles &&
                          !rolesError &&
                          hasRoles &&
                          roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        {!loadingRoles && !rolesError && !hasRoles && (
                          <SelectItem disabled value='__empty'>
                            No hay roles disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className={cn('w-full bg-primary text-primary-foreground hover:bg-orange-600')}
            >
              Enviar formulario
            </Button>
          </form>
        </Form>
      </div>
    </ModalShell>
  )
}

export default ContactModal
