"use client"

import {useSidebarContext} from "@/app/context/context"
import { MessageSquare, MailQuestion, UserPlus, Settings, LogOut, Users, Sun, SidebarOpen, Home } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {

    const pathname = usePathname()
    const currentPage = pathname.split("/")[1]
    const { setTheme, theme } = useTheme()
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext()
    
    
    return (
        <div className={`md:w-24 w-auto ${!isSidebarOpen && 'hidden'} h-full gap-y-2 md:flex flex-col items-center py-2 px-1 sm:px-2 gap-4
         bg-zinc-100`}>
            <Link href='/'>
                <Home className="h-5 w-5 sm:w-9 sm:h-9 text-gray-500" />
            </Link>
            <hr className="h-0 border-b border-gray-300 mx-1 my-2 opacity-80 shadow w-full" />

            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-400 rounded-md flex items-center justify-center">
                <p className="text-2xl font-bold text-white">G</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-400 rounded-md flex items-center justify-center">
                <p className="text-2xl font-bold text-white">G</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-teal-400 rounded-md flex items-center justify-center">
                <p className="text-2xl font-bold text-white">G</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-cyan-400 rounded-md flex items-center justify-center">
                <p className="text-2xl font-bold text-white">G</p>
            </div>
            <div className="mt-auto w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer" onClick={() => {
                if(theme === 'light') {
                    setTheme('dark')
                } else {
                    setTheme('light')
                }
            }}>
                <Sun className="h-5 w-5 sm:w-7 sm:h-7 text-gray-500"/>
            </div>
            <Link href="/settings" className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 
            md:h-14 ${currentPage === 'settings' ? 'bg-green-600' : 'bg-gray-200'} rounded-md flex items-center justify-center cursor-pointer`}>
                <Settings className={`w-5 h-5  sm:w-7 sm:h-7 ${currentPage === 'settings' ? 'text-gray-50' : 'text-gray-500'}`}/>
            </Link>
        </div>
    )
}

export default Sidebar