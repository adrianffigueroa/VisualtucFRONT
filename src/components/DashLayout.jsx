import { Outlet } from 'react-router-dom'
import DashHeader from '../components/DashHeader'
const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </>
  )
}

export default DashLayout
