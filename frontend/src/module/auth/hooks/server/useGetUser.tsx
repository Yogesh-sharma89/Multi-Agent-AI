import { useQuery } from "@tanstack/react-query"
import { getUserApi } from "../../api/getUser"


const useGetUser = () => {
  return useQuery({
    queryKey:["get-user"],
    queryFn:getUserApi,

    retry:false,

    staleTime:10*60*1000,
    gcTime:15*60*1000,

    refetchOnWindowFocus:false,
    refetchOnReconnect:true
  })
    
}

export default useGetUser
