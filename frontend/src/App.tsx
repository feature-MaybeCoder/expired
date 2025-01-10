import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RegisterPage from "@/pages/register/page"
import RootPage from "@/pages/root/page"
import { REGISTER_ROUTES } from '@/constants/routes/register'
import { ROOT_ROUTES } from './constants/routes/root'
import { LOGIN_ROUTES } from './constants/routes/login'
import { Provider } from 'react-redux';
import { store } from "@/redux/store";
import LoginPage from './pages/login/page'

function App() {
  const router = createBrowserRouter([
    {
      path: REGISTER_ROUTES.register,
      element: <RegisterPage/>
    },
    {
      path: ROOT_ROUTES.root,
      element: <RootPage/>
    },
    {
      path: LOGIN_ROUTES.login,
      element: <LoginPage/>
    }
  ])

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
