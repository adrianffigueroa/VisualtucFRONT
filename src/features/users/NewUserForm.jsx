﻿import { useEffect } from 'react'
import { NewUserFormSchema } from '@/helpers/userFormSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(NewUserFormSchema),
    defaultValues: {
      username: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
      //role: '',
    },
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Usuario creado',
        description: 'El usuario se ha creado correctamente. Redirigiendo...',
        variant: 'success',
      })
      setTimeout(() => {
        navigate('/dash/users')
      }, 3000)
    }
  }, [isSuccess, navigate, toast])

  useEffect(() => {
    if (isError) {
      console.log(error)
      toast({
        title: 'Error',
        description: error.data.message,
        variant: 'destructive',
      })
    }
  }, [isError, error, toast])

  const onsubmit = (data) => {
    console.log(data)
    form.reset()
    addNewUser(data)
  }

  return (
    <Card className='w-full max-w-xl'>
      <CardHeader>
        <CardTitle>Nuevo Usuario</CardTitle>
        <CardDescription>Crea un nuevo usuario para el sistema.</CardDescription>
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
                        <Input type='text' placeholder='JuanPerez' {...field} />
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
                            <SelectValue
                              placeholder='Seleccione un rol'
                              //defaultValue={field.value}
                            />
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
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='******' {...field} />
                      </FormControl>
                      <FormDescription>Constraseña para iniciar sesión</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password2'
                  rules={{
                    validate: (value) => value === form.getValues('password') || 'Las contraseñas no coinciden',
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repetir Contraseña</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='******' {...field} />
                      </FormControl>
                      <FormDescription>Confirmación de Contraseña</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex justify-end w-full mt-4'>
              <Button type='submit' className='md:justify-end items-end' disabled={!form.formState.isValid}>
                {isLoading ? 'Creando...' : 'Crear Usuario'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default NewUserForm
