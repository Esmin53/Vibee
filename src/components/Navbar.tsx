"use client"

import { useSidebarContext } from "@/app/context/context"
import { SidebarClose } from "lucide-react"
import { useSession } from "next-auth/react"
import UserAvatar from "./UserAvatar"

const Navbar = () => {
    
    const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext()
    const session = useSession()

    return (
            <div className="w-full h-12 md:h-16 bg-gray-200 flex justify-between md:justify-end items-center 
            px-2 border-b-4 border-b-zinc-50">
                <div className="" onClick={() => setIsSidebarOpen(isSidebarOpen => !isSidebarOpen)}>
                    <SidebarClose className={`w-7 h-7 text-gray-500 cursor-pointer md:hidden ${isSidebarOpen && 'hidden' }`} />
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10">
                        {session.data?.user.image &&  <UserAvatar image={session.data?.user.image} />}
                    </div>
                    <div className="flex flex-col h-full">
                        <p className=" lg:text-lg text-sm font-semibold">{session.data?.user.name}</p>
                        <p className="hidden sm:flex text-xs md:text-sm text-gray-500">{session.data?.user.email}</p>
                    </div>
                </div>
            </div>
    )
}

export default Navbar