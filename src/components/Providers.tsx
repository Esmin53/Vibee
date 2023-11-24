"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import OpenSidebar from "@/app/context/context"

interface ProvidersProps {
    children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({children}: ProvidersProps) => {
    return (        
        <QueryClientProvider client={queryClient}>
                <OpenSidebar >
            <SessionProvider>

                    {children}

            </SessionProvider>
            </OpenSidebar>
        </QueryClientProvider>
    )
}

export default Providers