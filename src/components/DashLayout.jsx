import { Outlet } from 'react-router-dom'
import DashHeader from '../components/DashHeader'
const DashLayout = () => {
  return (
    <>
      <DashHeader className='w-full' />
      <div className=' mt-20'>
        <Outlet />
      </div>
    </>
  )
}

export default DashLayout
