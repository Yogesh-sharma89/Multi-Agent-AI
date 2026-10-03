import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../api/auth.api"

export const useAuthMutation = ()=>{

    return useMutation({
        mutationKey:['auth'],
        mutationFn:authApi
    })
}
