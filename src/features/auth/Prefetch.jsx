import { store } from '@/app/api/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { clientsApiSlice } from '../clients/clientsApiSlice'
import { jobsApiSlice } from '../jobs/jobsApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
const Prefetch = () => {
  useEffect(() => {
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    const clients = store.dispatch(clientsApiSlice.endpoints.getClients.initiate())
    const jobs = store.dispatch(jobsApiSlice.endpoints.getJobs.initiate())

    return () => {
      users.unsubscribe()
      clients.unsubscribe()
      jobs.unsubscribe()
    }
  }, [])
  return <Outlet />
}

export default Prefetch
