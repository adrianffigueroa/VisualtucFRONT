/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
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
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const User = ({ userID }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => selectUserById(state, userID))

  if (user) {
    return (
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
              <DropdownMenuItem>
                <DropdownMenuLabel>Borrar</DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    )
  } else return null
}

export default User
