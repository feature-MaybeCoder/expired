
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RegisterPage from "@/pages/register/page"
import RootPage from "@/pages/root/page"
import { REGISTER_ROUTES } from '@/constants/routes/register'
import { ROOT_ROUTES } from './constants/routes/root'

function App() {
  const router = createBrowserRouter([
    {
      path: REGISTER_ROUTES.register,
      element: <RegisterPage/>
    },
    {
      path: ROOT_ROUTES.root,
      element: <RootPage/>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
