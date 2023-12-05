"use client"

import {useSidebarContext} from "@/app/context/context"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {

    const pathname = usePathname()
    const currentPage = pathname.split("/")[1]
    const { setTheme, theme } = useTheme()
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext()
    
    
    return (
        <div className={`md:w-16 lg:w-22 w-10 sm:w-12 ${!isSidebarOpen && 'hidden'} h-screen 
        md:flex flex-col items-center py-2 px-1 sm:px-2 sm:space-y-2 space-y-1
         `}>
   
        </div>
    )
}

export default Sidebar