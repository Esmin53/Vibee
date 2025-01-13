import Main from "@/components/Main"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
import { MessageContextProvider } from "@/components/chat/MessageContext"
import Messages from "@/components/chat/Messages"
import { authOptions } from "@/lib/auth"
import { ExtendedConversation } from "@/types/db"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic';

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages?q=${slug}`, {
        headers: new Headers(headers()),
        cache: 'no-store'
      })

      const data: ExtendedConversation = await response.json()

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
          <Main>
            <Info userId={slug} />
            <MessageContextProvider>
              <Messages conversationId={data?.id} initialMessages={filteredMessages?.reverse() || []} userId={session.user.id} slug={slug}/>         
              <ChatBar conversationId={data?.id || null}/>
            </MessageContextProvider>
        </Main>
    )
}

export default SendMessage