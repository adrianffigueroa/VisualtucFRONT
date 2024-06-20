/* eslint-disable react/prop-types */
import { useUpdateUserMutation } from './usersApiSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserFormSchema } from '@/helpers/userEditSchema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const EditUserForm = ({ user }) => {
  const { username, name, lastname, email, role, active } = user
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      username: username || '',
      name: name || '',
      lastname: lastname || '',
      email: email || '',
      password: '',
      password2: '',
      role: role || '',
      active: active || '',
    },
  })

  const onsubmit = async (values) => {
    const data = { ...values, id: user._id }
    console.log(data)
    await updateUser({ data })
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      toast({
        title: 'Usuario actualizado',
        description: 'El usuario se ha actualizado correctamente. Redirigiendo...',
        variant: 'success',
      })
      setTimeout(() => {
        navigate('/dash/users')
      }, 3000)
    }
    if (isError) {
      toast({
        title: 'Error',
        description: error?.data.message,
        variant: 'destructive',
      })
    }
  }, [isSuccess, navigate, toast, form, isError])

  return (
    <Card className='w-full max-w-xl'>
      <CardHeader>
        <CardTitle>Editar Usuario</CardTitle>
        <CardDescription>Edita la información del usuario.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>
                      <FormDescription>Nombre de usuario asignado al empleado/usuario</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='Juan' {...field} />
                      </FormControl>
                      <FormDescription>Nombre del usuario</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='Perez' {...field} />
                      </FormControl>
                      <FormDescription>Apellido del usuario</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='juanperez@mail.com' {...field} />
                      </FormControl>
                      <FormDescription>Email para notificaciones</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full md:w-1/2'>
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione un rol' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='Administrador'>Administrador</SelectItem>
                            <SelectItem value='Manager'>Manager</SelectItem>
                            <SelectItem value='Empleado'>Empleado</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>Rol asignado al usuario</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='active'
                  render={({ field }) => (
                    <FormItem className='flex flex-col mt-2'>
                      <FormLabel>Usuario Activo</FormLabel>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormDescription>Activar/Desactivar Usuario</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex justify-end w-full mt-4'>
              <Button type='submit' className='md:justify-end items-end' disabled={!form.formState.isValid}>
                {isLoading ? 'Editando...' : 'Editar Usuario'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditUserForm
