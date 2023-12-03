"use client"

import { useSidebarContext } from "@/app/context/context"
import { ReactNode } from "react"
import Navbar from "./Navbar"

const Main = ({children}: {children: ReactNode}) => {
    
    const {isSidebarOpen} = useSidebarContext()

    return (
        <div className={`h-full bg-gray-200 ${isSidebarOpen ? 'hidden' : 'w-full'} md:flex-1 w-full 
        md:flex flex-col shadow overflow-x-auto relative`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Main