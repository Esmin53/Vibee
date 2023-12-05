"use client"

import { useSidebarContext } from "@/app/context/context"
import SearchBar from "./Searchbar"
import Chats from "./Chats"
import { Home, LogOut, Settings, Sun } from "lucide-react"
import ToggleSidebar from "./SidebarToggle"


const UtilityBar = () => {

    const {isSidebarOpen} = useSidebarContext()

    return <div className={`${isSidebarOpen ? 'md:flex flex-col' : 'hidden md:flex flex-col'} absolute top-0 left-0 z-50 w-screen h-screen md:relative 
        md:w-60 lg:w-80 bg-gray-200 border-r border-gray-300`}>
            <div className="flex gap-2 w-full items-center px-2">
                <SearchBar />
                <ToggleSidebar />
            </div>
            <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
            <Chats />

            <div className="w-full h-12 flex items-center px-6 text-gray-500 fixed bottom-0 left-0 border-t
             border-gray-300 justify-between z-50 md:w-60 lg:w-80">
                
                <Home className="cursor-pointer"/>
                <Settings className="cursor-pointer"/>
                <Sun className="cursor-pointer"/>
                <LogOut className="cursor-pointer" />
            </div>
    </div>

}

export default UtilityBar