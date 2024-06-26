﻿/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useDeleteUserMutation } from './usersApiSlice'
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
import DeleteUserAlert from './DeleteUserAlert'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const User = ({ userID }) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const user = useSelector((state) => selectUserById(state, userID))
  const [deleteUser, { isSuccess, isError, error }] = useDeleteUserMutation()
  const [open, setOpen] = useState(false)

  const handleDeleteUser = async (userID) => {
    await deleteUser({ id: userID })
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

  if (user) {
    return (
      <>
        <TableRow>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.active ? 'Activo' : 'Inactivo'}</TableCell>
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
                    navigate(`/dash/users/${userID}`)
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
        <DeleteUserAlert open={open} setOpen={setOpen} onConfirm={() => handleDeleteUser(userID)} />
      </>
    )
  } else return null
}

export default User
