import Toaster from "../components/ui/Toaster"
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
