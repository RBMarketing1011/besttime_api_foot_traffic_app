import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from './elements/upperComponents/Header'

import './App.css'

function App ()
{
  return (
    <div className="flex justify-center align-center flex-column">
      <Header />
      <ToastContainer />
      <Outlet />
    </div>
  )
}

export default App