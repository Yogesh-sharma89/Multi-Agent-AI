import { Navigate, Outlet } from "react-router";
import Loader from "../components/ui/Loader";
import useGetUser from "../module/auth/hooks/server/useGetUser"


const ProtectedRoutes = () => {
   
    const {data:user,isLoading} = useGetUser();

    if(isLoading){
        return <Loader label="Loading..."/>
    }

    if(!user){
        return <Navigate to={'/'} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoutes
