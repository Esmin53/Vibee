
import SearchBar from "./Searchbar"
import { Home, LogOut, Settings, Sun } from "lucide-react"
import SignOut from "./SignOut"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Chats from "./Chats"
import { ConversationType } from "@/types/db"



const UtilityBar = async () => {
    const session = await getServerSession(authOptions)

  if(!session) {
    redirect('/sign-in')
  }

  const response = await fetch('http://localhost:3000/api/chats', {
    cache: 'no-store',
    headers: headers()
  })

  const data: ConversationType[] = await response.json()

    return <div className={` h-screen hidden md:flex flex-col
        md:w-72 lg:w-96 bg-gray-200 border-r border-gray-300 `}>
            <div className="flex gap-2 w-full items-center px-2">
                <SearchBar />
            </div>
            <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
                <Chats data={data} />
                <div className="w-full h-12 flex items-center px-6 text-gray-500 fixed bottom-0 left-0 border-t border-gray-300 justify-between z-50 md:w-72 lg:w-96">
                <Home className="cursor-pointer"/>
                <Settings className="cursor-pointer"/>
                <Sun className="cursor-pointer"/>
                <SignOut />
            </div>
    </div>

}

export default UtilityBar