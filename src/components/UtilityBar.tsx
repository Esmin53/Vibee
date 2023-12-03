"use client"

import { useSidebarContext } from "@/app/context/context"
import SearchBar from "./Searchbar"
import Chats from "./Chats"


const UtilityBar = () => {

    const {isSidebarOpen} = useSidebarContext()

    return (
        <div className={`${!isSidebarOpen && 'hidden'} h-full bg-gray-200 md:flex flex-col border-l-4 border-l-zinc-50 
         flex-1 md:flex-none md:w-60 lg:w-80`}>
            <SearchBar />
            <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
            <Chats />
        </div>
    )
}

export default UtilityBar