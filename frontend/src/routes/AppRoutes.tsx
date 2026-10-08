import { RouterProvider ,createBrowserRouter} from "react-router"

import { lazy, Suspense } from "react"
import Loader from "../components/ui/Loader"

const AuthPage = lazy(()=>import("../module/auth/ui/pages/AuthPage"))
const PublicRoutes = lazy(()=>import("./PublicRoutes"))


const ProtectedRoutes = lazy(()=>import("./ProtectedRoutes"))
const DashboardPage = lazy(()=>import("../module/dashboard/ui/pages/DashboardPage"))

const router = createBrowserRouter([

  {
    path:"/",
    element:<PublicRoutes/>,
    children:[
      {
        index:true,
        element:<AuthPage/>
      }
    ]
  },
  {
    path:"dashboard",
    element:<ProtectedRoutes/>,
    children:[
      {
        index:true,
        element:<Suspense fallback={<Loader label="Preparing your dashboard"/>}>
          <DashboardPage/>
        </Suspense>
      }
    ]
  }
])

const AppRoutes = () => {


  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoutes
