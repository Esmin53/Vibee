"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProvidersProps {
    children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({children}: ProvidersProps) => {
    return (        
        <QueryClientProvider client={queryClient}>
            <SessionProvider>

                    {children}

            </SessionProvider>
        </QueryClientProvider>
    )
}

export default Providers