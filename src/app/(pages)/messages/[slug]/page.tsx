import Main from "@/components/Main"
import UserAvatar from "@/components/UserAvatar"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
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

    /*const response = await fetch(`http://localhost:3000/messages?q=${slug}`, {
        method: 'GET',
        headers: headers()
    })

    const data = await response.json()*/


    return (
            <Main>
                <Info userId={slug} />
                <Messages />
                <ChatBar />
            </Main>
    )
}

export default SendMessage