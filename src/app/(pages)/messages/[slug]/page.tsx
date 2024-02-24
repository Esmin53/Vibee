
import Main from "@/components/Main"
import UtilityBar from "@/components/UtilityBar"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
import Messages from "@/components/chat/Messages"
import { authOptions } from "@/lib/auth"
import { ExtendedConversation, ExtendedMessage } from "@/types/db"
import { ConversationType } from "@/types/db"
import { Loader2 } from "lucide-react"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


interface ConversationProps {
  params: {
    slug: string  
  }
}

const SendMessage = async ({ params }: ConversationProps) => {
    
      const session = await getServerSession(authOptions);

      if(!session || !session.user) {
        redirect('/')
      }

      const { slug } = params;

      const response = await fetch(`http://localhost:3000/api/messages?q=${slug}`, {
        headers: headers(),
        cache: 'no-store'
      })

      const data: ExtendedConversation = await response.json()

      const chatsResponse = await fetch('http://localhost:3000/api/chats', {
        cache: 'no-store',
        headers: headers()
      })
    
      const chats: ConversationType[] = await chatsResponse.json()

      const messages = data?.messages?.reverse()

      const filteredMessages = messages?.map((item, index) => {
        if(item?.senderId === messages[index + 1]?.senderId) {
          return {
            ...item,
            sender: {
              ...item?.sender,
              image: null
            }
          }
        } else {
          return item
        }
      })

      

    return (
            <div className="flex w-full bg-dark max-h-screen">
                <UtilityBar data={chats}/>
                <Main>
                  <Info userId={slug} />
                  <Messages conversationId={data?.id} initialMessages={filteredMessages?.reverse() || []} userId={session.user.id} slug={slug}/>         
                  <ChatBar conversationId={data?.id || null}/>

                </Main>
            </div>

    )
}

export default SendMessage