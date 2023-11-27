"use client"

import { useSidebarContext } from "@/app/context/context"
import { SidebarClose } from "lucide-react"
import { ReactNode } from "react"

const Main = ({children}: {children: ReactNode}) => {
    
    const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext()

    return (
        <div className={`h-full bg-gray-200 ${isSidebarOpen ? 'hidden' : 'w-full'} md:flex-1 w-full md:flex flex-col shadow overflow-x-auto relative`}>
            <div className="w-full h-12 md:h-16 bg-gray-200 flex justify-start items-center px-2 border-b-4 border-b-zinc-50">
                <div className="" onClick={() => setIsSidebarOpen(isSidebarOpen => !isSidebarOpen)}>
                    <SidebarClose className={`w-7 h-7 text-gray-500 cursor-pointer md:hidden ${isSidebarOpen && 'hidden' }`} />
                    <h1>MAIIIN</h1>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Main