"use client"

import {useSidebarContext} from "@/app/context/context"
import { MessageSquare, MailQuestion, UserPlus, Settings, LogOut, Users, Sun, SidebarOpen } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {

    const pathname = usePathname()
    const currentPage = pathname.split("/")[1]
    const { setTheme, theme } = useTheme()
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext()
    
    
    return (
        <div className={`md:w-24 w-auto ${!isSidebarOpen && 'hidden'} h-full gap-y-2 md:flex flex-col items-center pt-2 px-1 sm:px-2 gap-4 bg-zinc-100`}>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-md flex items-center justify-center 
            cursor-pointer text-gray-500 md:hidden" onClick={() => {
                setIsSidebarOpen(isSidebarOpen => !isSidebarOpen)
                console.log(isSidebarOpen)
            }}>
                <SidebarOpen />
            </div>
            <Link href="/messages" className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 ${currentPage === 'messages' ? 'bg-green-600' : 'bg-gray-200'} rounded-md flex items-center justify-center cursor-pointer`}>
                <MessageSquare className={`w-5 h-5 sm:w-7 sm:h-7 ${currentPage === 'messages' ? 'text-gray-50' : 'text-gray-500'}`}/>
            </Link>
            <Link href="/messagerequests" className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 ${currentPage === 'messagerequests' ? 'bg-green-600' : 'bg-gray-200'} rounded-md flex items-center justify-center cursor-pointer`}>
                <MailQuestion className={`w-5 h-5 sm:w-7 sm:h-7 ${currentPage === 'messagerequests' ? 'text-gray-50' : 'text-gray-500'}`}/>
            </Link>
            <Link href="/friendrequests" className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 ${currentPage === 'friendrequests' ? 'bg-green-600' : 'bg-gray-200'} rounded-md flex items-center justify-center cursor-pointer`}>
                <UserPlus className={`w-5 h-5 sm:w-7 sm:h-7 ${currentPage === 'friendrequests' ? 'text-gray-50' : 'text-gray-500'}`}/>
            </Link>
            <Link href="/groups" className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 ${currentPage === 'groups' ? 'bg-green-600' : 'bg-gray-200'} rounded-md flex items-center justify-center cursor-pointer`}>
                <Users className={`w-5 h-5  sm:w-7 sm:h-7 ${currentPage === 'groups' ? 'text-gray-50' : 'text-gray-500'}`}/>
            </Link>
            <Link href="/settings" className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 ${currentPage === 'settings' ? 'bg-green-600' : 'bg-gray-200'} rounded-md flex items-center justify-center cursor-pointer`}>
                <Settings className={`w-5 h-5  sm:w-7 sm:h-7 ${currentPage === 'settings' ? 'text-gray-50' : 'text-gray-500'}`}/>
            </Link>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer" onClick={() => {
                if(theme === 'light') {
                    setTheme('dark')
                } else {
                    setTheme('light')
                }
            }}>
                <Sun className="h-5 w-5 sm:w-7 sm:h-7 text-gray-500"/>
            </div>
        </div>
    )
}

export default Sidebar