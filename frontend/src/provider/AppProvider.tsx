
import Toaster from "../components/toaster"
import AppRoutes from "../routes/AppRoutes"



const AppProvider = () => {
  return (
    <>
      <Toaster/>
      <AppRoutes/>
    </>
  )
}

export default AppProvider
