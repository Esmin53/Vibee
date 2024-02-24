
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

interface ChatProps {
  data?: ConversationType[]
}

const UtilityBar = async ({data}: ChatProps) => {
    const session = await getServerSession(authOptions)

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
              {data && <Chats data={data} userId={session?.user?.id}/>}
              <div className="w-full h-20 mt-auto border-t shadow-sm border-dark3 flex justify-between items-center px-2">
              <div className="flex gap-2 items-center">
                    <div className="sm:w-12 sm:h-12 w-10 h-10 relative rounded-md overflow-hidden">
                        {session?.user.image && <Image src={session.user.image} fill alt="User profile pic"/>}
                    </div>
                    <div className="flex flex-col h-full">
                        <p className="text-slate-50">{session?.user.name}</p>
                        <p className="text-sm text-slate-50">{session?.user.email}</p>
                    </div>
                </div>
                  <SignOut />
              </div>
            </div>

}

export default UtilityBar