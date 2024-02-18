
import Main from "@/components/Main"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
import Messages from "@/components/chat/Messages"
import { authOptions } from "@/lib/auth"
import { ExtendedConversation, ExtendedMessage } from "@/types/db"
import { Conversation } from "@prisma/client"
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

    return (
            <Main>
                <Info userId={slug} />
                <Messages conversationId={data?.id} initialMessages={data?.messages || []} userId={session.user.id} slug={slug}/>         
                <ChatBar conversationId={data?.id || null}/>
            </Main>
    )
}

export default SendMessage