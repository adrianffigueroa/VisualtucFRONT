import { useEffect, useState } from 'react'
import { NewClientFormSchema, NewClientCompanyFormSchema } from '@/helpers/clientFormSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAddNewClientMutation } from './clientsApiSlice'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const NewClientForm = () => {
  const [addNewClient, { isLoading, isSuccess, isError, error }] = useAddNewClientMutation()
  const [clientType, setClientType] = useState('')
  const navigate = useNavigate()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(NewClientFormSchema),
    defaultValues: {
      clientType: '',
      name: '',
      lastname: '',
      email: '',
      phone: '',
    },
  })

  const formCompany = useForm({
    resolver: zodResolver(NewClientCompanyFormSchema),
    defaultValues: {
      clientType: '',
      companyName: '',
      address: '',
      contactName: '',
      contactLastname: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Cliente creado',
        description: 'El cliente se ha creado correctamente. Redirigiendo...',
        variant: 'success',
      })
      setTimeout(() => {
        navigate('/dash/clients')
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
    data.clientType = clientType
    console.log(data)
    //console.log(clientType)
    //const resolver = zodResolver(NewClientFormSchema)
    //console.log(form)
  }

  return (
    <Card className='w-full max-w-xl'>
      <CardHeader>
        <CardTitle>Nuevo Cliente</CardTitle>
        <CardDescription>Crea un nuevo cliente para el sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value) => setClientType(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Seleccione un tipo' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='Autonomo'>Autonomo</SelectItem>
              <SelectItem value='Empresa'>Empresa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {clientType === 'Autonomo' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className='flex flex-col gap-4'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Ej. Juan' {...field} />
                        <FormDescription>Ingresa el nombre del cliente.</FormDescription>
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
                        <Input placeholder='Ej. Perez' {...field} />
                        <FormDescription>Ingresa el apellido del cliente.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Ej. 0jK5T@example.com' {...field} />
                        <FormDescription>Ingresa el email del cliente.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <Input placeholder='Ej. 123456789' {...field} />
                        <FormDescription>Ingresa el teléfono del cliente.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex justify-end w-full mt-4'>
                <Button type='submit' className='md:justify-end items-end' disabled={!form.formState.isValid}>
                  {isLoading ? 'Creando...' : 'Crear Cliente'}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {clientType === 'Empresa' && (
          <Form {...formCompany}>
            <form onSubmit={formCompany.handleSubmit(onsubmit)} className='flex flex-col gap-4'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={formCompany.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Ej. Coca Cola' {...field} />
                        <FormDescription>Ingresa el nombre de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formCompany.control}
                    name='contactName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de contacto</FormLabel>
                        <Input placeholder='Ej. Juan' {...field} />
                        <FormDescription>Ingresa el nombre de contacto de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCompany.control}
                    name='contactLastname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido de contacto</FormLabel>
                        <Input placeholder='Ej. Perez' {...field} />
                        <FormDescription>Ingresa el apellido de contacto de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={formCompany.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Ej. 0jK5T@example.com' {...field} />
                        <FormDescription>Ingresa el email de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCompany.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <Input placeholder='Ej. 123456789' {...field} />
                        <FormDescription>Ingresa el teléfono de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formCompany.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem className='mt-5'>
                        <FormLabel>Dirección</FormLabel>
                        <Input placeholder='Ej. Av. Principal 123' {...field} />
                        <FormDescription>Ingresa la dirección de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex justify-end w-full mt-4'>
                <Button type='submit' className='md:justify-end items-end' disabled={!formCompany.formState.isValid}>
                  {isLoading ? 'Creando...' : 'Crear Cliente'}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={(field) => setClientType(field)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Seleccione un tipo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='Autonomo'>Autonomo</SelectItem>
                        <SelectItem value='Empresa'>Empresa</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>Tipo de cliente</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {clientType === 'Autonomo' && (
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Juan' {...field} />
                        </FormControl>
                        <FormDescription>Nombre de Cliente </FormDescription>
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
                          <Input type='text' placeholder='Juan' {...field} />
                        </FormControl>
                        <FormDescription>Apellido del Cliente</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='juanperez@mail.com' {...field} />
                        </FormControl>
                        <FormDescription>Email del Cliente</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl className='appearance-none'>
                          <Input
                            type='number'
                            placeholder='3815555555'
                            {...field}
                            className='appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
                          />
                        </FormControl>
                        <FormDescription>Teléfono del Cliente</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {clientType === 'Empresa' && (
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razon Social</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Coca Cola' {...field} />
                        </FormControl>
                        <FormDescription>Razon Social de la Empresa</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contactName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Juan Coca Cola' {...field} />
                        </FormControl>
                        <FormDescription>Nombre del Contacto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contactLastname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder=' Perez Coca Cola' {...field} />
                        </FormControl>
                        <FormDescription>Apellido del Contacto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='coca@cocacola' {...field} />
                        </FormControl>
                        <FormDescription>Email del Contacto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl className='appearance-none'>
                          <Input
                            type='number'
                            placeholder='3815555555'
                            {...field}
                            className='appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
                          />
                        </FormControl>
                        <FormDescription>Teléfono del Cliente</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Calle Falsa 123' {...field} />
                        </FormControl>
                        <FormDescription>Dirección de la Empresa</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <div className='flex justify-end w-full mt-4'>
              <Button type='submit' className='md:justify-end items-end'>
                {isLoading ? 'Creando...' : 'Crear Usuario'}
              </Button>
            </div>
          </form>
        </Form> */}
      </CardContent>
    </Card>
  )
}

export default NewClientForm
