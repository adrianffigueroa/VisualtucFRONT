import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import { Skeleton } from '@/components/ui/skeleton'

const EditUser = () => {
  const { id } = useParams()

  const user = useSelector((state) => selectUserById(state, id))

  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <Skeleton className='h-[125px] w-[250px] mx-auto rounded-xl' />
  )
  return content
}

export default EditUser
