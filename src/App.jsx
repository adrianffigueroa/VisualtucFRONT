import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import JobsList from './features/jobs/JobsList'
import ClientsList from './features/clients/ClientsList'
import UsersList from './features/users/UsersList'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import NewJob from './features/jobs/NewJob'
import EditJob from './features/jobs/EditJob'
import NewClientForm from './features/clients/NewClientForm'
import EditClient from './features/clients/EditClient'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route index element={<Public />} />
      <Route path='login' element={<Login />} />

      <Route path='dash' element={<DashLayout />}>
        <Route index element={<Welcome />} />
        <Route path='jobs'>
          <Route index element={<JobsList />} />
          <Route path='new' element={<NewJob />} />
          <Route path=':id' element={<EditJob />} />
        </Route>
        <Route path='clients'>
          <Route index element={<ClientsList />} />
          <Route path='new' element={<NewClientForm />} />
          <Route path=':id' element={<EditClient />} />
        </Route>
        <Route path='users'>
          <Route index element={<UsersList />} />
          <Route path='new' element={<NewUserForm />} />
          <Route path=':id' element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
