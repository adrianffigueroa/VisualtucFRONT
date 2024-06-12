import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import JobsList from './features/jobs/JobsList'
import ClientsList from './features/clients/ClientsList'
import UsersList from './features/users/UsersList'

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
        </Route>
        <Route path='clients'>
          <Route index element={<ClientsList />} />
        </Route>
        <Route path='users'>
          <Route index element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
