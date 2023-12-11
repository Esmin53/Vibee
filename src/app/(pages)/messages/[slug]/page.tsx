"use client"

import Main from "@/components/Main"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
import Messages from "@/components/chat/Messages"
import { Conversation } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const SendMessage = () => {
    
  const [conversation, setConversation] = useState<Conversation >()
  const pathname = usePathname()
  const router = useRouter()
    
  const { mutate: getConversation } = useMutation({
    mutationFn: async () => {

      const response = await fetch(`http://localhost:3000/api/messages?q=${pathname.split('/')[2]}`)

      const data = await response.json()

      if(!data) {
        router.push(`/request/${pathname.split('/')[2]}`)        
      }

      setConversation(data)
    },
    onSettled: () => {
      if(!conversation?.id) {
        redirect(`/request/${pathname.split('/')[2]}`)
      }
    }
  })


  useEffect(() => {
    getConversation()
  }, [])


    return (

            <Main>
                <Info userId={pathname.split('/')[2]} />
                {conversation?.id ? <Messages conversationId={conversation?.id}  /> :
                 <div className="flex w-full justify-center items-center h-full flex-col relative">
                    <Loader2 className="w-16 h-16 text-gray-400 animate-spin" />  
                </div>}          
                <ChatBar conversationId={conversation?.id || null}/>
            </Main>


    )
}

export default SendMessage