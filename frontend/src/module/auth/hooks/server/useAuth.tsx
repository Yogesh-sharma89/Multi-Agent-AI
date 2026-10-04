import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../api/auth.api"

import { logoutApi } from "../../api/logout"

export const useAuthMutation = ()=>{

    return useMutation({
        mutationKey:['auth'],
        mutationFn:authApi
    })
}

export const useLogout = ()=>{
    return useMutation({
        mutationKey:['logout'],
        mutationFn:logoutApi
    })
}
