import Main from "@/components/Main"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
import { MessageContextProvider } from "@/components/chat/MessageContext"
import Messages from "@/components/chat/Messages"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
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

      const data: {
        id: string;
        senderId: string;
        recieverId: string;
        text: string;
        createdAt: Date;
    }[] = await response.json()

      const messages = data || []


      const notOurUser = await db.user.findFirst({
        where: {
          id: slug
        },
        select: {
          id: true,   
          name: true,  
          image: true  
      }
      })

      

    return (
          <Main>
            <Info userId={slug} />
            <MessageContextProvider>
              <Messages initialMessages={messages} ourUser={{
                id: session.user.id,
                name: session.user.name!,
                image: session.user.image!
              }} notOurUser={notOurUser!}/>         
              <ChatBar />
            </MessageContextProvider>
        </Main>
    )
}

export default SendMessage