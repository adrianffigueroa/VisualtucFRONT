import { Outlet } from 'react-router-dom'
import DashHeader from '../components/DashHeader'
import { Toaster } from './ui/toaster'
const DashLayout = () => {
  return (
    <>
      <DashHeader className='w-full' />
      <div className=' mt-20 flex justify-center'>
        <Outlet />
        <Toaster />
      </div>
    </>
  )
}

export default DashLayout
