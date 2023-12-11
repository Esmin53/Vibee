"use client"

import { useSidebarContext } from "@/app/context/context"
import { Bell, MessageCircle, SidebarClose } from "lucide-react"
import { useSession } from "next-auth/react"
import UserAvatar from "./UserAvatar"

const Navbar = () => {
    
    const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext()
    const session = useSession()

    return (
            <div className="w-full h-12 md:h-16 flex flex-col justify-center items-center bg-gray-200 
            px-2 ">
                <div className="flex justify-between items-center w-full max-w-5xl">

                <div className="flex gap-2 items-center text-gray-500">
                    <Bell className="w-7 h-7" />
                    <MessageCircle className="w-7 h-7" />
                    <SidebarClose onClick={() => setIsSidebarOpen(isSidebarOpen => !isSidebarOpen)}
                    className={`w-7 h-7 text-gray-500 cursor-pointer md:hidden ${isSidebarOpen && 'hidden' }`} />
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
                <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow w-full mt-1.5" />
            </div>
    )
}

export default Navbar