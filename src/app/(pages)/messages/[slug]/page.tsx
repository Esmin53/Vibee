import Main from "@/components/Main"
import Sidebar from "@/components/Sidebar"
import UserAvatar from "@/components/UserAvatar"
import UtilityBar from "@/components/UtilityBar"
import ChatBar from "@/components/chat/Chatbar"
import Messages from "@/components/chat/Messages"
import { User } from "@prisma/client"
import { headers } from "next/headers"

interface PageProps {
    params: {
      slug: string
    }
  }

const SendMessage = async ({params}: PageProps) => {
    
    const { slug } = params

    const response = await fetch(`http://localhost:3000/api/accounts/${slug}`, {
        method: 'GET',
        headers: headers()
    })

    const data: User = await response.json()

    return (
            <Main>
                <div className="w-full flex justify-center sticky top-0 mt-2 z-50 bg-gray-200">
                    <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl h-12 flex 
                    border-b-2 border-gray-300 opacity-75 shadow-b">
                        <div className="flex gap-2 items-center">
                        {data.image ? (
                            <div className="w-10 h-10">
                                <UserAvatar image={data.image} />
                            </div>
                        )   : null}
                            <p className="font-semibold text-lg">{data.name}</p>
                        </div>
                    </div>
                </div>
                <Messages />
                <ChatBar />
            </Main>
    )
}

export default SendMessage