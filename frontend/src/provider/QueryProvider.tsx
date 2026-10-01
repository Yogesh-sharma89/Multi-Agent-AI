import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import type { ReactNode } from "react";

const querClient = new QueryClient();

const QueryProvider = ({children}:{children:ReactNode})=>{
    return (
        <QueryClientProvider client={querClient}>
            {children}
        </QueryClientProvider>
    )
}\

export default QueryProvider;