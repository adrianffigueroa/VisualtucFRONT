/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectClientById } from './clientsApiSlice'
import { useDeleteClientMutation } from './clientsApiSlice'
import { useNavigate } from 'react-router-dom'
import { TableRow, TableCell } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
//import DeleteClientAlert from './DeleteClientAlert'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const Client = ({ clientID }) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const client = useSelector((state) => selectClientById(state, clientID))
  const [deleteClient, { isSuccess, isError, error }] = useDeleteClientMutation()
  const [open, setOpen] = useState(false)

  const handleDeleteClient = async (clientID) => {
    await deleteClient({ id: clientID })
    if (isError) {
      toast({
        title: 'Error',
        description: error.data.message,
        variant: 'destructive',
      })
    }
    setOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Usuario eliminado',
        description: 'El usuario ha sido eliminado exitosamente.',
        variant: 'destructive',
      })
    }
  }, [isSuccess, toast])

  if (client) {
    return (
      <>
        <TableRow>
          <TableCell>{client.clientname}</TableCell>
          <TableCell>{client.role}</TableCell>
          <TableCell>{client.email}</TableCell>
          <TableCell>{client.active ? 'Activo' : 'Inactivo'}</TableCell>
          <TableCell className='text-right'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/dash/clients/${clientID}`)
                  }}
                >
                  <DropdownMenuLabel>Editar</DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <DropdownMenuLabel>Borrar</DropdownMenuLabel>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <DeleteClientAlert open={open} setOpen={setOpen} onConfirm={() => handleDeleteClient(clientID)} />
      </>
    )
  } else return null
}

export default Client
