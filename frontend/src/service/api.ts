import axios, { AxiosError, type AxiosRequestConfig } from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    timeout:10000 //10ms
})

export const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})


api.interceptors.response.use(
    (response) => response,

    async (err: AxiosError) => {

        const originalRequest = err.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined

        if (err.response?.status !== 401 || !originalRequest || originalRequest?._retry) {
            return Promise.reject(err)
        }

        if (originalRequest.url?.includes("/auth/refresh")) {
            return Promise.reject(err)
        }

        originalRequest._retry = true;

        try {

            await refreshApi.post("/auth/refresh");

            return api(originalRequest);

        } catch (err) {
            return Promise.reject(err)

        }

    }
)

export default api;