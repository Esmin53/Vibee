
import SearchBar from "./Searchbar"
import { Home, LogOut, Settings, Sun } from "lucide-react"
import SignOut from "./SignOut"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Chats from "./Chats"
import { ConversationType } from "@/types/db"
import { pacifico } from "@/app/layout"
import Image from "next/image"
import FooterComponent from "./FooterComponent"


const UtilityBar = async () => {
    const session = await getServerSession(authOptions)

    const chatsResponse = await fetch('http://localhost:3000/api/chats', {
      cache: 'no-store',
      headers: headers()
    })
  
    const chats: ConversationType[] = await chatsResponse.json()

    if(!session) {
      redirect('/sign-in')
    }

    return <div className={` h-full hidden md:flex flex-col md:w-72 lg:w-96  bg-dark2 border-r border-dark3`}>
            <div className="w-full h-20 flex items-center px-4 border-b border-dark3 shadow-sm">
              <h2 className={`text-violet1 text-5xl ${pacifico.className} `}>Vibee</h2>
            </div>
            <div className="w-full flex px-2 pt-2 justify-center">
              <SearchBar />
            </div>
              <Chats data={chats} userId={session?.user?.id}/>
              <FooterComponent />
            </div>

}

export default UtilityBar