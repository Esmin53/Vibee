import SearchBar from "./Searchbar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Chats from "./Chats"
import { ConversationType } from "@/types/db"
import FooterComponent from "./FooterComponent"
import Link from "next/link"


const UtilityBar = async () => {
    const session = await getServerSession(authOptions)

    const chatsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chats`, {
      cache: 'no-store',
      headers: new Headers(headers()),
    })
  
    const chats: ConversationType[] = await chatsResponse.json()

    if(!session) {
      redirect('/sign-in')
    }

    return <div className={` h-screen hidden md:flex flex-col md:w-72 lg:w-96  bg-dark2 border-r border-dark3`}>
            <div className="w-full h-20 flex items-center px-4 border-b border-dark3 shadow-sm">
              <Link href='/' className={`text-violet1 text-5xl `}>Vibee</Link>
            </div>
            <div className="w-full flex px-2 pt-2 justify-center">
              <SearchBar />
            </div>
              <Chats data={chats} userId={session?.user?.id}/>
              <FooterComponent />
            </div>

}

export default UtilityBar