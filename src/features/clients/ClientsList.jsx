import { useGetClientsQuery } from './clientsApiSlice'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Client from '../clients/Client'

const ClientsList = () => {
  const { data: clients, isLoading, isSuccess, isError, error } = useGetClientsQuery()

  let content

  if (isLoading) content = <Skeleton className='h-[125px] w-[250px] mx-auto rounded-xl' />

  if (isError) {
    content = (
      <Alert variant='destructive' className='center mx-auto rounded-xl w-[350px]'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Sucedió un error al cargar los usuarios. Por favor, intenta de nuevo.
          <p>{error?.data?.message}</p>
        </AlertDescription>
      </Alert>
    )
  }
  if (isSuccess) {
    const { ids } = clients
    content = (
      <Table>
        <TableCaption>Listado de Usuarios Registrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Usuario</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Activo</TableHead>
            <TableHead className='text-right'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ids.map((clientID) => (
            <Client key={clientID} clientID={clientID} />
          ))}
        </TableBody>
      </Table>
    )
  }
  return content
}

export default ClientsList
