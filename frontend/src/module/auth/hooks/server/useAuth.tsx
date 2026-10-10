import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../../api/auth.api"

import { logoutApi } from "../../api/logout"

export const useAuthMutation = ()=>{

    return useMutation({
        mutationKey:['auth'],
        mutationFn:authApi
    })
}

export const useLogout = ()=>{

  const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['logout'],
        mutationFn:logoutApi,
        onSuccess:()=>{
          queryClient.invalidateQueries({
            queryKey:["get-user"]
          })
        }
    })
}
